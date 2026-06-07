import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import PropertyCard from "../components/PropertyCard";

function HomeWithMap({ 
  propiedadesFiltradas, 
  searchTerm, 
  setSearchTerm, 
  tipoOperacion, 
  setTipoOperacion,
  tipoInmueble,
  setTipoInmueble
}) {
  const posicionVenezuela = [8.0, -66.0];

  return (
    <div className="space-y-0">
      
      {/* SECTION HERO GIGANTE (IGUAL AL DE LA CAPTURA) */}
      <div 
        className="relative bg-cover bg-center h-[380px] flex flex-col items-center justify-center px-4"
        style={{ backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80')` }}
      >
        <h1 className="text-white text-3xl md:text-4xl font-extrabold mb-6 tracking-wide drop-shadow-md">
          Lo mejor de buscar es encontrar
        </h1>

        {/* CAJA DE BÚSQUEDA INTEGRADA */}
        <div className="w-full max-w-3xl bg-black/40 p-3 rounded-xl backdrop-blur-xs">
          
          {/* Selectores de Operación superiores */}
          <div className="flex gap-1 mb-2">
            {["Venta", "Arriendo", "Proyectos"].map((tipo) => (
              <button
                key={tipo}
                onClick={() => setTipoOperacion(tipo)}
                className={`px-6 py-2 text-xs font-bold rounded-t-md transition-all ${
                  tipoOperacion === tipo 
                    ? "bg-white text-slate-900" 
                    : "bg-black/50 text-white hover:bg-black/70"
                }`}
              >
                {tipo}
              </button>
            ))}
          </div>

          {/* Input Unificado con Filtros */}
          <div className="bg-white rounded-lg p-1 flex flex-col md:flex-row items-center gap-2 shadow-lg">
            
            {/* Tipo de Inmueble */}
            <select 
              value={tipoInmueble}
              onChange={(e) => setTipoInmueble(e.target.value)}
              className="w-full md:w-48 bg-transparent text-slate-700 text-xs font-medium px-3 py-2 outline-none border-b md:border-b-0 md:border-r border-slate-200 cursor-pointer"
            >
              <option value="Todos">Casa, Apartamento...</option>
              <option value="Apartamento">Apartamentos</option>
              <option value="Casa">Casas</option>
            </select>

            {/* Input de Ubicación */}
            <input
              type="text"
              placeholder="Busca por ubicación o palabra clave"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent text-slate-800 text-sm px-3 py-2 outline-none placeholder-slate-400"
            />

            {/* Botón de Lupa Azul */}
            <button className="w-full md:w-auto bg-[#007bf3] hover:bg-[#0062c4] text-white p-3 rounded-md flex items-center justify-center transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

          </div>
        </div>
      </div>

      {/* CUERPO ABAJO: MAPA INTERACTIVO + CATÁLOGO */}
      <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Mapa de Venezuela */}
        <div className="lg:col-span-1 h-[500px] rounded-xl overflow-hidden border border-slate-200 shadow-md z-10">
          <MapContainer center={posicionVenezuela} zoom={6} className="h-full w-full">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; OpenStreetMap'
            />
            {propiedadesFiltradas.map((casa) => (
              <Marker key={casa.id} position={casa.coordinates}>
                <Popup>
                  <div className="text-xs font-sans p-1 text-slate-900">
                    <p className="font-bold">{casa.title}</p>
                    <p className="text-[#0070e0] font-black">${casa.price.toLocaleString()} USD</p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* Catálogo en cuadrícula limpia */}
        <div className="lg:col-span-2">
          <div className="flex justify-between items-center mb-4 border-b border-slate-200 pb-2">
            <h2 className="text-xl font-bold text-slate-800">
              Inmuebles en {tipoOperacion} encontrados ({propiedadesFiltradas.length})
            </h2>
          </div>

          {propiedadesFiltradas.length === 0 && (
            <p className="text-center text-slate-400 py-16">
              No encontramos inmuebles que coincidan con tu criterio. 🔍
            </p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {propiedadesFiltradas.map((casa) => (
              <PropertyCard key={casa.id} title={casa.title} price={casa.price} location={casa.location} beds={casa.beds} baths={casa.baths} image={casa.image} />
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}

export default HomeWithMap;