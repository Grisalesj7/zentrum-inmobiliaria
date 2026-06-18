import React, { useState } from "react";
import { Link } from "react-router-dom";
import Beneficios from "../components/Beneficios";
import UltimosIngresos from "../components/CarruselIngresos";

function HomeClean({ propiedades }) {
  const [busqueda, setBusqueda] = useState("");

  return (
    <div className="animate-fadeIn">
      {/* HERO SECTION PRINCIPAL */}
      <div className="bg-gradient-to-r from-[#0056b3] to-[#007bf3] py-20 px-6 text-center text-white">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
            Encuentra tu próximo hogar en Venezuela
          </h1>
          <p className="text-lg text-blue-100 mb-8 font-medium">
            Descubre miles de opciones de venta y arriendo con la plataforma más rápida.
          </p>
          
          {/* BARRA DE BÚSQUEDA SIMPLIFICADA */}
          <div className="bg-white p-2 rounded-xl shadow-lg flex flex-col md:flex-row gap-2 max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Buscar por ciudad, zona o barrio..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="flex-1 px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-hidden text-sm font-medium"
            />
            <Link 
              to={`/proyectos?search=${busqueda}`}
              className="bg-[#fca311] hover:bg-[#e5940f] text-slate-950 font-bold px-8 py-3 rounded-lg transition-colors text-sm text-center"
            >
              Buscar Propiedades
            </Link>
          </div>
        </div>
      </div>

      {/* SECCIÓN DE CONTENIDO DESTACADO */}
      <div className="max-w-[1400px] mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-black text-[#002f6c] tracking-tight">Propiedades Destacadas</h2>
            <p className="text-slate-500 text-xs font-semibold mt-1">Los inmuebles más visitados de la semana</p>
          </div>
          <Link to="/proyectos" className="text-sm font-bold text-[#0070e0] hover:underline">
            Ver todo el catálogo →
          </Link>
        </div>

        {/* GRILLA DE PROPIEDADES EN EL INICIO */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {propiedades.slice(0, 3).map((casa) => (
            <div key={casa.id} className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-md transition-all">
              <div className="relative">
                <img src={casa.image} alt={casa.title} className="w-full h-48 object-cover" />
                <span className="absolute top-3 left-3 bg-[#0070e0] text-white font-extrabold text-[10px] px-2.5 py-1 rounded-md uppercase tracking-wider">
                  {casa.tipo}
                </span>
              </div>
              <div className="p-5">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">{casa.tipoInmueble}</span>
                <h3 className="font-bold text-slate-800 text-base mt-0.5 mb-2 line-clamp-1">{casa.title}</h3>
                <p className="text-slate-400 text-xs font-medium mb-4">📍 {casa.location}</p>
                <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                  <span className="text-lg font-black text-[#002f6c]">${casa.price.toLocaleString('es-CO')} COP</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomeClean;