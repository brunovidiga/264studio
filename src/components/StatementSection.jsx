import React from 'react';
import { motion } from 'framer-motion';

export default function StatementSection() {
  return (
    <section id="sobre" className="pt-12 pb-12 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center md:text-left"
        >
          <h2 
            className="text-white leading-[1.2] tracking-tight"
            style={{ 
              fontFamily: "'Poppins', sans-serif",
              fontSize: '48px',
              fontWeight: 300
            }}
          >
            Insynk Studio é um laboratório criativo que combina{' '}
            <span style={{ color: '#B7AB98' }}>Design Thinking e Inteligência Artificial </span>
            para transformar comunicação em ativo estratégico.
          </h2>
        </motion.div>
      </div>
    </section>
  );
}
