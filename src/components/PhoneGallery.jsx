import React from 'react';
import { motion } from 'framer-motion';

import img1 from '../assets/new-projects/halliburton2.webp';
import img2 from '../assets/new-projects/lymcello.webp';
import img3 from '../assets/new-projects/moc.webp';
import img4 from '../assets/new-projects/pr.webp';
import img5 from '../assets/new-projects/qg12.webp';
import img6 from '../assets/new-projects/vlc.webp';

const projects = [img1, img2, img3, img4, img5, img6];

export default function PhoneGallery() {
  return (
    <section id="projetos-v2" className="py-24 bg-black relative">
       {/* Background Decoration */}
       <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#b7ab98]/5 blur-[140px] rounded-full pointer-events-none" />
       
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
           viewport={{ once: true }}
        >
          <h2 
            className="text-[#b7ab98] text-sm uppercase tracking-[0.3em] font-medium mb-4 flex items-center gap-4"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            <span className="w-12 h-px bg-[#b7ab98]/30"></span>
            Projetos
          </h2>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 lg:gap-y-24 gap-x-12">
          {projects.map((img, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: (idx % 3) * 0.15 }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <IPhoneMockup image={img} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function IPhoneMockup({ image }) {
  return (
    <div className="relative group cursor-pointer">
      {/* Phone Body with Silver/Titanium Finish */}
      <div className="relative w-[280px] sm:w-[300px] aspect-[9/19.5] bg-[#d1d1d6] rounded-[3rem] p-[3px] border-[1px] border-white/20 shadow-2xl transition-all duration-700 overflow-hidden ring-1 ring-black/5 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)] group-hover:shadow-[#b7ab98]/20 group-hover:border-white/40">
        
        {/* Internal bezel / Screen Frame (Darker Silver) */}
        <div className="relative h-full w-full bg-zinc-950 rounded-[2.8rem] p-2 overflow-hidden">
             <div className="relative h-full w-full bg-black rounded-[2.2rem] overflow-hidden">
                {/* Dynamic Island */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-7 bg-black rounded-full z-40 flex items-center justify-end px-3">
                    <div className="w-1 h-1 rounded-full bg-blue-500/20 mr-1 opacity-40" />
                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
                </div>

            {/* Screen / Image - NO CROP policy (object-contain) */}
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-black">
              <img 
                src={image} 
                alt="Projetos Insynk Studio"
                className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-700 ease-out"
              />
              {/* Overlay to handle hover state for B&W to Color specifically if CSS filter class isn't enough */}
            </div>

            {/* Premium Shine Overlay */}
            <div className="absolute inset-0 z-30 pointer-events-none bg-gradient-to-tr from-white/5 via-transparent to-white/5 opacity-40 group-hover:opacity-20 transition-opacity" />
          </div>
        </div>
        
        {/* Buttons (Decorative) */}
        <div className="absolute top-32 -left-[2px] w-[3px] h-12 bg-zinc-800 rounded-r-sm" />
        <div className="absolute top-48 -left-[2px] w-[3px] h-12 bg-zinc-800 rounded-r-sm" />
        <div className="absolute top-36 -right-[2px] w-[3px] h-20 bg-zinc-800 rounded-l-sm" />
      </div>

      {/* Interaction prompt for mobile (purely visual hint or subtle glow) */}
      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-[#b7ab98]/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
      
      {/* Heavy glow behind */}
      <div className="absolute inset-0 bg-[#b7ab98]/5 blur-3xl rounded-full -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
    </div>
  );
}
