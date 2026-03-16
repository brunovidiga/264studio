import React, { useState, useEffect } from 'react';
import logo from '../assets/logo.webp';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-4 bg-black/50 backdrop-blur-md border-b border-white/10' : 'py-6 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center gap-3 relative z-50">
           <img src={logo} alt="Insynk Studio" className="h-[60px] w-auto object-contain" />
        </div>

      </div>
    </header>
  );
}
