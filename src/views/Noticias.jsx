import React from 'react';
import { Link } from 'react-router-dom';

export default function Noticias() {
  const guias = [
    {
      id: 1,
      title: "Cómo tasar tu propiedad en el mercado actual",
      desc: "Descubre los factores clave para fijar un precio competitivo sin perder margen de ganancia.",
      tag: "Finanzas"
    },
    {
      id: 2,
      title: "5 elementos de lujo que aumentan el valor de un PH",
      desc: "Desde acabados minimalistas hasta automatización. Qué busca el comprador premium hoy.",
      tag: "Tendencias"
    }
  ];

  return (
    <div className="min-h-[calc(100vh-65px)] bg-slate-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Link to="/" className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 text-xs font-bold shadow-xs">
            ‹
          </Link>
          <h1 className="text-xl font-black text-slate-800 tracking-tight">📰 GUÍAS Y ACTUALIDAD INMOBILIARIA</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {guias.map(guia => (
            <div key={guia.id} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
              <span className="text-[10px] font-extrabold bg-blue-50 text-[#0070e0] border border-blue-100 px-2 py-0.5 rounded-md uppercase tracking-wider">
                {guia.tag}
              </span>
              <h3 className="text-sm font-bold text-slate-800 mt-3 mb-1">{guia.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{guia.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}