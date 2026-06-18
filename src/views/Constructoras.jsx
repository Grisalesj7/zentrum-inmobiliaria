import React from "react";

function Constructoras() {
  const firmas = [
    { id: 1, name: "Constructora del Norte", proyectos: 12, region: "Antioquia" },
    { id: 2, name: "Bienes & Capitales", proyectos: 8, region: "Cundinamarca" },
    { id: 3, name: "Arquitectura Moderna SAS", proyectos: 15, region: "Costa Caribe" }
  ];

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-10 animate-fadeIn">
      <div className="mb-8">
        <h1 className="text-2xl font-black text-[#002f6c] tracking-tight">Constructoras Aliadas</h1>
        <p className="text-slate-500 text-xs font-semibold">Empresas líderes en desarrollo arquitectónico y proyectos sobre planos.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {firmas.map(firma => (
          <div key={firma.id} className="bg-white border border-slate-200 p-6 rounded-2xl shadow-2xs">
            <div className="h-12 w-12 bg-slate-100 rounded-lg flex items-center justify-center text-xl font-black text-[#0070e0] mb-4">
              🏗️
            </div>
            <h3 className="text-base font-bold text-slate-800">{firma.name}</h3>
            <p className="text-xs text-slate-400 font-medium mt-1">Sede principal: {firma.region}</p>
            <div className="mt-4 bg-blue-50 text-[#0070e0] font-extrabold text-[11px] px-3 py-1.5 rounded-md inline-block">
              {firma.proyectos} Proyectos Lanzados
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Constructoras;