import React from 'react';
import { motion } from 'framer-motion';
import aboutImg from '../assets/about-us.jpg';

export default function AboutSection() {
  return (
    <section className="py-24 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex-1 text-left"
          >
            <h2 
              className="text-3xl md:text-4xl font-semibold text-white mb-6 leading-tight"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Design Thinking para entender. <br />
              <span className="text-[#b7ab98]">IA para acelerar.</span>
            </h2>
            <p 
              className="text-zinc-400 text-lg leading-relaxed"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Com mais de 20 anos de experiência, nossa agência em Niterói une consultoria de branding, marketing de performance e tecnologia para impulsionar os resultados do seu negócio.
            </p>
          </motion.div>

          {/* Right Image */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex-1 relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(255,255,255,0.05)] border border-white/10 group">
              <img 
                src={aboutImg} 
                alt="Equipe Insynk Studio" 
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-transparent pointer-events-none" />
            </div>
            
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#b7ab98]/10 blur-3xl rounded-full pointer-events-none" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
