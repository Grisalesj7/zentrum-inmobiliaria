import React, { useState } from "react";
import AuthModal from "./AuthModal";

function Navbar({ usuarioLogueado, setUsuarioLogueado, vistaActual, setVistaActual, favoritos }) {
  const [modalAbierto, setModalAbierto] = useState(false);

  // Manejador seguro para cambiar de vista
  const handleNavegacion = (vista) => {
    if (typeof setVistaActual === "function") {
      setVistaActual(vista);
    }
  };

  // Manejador seguro para cerrar sesión sin colgar la app
  const handleCerrarSesion = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (typeof setUsuarioLogueado === "function") {
      setUsuarioLogueado(null);
      if (typeof setVistaActual === "function") {
        setVistaActual("inicio");
      }
      alert("🔒 Sesión cerrada correctamente en la plataforma.");
    }
  };

  return (
    <>
      <header className="bg-[#002f6c] text-white px-6 py-4 flex items-center justify-between sticky top-0 z-50 shadow-md select-none">
        
        {/* Logo interactivo */}
        <div 
          onClick={() => handleNavegacion("inicio")} 
          className="flex items-center gap-2 cursor-pointer"
        >
          <span className="text-xl">🏢</span>
          <span className="font-black text-sm tracking-wider uppercase">Zentrum</span>
        </div>

        {/* Menú de Navegación */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-bold text-slate-200">
          <button 
            type="button"
            onClick={() => handleNavegacion("inicio")} 
            className={`cursor-pointer transition-colors ${vistaActual === "inicio" ? "text-amber-400 font-black" : "hover:text-amber-400"}`}
          >
            Inicio
          </button>
          <button 
            type="button"
            onClick={() => handleNavegacion("venta")} 
            className={`cursor-pointer transition-colors ${vistaActual === "venta" ? "text-amber-400 font-black" : "hover:text-amber-400"}`}
          >
            Venta
          </button>
          <button 
            type="button"
            onClick={() => handleNavegacion("arriendo")} 
            className={`cursor-pointer transition-colors ${vistaActual === "arriendo" ? "text-amber-400 font-black" : "hover:text-amber-400"}`}
          >
            Arriendo
          </button>
          <button type="button" className="hover:text-amber-400 transition-colors cursor-pointer">
            Vivienda VIS
          </button>
        </nav>

        {/* Lado Derecho: Favoritos y Autenticación */}
        <div className="flex items-center gap-4">
          
          {/* Contador de Favoritos */}
          <div className="relative cursor-pointer flex items-center justify-center p-1">
            <span className="text-sm">❤️</span>
            <span className="absolute -top-1 -right-1.5 bg-rose-500 text-white font-black text-[8px] w-4 h-4 rounded-full flex items-center justify-center border border-[#002f6c]">
              {favoritos?.length || 0}
            </span>
          </div>

          {/* Renderizado condicional según sesión */}
          {usuarioLogueado ? (
            <div className="flex items-center gap-3 bg-[#001d42] px-3 py-1.5 rounded-xl border border-white/10">
              <div className="w-7 h-7 bg-[#0070e0] text-white font-black text-[11px] rounded-full flex items-center justify-center">
                {usuarioLogueado.avatar || "SU"}
              </div>
              <div className="hidden sm:block text-left max-w-[100px]">
                <p className="text-[10px] font-black text-white truncate">{usuarioLogueado.name || "Susana"}</p>
                <p className="text-[8px] text-slate-400 font-bold truncate">Asesor Conectado</p>
              </div>
              
              <button 
                type="button"
                onClick={() => handleNavegacion("dashboard")}
                className={`text-[10px] font-black px-3 py-1.5 rounded-lg uppercase tracking-wider transition-all cursor-pointer ${
                  vistaActual === "dashboard" 
                    ? "bg-amber-500 text-[#002f6c]" 
                    : "bg-[#0070e0] text-white hover:bg-[#005bb8]"
                }`}
              >
                Panel Admin
              </button>

              <button 
                type="button"
                onClick={handleCerrarSesion}
                title="Cerrar Sesión"
                className="text-slate-400 hover:text-rose-400 text-xs font-bold pl-1 cursor-pointer p-1 transition-colors"
              >
                Fin 🚪
              </button>
            </div>
          ) : (
            <button 
              type="button"
              onClick={() => setModalAbierto(true)}
              className="bg-[#0070e0] hover:bg-[#005bb8] text-white text-[10px] font-black px-4 py-2 rounded-lg uppercase tracking-wider transition-all cursor-pointer shadow-xs border border-white/10"
            >
              🔐 Iniciar Sesión
            </button>
          )}

        </div>
      </header>

      <AuthModal 
        isOpen={modalAbierto} 
        onClose={() => setModalAbierto(false)} 
        onLogin={setUsuarioLogueado}
      />
    </>
  );
}

export default Navbar;