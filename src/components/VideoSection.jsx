import React from 'react';
import { motion } from 'framer-motion';
import videoSrc from '../assets/oficial.mp4';

export default function VideoSection() {
  return (
    <section className="relative pt-0 pb-0 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,255,204,0.1)] border border-white/5"
        >
          {/* Glass Overlay Effect */}
          <div className="absolute inset-0 z-10 pointer-events-none ring-1 ring-inset ring-white/10 rounded-3xl" />
          
          <div className="aspect-video w-full bg-zinc-900 flex items-center justify-center relative overflow-hidden">
            {/* Bolder Fallback Gradient if video fails */}
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-[#cf6701]/5 to-purple-500/10 animate-pulse" />

            <video 
              autoPlay 
              muted 
              loop 
              playsInline
              className="w-full h-full object-cover z-10"
              onCanPlay={(e) => e.currentTarget.style.opacity = "1"}
            >
              <source src={videoSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </motion.div>
      </div>

      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#cf6701]/5 blur-[120px] rounded-full pointer-events-none -z-10" />
    </section>
  );
}
