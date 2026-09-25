import React from 'react';
import logo from '../assets/logo.webp';

export default function Footer() {
  return (
    <footer className="bg-black py-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center gap-8">
          
          {/* Logo */}
          <div className="opacity-80 hover:opacity-100 transition-opacity duration-300">
            <img src={logo} alt="264 Studio" className="h-[50px] w-auto object-contain" />
          </div>

          {/* Copyright */}
          <div className="text-center">
            <p className="text-zinc-500 text-xs tracking-[0.2em] uppercase">
              © 2026 264 Studio | Studio Criativo em Niterói. Todos os direitos reservados.
            </p>
          </div>

          {/* Tagline/Small Note */}
          <div className="w-12 h-px bg-[#fa6851]/30"></div>
          
        </div>
      </div>
    </footer>
  );
}
