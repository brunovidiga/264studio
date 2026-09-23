import React from 'react';
import { motion } from 'framer-motion';
import brunoImg from '../assets/bruno-vidal.jpg';

export default function CreatorSection() {
  return (
    <section className="py-24 bg-black overflow-hidden relative">
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Image Column - Left */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="flex-1 relative group"
          >
            <div className="relative rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl">
              <img 
                src={brunoImg} 
                alt="Bruno Vidal - Criador da 264 Studio" 
                className="w-full h-auto object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
            </div>
            
            {/* Creative Tag */}
            <div className="absolute -bottom-6 -right-6 bg-[#b7ab98] text-black px-8 py-4 rounded-xl shadow-xl transform rotate-3 group-hover:rotate-0 transition-transform">
              <p className="text-xs uppercase tracking-widest font-bold">Inovação & Estratégia</p>
            </div>

            {/* Accent Blur */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#b7ab98]/10 blur-[80px] rounded-full pointer-events-none" />
          </motion.div>

          {/* Content Column - Right */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex-1"
          >
            <div className="space-y-8">
              <div>
                <h2 
                  className="text-[#b7ab98] text-sm uppercase tracking-[0.3em] font-medium mb-6 flex items-center gap-4"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  <span className="w-12 h-px bg-[#b7ab98]/30"></span>
                  SOBRE BRUNO VIDAL
                </h2>
                <h3 
                  className="text-2xl md:text-3xl font-light text-white leading-tight"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  Criador da 264 Studio
                </h3>
              </div>

              <div className="space-y-6 text-zinc-400 font-light leading-relaxed text-lg">
                <p>
                  Passei os 20 anos da minha carreira trabalhando ao lado de grandes pessoas criativas dentro da comunicação e publicidade.
                </p>
                <p>
                  Hoje, continuo conhecendo pessoas incríveis que estão mudando o mercado, trazendo capacidades de inovação com <span className="text-white">Design Thinking, Inteligência Artificial, Branding, Marketing Digital</span> e muito mais.
                </p>
                <p>
                  Ao longo do caminho ganhei profunda experiência em marketing de produtos, análise de mercado, branding e comunicação corporativa.
                </p>
                <p className="text-zinc-300">
                  Atualmente, sou responsável pela <span className="text-[#cf6701]">264 Studio</span>. Nosso trabalho envolve estudos e pesquisas constantes para apoiar empresas a superarem seus próprios limites e atingirem os melhores resultados.
                </p>
              </div>

              {/* Founder Quote/Detail */}
              <div className="pt-8 border-t border-white/5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full border border-[#b7ab98]/30 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-[#cf6701] animate-pulse" />
                  </div>
                  <p className="text-xs text-[#b7ab98] uppercase tracking-[0.2em]">Ideias que constroem futuro</p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
