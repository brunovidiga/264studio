import React from 'react';
import { motion } from 'framer-motion';
import grndImage2 from '../assets/grnd2.webp';

export default function BudgetCTA() {
  return (
    <section className="py-20 bg-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-[3rem] overflow-hidden bg-zinc-950 border border-white/5">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0">
            <img 
              src={grndImage2} 
              alt="Soluções Insynk Studio" 
              className="w-full h-full object-cover object-top opacity-50"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-transparent" />
          </div>

          <div className="relative z-10 px-8 py-16 md:px-16 md:py-24 max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 
                className="text-[#cf6701] text-sm uppercase tracking-[0.3em] font-medium mb-6 flex items-center gap-4"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                <span className="w-12 h-px bg-[#cf6701]/30"></span>
                SOLUÇÕES SOB MEDIDA
              </h2>
              
              <h3 
                className="text-3xl md:text-5xl lg:text-5xl font-normal text-white leading-[1.2] mb-8"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Independente do seu orçamento, temos <span className="text-[#cf6701]">soluções personalizadas</span> para seu projeto.
              </h3>
              
              <p className="text-zinc-300 text-lg md:text-xl font-light leading-relaxed mb-10 border-l-2 border-[#cf6701]/40 pl-6">
                Velocidade e precisão aplicadas estrategicamente para gerar resultados, não importa o tamanho do desafio.
              </p>

              <div className="flex flex-wrap gap-4">
                 <div className="px-6 py-3 rounded-full bg-zinc-900/80 border border-white/5 backdrop-blur-md text-zinc-400 text-sm uppercase tracking-widest font-medium">
                    Velocidade
                 </div>
                 <div className="px-6 py-3 rounded-full bg-zinc-900/80 border border-white/5 backdrop-blur-md text-zinc-400 text-sm uppercase tracking-widest font-medium">
                    Precisão
                 </div>
                 <div className="px-6 py-3 rounded-full bg-zinc-900/80 border border-white/5 backdrop-blur-md text-zinc-400 text-sm uppercase tracking-widest font-medium">
                    Personalização
                 </div>
              </div>
            </motion.div>
          </div>

          {/* Decorative Corner Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#cf6701]/10 blur-[100px] rounded-full pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
