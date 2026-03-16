import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import hallibImg from '../assets/gallery-hallib.webp';
import mocelImg from '../assets/gallery-mocel.webp';
import aerImg from '../assets/gallery-aer.webp';
import valImg from '../assets/gallery-val.webp';

const galleryItems = [
  {
    id: 'hallib',
    title: "Motivação que vem de Dentro",
    subtitle: "Endomarketing & Comunicação",
    description: "Desenvolver a comunicação interna e dar apoio aos profissionais de Recursos Humanos também faz parte do trabalho.",
    image: hallibImg
  },
  {
    id: 'mocel',
    title: "Parceria e Novos sabores",
    subtitle: "Branding & Identidade",
    description: "Através de uma extensa pesquisa e várias descobertas, desenvolvemos um conceito de identidade que incorpora o estilo da família símbolo do churrasco.",
    image: mocelImg
  },
  {
    id: 'aer',
    title: "Explorar Novas Oportunidades",
    subtitle: "Branding & Posicionamento",
    description: "A necessidade de criar um novo serviço de saúde especializado passa, desde a criação da marca, até o posicionamento estratégico de marketing para virar referência e excelência na área.",
    image: aerImg
  },
  {
    id: 'val',
    title: "Venha Viver a Experiência",
    subtitle: "Marketing de Experiência",
    description: "Um legado único dentro do cenário da história do Rio de Janeiro - O Festival Vale do Café.",
    image: valImg
  }
];

export default function GallerySection() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  // Calculate the total horizontal movement based on window width and items
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <section 
      ref={containerRef} 
      className="relative h-[400vh] bg-black"
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        {/* Gallery Title Overlay - Optional static element */}
        <div className="absolute top-12 left-12 z-20 pointer-events-none hidden md:block">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-white text-4xl lg:text-6xl font-black opacity-10 tracking-tighter"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            PORTFÓLIO
          </motion.h2>
        </div>

        <motion.div style={{ x }} className="flex gap-4 px-12 md:px-24">
          {galleryItems.map((item, index) => (
            <GalleryCard key={item.id} item={item} index={index} />
          ))}
          
          {/* Ending Padding to allow full visibility of last item */}
          <div className="w-[10vw]" />
        </motion.div>

        {/* Scroll Progress Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-48 h-[2px] bg-white/10 overflow-hidden rounded-full">
          <motion.div 
            className="h-full bg-primary"
            style={{ scaleX: scrollYProgress, transformOrigin: "0%" }}
          />
        </div>
      </div>
    </section>
  );
}

function GalleryCard({ item, index }) {
  const cardRef = useRef(null);
  const { scrollXProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  // Parallax effect for the image inside the card
  const y = useTransform(scrollXProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div 
      ref={cardRef}
      className="group relative h-[65vh] w-[85vw] md:w-[60vw] lg:w-[45vw] overflow-hidden rounded-2xl bg-zinc-900 border border-white/5"
    >
      {/* Background with Parallax */}
      <motion.div 
        style={{ y, scale: 1.2 }}
        className="absolute inset-0 z-0 bg-cover bg-center"
        transition={{ duration: 0.5 }}
      >
        <img 
          src={item.image} 
          alt={item.title}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 opacity-60 group-hover:opacity-80"
        />
      </motion.div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />

      {/* Content */}
      <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 md:p-12 lg:p-16">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.2 }}
        >
          <span className="text-primary text-[10px] tracking-[0.4em] font-bold uppercase mb-2 block">
            {item.subtitle}
          </span>
          <h3 
            className="text-3xl md:text-5xl lg:text-5xl font-black text-white mb-4 leading-tight"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            {item.title}
          </h3>
          <p className="max-w-md text-zinc-300 text-sm md:text-base font-light leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
            {item.description}
          </p>
        </motion.div>
      </div>

      {/* Decorative Index */}
      <div className="absolute top-8 right-8 z-20 text-white/20 text-4xl lg:text-6xl font-black italic">
        {String(index + 1).padStart(2, '0')}
      </div>
    </div>
  );
}
