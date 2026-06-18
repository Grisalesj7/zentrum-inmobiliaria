import React from 'react';

export default function BlogCard({ image, title, date, excerpt, slug }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col group h-full">
      {/* Contenedor de la Imagen */}
      <div className="overflow-hidden aspect-video relative">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Contenido de la Tarjeta */}
      <div className="p-5 flex flex-col flex-grow justify-between">
        <div>
          {/* Título */}
          <h3 className="text-lg font-bold text-slate-800 leading-snug group-hover:text-[#0070e0] transition-colors line-clamp-2">
            {title}
          </h3>
          
          {/* Fecha */}
          <span className="text-[11px] text-slate-400 block mt-1.5 mb-3 font-medium">
            {date}
          </span>
          
          {/* Extracto / Descripción corta */}
          <p className="text-xs text-slate-500 leading-relaxed line-clamp-3 mb-4">
            {excerpt}
          </p>
        </div>

        {/* Enlace de Acción */}
        <a 
          href={`/blog/${slug}`}
          className="text-xs font-bold text-slate-800 hover:text-[#0070e0] tracking-wider uppercase flex items-center gap-1.5 mt-auto transition-colors cursor-pointer"
        >
          Leer nota completa <span className="text-[10px] group-hover:translate-x-1 transition-transform">»</span>
        </a>
      </div>
    </div>
  );
}