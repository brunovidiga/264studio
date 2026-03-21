import React from 'react';
import { motion } from 'framer-motion';
import mosaicImg from '../assets/projects-mosaic.png';

export default function ProjectsSection() {
  return (
    <section id="projetos" className="pt-0 pb-0 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Centralized Title */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center mb-4"
        >
          <h2 
            className="text-xs md:text-sm lg:text-base uppercase tracking-[0.3em] font-extralight text-zinc-300 leading-relaxed md:leading-loose"
            style={{ 
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 200
            }}
          >
            Estratégia, criação e ação<br />Marcas fortes são construídas todos os dias
          </h2>
        </motion.div>

        {/* Mosaic Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative hidden sm:flex justify-center"
        >
          <div className="relative w-full max-w-5xl rounded-[2rem] overflow-hidden">
            <img 
              src={mosaicImg} 
              alt="Mosaico de Projetos Insynk Studio" 
              className="w-full h-auto object-contain"
            />
            
            {/* Subtle glow behind mosaic */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
          </div>
          
          {/* Background Decorative Glows */}
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-3/4 h-3/4 bg-[#b7ab98]/5 blur-[120px] rounded-full pointer-events-none -z-10" />
        </motion.div>

      </div>
    </section>
  );
}
