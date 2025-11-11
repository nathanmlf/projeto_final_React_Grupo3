import React from "react";
import Header from "../../components/Header/Header";

function Home() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div
        className="absolute inset-0 bg-gray-800 bg-cover bg-center -z-10"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1445205170230-053b8a164a02?q=80&w=1976&auto=format&fit=crop')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>

      <Header />

      <main className="relative z-10 flex flex-col items-center justify-center h-full text-center text-[#F4F4F4] p-4">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-shadow-lg mb-6">
            Bem-vindo à nossa Loja
          </h1>
          <p className="text-lg md:text-2xl text-[#F4F4F4]/90 mb-8 max-w-xl mx-auto">
            Descubra as últimas tendências da moda e encontre o seu estilo
            perfeito.
          </p>
          <a
            href="#"
            className="inline-block bg-[#1D546C] text-[#F4F4F4] font-bold px-10 py-4 rounded-full text-lg uppercase tracking-wider hover:bg-[#1A3D64] hover:scale-105 transition-all duration-300"
          >
            Explorar Coleção
          </a>
        </div>
      </main>
    </div>
  );
}

export default Home;
