import React, { useState } from "react";
import { Link } from "react-router-dom";
import Beneficios from "../components/Beneficios";
import UltimosIngresos from "../components/CarruselIngresos";

function HomeClean({ propiedades = [] }) {
  const [busqueda, setBusqueda] = useState("");
  
  // --- ESTADO PARA CONTROLAR FAVORITOS ---
  const [favoritos, setFavoritos] = useState({});

  const toggleFavorito = (id) => {
    setFavoritos((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // --- ESTADOS PARA EL SIMULADOR DE CRÉDITO HIPOTECARIO ---
  const [valorPropiedad, setValorPropiedad] = useState(150000);
  const [cuotaInicialPct, setCuotaInicialPct] = useState(30); 
  const [plazoAnios, setPlazoAnios] = useState(20);
  const [tasaInteres, setTasaInteres] = useState(6.5); 

  // Cálculos matemáticos del simulador financiero
  const cuotaInicialDolares = (valorPropiedad * cuotaInicialPct) / 100;
  const montoPrestamo = valorPropiedad - cuotaInicialDolares;
  const tasaMensual = (tasaInteres / 100) / 12;
  const totalMeses = plazoAnios * 12;
  
  const cuotaMensualEstimada =
    tasaMensual > 0
      ? (montoPrestamo * tasaMensual * Math.pow(1 + tasaMensual, totalMeses)) /
        (Math.pow(1 + tasaMensual, totalMeses) - 1)
      : montoPrestamo / totalMeses;

  return (
    <div className="animate-fadeIn bg-slate-50 min-height-screen">
      
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

      {/* CONTENEDOR DE SECCIONES VERTICALES */}
      <div className="max-w-[1400px] mx-auto px-6 py-12 space-y-16">
        
        {/* SECCIÓN 1: PROPIEDADES DESTACADAS */}
        <section>
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-black text-[#002f6c] tracking-tight">Propiedades Destacadas</h2>
              <p className="text-slate-500 text-xs font-semibold mt-1">Los inmuebles más visitados de la semana</p>
            </div>
            <Link to="/proyectos" className="text-sm font-bold text-[#0070e0] hover:underline">
              Ver todo el catálogo →
            </Link>
          </div>

          {/* GRILLA DE PROPIEDADES (Muestra un máximo de 3) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {propiedades.slice(0, 3).map((casa) => (
              <div key={casa.id} className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-md transition-all relative group">
                
                {/* BOTÓN DE FAVORITOS INTERACTIVO */}
                <button
                  onClick={() => toggleFavorito(casa.id)}
                  className="absolute top-3 right-3 bg-white hover:scale-110 p-2 rounded-full shadow-md z-10 transition-transform focus:outline-hidden"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill={favoritos[casa.id] ? "#ef4444" : "none"}
                    stroke={favoritos[casa.id] ? "#ef4444" : "#94a3b8"}
                    strokeWidth="2"
                    className="w-5 h-5 transition-colors duration-200"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </button>

                {/* IMAGEN DE LA PROPIEDAD */}
                <div className="relative overflow-hidden">
                  <img src={casa.image} alt={casa.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                  <span className="absolute bottom-3 left-3 bg-[#0070e0] text-white font-extrabold text-[10px] px-2.5 py-1 rounded-md uppercase tracking-wider">
                    {casa.tipo}
                  </span>
                </div>

                {/* DETALLES */}
                <div className="p-5">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">{casa.tipoInmueble}</span>
                  <h3 className="font-bold text-slate-800 text-base mt-0.5 mb-2 line-clamp-1">{casa.title}</h3>
                  <p className="text-slate-400 text-xs font-medium mb-4">📍 {casa.location}</p>
                  
                  <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                    {/* PRECIO CAMBIADO A DÓLARES (USD) */}
                    <span className="text-lg font-black text-[#002f6c]">
                      ${casa.price.toLocaleString('en-US')} USD
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECCIÓN 2: SIMULADOR DE FINANCIAMIENTO (Alineado Verticalmente) */}
        <section className="bg-white rounded-2xl border border-slate-200/80 p-6 md:p-10 shadow-xs">
          <div className="mb-8">
            <h2 className="text-2xl font-black text-[#002f6c] tracking-tight">Encuentra la Financiación Ideal</h2>
            <p className="text-slate-500 text-xs font-semibold mt-1">Realiza una simulación rápida de tu crédito hipotecario en dólares</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            
            {/* Formulario de Controles */}
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm font-bold text-slate-700 mb-2">
                  <span>Valor de la propiedad</span>
                  <span className="text-[#0070e0]">${valorPropiedad.toLocaleString("en-US")} USD</span>
                </div>
                <input
                  type="range" min="10000" max="800000" step="5000"
                  value={valorPropiedad}
                  onChange={(e) => setValorPropiedad(Number(e.target.value))}
                  className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#0056b3]"
                />
              </div>

              <div>
                <div className="flex justify-between text-sm font-bold text-slate-700 mb-2">
                  <span>Cuota Inicial ({cuotaInicialPct}%)</span>
                  <span className="text-[#0070e0]">${cuotaInicialDolares.toLocaleString("en-US")} USD</span>
                </div>
                <input
                  type="range" min="10" max="70" step="5"
                  value={cuotaInicialPct}
                  onChange={(e) => setCuotaInicialPct(Number(e.target.value))}
                  className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#0056b3]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Plazo (Años)</label>
                  <select
                    value={plazoAnios}
                    onChange={(e) => setPlazoAnios(Number(e.target.value))}
                    className="w-full p-3 text-sm font-medium bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:outline-hidden"
                  >
                    <option value={10}>10 años</option>
                    <option value={15}>15 años</option>
                    <option value={20}>20 años</option>
                    <option value={30}>30 años</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Tasa de interés (%)</label>
                  <input
                    type="number" step="0.1"
                    value={tasaInteres}
                    onChange={(e) => setTasaInteres(Number(e.target.value))}
                    className="w-full p-3 text-sm font-medium bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:outline-hidden"
                  />
                </div>
              </div>
            </div>

            {/* Tarjeta de Resultados */}
            <div className="bg-slate-50 rounded-2xl p-6 md:p-8 border border-dashed border-slate-200 text-center flex flex-col justify-center h-full">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Cuota mensual estimada</span>
              <h3 className="text-3xl md:text-4xl font-black text-[#002f6c] my-3">
                ${cuotaMensualEstimada.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD
              </h3>
              <p className="text-xs text-slate-400 max-w-xs mx-auto font-medium">
                Monto del préstamo: ${montoPrestamo.toLocaleString("en-US")} USD a una tasa fija anual del {tasaInteres}%.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-2 justify-center">
                <button className="bg-[#0070e0] hover:bg-[#0056b3] text-white font-bold text-xs px-5 py-3 rounded-lg transition-colors">
                  Solicitar Asesoría
                </button>
              </div>
            </div>

          </div>
        </section>

      </div>
    </div>
  );
}

export default HomeClean;