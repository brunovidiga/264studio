import React from 'react';
import { motion } from 'framer-motion';

const skillLogos = [
  '/logos/skills/adbe.webp',
  '/logos/skills/adsg.webp',
  '/logos/skills/adsm.webp',
  '/logos/skills/claude.webp',
  '/logos/skills/gais.webp',
  '/logos/skills/gemini.webp',
  '/logos/skills/gpt.webp',
  '/logos/skills/man.webp',
];

export default function SkillsCarousel() {
  // Double the logos to ensure a seamless infinite loop
  const displayLogos = [...skillLogos, ...skillLogos, ...skillLogos];

  return (
    <section className="py-12 bg-black overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 mb-8">
        <p className="text-zinc-500 text-center text-xs uppercase tracking-[0.3em] font-medium opacity-80">
          Tecnologias & Ferramentas
        </p>
      </div>

      <div className="relative flex overflow-hidden">
        <motion.div
          className="flex whitespace-nowrap gap-12 md:gap-20 items-center"
          animate={{
            x: ["0%", "-33.33%"],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 20,
              ease: "linear",
            },
          }}
        >
          {displayLogos.map((logo, index) => (
            <div
              key={index}
              className="flex-shrink-0 flex items-center justify-center grayscale brightness-200 opacity-30 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
            >
              <img
                src={logo}
                alt={`Skill Logo ${index}`}
                className="h-6 md:h-8 w-auto min-w-[60px] md:min-w-[100px] object-contain"
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
