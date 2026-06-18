import React, { useState } from 'react';
import BlogCard from './BlogCard';
import Pagination from './Pagination';

export default function BlogSection() {
  const [currentPage, setCurrentPage] = useState(1);

  // Simulación del arreglo de datos basado en tus imágenes
  const noticias = [
    {
      id: 1,
      title: "Vivir en Cali: Barrios, vivienda y mercado inmobiliario para elegir mejor",
      date: "7 junio, 2026",
      excerpt: "Esta gran ciudad de Colombia no llama la atención solo por su clima, la salsa o la fama de ser una ciudad alegre. Para quien...",
      image: "https://images.unsplash.com/photo-1595113316349-9fa4ee24f884?auto=format&fit=crop&w=600&q=80",
      slug: "vivir-en-cali-barrios-vivienda"
    },
    {
      id: 2,
      title: "Vivir en Medellín: Una ciudad clave para comprar, arrendar o invertir",
      date: "7 junio, 2026",
      excerpt: "Vivir en Medellín se ha convertido en una opción muy buscada por personas que quieren comprar vivienda, arrendar cerca de servicios o invertir en una...",
      image: "https://images.unsplash.com/photo-1604595261172-e5473484f331?auto=format&fit=crop&w=600&q=80",
      slug: "vivir-en-medellin-ciudad-clave"
    },
    {
      id: 3,
      title: "¿Cómo invertir y entender el mercado inmobiliario de la capital?",
      date: "6 junio, 2026",
      excerpt: "La ciudad de Bogotá suele ser la primera referencia cuando alguien piensa en comprar, arrendar o invertir en Colombia. No solo por ser la capital,",
      image: "https://images.unsplash.com/photo-1582234373456-e9df2592534b?auto=format&fit=crop&w=600&q=80",
      slug: "invertir-mercado-inmobiliario-bogota"
    },
    {
      id: 4,
      title: "El Palmar: Barrio familiar con historia propia en Manizales",
      date: "5 junio, 2026",
      excerpt: "1. ¿Dónde queda El Palmar? El Palmar es un sector residencial que se desarrolla geográficamente a través de al menos cuatro calles y tres carreras,",
      image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80",
      slug: "el-palmar-barrio-manizales"
    }
    // ... Puedes añadir los demás elementos de Manizales y Armenia aquí
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-12 bg-slate-50">
      {/* Encabezado Opcional de la Sección */}
      <div className="mb-8 border-b border-slate-200 pb-4">
        <h2 className="text-2xl font-black text-slate-800 tracking-tight">
          Guías y Actualidad Inmobiliaria
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Descubre el análisis de mercado de las principales ciudades colombianas.
        </p>
      </div>

      {/* Contenedor Grid (Cuadrícula responsiva de 3 columnas de tus imágenes) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {noticias.map((item) => (
          <BlogCard 
            key={item.id}
            title={item.title}
            date={item.date}
            excerpt={item.excerpt}
            image={item.image}
            slug={item.slug}
          />
        ))}
      </div>

      {/* Control de Paginación */}
      <Pagination 
        currentPage={currentPage} 
        totalPages={5} 
        onPageChange={(page) => setCurrentPage(page)} 
      />
    </section>
  );
}