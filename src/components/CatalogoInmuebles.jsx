import React, { useState, useMemo } from 'react';
import TarjetaInmuebleHorizontal from '../components/TarjetaInmuebleHorizontal';

export default function CatalogoInmuebles({ propiedades = [], favoritos = [], setFavoritos }) {
  const [filtroTipo, setFiltroTipo] = useState('Todos'); 
  const [ordenarPor, setOrdenarPor] = useState('popularidad');

  // Alternar el estado de favoritos
  const toggleFavorito = (id) => {
    if (favoritos.includes(id)) {
      setFavoritos(favoritos.filter(favId => favId !== id));
    } else {
      setFavoritos([...favoritos, id]);
    }
  };

  // Filtrado y ordenamiento eficiente
  const propiedadesFiltradas = useMemo(() => {
    let resultado = [...propiedades];

    if (filtroTipo !== 'Todos') {
      resultado = resultado.filter(p => p.tipo === filtroTipo);
    }

    if (ordenarPor === 'precio-menor') {
      resultado.sort((a, b) => a.price - b.price);
    } else if (ordenarPor === 'precio-mayor') {
      resultado.sort((a, b) => b.price - a.price);
    }
    
    return resultado;
  }, [propiedades, filtroTipo, ordenarPor]);

  return (
    <div className="min-h-screen bg-[#f8fafc] pt-4">
      <div className="max-w-[1400px] mx-auto px-4">
        
        {/* BANNER SUPERIOR INFORMATIVO */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-3xs">
          <div>
            <h1 className="text-lg font-black text-slate-900 tracking-tight">
              Inmuebles en Venta y Alquiler en Colombia
            </h1>
            <p className="text-xs text-slate-400 font-semibold mt-0.5">
              Estás en: <span className="text-[#0070e0]">Zentrum</span> &gt; {filtroTipo === 'Todos' ? 'Fincaraíz' : filtroTipo}
            </p>
            <p className="text-[11px] text-slate-500 font-bold mt-2">
              Mostrando <span className="text-slate-800 font-black">{propiedadesFiltradas.length}</span> de más de 400 resultados
            </p>
          </div>

          {/* CONTROLES FILTRADO */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
              {['Todos', 'Venta', 'Alquiler'].map((tipo) => (
                <button
                  key={tipo}
                  onClick={() => setFiltroTipo(tipo)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${filtroTipo === tipo ? 'bg-white text-[#0070e0] shadow-2xs' : 'text-slate-500 hover:text-slate-800'}`}
                >
                  {tipo}
                </button>
              ))}
            </div>

            <select
              value={ordenarPor}
              onChange={(e) => setOrdenarPor(e.target.value)}
              className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 focus:outline-hidden focus:border-[#0070e0] shadow-3xs"
            >
              <option value="popularidad">Popularidad</option>
              <option value="precio-menor">Precio: Menor a Mayor</option>
              <option value="precio-mayor">Precio: Mayor a Menor</option>
            </select>
          </div>
        </div>

        {/* DISPOSICIÓN: MAPA A LA IZQUIERDA Y TARJETAS A LA DERECHA */}
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          
          {/* SECCIÓN DEL MAPA (Estructura de image_0c21a0.jpg) */}
          <div className="w-full lg:w-[35%] h-[400px] lg:h-[calc(100vh-160px)] bg-slate-200 rounded-2xl overflow-hidden border border-slate-200 shadow-xs lg:sticky lg:top-6 flex flex-col justify-between relative">
            <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] bg-slate-100 flex items-center justify-center">
              <div className="text-center p-6 z-10">
                <span className="text-3xl block mb-2">🗺️</span>
                <p className="text-xs font-black text-slate-700 uppercase tracking-wide">Vista de Mapa Activa</p>
                <p className="text-[10px] text-slate-400 max-w-xs mt-1">Los pines e inmuebles se sincronizan dinámicamente según la ubicación.</p>
              </div>

              {/* Botones de zoom flotantes */}
              <div className="absolute top-3 left-3 bg-white border border-slate-200 rounded-lg shadow-xs flex flex-col overflow-hidden">
                <button className="w-8 h-8 font-black text-slate-700 hover:bg-slate-50 border-b border-slate-100 text-sm cursor-pointer">+</button>
                <button className="w-8 h-8 font-black text-slate-700 hover:bg-slate-50 text-sm cursor-pointer">-</button>
              </div>
            </div>
          </div>

          {/* LISTADO DE TARJETAS (Estructura horizontal de image_0c215d.jpg) */}
          <div className="flex-grow w-full lg:w-[65%] flex flex-col">
            {propiedadesFiltradas.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center shadow-3xs">
                <p className="text-xs text-slate-400 font-bold">No hay inmuebles disponibles con los filtros actuales.</p>
              </div>
            ) : (
              propiedadesFiltradas.map((inmueble) => (
                <TarjetaInmuebleHorizontal
                  key={inmueble.id}
                  inmueble={inmueble}
                  esFavorito={favoritos.includes(inmueble.id)}
                  onFavorito={toggleFavorito}
                />
              ))
            )}
          </div>

        </div>

      </div>
    </div>
  );
}