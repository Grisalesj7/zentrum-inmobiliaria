function PropertyCard({ title, price, location, beds, baths, image }) {
  return (
    <div className="bg-slate-800 rounded-xl overflow-hidden shadow-lg border border-slate-700 hover:scale-105 transition-transform duration-300">
      <img 
        src={image || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=500&q=80"} 
        alt={title} 
        className="w-full h-48 object-cover"
      />
      <div className="p-5">
        <span className="bg-amber-500/10 text-amber-500 text-xs font-semibold px-2.5 py-1 rounded">
          En Venta
        </span>
        <h3 className="text-xl font-bold text-white mt-2 truncate">{title}</h3>
        <p className="text-slate-400 text-sm mt-1">📍 {location}</p>
        
        <div className="flex items-center gap-4 mt-4 text-slate-300 text-sm border-t border-slate-700 pt-4">
          <span>🛏️ {beds} Hab</span>
          <span>🛁 {baths} Baños</span>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-2xl font-black text-amber-500">
            ${price.toLocaleString()}
          </span>
          <button className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold py-1.5 px-4 rounded-lg text-sm transition-colors">
            Ver Detalles
          </button>
        </div>
      </div>
    </div>
  );
}

// ⚠️ ESTA ES LA LÍNEA CLAVE QUE EVITA EL ERROR DE EXPORTACIÓN DEFAULT:
export default PropertyCard;