import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomeWithMap from "./views/HomeWithMap";
import Dashboard from "./views/Dashboard";
import AuthModal from "./components/AuthModal";
import Beneficios from "./components/Beneficios"; 
import UltimosIngresos from "./components/UltimosIngresos"; 
import Footer from "./components/Footer"; // 🚀 Importamos tu nuevo footer adaptado a Venezuela

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [maxPrice, setMaxPrice] = useState(900000000); 
  const [tipoOperacion, setTipoOperacion] = useState("Venta");
  const [tipoInmueble, setTipoInmueble] = useState("Todos");

  // 👤 USUARIO LOGUEADO CON IDENTIDAD DE MARCA ZENTRUM
  const [usuarioLogueado, setUsuarioLogueado] = useState({ 
    name: "johao grisales",
    email: "johao@zentrum.com",
    phone: "+57 300 123 4567",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80"
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [propiedades, setPropiedades] = useState([
    {
      id: 1,
      title: "Apartamento de Lujo en Chacao",
      price: 85000,
      location: "Caracas, Chacao",
      beds: 3,
      baths: 2,
      tipo: "Venta",
      tipoInmueble: "Apartamento",
      coordinates: [10.4806, -66.9036],
      owner: "johao grisales",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80"
    }
  ]);

  const propiedadesFiltradas = propiedades.filter((casa) => {
    const coincideTexto = 
      casa.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      casa.location.toLowerCase().includes(searchTerm.toLowerCase());
    return coincideTexto && casa.price <= maxPrice && casa.tipo === tipoOperacion && (tipoInmueble === "Todos" || casa.tipoInmueble === tipoInmueble);
  });

  return (
    <Router>
      <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased flex flex-col justify-between">
        
        <div>
          {/* NAV SUPERIOR ZENTRUM */}
          <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 px-6 py-3 shadow-xs">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              
              {/* LOGO DE ZENTRUM INMOBILIARIA */}
              <Link to="/" className="flex items-center gap-1 cursor-pointer">
                <span className="text-2xl font-black text-[#0070e0] tracking-tight">
                  Zentrum<span className="text-[#fca311]">.</span>
                </span>
                <span className="text-[10px] text-[#0070e0] font-bold align-super">®</span>
              </Link>

              <div className="hidden lg:flex items-center gap-5 text-xs font-semibold text-slate-700">
                <Link to="/" className="hover:text-[#0070e0]">Proyectos de vivienda</Link>
                <button onClick={() => setTipoOperacion("Venta")} className="hover:text-[#0070e0] cursor-pointer">Venta</button>
                <button onClick={() => setTipoOperacion("Alquiler")} className="hover:text-[#0070e0] cursor-pointer">Alquiler</button>
              </div>

              <div className="flex items-center gap-4 relative">
                <Link 
                  to={usuarioLogueado ? "/dashboard" : "/"} 
                  onClick={() => !usuarioLogueado && setIsModalOpen(true)}
                  className="bg-[#007bf3] hover:bg-[#0062c4] text-white font-bold text-xs px-5 py-2.5 rounded-lg transition-colors shadow-xs"
                >
                  Publica tu propiedad
                </Link>

                {usuarioLogueado ? (
                  <div className="relative">
                    <button 
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="flex items-center gap-2 text-slate-700 text-xs font-semibold uppercase hover:text-[#0070e0] transition-colors cursor-pointer focus:outline-none"
                    >
                      <img src={usuarioLogueado.avatar} alt="Avatar" className="w-7 h-7 rounded-full border border-slate-200 object-cover" />
                      <span>{usuarioLogueado.name}</span>
                      <span className="text-[10px]">▼</span>
                    </button>

                    {isDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 py-1 z-50 animate-fade-in">
                        <Link to="/dashboard" onClick={() => setIsDropdownOpen(false)} className="block px-4 py-2.5 text-xs text-slate-700 hover:bg-slate-50 hover:text-[#0070e0] font-medium">
                          ⚙️ Mi Perfil y Ajustes
                        </Link>
                        <Link to="/dashboard" onClick={() => setIsDropdownOpen(false)} className="block px-4 py-2.5 text-xs text-slate-700 hover:bg-slate-50 hover:text-[#0070e0] font-medium border-b border-slate-100">
                          📊 Mis Propiedades
                        </Link>
                        <button onClick={() => { setUsuarioLogueado(null); setIsDropdownOpen(false); }} className="w-full text-left block px-4 py-2.5 text-xs text-rose-600 hover:bg-rose-50 font-bold">
                          🚪 Cerrar Sesión
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <button 
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-1 text-slate-700 hover:text-[#0070e0] text-xs font-bold transition-colors border border-slate-300 rounded-lg px-4 py-2 hover:border-[#007bf3] cursor-pointer"
                  >
                    <span>🔑 Iniciar Sesión</span>
                  </button>
                )}
              </div>

            </div>
          </nav>

          <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onLoginSuccess={(userData) => setUsuarioLogueado({ ...userData, avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80" })} />

          {/* CONTENEDOR DE RUTAS PRINCIPALES */}
          <Routes>
            <Route 
              path="/" 
              element={
                <>
                  {/* 1. Sección del buscador y el mapa */}
                  <HomeWithMap 
                    propiedadesFiltradas={propiedadesFiltradas} 
                    searchTerm={searchTerm} 
                    setSearchTerm={setSearchTerm} 
                    maxPrice={maxPrice} 
                    setMaxPrice={setMaxPrice} 
                    tipoOperacion={tipoOperacion} 
                    setTipoOperacion={setTipoOperacion} 
                    tipoInmueble={tipoInmueble} 
                    setTipoInmueble={setTipoInmueble} 
                  />
                  
                  {/* 2. Sección de Beneficios orgánicos de Zentrum */}
                  <Beneficios />
                  
                  {/* 3. Carrusel interactivo con los últimos ingresos */}
                  <div className="bg-white border-t border-slate-200 py-4">
                    <UltimosIngresos />
                  </div>
                </>
              } 
            />
            
            <Route path="/dashboard" element={<Dashboard propiedades={propiedades} setPropiedades={setPropiedades} usuarioLogueado={usuarioLogueado} setUsuarioLogueado={setUsuarioLogueado} />} />
          </Routes>
        </div>

        {/* 🚀 4. EL FOOTER GLOBAL ADAPTADO SE RENDERIZA AL FINAL DE LA RAÍZ */}
        <Footer />

      </div>
    </Router>
  );
}

export default App;