function Navbar() {
  return (
    <nav className="bg-slate-950 border-b border-slate-800 sticky top-0 z-50 px-6 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        
        {/* LOGO SIMULADO (Estilo Finca Raíz, usando colores llamativos) */}
        <div className="flex items-center gap-2 cursor-pointer">
          <span className="text-2xl font-black text-amber-500 tracking-tight">
            Finca<span className="text-white bg-amber-500 px-1.5 py-0.5 rounded ml-1">React</span>
          </span>
        </div>

        {/* MENÚ CENTRAL (Opciones de búsqueda) */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a href="#" className="hover:text-amber-500 transition-colors border-b-2 border-amber-500 pb-1 text-white">Comprar</a>
          <a href="#" className="hover:text-amber-500 transition-colors pb-1">Arrendar</a>
          <a href="#" className="hover:text-amber-500 transition-colors pb-1">Proyectos Nuevos</a>
        </div>

        {/* BOTÓN DERECHO (Publicar - Acción principal) */}
        <div className="flex items-center gap-4">
          <button className="hidden sm:block text-sm font-medium text-slate-300 hover:text-white transition-colors">
            Iniciar Sesión
          </button>
          <button className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold text-sm px-4 py-2 rounded-lg transition-colors shadow-md shadow-amber-500/20">
            ➕ Publicar gratis
          </button>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;