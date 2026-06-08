import React from 'react';
// Importar los componentes de Swiper React
import { Swiper, SwiperSlide } from 'swiper/react';
// Importar los módulos necesarios de Swiper
import { Navigation, Pagination } from 'swiper/modules';

// Importar los estilos globales de Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function UltimosIngresos() {
  // Array de inmuebles corregido con imágenes reales provisionales
  const inmuebles = [
    {
      id: 1,
      precio: "$ 3.000.000.000",
      ubicacion: "Cascajo arriba, Marinilla",
      area: "50000 m²",
      tipo: "Lote En Venta En Cascajo Arriba...",
      imagen: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 2,
      precio: "$ 2.550.000",
      ubicacion: "Sur, Cali",
      area: "75 m²",
      tipo: "Apartamento En Arriendo En Val...",
      imagen: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 3,
      precio: "$ 445.000.000",
      ubicacion: "San jose, Sabaneta",
      area: "62 m²",
      tipo: "Apartamento En Venta En San...",
      imagen: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 4,
      precio: "$ 1.300.000.000",
      ubicacion: "Ub el trebol, Mosquera",
      area: "93 m²",
      tipo: "Apartamento En Venta...",
      imagen: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80"
    }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-[#0070e0] mb-6 text-center lg:text-left tracking-tight">
        Últimos Ingresos
      </h2>

      <Swiper
        // Activar los módulos de navegación y paginación
        modules={[Navigation, Pagination]}
        spaceBetween={20} // Espacio en píxeles entre tarjetas
        slidesPerView={1} // Por defecto 1 tarjeta en pantallas pequeñas (móviles)
        navigation={true} // Activa las flechas interactivas (< y >)
        pagination={{ clickable: true }} // Puntitos interactivos abajo
        breakpoints={{
          // Configuraciones responsivas según el ancho de pantalla
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
        }}
        className="mySwiper !pb-10" // Padding abajo para que los puntitos no pisen las tarjetas
      >
        {inmuebles.map((inmueble) => (
          <SwiperSlide key={inmueble.id}>
            {/* Tarjeta del Inmueble basada en tu diseño */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300 relative h-full flex flex-col justify-between">
              
              <div className="relative">
                {/* Botón de favoritos (Corazón) */}
                <button className="absolute top-3 right-3 bg-black/40 text-white p-2 rounded-full hover:bg-black/60 transition-colors z-10 cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                  </svg> {/* 🚀 CORREGIDO: Se quitó el </</svg> roto */}
                </button>

                {/* Imagen del Inmueble */}
                <div className="h-48 overflow-hidden bg-gray-100">
                  <img 
                    src={inmueble.imagen} 
                    alt={inmueble.tipo}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>

              {/* Información */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-xl font-bold text-[#002F56]">{inmueble.precio}</p>
                  <p className="text-sm font-medium text-gray-700 mt-1">{inmueble.ubicacion}</p>
                  
                  {/* Icono de Área */}
                  <div className="flex items-center gap-1 text-gray-500 text-xs mt-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v16.5h16.5V3.75H3.75Zm16.5 4.5H3.75m16.5 4.5H3.75m16.5 4.5H3.75" />
                    </svg>
                    <span>{inmueble.area}</span>
                  </div>
                </div>

                <p className="text-xs text-gray-500 mt-3 line-clamp-1 border-t border-gray-100 pt-2">
                  {inmueble.tipo}
                </p>
              </div>

            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}