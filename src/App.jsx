import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Dashboard from "./views/Dashboard";
import HomeClean from "./views/HomeClean";
import VentaInmuebles from "./views/VentaInmuebles";
import ArriendoInmuebles from "./views/ArriendoInmuebles";

// Datos de prueba iniciales estables para la demo
const inmueblesIniciales = [
  {
    id: 1,
    title: "APARTAMENTO PREMIUM CON ACABADOS DE LUJO",
    price: 450000000,
    location: "Medellín, El Poblado",
    beds: 3,
    baths: 2,
    area: 120,
    tipo: "Venta",
    tipoInmueble: "Apartamento",
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=600&q=80",
    esVis: false,
    descripcion: "Excelente ubicación con alta valorización. Cuenta con acabados modernos, iluminación natural óptima y cercanía a zonas comerciales."
  },
  {
    id: 2,
    title: "CASA CAMPESTRE EN LLANOGRANDE",
    price: 1200000000,
    location: "Rionegro, Antioquia",
    beds: 4,
    baths: 4,
    area: 320,
    tipo: "Venta",
    tipoInmueble: "Casa",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80",
    esVis: false,
    descripcion: "Hermosa casa campestre con acabados de lujo, amplias zonas verdes y deck con vista panorámica."
  }
];

function App() {
  // Estado de sesión activa para pruebas
  const [usuarioLogueado, setUsuarioLogueado] = useState({
    name: "Susana",
    email: "susana@zentrum.com",
    avatar: "SU",
    role: "admin"
  });

  // Navegación: "inicio", "venta", "arriendo", "dashboard"
  const [vistaActual, setVistaActual] = useState("inicio");
  const [favoritos, setFavoritos] = useState([]);
  
  // Estado único y global de las propiedades
  const [propiedades, setPropiedades] = useState(inmueblesIniciales);

  // Renderizado dinámico blindado
  const renderVista = () => {
    // Objeto con todas las combinaciones de propiedades posibles para evitar fallos de destructuración
    const propsComunes = {
      propiedades: propiedades,
      setPropiedades: setPropiedades,
      properties: propiedades,
      setProperties: setPropiedades,
      inmuebles: propiedades,
      setInmuebles: setPropiedades,
      vistaActual: vistaActual,
      setVistaActual: setVistaActual,
      fontVista: setVistaActual, // Por si acaso se llama fontVista en tus otros archivos
      usuarioLogueado: usuarioLogueado,
      setUsuarioLogueado: setUsuarioLogueado,
      favoritos: favoritos,
      setFavoritos: setFavoritos
    };

    switch (vistaActual) {
      case "dashboard":
        return usuarioLogueado ? (
          <Dashboard {...propsComunes} />
        ) : (
          <HomeClean {...propsComunes} />
        );
      case "venta":
        return <VentaInmuebles {...propsComunes} />;
      case "arriendo":
        return <ArriendoInmuebles {...propsComunes} />;
      case "inicio":
      default:
        return <HomeClean {...propsComunes} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Barra de navegación superior */}
      <Navbar 
        usuarioLogueado={usuarioLogueado} 
        setUsuarioLogueado={setUsuarioLogueado}
        vistaActual={vistaActual}
        setVistaActual={setVistaActual}
        favoritos={favoritos}
      />

      {/* Renderizado de la pantalla */}
      <main className="flex-grow relative z-10">
        {renderVista()}
      </main>
    </div>
  );
}

export default App;