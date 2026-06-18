import React from "react";

function Inmobiliarias() {
  const agencias = [
    { id: 1, name: "Zentrum Inmobiliaria SAS", properties: 142, logo: "🏢", phone: "+57 300 123 4567" },
    { id: 2, name: "Alianza Inmobiliaria", properties: 89, logo: "🏘️", phone: "+57 311 987 6543" },
    { id: 3, name: "Torres Propiedades", properties: 54, logo: "🏗️", phone: "+57 315 444 2211" }
  ];

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-10 animate-fadeIn">
      <div className="mb-8">
        <h1 className="text-2xl font-black text-[#002f6c] tracking-tight">Directorio de Inmobiliarias</h1>
        <p className="text-slate-500 text-xs font-semibold">Encuentra y contacta a las mejores agencias del país autorizadas en nuestra red.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {agencias.map(item => (
          <div key={item.id} className="bg-white border border-slate-200 p-6 rounded-2xl shadow-2xs hover:border-[#0070e0] transition-colors">
            <div className="text-4xl mb-4">{item.logo}</div>
            <h3 className="text-lg font-bold text-slate-800 mb-1">{item.name}</h3>
            <p className="text-xs text-[#0070e0] font-bold mb-4">{item.properties} Propiedades Activas</p>
            <div className="text-xs text-slate-500 font-medium">📞 Teléfono: {item.phone}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Inmobiliarias;