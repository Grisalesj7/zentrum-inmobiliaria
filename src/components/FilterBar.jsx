import React from "react";

function FilterBar({ buscar, setBuscar, filtroTipo, setFiltroTipo }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row gap-4 items-center justify-between shadow-2xs">
      <div className="w-full sm:w-1/2 relative">
        <input 
          type="text" 
          placeholder="🔍 Buscar por sector, barrio o conjunto..." 
          value={buscar}
          onChange={(e) => setBuscar(e.target.value)}
          className="w-full border border-slate-200 rounded-xl p-3 text-xs font-medium focus:outline-[#0070e0] bg-slate-50/50"
        />
      </div>
      <div className="w-full sm:w-1/4">
        <select 
          value={filtroTipo} 
          onChange={(e) => setFiltroTipo(e.target.value)}
          className="w-full border border-slate-200 rounded-xl p-3 text-xs font-bold text-slate-700 bg-white cursor-pointer"
        >
          <option value="Todos">Cualquier Estructura</option>
          <option value="Apartamento">Apartamentos</option>
          <option value="Casa">Casas Fincas</option>
        </select>
      </div>
    </div>
  );
}

export default FilterBar;