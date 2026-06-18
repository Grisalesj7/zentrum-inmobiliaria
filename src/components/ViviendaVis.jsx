import React, { useState } from "react";

function ViviendaVis({ propiedades, onEnviarMensaje }) {
  // Estados para el modal de contacto rápido de cada inmueble
  const [modalAbierto, setModalAbierto] = useState(false);
  const [propiedadSeleccionada, setPropiedadSeleccionada] = useState(null);
  
  // Campos del formulario de contacto
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState("");
  const [mensajeTexto, setMensajeTexto] = useState("");

  const abrirModalContacto = (propiedad) => {
    setPropiedadSeleccionada(propiedad);
    setMensajeTexto(`Hola, estoy interesado en el proyecto VIS: ${propiedad.title}. Me gustaría recibir más información.`);
    setModalAbierto(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Ejecuta la función global de App.jsx pasando los datos capturados
    onEnviarMensaje({
      sender: nombre,
      phone: telefono,
      email: correo,
      property: propiedadSeleccionada.title,
      text: mensajeTexto
    });

    // Limpiar campos y cerrar modal
    setNombre("");
    setTelefono("");
    setCorreo("");
    setModalAbierto(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-10 text-center md:text-left">
        <span className="text-xs font-black bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full uppercase tracking-wider">
          Subsidios del Gobierno Disponibles
        </span>
        <h1 className="text-3xl font-black text-[#002f6c] mt-2">Vivienda de Interés Social (VIS)</h1>
        <p className="text-slate-500 text-sm mt-1 font-medium">Proyectos seleccionados cuyo valor no supera los 135 o 150 SMMLV.</p>
      </div>

      {/* GRILLA DE TARJETAS DINÁMICAS */}
      {propiedades.length === 0 ? (
        <div className="bg-white border border-slate-200 p-8 rounded-xl text-center text-slate-400 font-bold text-sm">
          No hay proyectos VIS cargados en este momento desde el Dashboard.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {propiedades.map((p) => (
            <div key={p.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="relative">
                  <img src={p.image} alt={p.title} className="w-full h-48 object-cover" />
                  <span className="absolute top-3 left-3 bg-emerald-600 text-white font-black text-[10px] px-2.5 py-1 rounded-md uppercase tracking-wider shadow-sm">
                    Aplica Subsidio
                  </span>
                </div>
                <div className="p-5 space-y-2">
                  <h3 className="font-bold text-slate-800 text-base line-clamp-1">{p.title}</h3>
                  <p className="text-xs text-slate-400 font-bold flex items-center gap-1">📍 {p.location}</p>
                  <div className="pt-2 text-lg font-black text-emerald-600">
                    ${p.price.toLocaleString("es-CO")} <span className="text-[10px] text-slate-400 font-normal">COP</span>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button 
                  onClick={() => abrirModalContacto(p)}
                  className="w-full bg-[#002f6c] hover:bg-[#001e46] text-white font-bold text-xs py-2.5 rounded-xl transition-colors cursor-pointer"
                >
                  Solicitar Asesoría de Subsidio
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL EMERGENTE DE CONTACTO */}
      {modalAbierto && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 border border-slate-200 shadow-xl">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="font-black text-sm text-[#002f6c]">Postularme a este Proyecto</h3>
              <button onClick={() => setModalAbierto(false)} className="text-slate-400 hover:text-slate-600 font-black cursor-pointer">✕</button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-3">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Nombre Completo</label>
                <input required type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} className="w-full border border-slate-200 rounded-lg p-2 text-xs font-medium" placeholder="Tu nombre" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Teléfono Móvil</label>
                  <input required type="tel" value={telefono} onChange={(e) => setTelefono(e.target.value)} className="w-full border border-slate-200 rounded-lg p-2 text-xs font-medium" placeholder="Ej: 3001234567" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Correo Electrónico</label>
                  <input required type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} className="w-full border border-slate-200 rounded-lg p-2 text-xs font-medium" placeholder="tu@correo.com" />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Mensaje para Zentrum</label>
                <textarea rows="3" value={mensajeTexto} onChange={(e) => setMensajeTexto(e.target.value)} className="w-full border border-slate-200 rounded-lg p-2 text-xs font-medium resize-none" />
              </div>

              <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs py-2.5 rounded-xl uppercase tracking-wider pt-3 transition-colors cursor-pointer">
                Enviar al Panel de Control
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ViviendaVis;