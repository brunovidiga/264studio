import React from 'react';
import { motion } from 'framer-motion';
import workflowImg from '../assets/how-we-work.jpg';

export default function WorkflowSection() {
  return (
    <section className="py-24 bg-black overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex-1 order-2 lg:order-1"
          >
            <h2 
              className="text-[#b7ab98] text-sm uppercase tracking-[0.3em] font-medium mb-12 flex items-center gap-4"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              <span className="w-12 h-px bg-[#b7ab98]/30"></span>
              Como pensamos e trabalhamos
            </h2>

            <div className="space-y-8">
              <p 
                className="text-zinc-100 text-xl md:text-2xl font-light leading-relaxed"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Aplicamos Design Thinking para entender o contexto, o público e o negócio em profundidade, mapeando problemas reais antes de propor soluções.
              </p>
              
              <p 
                className="text-zinc-400 text-lg font-light leading-relaxed"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                A Inteligência Artificial entra para acelerar análise, ideação, testes e otimizações, sem substituir a direção estratégica humana.
              </p>

              <div className="pt-4">
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <p 
                    className="text-zinc-300 text-base md:text-lg font-light italic leading-relaxed"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    "Trabalhamos em ciclos curtos: planejar, prototipar, testar, medir e evoluir continuamente suas iniciativas de comunicação."
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex-1 order-1 lg:order-2 relative"
          >
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-[0_0_50px_rgba(183,171,152,0.1)] border border-white/5">
              <img 
                src={workflowImg} 
                alt="Workflow e Tecnologia" 
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-bl from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>
            
            {/* Background Glow */}
            <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-[#b7ab98]/5 blur-[100px] rounded-full pointer-events-none" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
