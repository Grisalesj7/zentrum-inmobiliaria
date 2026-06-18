import React, { useState } from "react";
import FilterBar from "../components/FilterBar";
import TarjetaInmuebleHorizontal from "../components/TarjetaInmuebleHorizontal";

function HomeWithMap({ propiedades, toggleFavorito, favoritos, onEnviarMensaje }) {
  const [buscar, setBuscar] = useState("");
  const [filtroTipo, setFiltroTipo] = useState("Todos");

  // Lógica de filtrado interna encapsulada
  const propiedadesFiltradas = propiedades.filter((p) => {
    const cumpleBusqueda = p.title.toLowerCase().includes(buscar.toLowerCase()) || p.location.toLowerCase().includes(buscar.toLowerCase());
    const cumpleTipo = filtroTipo === "Todos" || p.tipoInmueble === filtroTipo;
    return cumpleBusqueda && cumpleTipo;
  });

  return (
    <div className="max-w-[1600px] mx-auto px-6 py-6">
      
      {/* Componente del toolkit importado directamente */}
      <FilterBar 
        buscar={buscar} 
        setBuscar={setBuscar} 
        filtroTipo={filtroTipo} 
        setFiltroTipo={setFiltroTipo} 
      />

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 items-start mt-6">
        {/* Panel izquierdo: Lista de tarjetas */}
        <div className="xl:col-span-3 space-y-4">
          <div className="text-slate-400 font-bold text-xs uppercase tracking-wider">
            Resultados disponibles en la red: {propiedadesFiltradas.length} inmuebles
          </div>
          
          {propiedadesFiltradas.length === 0 ? (
            <div className="bg-white border text-center p-12 rounded-2xl text-slate-400 font-bold text-xs">
              No se encontraron propiedades bajo esos criterios.
            </div>
          ) : (
            propiedadesFiltradas.map((inmueble) => (
              <TarjetaInmuebleHorizontal 
                key={inmueble.id} 
                inmueble={inmueble}
                toggleFavorito={toggleFavorito}
                esFavorito={favoritos.some(f => f.id === inmueble.id)}
                onContactar={onEnviarMensaje}
              />
            ))
          )}
        </div>

        {/* Panel derecho fijo: Visor Cartográfico */}
        <div className="hidden xl:block xl:col-span-1 bg-slate-100 border rounded-2xl p-4 text-center sticky top-24 h-[calc(100vh-140px)] flex flex-col justify-center items-center">
          <span className="text-3xl animate-bounce">📍</span>
          <p className="text-xs font-black text-[#002f6c] mt-2">Visor Cartográfico</p>
          <p className="text-[10px] text-slate-400 max-w-[180px] font-semibold mt-1">
            Explorando clústeres en tiempo real en Medellín, CO.
          </p>
        </div>
      </div>
    </div>
  );
}

export default HomeWithMap;