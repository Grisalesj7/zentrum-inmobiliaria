import { useState } from "react";

function Dashboard({ propiedades, setPropiedades, usuarioLogueado, setUsuarioLogueado }) {
  // Verificación de resguardo si no hay un usuario activo
  if (!usuarioLogueado) {
    return (
      <div className="max-w-xl mx-auto mt-20 text-center p-8 bg-white rounded-2xl border border-slate-200 shadow-sm">
        <p className="text-slate-600 font-medium">⚠️ Debes iniciar sesión para acceder al panel de administración de Zentrum.</p>
      </div>
    );
  }

  // Estados locales para los campos del perfil
  const [inputName, setInputName] = useState(usuarioLogueado.name);
  const [inputPhone, setInputPhone] = useState(usuarioLogueado.phone || "");
  const [inputAvatar, setInputAvatar] = useState(usuarioLogueado.avatar || "");

  // Estado para controlar la visibilidad del Modal de Publicación
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);

  // Estados locales para el formulario de la nueva propiedad
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [locationName, setLocationName] = useState("");
  const [tipo, setTipo] = useState("Venta");
  const [tipoInmueble, setTipoInmueble] = useState("Apartamento");
  
  // 📍 Estados para la geolocalización automática del inmueble
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [isLocating, setIsLocating] = useState(false);

  // Filtro estricto: solo renderiza propiedades cuyo dueño coincida
  const misPropiedades = propiedades.filter(p => p.owner === usuarioLogueado.name);

  // Función para obtener las coordenadas actuales usando el GPS/Red del navegador
  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert("Lo sentimos, tu navegador no soporta geolocalización.");
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude.toFixed(6));
        setLongitude(position.coords.longitude.toFixed(6));
        setIsLocating(false);
        alert("📍 ¡Coordenadas detectadas y asignadas con éxito!");
      },
      (error) => {
        console.error("Error obteniendo ubicación:", error);
        setIsLocating(false);
        alert("No se pudo obtener la ubicación automáticamente. Por favor, ingrésalas manualmente o verifica los permisos.");
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setUsuarioLogueado({
      ...usuarioLogueado,
      name: inputName.toLowerCase(),
      phone: inputPhone,
      avatar: inputAvatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80"
    });
    alert("¡Perfil de usuario actualizado correctamente!");
  };

  const handleCreateProperty = (e) => {
    e.preventDefault();

    // Validar que tengamos coordenadas; si no, dejamos unas por defecto en el mapa
    const finalCoords = latitude && longitude 
      ? [parseFloat(latitude), parseFloat(longitude)] 
      : [6.2442, -75.5812]; // Por defecto Medellín si no se captura

    const nuevoInmueble = {
      id: Date.now(),
      title,
      price: Number(price),
      location: locationName,
      beds: 3, 
      baths: 2,
      tipo,
      tipoInmueble,
      coordinates: finalCoords,
      owner: usuarioLogueado.name,
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80"
    };

    setPropiedades([nuevoInmueble, ...propiedades]);
    
    // Limpiar formulario y cerrar modal
    setTitle(""); 
    setPrice(""); 
    setLocationName("");
    setLatitude("");
    setLongitude("");
    setIsPublishModalOpen(false);

    alert("¡Propiedad publicada e indexada en el catálogo de Zentrum con éxito!");
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      
      {/* SECCIÓN 1: AJUSTES Y CONFIGURACIÓN DEL PERFIL */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2 border-b border-slate-100 pb-3">
          ⚙️ Ajustes de Perfil de Usuario
        </h2>
        
        <form onSubmit={handleSaveProfile} className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
          <div className="flex flex-col items-center justify-center space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
            <img 
              src={usuarioLogueado.avatar} 
              alt="Perfil" 
              className="w-24 h-24 rounded-full border-2 border-[#007bf3] object-cover shadow-md"
            />
            <p className="text-xs font-bold text-slate-700 uppercase tracking-tight">{usuarioLogueado.name}</p>
          </div>

          <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1">Nombre de Usuario</label>
              <input type="text" value={inputName} onChange={(e) => setInputName(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs font-medium text-slate-800 focus:outline-none focus:border-[#007bf3] focus:bg-white" required />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1">Teléfono de Contacto</label>
              <input type="text" value={inputPhone} onChange={(e) => setInputPhone(e.target.value)} placeholder="+57 300 123 4567" className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs font-medium text-slate-800 focus:outline-none focus:border-[#007bf3] focus:bg-white" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-500 mb-1">Enlace / URL de Foto de Perfil (Avatar)</label>
              <input type="text" value={inputAvatar} onChange={(e) => setInputAvatar(e.target.value)} placeholder="Pega el enlace de la imagen" className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs font-medium text-slate-800 focus:outline-none focus:border-[#007bf3] focus:bg-white" />
            </div>
            <div className="md:col-span-2 flex justify-end">
              <button type="submit" className="bg-[#007bf3] hover:bg-[#0062c4] text-white font-bold text-xs px-6 py-2.5 rounded-lg transition-colors shadow-xs cursor-pointer">
                Guardar Cambios de Cuenta
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* SECCIÓN 2: GESTIÓN DE PUBLICACIONES ACTIVAS */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-4 mb-4 gap-4">
          <h3 className="text-base font-bold text-slate-800">
            📊 Mis Publicaciones Activas ({misPropiedades.length})
          </h3>
          {/* Botón detonador del nuevo Modal */}
          <button
            onClick={() => setIsPublishModalOpen(true)}
            className="bg-[#007bf3] hover:bg-[#0062c4] text-white font-bold text-xs px-5 py-2.5 rounded-lg transition-colors shadow-sm cursor-pointer flex items-center gap-1.5 self-start sm:self-auto"
          >
            <span>➕ Publicar Propiedad</span>
          </button>
        </div>
        
        {misPropiedades.length === 0 ? (
          <p className="text-center text-slate-400 py-12 text-xs font-medium">No has publicado propiedades todavía bajo esta cuenta.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-slate-500 uppercase font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3">Inmueble</th>
                  <th className="p-3">Ubicación</th>
                  <th className="p-3">Geolocalización</th>
                  <th className="p-3">Modalidad</th>
                  <th className="p-3">Precio</th>
                  <th className="p-3 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {misPropiedades.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/80">
                    <td className="p-3 font-bold text-slate-800">
                      {p.title} 
                      <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded ml-1 font-normal">{p.tipoInmueble}</span>
                    </td>
                    <td className="p-3 text-slate-500">📍 {p.location}</td>
                    <td className="p-3 font-mono text-[11px] text-slate-400">
                      {p.coordinates ? `${p.coordinates[0]}, ${p.coordinates[1]}` : "Sin asignar"}
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded-sm text-[10px] font-bold ${p.tipo === "Venta" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"}`}>
                        {p.tipo}
                      </span>
                    </td>
                    <td className="p-3 text-[#0070e0] font-bold">${p.price.toLocaleString()}</td>
                    <td className="p-3 text-center">
                      <button 
                        type="button"
                        onClick={() => setPropiedades(propiedades.filter(item => item.id !== p.id))}
                        className="text-rose-500 hover:text-rose-700 font-bold transition-colors cursor-pointer"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ========================================================== */}
      {/* 🚀 MODAL FLOTANTE: FORMULARIO DE PUBLICACIÓN CON GPS 📍 */}
      {/* ========================================================== */}
      {isPublishModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 relative shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto animate-fade-in">
            
            {/* Botón cerrar */}
            <button 
              onClick={() => setIsPublishModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 font-bold text-lg cursor-pointer"
            >
              ✕
            </button>

            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2 border-b border-slate-100 pb-2">
              🏠 Publicar en Zentrum Inmobiliaria
            </h3>

            <form onSubmit={handleCreateProperty} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Título del Inmueble</label>
                <input required type="text" placeholder="Ej. Apto Vista Hermosa" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#007bf3] focus:bg-white" />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Dirección / Ubicación Textual</label>
                <input required type="text" placeholder="Ej. Medellín, Calasanz" value={locationName} onChange={(e) => setLocationName(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#007bf3] focus:bg-white" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Precio (USD)</label>
                  <input required type="number" placeholder="Ej. 45000" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#007bf3] focus:bg-white" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Operación</label>
                    <select value={tipo} onChange={(e) => setTipo(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-medium text-slate-700 focus:outline-none focus:border-[#007bf3]">
                      <option value="Venta">Venta</option>
                      <option value="Arriendo">Arriendo</option>
                      <option value="Proyectos">Proyectos</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Inmueble</label>
                    <select value={tipoInmueble} onChange={(e) => setTipoInmueble(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-medium text-slate-700 focus:outline-none focus:border-[#007bf3]">
                      <option value="Apartamento">Apartamento</option>
                      <option value="Casa">Casa</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* 📍 COMPONENTE INTERACTIVO DE GEOLOCALIZACIÓN */}
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700 flex items-center gap-1">
                    📍 Ubicación exacta en Mapa
                  </span>
                  <button
                    type="button"
                    onClick={handleGetLocation}
                    disabled={isLocating}
                    className="bg-slate-800 hover:bg-slate-900 text-white font-bold text-[10px] px-3 py-1.5 rounded-md transition-all disabled:opacity-50 cursor-pointer"
                  >
                    {isLocating ? "⌛ Capturando..." : "🎯 Capturar Mi GPS"}
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 mb-0.5">Latitud</label>
                    <input 
                      type="number" 
                      step="any"
                      placeholder="Ej. 6.2442" 
                      value={latitude} 
                      onChange={(e) => setLatitude(e.target.value)} 
                      className="w-full bg-white border border-slate-200 rounded-md p-2 text-xs font-mono text-slate-700 focus:outline-none focus:border-[#007bf3]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 mb-0.5">Longitud</label>
                    <input 
                      type="number" 
                      step="any"
                      placeholder="Ej. -75.5812" 
                      value={longitude} 
                      onChange={(e) => setLongitude(e.target.value)} 
                      className="w-full bg-white border border-slate-200 rounded-md p-2 text-xs font-mono text-slate-700 focus:outline-none focus:border-[#007bf3]"
                    />
                  </div>
                </div>
                <p className="text-[10px] text-slate-400 leading-tight">
                  *Nota: Captura las coordenadas con el botón o digítalas. Esto ubicará con total precisión la propiedad en el mapa principal.
                </p>
              </div>

              {/* Botones de acción del Modal */}
              <div className="flex gap-3 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setIsPublishModalOpen(false)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs px-4 py-2.5 rounded-lg transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-[#007bf3] hover:bg-[#0062c4] text-white font-bold text-xs px-5 py-2.5 rounded-lg shadow-md transition-colors cursor-pointer"
                >
                  Indexar en Zentrum
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}

export default Dashboard;