import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

function Header() {
  const [menuStatus, setMenuStatus] = useState('closed');

  const links = [
    { nome: 'Home', href: '#' },
    { nome: 'Estoque', href: '#' },
    { nome: 'Login', href: '#' },
    { nome: 'Horários', href: '#' },
    { nome: 'Produtos', href: '#' },
  ];

  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      <div className="relative backdrop-blur-sm bg-[#0C2B4E]/50 text-[#F4F4F4]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <h1 className="text-3xl font-bold tracking-tighter text-[#F4F4F4]">
              TopSerra
            </h1>

            <nav className="hidden md:flex space-x-6 lg:space-x-8 items-center">
              {links.map((link) => (
                <a
                  key={link.nome}
                  href={link.href}
                  className="text-base font-medium text-[#F4F4F4]/80 hover:text-[#F4F4F4] transition-colors duration-200"
                >
                  {link.nome}
                </a>
              ))}
            </nav>

            <div className="flex items-center md:hidden">
              <button
                onClick={() => setMenuStatus('opened')}
                aria-label="Abrir menu"
                className="p-2 rounded-md text-[#F4F4F4]/80 hover:text-[#F4F4F4] hover:bg-white/10"
              >
                <Menu size={28} />
              </button>
            </div>
          </div>
        </div>

        {menuStatus === 'opened' && (
          <div className="absolute top-0 left-0 w-full min-h-screen bg-[#1A3D64] text-[#F4F4F4] p-4 z-50 md:hidden">
            <div className="flex justify-between items-center mb-10">
              <h1 className="text-3xl font-bold tracking-tighter text-[#F4F4F4]">
                TopSerra
              </h1>
              <button
                onClick={() => setMenuStatus('closed')}
                aria-label="Fechar menu"
                className="p-2 rounded-md text-[#F4F4F4]/80 hover:text-[#F4F4F4] hover:bg-white/10"
              >
                <X size={28} />
              </button>
            </div>
            <nav className="flex flex-col space-y-6">
              {links.map((link) => (
                <a
                  key={link.nome}
                  href={link.href}
                  className="text-2xl font-medium text-[#F4F4F4]/80 hover:text-[#F4F4F4]"
                  onClick={() => setMenuStatus('closed')}
                >
                  {link.nome}
                </a>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;