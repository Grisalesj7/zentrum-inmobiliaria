function FilterBar({ searchTerm, setSearchTerm, maxPrice, setMaxPrice }) {
  return (
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 mb-8 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Filtro por Texto */}
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-2">
            Buscar por nombre o ubicación
          </label>
          <input
            type="text"
            placeholder="Ej. Poblado, Laureles, Calasanz..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
          />
        </div>

        {/* Filtro por Precio Máximo */}
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-2">
            Precio Máximo: <span className="text-amber-500 font-bold">${Number(maxPrice).toLocaleString()} COP</span>
          </label>
          <input
            type="range"
            min="100000000"
            max="600000000"
            step="10000000"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full accent-amber-500 h-2 bg-slate-900 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-slate-500 mt-2">
            <span>$100M</span>
            <span>$600M</span>
          </div>
        </div>

      </div>
    </div>
  );
}

export default FilterBar;