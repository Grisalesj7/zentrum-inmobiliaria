import React, { useState } from 'react';

export default function TarjetaInmuebleHorizontal({ inmueble, onFavorito, esFavorito }) {
  const [currentImgIndex] = useState(1);
  const totalImages = 30; // Simulación del indicador de fotos de image_0c215d.jpg

  return (
    <div className="w-full bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-xs hover:shadow-md transition-all duration-300 mb-4">
      
      {/* --- CONTENEDOR DE LA IMAGEN (IZQUIERDA) --- */}
      <div className="relative w-full md:w-[35%] h-56 md:h-auto min-h-[220px] bg-slate-100 shrink-0">
        <img 
          src={inmueble.image || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80"} 
          alt={inmueble.title} 
          className="w-full h-full object-cover"
        />

        {/* Etiqueta Destacado */}
        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-[10px] font-black text-slate-700 px-2.5 py-1 rounded-full flex items-center gap-1 shadow-xs uppercase tracking-wider">
          <span className="text-amber-500">⭐</span> Destacado
        </div>

        {/* Botón de Favorito */}
        <button 
          onClick={() => onFavorito && onFavorito(inmueble.id)}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-xs flex items-center justify-center hover:bg-white text-sm shadow-xs transition-colors cursor-pointer"
        >
          {esFavorito ? '❤️' : '🤍'}
        </button>

        {/* Controles de navegación */}
        <button className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/80 flex items-center justify-center text-xs font-bold text-slate-700 hover:bg-white shadow-xs cursor-pointer">‹</button>
        <button className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/80 flex items-center justify-center text-xs font-bold text-slate-700 hover:bg-white shadow-xs cursor-pointer">›</button>

        {/* Indicador de fotos (Estilo 1/30) */}
        <div className="absolute bottom-3 left-3 bg-black/60 text-white text-[10px] font-bold px-2 py-0.5 rounded-md backdrop-blur-xs">
          {currentImgIndex} / {totalImages}
        </div>
      </div>

      {/* --- CONTENEDOR DE DETALLES (DERECHA) --- */}
      <div className="flex-grow flex flex-col justify-between">
        
        {/* Barra superior de la inmobiliaria */}
        <div className="bg-slate-100/70 px-4 py-2 flex justify-between items-center border-b border-slate-100">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">
            {inmueble.owner || "Zentrum Inmobiliaria"}
          </span>
          <div className="w-14 h-6 bg-slate-800 text-white text-[9px] font-black flex items-center justify-center rounded-xs tracking-wider uppercase">
            Zentrum
          </div>
        </div>

        {/* Datos técnicos */}
        <div className="p-4 flex-grow flex flex-col gap-1">
          <h3 className="text-lg font-black text-slate-900 tracking-tight">
            $ {(inmueble.price || 0).toLocaleString('es-CO')}
            <span className="text-[10px] font-bold text-slate-400 ml-1.5 uppercase">
              {inmueble.tipo === 'Alquiler' ? '/ Mes' : 'COP'}
            </span>
          </h3>

          <p className="text-xs font-bold text-slate-600">
            {inmueble.tipoInmueble || "Propiedad"} en {inmueble.location || "Colombia"}
          </p>

          {/* Características básicas */}
          <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 my-1.5 bg-slate-50 p-2 rounded-lg border border-slate-100 w-fit">
            <span className="flex items-center gap-1">🛏️ {inmueble.beds || 2} Tabs.</span>
            <span className="flex items-center gap-1">🚽 {inmueble.baths || 2} Baños</span>
            <span className="flex items-center gap-1">📐 {inmueble.area || "150"} m²</span>
          </div>

          <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wide mt-0.5">
            {inmueble.title}
          </h4>
          <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
            Excelente ubicación con alta valorización. Cuenta con acabados modernos, iluminación natural óptima y cercanía a zonas comerciales y de interés.
          </p>
        </div>

        {/* Botonera inferior de contacto directo */}
        <div className="p-4 pt-0 flex flex-wrap items-center gap-4">
          <button className="bg-[#0070e0] hover:bg-[#005cb8] text-white text-xs font-bold px-4 py-2 rounded-lg flex items-center gap-1.5 shadow-xs transition-all cursor-pointer">
            ✉️ Contactar
          </button>
          <button className="text-xs font-bold text-[#0070e0] hover:bg-slate-50 px-3 py-2 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer">
            📞 Llamar
          </button>
          <button className="text-xs font-bold text-emerald-600 hover:bg-emerald-50/50 px-3 py-2 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer">
            💬 WhatsApp
          </button>
        </div>

      </div>
    </div>
  );
}