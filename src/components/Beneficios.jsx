import React from 'react';

export default function Beneficios() {
  const caracteristicas = [
    {
      id: 1,
      titulo: "Publicación Directa",
      descripcion: "Sube y gestiona tus propiedades de forma rápida desde tu panel de control personalizado sin intermediarios.",
      // Icono de Edificio / Propiedad
      icono: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-white">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" />
        </svg>
      )
    },
    {
      id: 2,
      titulo: "Filtros Avanzados",
      descripcion: "Encuentra exactamente lo que buscas filtrando por precio máximo, tipo de operación o tipo de inmueble al instante.",
      // Icono de Buscador / Lupa
      icono: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-white">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
        </svg>
      )
    },
    {
      id: 3,
      titulo: "Mapa Interactivo",
      descripcion: "Visualiza la ubicación geográfica exacta de los inmuebles disponibles en el mapa interactivo integrado en tiempo real.",
      // Icono de Mapa / Ubicación
      icono: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-white">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.626 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.996 2.497c.317.158.69.158 1.006 0Z" />
        </svg>
      )
    }
  ];

  return (
    <div className="w-full bg-slate-50 border-t border-slate-200/60 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* TÍTULO CON IDENTIDAD ZENTRUM */}
        <h2 className="text-3xl font-black text-[#002F56] text-center mb-14 tracking-tight">
          Descubre cómo <span className="text-[#0070e0]">Zentrum</span> te ayuda
        </h2>

        {/* GRILLA DE TRES COLUMNAS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14">
          {caracteristicas.map((item) => (
            <div key={item.id} className="flex flex-col items-center text-center group">
              
              {/* Contenedor del Icono con silueta orgánica flotante simulando la captura */}
              <div className="w-24 h-24 bg-gradient-to-tr from-[#0052a3] to-[#007bf3] rounded-[40%_60%_70%_30%_/_40%_50%_60%_50%] flex items-center justify-center shadow-lg shadow-[#007bf3]/20 mb-6 transform group-hover:scale-105 transition-all duration-300 animate-pulse-slow">
                {item.icono}
              </div>

              {/* Títulos y Descripciones */}
              <h3 className="text-lg font-bold text-[#002F56] mb-3">
                {item.titulo}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed max-w-sm">
                {item.descripcion}
              </p>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}