import React from 'react';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="flex items-center justify-center gap-1 mt-12 py-4 text-slate-600 font-medium text-sm select-none">
      {/* Botón Anterior */}
      <button 
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="px-3 py-1.5 rounded-lg hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-transparent cursor-pointer transition-colors"
      >
        « Anterior
      </button>

      {/* Números de Página */}
      <button onClick={() => onPageChange(1)} className={`w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer transition-colors ${currentPage === 1 ? 'bg-[#0070e0] text-white font-bold' : 'hover:bg-slate-100'}`}>1</button>
      <button onClick={() => onPageChange(2)} className={`w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer transition-colors ${currentPage === 2 ? 'bg-[#0070e0] text-white font-bold' : 'hover:bg-slate-100'}`}>2</button>
      <button onClick={() => onPageChange(3)} className={`w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer transition-colors ${currentPage === 3 ? 'bg-[#0070e0] text-white font-bold' : 'hover:bg-slate-100'}`}>3</button>
      
      <span className="px-1 text-slate-400">...</span>
      
      <button onClick={() => onPageChange(totalPages)} className={`w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer transition-colors ${currentPage === totalPages ? 'bg-[#0070e0] text-white font-bold' : 'hover:bg-slate-100'}`}>{totalPages}</button>

      {/* Botón Siguiente */}
      <button 
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="px-3 py-1.5 rounded-lg hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-transparent cursor-pointer transition-colors"
      >
        Siguiente »
      </button>
    </div>
  );
}