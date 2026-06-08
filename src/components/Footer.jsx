import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-slate-200 mt-16 pt-12 pb-6 px-6 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* GRILLA PRINCIPAL DE ENLACES (Siete columnas adaptadas a Venezuela) */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-8 text-slate-800 text-[13px] pb-10 border-b border-slate-100">
          
          {/* Columna 1: Apartamentos en Venta */}
          <div className="flex flex-col gap-2">
            <h4 className="font-bold text-slate-900 text-[14px] mb-1">Apartamentos en Venta</h4>
            <Link to="/" className="hover:text-[#0070e0] text-slate-600">Apartamentos en Caracas</Link>
            <Link to="/" className="hover:text-[#0070e0] text-slate-600">Apartamentos en Chacao</Link>
            <Link to="/" className="hover:text-[#0070e0] text-slate-600">Apartamentos en Valencia</Link>
            <Link to="/" className="text-[#0070e0] font-semibold mt-1">Más</Link>
          </div>

          {/* Columna 2: Apartamentos en Arriendo */}
          <div className="flex flex-col gap-2">
            <h4 className="font-bold text-slate-900 text-[14px] mb-1">Apartamentos en Alquiler</h4>
            <Link to="/" className="hover:text-[#0070e0] text-slate-600">Alquiler en Las Mercedes</Link>
            <Link to="/" className="hover:text-[#0070e0] text-slate-600">Alquiler en Maracaibo</Link>
            <Link to="/" className="hover:text-[#0070e0] text-slate-600">Alquiler en Lechería</Link>
            <Link to="/" className="text-[#0070e0] font-semibold mt-1">Más</Link>
          </div>

          {/* Columna 3: Casas en Venta */}
          <div className="flex flex-col gap-2">
            <h4 className="font-bold text-slate-900 text-[14px] mb-1">Casas en Venta</h4>
            <Link to="/" className="hover:text-[#0070e0] text-slate-600">Casas en Baruta</Link>
            <Link to="/" className="hover:text-[#0070e0] text-slate-600">Casas en El Hatillo</Link>
            <Link to="/" className="hover:text-[#0070e0] text-slate-600">Casas en Margarita</Link>
            <Link to="/" className="text-[#0070e0] font-semibold mt-1">Más</Link>
          </div>

          {/* Columna 4: Proyectos */}
          <div className="flex flex-col gap-2">
            <h4 className="font-bold text-slate-900 text-[14px] mb-1">Proyectos de Vivienda</h4>
            <Link to="/" className="hover:text-[#0070e0] text-slate-600">Nuevos Desarrollos Caracas</Link>
            <Link to="/" className="hover:text-[#0070e0] text-slate-600">Proyectos en Lechería</Link>
            <Link to="/" className="hover:text-[#0070e0] text-slate-600">Urb. Cerradas Valencia</Link>
            <Link to="/" className="text-[#0070e0] font-semibold mt-1">Más</Link>
          </div>

          {/* Columna 5: Alianzas Inmobiliarias en Venezuela */}
          <div className="flex flex-col gap-2">
            <h4 className="font-bold text-slate-900 text-[14px] mb-1">Inmobiliarias Aliadas</h4>
            <span className="text-slate-500 cursor-default">Zentrum Venezuela</span>
            <span className="text-slate-500 cursor-default">Century 21 VE</span>
            <span className="text-slate-500 cursor-default">Rent-A-House</span>
            <span className="text-slate-500 cursor-default">Región Capital Pro</span>
            <Link to="/" className="text-[#0070e0] font-semibold mt-1">Más</Link>
          </div>

          {/* Columna 6: Síguenos */}
          <div className="flex flex-col gap-2.5">
            <h4 className="font-bold text-slate-900 text-[14px] mb-1">Síguenos</h4>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-slate-600 hover:text-[#0070e0]">
              <span className="text-[14px]">📷</span> Instagram
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-slate-600 hover:text-[#0070e0]">
              <span className="text-[14px]">🎬</span> TikTok
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-slate-600 hover:text-[#0070e0]">
              <span className="text-[14px]">📘</span> Facebook
            </a>
          </div>

          {/* Columna 7: Legal / Corporativo */}
          <div className="flex flex-col gap-2">
            <h4 className="font-bold text-slate-900 text-[14px] mb-1">Acerca de nosotros</h4>
            <Link to="/" className="hover:text-[#0070e0] text-slate-600">Preguntas Frecuentes</Link>
            <Link to="/" className="hover:text-[#0070e0] text-slate-600">Aviso Legal</Link>
            <Link to="/" className="hover:text-[#0070e0] text-slate-600">Términos y Condiciones</Link>
            <Link to="/" className="hover:text-[#0070e0] text-slate-600">Políticas de datos</Link>
            <Link to="/" className="hover:text-[#0070e0] text-slate-600">Nosotros</Link>
          </div>

        </div>

        {/* SECCIÓN INFERIOR DE CRÉDITOS Y LOGO */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-6 text-xs text-slate-400 gap-4">
          <div className="flex items-center gap-1">
            <span className="text-lg font-black text-[#0070e0] tracking-tight">
              Zentrum<span className="text-[#fca311]">.</span>
            </span>
            <span className="text-[9px] text-[#0070e0] font-bold align-super mr-2">®</span>
            <span>© 2026 Todos los derechos reservados.</span>
          </div>
          <div className="flex gap-4">
            <span className="hover:underline cursor-pointer">Política de cookies</span>
            <span className="hover:underline cursor-pointer">Recomendaciones de seguridad</span>
          </div>
        </div>

      </div>
    </footer>
  );
}