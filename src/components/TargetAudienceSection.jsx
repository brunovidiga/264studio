import React from 'react';
import { motion } from 'framer-motion';
import targetImg from '../assets/target-audience.jpg';
import { ArrowRight } from 'lucide-react';

export default function TargetAudienceSection() {
  const points = [
    "Empresas que precisam transformar comunicação em resultado mensurável.",
    "Marcas em fase de lançamento ou reposicionamento.",
    "Negócios que querem integrar IA na sua estratégia para acelerar seu posicionamento.",
    "Times de marketing que precisam de parceiros sêniores."
  ];

  return (
    <section className="mt-12 sm:-mt-16 pb-24 bg-black overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Left Image */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex-1 relative"
          >
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-[0_0_50px_rgba(224,114,64,0.1)] border border-white/5">
              <img 
                src={targetImg} 
                alt="Target Audience" 
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-transparent to-transparent pointer-events-none" />
            </div>
            
            {/* Background Glow */}
            <div className="absolute -top-12 -left-12 w-64 h-64 bg-[#e07240]/10 blur-[100px] rounded-full pointer-events-none" />
          </motion.div>

          {/* Right Content */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex-1"
          >
            <h2 
              className="text-[#b7ab98] text-sm uppercase tracking-[0.3em] font-medium mb-12 flex items-center gap-4"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              <span className="w-12 h-px bg-[#b7ab98]/30"></span>
              Para quem é a 264 Studio
            </h2>

            <div className="space-y-6">
              {points.map((point, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4 group"
                >
                  <div className="mt-1.5 w-5 h-5 rounded-full bg-[#b7ab98]/10 border border-[#b7ab98]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#b7ab98]/20 transition-colors">
                    <ArrowRight className="w-3 h-3 text-[#b7ab98]" />
                  </div>
                  <p 
                    className="text-zinc-300 text-lg leading-relaxed font-light group-hover:text-white transition-colors"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    {point}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
