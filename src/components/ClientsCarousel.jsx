import React from 'react';
import { motion } from 'framer-motion';

const logos = [
  '/logos/aeroped2.png',
  '/logos/anima.png',
  '/logos/halli.png',
  '/logos/int.webp',
  '/logos/it.png',
  '/logos/log.png',
  '/logos/mocellin.png',
  '/logos/petrs.webp',
  '/logos/vale.png',
];

export default function ClientsCarousel() {
  // Double the logos to ensure a seamless infinite loop
  const displayLogos = [...logos, ...logos];

  return (
    <section className="pt-0 pb-12 bg-black overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 mb-8">
        <p className="text-zinc-500 text-center text-xs uppercase tracking-[0.3em] font-medium opacity-80">
          Empresas que confiam no nosso trabalho
        </p>
      </div>

      <div className="relative flex overflow-hidden">
        <motion.div
          className="flex whitespace-nowrap gap-16 md:gap-24 items-center"
          style={{ willChange: "transform" }}
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: window.innerWidth < 768 ? 35 : 25,
              ease: "linear",
            },
          }}
        >
          {displayLogos.map((logo, index) => (
            <div
              key={index}
              className="flex-shrink-0 flex items-center justify-center grayscale brightness-200 opacity-40 md:hover:grayscale-0 md:hover:opacity-100 transition-opacity duration-500"
            >
              <img
                src={logo}
                alt={`Client Logo ${index}`}
                className="h-8 md:h-12 w-auto min-w-[100px] md:min-w-[160px] object-contain"
              />
            </div>
          ))}
        </motion.div>

        {/* Gradient Overlays for smooth fading at edges */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black via-black/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black via-black/80 to-transparent z-10 pointer-events-none" />
      </div>
    </section>
  );
}
