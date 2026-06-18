import React, { useState } from "react";

function Dashboard({ 
  propiedades = [], 
  properties = [], 
  inmuebles = [], 
  setPropiedades, 
  usuarioLogueado, 
  mensajes = [], 
  favoritos = [],
  ...props 
}) {
  
  // Unificación adaptativa de datos para el inventario
  const listaInmuebles = properties.length ? properties : (propiedades.length ? propiedades : (inmuebles.length ? inmuebles : []));
  const totalInmuebles = listaInmuebles?.length || 0;
  
  // Métricas para estadísticas básicas
  const totalVenta = listaInmuebles?.filter(p => p?.tipo === "Venta" || p?.tipoInmueble === "Venta" || p?.tipoOferta === "Venta")?.length || 0;
  const totalArriendo = listaInmuebles?.filter(p => p?.tipo === "Arriendo" || p?.tipoInmueble === "Arriendo" || p?.tipoOferta === "Arriendo")?.length || 0;

  // Estado para controlar la pestaña activa en el Sidebar
  const [vistaActiva, setVistaActiva] = useState("Estadisticas");
  
  // NUEVO: Estado para abrir/cerrar el menú en móviles
  const [menuAbierto, setMenuAbierto] = useState(false);

  // Bandeja de mensajes simulada de clientes interesados realistas
  const [listaMensajes, setListaMensajes] = useState([
    { id: 1, cliente: "Carlos Mendoza", correo: "carlos@mail.com", telefono: "3124567890", inmueble: "Apartamento en El Poblado", mensaje: "Hola, estoy muy interesado en programar una visita para este fin de semana. ¿Está disponible?", fecha: "Hoy, 2:15 PM", leido: false },
    { id: 2, cliente: "Andrés Felipe", correo: "andres@mail.com", telefono: "3109876543", inmueble: "Casa en Laureles", mensaje: "Buenas tardes, ¿el precio del arriendo incluye la administración del edificio?", fecha: "Ayer", leido: true }
  ]);

  // Formulario de publicación con la estructura provista
  const [nuevoInmueble, setNuevoInmueble] = useState({
    direccion: "", 
    ubicacionPrincipal: "", 
    tipoOferta: "", 
    tipoInmueble: "", 
    areaConstruida: "", 
    areaPrivada: "", 
    descripcion: "", 
    image: "", 
    videoYoutube: "", 
    tour3d: "", 
    telefono: "+57" 
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoInmueble(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNuevoInmueble(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePublicar = (e) => {
    e.preventDefault();
    if (!nuevoInmueble.direccion || !nuevoInmueble.tipoOferta || !nuevoInmueble.tipoInmueble) {
      alert("⚠️ Por favor completa los campos obligatorios marcados con asterisco (*)");
      return;
    }

    const inmuebleNormalizado = {
      id: Date.now(),
      title: `${nuevoInmueble.tipoInmueble.toUpperCase()} EN ${nuevoInmueble.tipoOferta.toUpperCase()}`,
      price: nuevoInmueble.tipoOferta === "Venta" ? 420000000 : 2300000, 
      location: nuevoInmueble.ubicacionPrincipal || nuevoInmueble.direccion,
      beds: 3,
      baths: 2,
      area: Number(nuevoInmueble.areaConstruida || nuevoInmueble.areaPrivada || 85),
      tipo: nuevoInmueble.tipoOferta,
      tipoInmueble: nuevoInmueble.tipoInmueble,
      image: nuevoInmueble.image || "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=600&q=80",
      descripcion: nuevoInmueble.descripcion,
      telefono: nuevoInmueble.telefono,
      destacado: false
    };

    if (typeof setPropiedades === "function") {
      setPropiedades(prev => [inmuebleNormalizado, ...prev]);
      alert("🚀 ¡Inmueble publicado con éxito en el sistema!");
      
      setNuevoInmueble({
        direccion: "", ubicacionPrincipal: "", tipoOferta: "", tipoInmueble: "",
        areaConstruida: "", areaPrivada: "", descripcion: "", image: "",
        videoYoutube: "", tour3d: "", telefono: "+57"
      });
      setVistaActiva("Administrar"); 
    }
  };

  const handleEliminarInmueble = (id) => {
    if (confirm("¿Estás seguro de que deseas eliminar permanentemente esta propiedad de la base de datos?")) {
      if (typeof setPropiedades === "function") {
        setPropiedades(prev => prev.filter(item => item.id !== id));
      }
    }
  };

  // Función para cambiar de vista y cerrar automáticamente el menú en móvil
  const cambiarVista = (vista) => {
    setVistaActiva(vista);
    setMenuAbierto(false);
  };

  const baseTabStyle = "w-full flex items-center gap-3 px-4 py-3 text-xs font-bold transition-all text-left rounded-xl cursor-pointer ";
  const activeTabStyle = baseTabStyle + "bg-[#f0f4fa] text-[#0066e2] border-l-4 border-[#0066e2] rounded-l-none";
  const inactiveTabStyle = baseTabStyle + "text-[#5c728a] hover:bg-slate-50 hover:text-slate-900";

  return (
    <div className="flex bg-[#f8fafc] min-h-screen text-[#1e293b] font-sans antialiased relative">
      
      {/* OVERLAY: Fondo oscuro cuando el menú móvil está abierto */}
      {menuAbierto && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 md:hidden"
          onClick={() => setMenuAbierto(false)}
        ></div>
      )}

      {/* SIDEBAR: Oculta en móviles (`hidden`), se vuelve fija flotante si `menuAbierto` es true, fija normal en pantallas medianas o superiores (`md:flex`) */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200/80 flex flex-col justify-between p-5 shrink-0 select-none transition-transform duration-300 transform
        ${menuAbierto ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:static md:flex
      `}>
        <div>
          <div className="mb-8 px-2 py-1 flex items-center justify-between">
            <div>
              <span className="text-2xl font-black text-[#0066e2] tracking-tight">Zentrum<span className="text-sky-400 font-bold">.</span></span>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Panel Interno</p>
            </div>
            {/* Botón interno para cerrar barra lateral en móviles */}
            <button onClick={() => setMenuAbierto(false)} className="md:hidden text-slate-400 p-1 hover:bg-slate-100 rounded-lg text-lg">
              ✕
            </button>
          </div>

          <nav className="space-y-1">
            <p className="text-[10px] font-bold text-slate-400 px-3 uppercase tracking-wider mb-2">General</p>
            <button onClick={() => cambiarVista("Estadisticas")} className={vistaActiva === "Estadisticas" ? activeTabStyle : inactiveTabStyle}>
              <span className="text-base">📊</span> Estadísticas e Informes
            </button>
            
            <p className="text-[10px] font-bold text-slate-400 px-3 uppercase tracking-wider pt-4 mb-2">Inmuebles</p>
            <button onClick={() => cambiarVista("Publicar")} className={vistaActiva === "Publicar" ? activeTabStyle : inactiveTabStyle}>
              <span className="text-base">▲</span> Publicar Propiedad
            </button>
            <button onClick={() => cambiarVista("Administrar")} className={vistaActiva === "Administrar" ? activeTabStyle : inactiveTabStyle}>
              <span className="text-base">🏢</span> Administrar Inventario
            </button>
            <button onClick={() => cambiarVista("Favoritos")} className={vistaActiva === "Favoritos" ? activeTabStyle : inactiveTabStyle}>
              <span className="text-base">🖤</span> Propiedades Destacadas
            </button>
            
            <p className="text-[10px] font-bold text-slate-400 px-3 uppercase tracking-wider pt-4 mb-2">Clientes</p>
            <button onClick={() => cambiarVista("Mensajes")} className={vistaActiva === "Mensajes" ? activeTabStyle : inactiveTabStyle}>
              <span className="text-base">✉️</span> Mensajes y Leads
            </button>
          </nav>
        </div>

        {/* Info del Asesor Conectado */}
        <div className="border-t border-slate-100 pt-4 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#0066e2] text-white flex items-center justify-center font-bold text-xs shadow-xs">SU</div>
          <div className="truncate">
            <p className="text-xs font-bold text-slate-900 truncate">Susana Ceballos</p>
            <p className="text-[10px] text-slate-400 font-medium truncate">Asesor Conectado</p>
          </div>
        </div>
      </aside>

      {/* CONTENEDOR DE VISTAS DERECHO */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* HEADER RESPONSIVE */}
        <header className="bg-white px-4 md:px-8 py-4 flex items-center justify-between border-b border-slate-200/60 sticky top-0 z-20">
          <div className="flex items-center gap-3 md:gap-4">
            
            {/* NUEVO: Botón Hamburguesa para móviles */}
            <button 
              onClick={() => setMenuAbierto(true)} 
              className="p-2 hover:bg-slate-50 rounded-lg border border-slate-200 text-slate-600 block md:hidden transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            </button>

            <button className="hidden sm:flex p-2 hover:bg-slate-50 rounded-full border border-slate-200 text-slate-400 text-xs w-8 h-8 items-center justify-center transition-colors">⟨</button>
            <h2 className="text-xs md:text-sm font-black text-[#0f172a] uppercase tracking-wider truncate max-w-[180px] sm:max-w-none">
              {vistaActiva === "Estadisticas" ? "Cuadro de Mando e Informes" : vistaActiva === "Publicar" ? "Formulario de Publicación" : `Módulo de ${vistaActiva}`}
            </h2>
          </div>
          <div className="text-[10px] md:text-xs font-bold bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-full flex items-center gap-1.5 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="hidden xs:inline">Sistema En Línea</span>
          </div>
        </header>

        {/* CONTENEDOR CENTRAL ADAPTATIVO */}
        <div className="p-4 md:p-8 flex-1 overflow-y-auto max-w-[1400px] w-full mx-auto space-y-6">
          
          {/* VISTA 1: ESTADÍSTICAS REALES E INFORMES */}
          {vistaActiva === "Estadisticas" && (
            <div className="space-y-6">
              {/* Tarjetas de Métricas - Grid cambia de 1 columna a 3 dinámicamente */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
                <div className="bg-white border border-slate-200/80 p-5 md:p-6 rounded-2xl shadow-xs">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Cartera</p>
                  <h3 className="text-2xl md:text-3xl font-black text-slate-800 mt-1">{totalInmuebles}</h3>
                  <p className="text-[10px] text-slate-400 mt-2 font-medium">Inmuebles en la plataforma</p>
                </div>
                <div className="bg-white border border-slate-200/80 p-5 md:p-6 rounded-2xl shadow-xs">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider text-amber-600">Disponibles en Venta</p>
                  <h3 className="text-2xl md:text-3xl font-black text-amber-600 mt-1">{totalVenta}</h3>
                  <p className="text-[10px] text-slate-400 mt-2 font-medium">Propiedades para venta</p>
                </div>
                <div className="bg-white border border-slate-200/80 p-5 md:p-6 rounded-2xl shadow-xs">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider text-blue-600">Disponibles en Arriendo</p>
                  <h3 className="text-2xl md:text-3xl font-black text-blue-600 mt-1">{totalArriendo}</h3>
                  <p className="text-[10px] text-slate-400 mt-2 font-medium">Contratos activos</p>
                </div>
              </div>

              {/* Gráfico Analítico de Rendimiento */}
              <div className="bg-white border border-slate-200/80 p-5 md:p-6 rounded-2xl shadow-xs space-y-4">
                <h3 className="text-xs font-black text-slate-700 uppercase tracking-wider">Rendimiento Visual y Leads por Mes</h3>
                <div className="h-48 flex items-end justify-between gap-2 md:gap-4 pt-4 border-b border-slate-100">
                  <div className="w-full flex flex-col items-center gap-2">
                    <div className="w-full bg-slate-100 rounded-t-xl transition-all h-24 group relative hover:bg-blue-500">
                      <span className="absolute -top-7 left-1/2 -translate-x-1/2 text-[10px] font-bold bg-slate-900 text-white px-2 py-0.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md">120 visitas</span>
                    </div>
                    <span className="text-[10px] md:text-11px font-bold text-slate-400">Mar</span>
                  </div>
                  <div className="w-full flex flex-col items-center gap-2">
                    <div className="w-full bg-slate-100 rounded-t-xl transition-all h-32 group relative hover:bg-blue-500">
                      <span className="absolute -top-7 left-1/2 -translate-x-1/2 text-[10px] font-bold bg-slate-900 text-white px-2 py-0.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md">180 visitas</span>
                    </div>
                    <span className="text-[10px] md:text-11px font-bold text-slate-400">Abr</span>
                  </div>
                  <div className="w-full flex flex-col items-center gap-2">
                    <div className="w-full bg-blue-500 rounded-t-xl transition-all h-40 group relative">
                      <span className="absolute -top-7 left-1/2 -translate-x-1/2 text-[10px] font-bold bg-slate-900 text-white px-2 py-0.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md">290 visitas</span>
                    </div>
                    <span className="text-[10px] md:text-11px font-bold text-slate-700">Jun (Actual)</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* VISTA 2: FORMULARIO DE PUBLICACIÓN */}
          {vistaActiva === "Publicar" && (
            <form onSubmit={handlePublicar} className="space-y-6 bg-white p-4 md:p-8 rounded-2xl border border-slate-200/80 shadow-xs text-slate-700 max-w-4xl mx-auto">
              <div className="flex justify-center -mt-2 md:-mt-4 mb-2">
                <div className="bg-white border border-slate-100 shadow-2xs px-3 py-1 rounded-md text-[11px] md:text-xs text-slate-800 font-semibold flex items-center gap-1.5">
                  Ayuda especializada 24/7 <span className="text-[#0066e2] cursor-pointer">ⓘ</span>
                </div>
              </div>

              <div className="bg-[#f0f9ff] border border-[#bae6fd] p-3 md:p-4 rounded-xl flex items-start gap-3">
                <div className="w-5 h-5 bg-[#0284c7] text-white rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">i</div>
                <div>
                  <h4 className="text-xs font-bold text-[#0369a1]">Inmuebles prohibidos</h4>
                  <p className="text-[11px] text-[#075985] font-medium mt-0.5">
                    Recuerda que publicaciones de inmuebles nuevos o sobre planos están prohibidas.
                  </p>
                </div>
              </div>

              {/* Ubicación */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-bold text-[#0f172a]">
                  <span className="p-1.5 bg-slate-100 rounded-lg text-slate-500">📍</span>
                  <h3>Ubicación de tu inmueble</h3>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1.5">Dirección / punto referencia <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <span className="absolute left-4 top-3.5 text-slate-400">🔍</span>
                    <input type="text" name="direccion" value={nuevoInmueble.direccion} onChange={handleInputChange} placeholder="Ej: Caracas, Venezuela" className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-xs font-medium focus:outline-hidden focus:border-[#0066e2] transition-colors shadow-2xs" />
                  </div>
                </div>
                <div className="relative w-full h-44 bg-slate-100 rounded-xl overflow-hidden border border-slate-200 flex items-center justify-center">
                  <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#9ca3af_1px,transparent_1px)] [background-size:16px_16px] bg-slate-50"></div>
                  <div className="absolute bg-white px-3 py-1.5 rounded-lg shadow-md border border-slate-100 text-[10px] font-bold text-center z-10 mx-4">
                    <p className="text-slate-800">¿Te encuentras aquí?</p>
                    <p className="text-[#0066e2] text-[9px] font-medium cursor-pointer underline">Arrastra el pin para ubicar tu inmueble</p>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-white/90 px-1.5 py-0.5 rounded text-[9px] font-bold text-slate-400 border border-slate-200">Google</div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1.5">Seleccionar ubicación principal</label>
                  <div className="relative">
                    <span className="absolute left-4 top-3.5 text-slate-400">🔍</span>
                    <input type="text" name="ubicacionPrincipal" value={nuevoInmueble.ubicacionPrincipal} onChange={handleInputChange} placeholder="Buscar" className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-xs font-medium focus:outline-hidden focus:border-[#0066e2] transition-colors shadow-2xs" />
                  </div>
                </div>
              </div>

              <hr className="border-slate-100" />

              {/* Cuéntanos sobre tu inmueble */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-bold text-[#0f172a]">
                  <span className="p-1.5 bg-emerald-50 text-emerald-600 rounded-lg">🏠</span>
                  <h3>Cuéntanos sobre tu inmueble</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1.5">Tipo de oferta <span className="text-red-500">*</span></label>
                    <select name="tipoOferta" value={nuevoInmueble.tipoOferta} onChange={handleInputChange} className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs font-medium focus:outline-hidden focus:border-[#0066e2] text-slate-700 shadow-2xs">
                      <option value="">Seleccionar</option>
                      <option value="Venta">Venta</option>
                      <option value="Arriendo">Arriendo</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1.5">Tipo de inmueble <span className="text-red-500">*</span></label>
                    <select name="tipoInmueble" value={nuevoInmueble.tipoInmueble} onChange={handleInputChange} className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs font-medium focus:outline-hidden focus:border-[#0066e2] text-slate-700 shadow-2xs">
                      <option value="">Seleccionar</option>
                      <option value="Apartamento">Apartamento</option>
                      <option value="Casa">Casa</option>
                      <option value="Oficina">Oficina</option>
                    </select>
                  </div>
                </div>
              </div>

              <hr className="border-slate-100" />

              {/* Tamaño y espacios */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-bold text-[#0f172a]">
                  <span className="p-1.5 bg-amber-50 text-amber-600 rounded-lg">📦</span>
                  <h3>Tamaño y espacios</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1.5">Área construída (m²)</label>
                    <input type="number" name="areaConstruida" value={nuevoInmueble.areaConstruida} onChange={handleInputChange} placeholder="Ingresa un valor" className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs font-medium focus:outline-hidden focus:border-[#0066e2] shadow-2xs" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1.5">Área privada (m²)</label>
                    <input type="number" name="areaPrivada" value={nuevoInmueble.areaPrivada} onChange={handleInputChange} placeholder="Ingresa un valor" className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs font-medium focus:outline-hidden focus:border-[#0066e2] shadow-2xs" />
                  </div>
                </div>
                <div className="pt-2">
                  <label className="block text-xs font-medium text-slate-600 mb-1.5">Descripción de tu inmueble <span className="text-red-500">*</span></label>
                  <textarea name="descripcion" value={nuevoInmueble.descripcion} onChange={handleInputChange} maxLength="3500" placeholder="Describe los mejores acabados..." rows="3" className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs font-medium focus:outline-hidden focus:border-[#0066e2] resize-none shadow-2xs"></textarea>
                </div>
              </div>

              <hr className="border-slate-100" />

              {/* Media y Contacto */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm font-bold text-[#0f172a]">
                    <span className="p-1.5 bg-orange-50 text-orange-600 rounded-lg">⭐</span>
                    <h3>Contenido Fotográfico</h3>
                  </div>
                  <div className="border-2 border-dashed border-blue-200 hover:border-[#0066e2] bg-white p-5 rounded-xl text-center relative transition-all cursor-pointer">
                    <input type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                    <p className="text-xs font-bold text-slate-800">Sube o arrastra fotos aquí</p>
                  </div>
                  {nuevoInmueble.image && (
                    <div className="mt-2 flex items-center gap-2 p-2 bg-slate-50 border border-slate-200 rounded-lg max-w-xs">
                      <img src={nuevoInmueble.image} alt="Prev" className="w-10 h-8 object-cover rounded" />
                      <span className="text-[10px] font-bold text-emerald-600">✔ Foto lista</span>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm font-bold text-[#0f172a]">
                    <span className="p-1.5 bg-sky-50 text-sky-600 rounded-lg">👁</span>
                    <h3>Contacto Comercial</h3>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-xl px-3 py-2 shadow-2xs select-none">
                      <div className="w-5 h-3.5 flex flex-col border border-slate-200 rounded-xs overflow-hidden shrink-0">
                        <div className="h-1.5 bg-amber-400"></div>
                        <div className="h-1 bg-blue-600"></div>
                        <div className="h-1 bg-red-600"></div>
                      </div>
                      <span className="text-xs text-slate-400">▼</span>
                    </div>
                    <input type="text" name="telefono" value={nuevoInmueble.telefono} onChange={handleInputChange} className="flex-1 bg-white border border-slate-200 rounded-xl p-3 text-xs font-semibold focus:outline-hidden focus:border-[#0066e2] shadow-2xs" />
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button type="submit" className="w-full sm:w-auto bg-[#0066e2] hover:bg-blue-700 text-white font-bold text-xs px-6 py-2.5 rounded-lg transition-colors cursor-pointer shadow-xs">
                  Publicar Propiedad
                </button>
              </div>
            </form>
          )}

          {/* VISTA 3: ADMINISTRACIÓN DE INVENTARIO */}
          {vistaActiva === "Administrar" && (
            <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
              <div className="p-4 md:p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <h3 className="text-xs font-black text-[#0f172a] uppercase tracking-wider">
                  📂 Catálogo Interno ({totalInmuebles})
                </h3>
              </div>
              
              {totalInmuebles === 0 ? (
                <div className="text-center py-16 text-slate-400">
                  <p className="text-2xl mb-2">🏢</p>
                  <p className="text-xs font-medium">No hay registros de inmuebles.</p>
                </div>
              ) : (
                /* Contenedor con overflow horizontal para que las tablas no rompan el diseño en smartphones */
                <div className="overflow-x-auto invisible-scrollbar">
                  <table className="w-full text-left text-xs border-collapse min-w-[600px]">
                    <thead>
                      <tr className="bg-slate-50 text-slate-400 uppercase font-bold border-b border-slate-200/60 text-[10px] tracking-wider">
                        <th className="p-4">Inmueble</th>
                        <th className="p-4">Ubicación</th>
                        <th className="p-4">Precio</th>
                        <th className="p-4">Modalidad</th>
                        <th className="p-4 text-center">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                      {listaInmuebles.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="p-4 flex items-center gap-3">
                            <img src={item.image} alt="" className="w-12 h-9 object-cover rounded-lg border border-slate-100 shrink-0" />
                            <div>
                              <p className="text-slate-900 font-bold uppercase text-[11px] truncate max-w-[180px]">{item.title}</p>
                              <p className="text-[10px] text-slate-400 font-medium">{item.area} m²</p>
                            </div>
                          </td>
                          <td className="p-4 text-slate-500 font-medium truncate max-w-[150px]">{item.location}</td>
                          <td className="p-4 text-slate-900 font-bold">${item.price?.toLocaleString('es-CO')}</td>
                          <td className="p-4">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${item.tipo === 'Venta' ? 'bg-amber-50 text-amber-700' : 'bg-blue-50 text-blue-700'}`}>
                              {item.tipo}
                            </span>
                          </td>
                          <td className="p-4 text-center">
                            <button onClick={() => handleEliminarInmueble(item.id)} className="text-red-500 hover:bg-red-50 px-2 py-1 rounded-lg transition-colors font-bold text-[11px]">
                              🗑 Eliminar
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* VISTA 4: BANDEJA DE MENSAJES */}
          {vistaActiva === "Mensajes" && (
            <div className="space-y-4 max-w-4xl mx-auto">
              <h3 className="text-xs font-black text-slate-700 uppercase tracking-wider">Mensajes de Compradores</h3>
              <div className="space-y-4">
                {listaMensajes.map(msg => (
                  <div key={msg.id} className={`bg-white border p-4 md:p-6 rounded-2xl shadow-2xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4 ${!msg.leido ? 'border-l-4 border-l-[#0066e2] border-slate-200' : 'border-slate-200/80'}`}>
                    <div className="space-y-2 flex-1 w-full">
                      <div className="flex flex-wrap items-center gap-1.5 md:gap-2">
                        <span className="font-bold text-slate-900 text-xs md:text-sm">{msg.cliente}</span>
                        <span className="text-[9px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded font-medium">{msg.fecha}</span>
                        <span className="text-[9px] bg-blue-50 text-[#0066e2] px-1.5 py-0.5 rounded font-bold truncate max-w-[150px]">{msg.inmueble}</span>
                      </div>
                      <p className="text-xs text-slate-600 font-medium leading-relaxed">"{msg.mensaje}"</p>
                      <div className="text-[11px] text-slate-400 font-medium flex flex-wrap gap-x-4 gap-y-1 pt-1">
                        <span>📧 {msg.correo}</span>
                        <span>📞 {msg.telefono}</span>
                      </div>
                    </div>
                    <div className="shrink-0 w-full md:w-auto">
                      <a href={`https://wa.me/${msg.telefono}`} target="_blank" rel="noopener noreferrer" className="block text-center bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow-xs">
                        💬 WhatsApp
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* VISTA 5: PROPIEDADES DESTACADAS */}
          {vistaActiva === "Favoritos" && (
            <div className="space-y-4">
              <div>
                <h3 className="text-xs font-black text-slate-700 uppercase tracking-wider">🌟 Destacados Premium</h3>
                <p className="text-xs text-slate-400 font-medium mt-1">Propiedades con prioridad alta en búsquedas.</p>
              </div>
              
              {totalInmuebles === 0 ? (
                <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-400">
                  <p className="text-xs font-medium">No hay inmuebles destacados.</p>
                </div>
              ) : (
                /* Grid responsivo: 1 col en móviles, 2 en tablets, 3 en pantallas grandes */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 pt-2">
                  {listaInmuebles.slice(0, 3).map((item, idx) => (
                    <div key={idx} className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-2xs group">
                      <div className="relative overflow-hidden">
                        <img src={item.image} alt="" className="w-full h-40 md:h-44 object-cover" />
                        <span className="absolute top-3 left-3 bg-amber-400 text-slate-950 font-black text-[10px] px-2 py-0.5 rounded uppercase tracking-wider">
                          Destacado
                        </span>
                      </div>
                      <div className="p-4 md:p-5 space-y-3">
                        <div>
                          <h4 className="text-xs font-black text-slate-900 uppercase tracking-tight line-clamp-1">{item.title}</h4>
                          <p className="text-[11px] text-slate-400 font-semibold mt-0.5">📍 {item.location}</p>
                        </div>
                        <div className="flex justify-between items-center pt-3 border-t border-slate-100">
                          <span className="text-[10px] bg-blue-50 text-[#0066e2] font-extrabold px-2 py-0.5 rounded uppercase">{item.tipo}</span>
                          <span className="font-black text-[#002f6c] text-xs md:text-sm">${item.price?.toLocaleString('es-CO')}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>
      </main>
    </div>
  );
}

export default Dashboard;