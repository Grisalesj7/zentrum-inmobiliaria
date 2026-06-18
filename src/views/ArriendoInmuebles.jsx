import React from "react";

function ArriendoInmuebles({ propiedades }) {
  const inmueblesArriendo = propiedades.filter(p => p.tipo === "Alquiler" || p.tipo === "Arriendo");

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-10 animate-fadeIn">
      <div className="mb-8">
        <h1 className="text-2xl font-black text-[#002f6c] tracking-tight">Propiedades en Arriendo</h1>
        <p className="text-slate-500 text-xs font-semibold">Encuentra apartamentos y casas para alquilar por meses o canon fijo.</p>
      </div>

      {inmueblesArriendo.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center text-slate-400 font-bold">
          No hay inmuebles listados en arriendo en este momento.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {inmueblesArriendo.map(casa => (
            <div key={casa.id} className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs">
              <img src={casa.image} alt={casa.title} className="w-full h-48 object-cover" />
              <div className="p-5">
                <h3 className="font-bold text-slate-800 text-base line-clamp-1">{casa.title}</h3>
                <p className="text-slate-400 text-xs my-2">📍 {casa.location}</p>
                <p className="text-xl font-black text-[#0070e0]">${casa.price.toLocaleString('es-CO')} COP /mes</p>
                <div className="mt-4 flex gap-4 text-xs font-bold text-slate-500 bg-slate-50 p-2.5 rounded-lg">
                  <span>🛏️ {casa.beds} Hab</span>
                  <span>🚿 {casa.baths} Baños</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ArriendoInmuebles;