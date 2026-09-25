import React from 'react';
import { motion } from 'framer-motion';
import { Target, Cpu, Sparkles, Users, Zap, Video } from 'lucide-react';

const services = [
  {
    title: "Tráfego Pago (Google Ads & Meta Ads)",
    description: "Gestão completa de campanhas em Google Ads e Meta Ads para geração de leads e aumento de vendas com IA.",
    icon: Target
  },
  {
    title: "Desenvolvimento de Sistemas & SaaS",
    description: "Criamos soluções tecnológicas avançadas que aprendem com dados reais e evoluem a comunicação da sua empresa.",
    icon: Cpu
  },
  {
    title: "Branding Estratégico",
    description: "Posicionamento e branding para empresas, unindo estética e performance para valorizar sua marca.",
    icon: Sparkles
  },
  {
    title: "Comunicação Estratégica",
    description: "Estratégias de comunicação interna e externa para alinhar a cultura organizacional e a presença de mercado.",
    icon: Users
  },
  {
    title: "Sites de Alta Conversão",
    description: "Criação de sites profissionais e landing pages otimizadas para performance, velocidade e geração de leads.",
    icon: Zap
  },
  {
    title: "Human Ads Engine",
    description: "Motor de campanhas publicitárias em vídeo que combina inteligência artificial com comunicação humanizada para criar anúncios mais autêntico.",
    icon: Video
  }
];

export default function ServicesSection() {
  return (
    <section id="servicos" className="pt-0 pb-12 bg-black relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#fa6851]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 
            className="text-[#b7ab98] text-sm uppercase tracking-[0.3em] font-medium mb-4 flex items-center gap-4"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            <span className="w-12 h-px bg-[#b7ab98]/30"></span>
            O que fazemos
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative p-8 rounded-3xl bg-zinc-950 border border-white/5 hover:border-[#b7ab98]/30 transition-all duration-500 overflow-hidden"
            >
              {/* Card Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#b7ab98]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-white/5 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-[#b7ab98]/20 transition-all duration-500">
                  <service.icon className="w-6 h-6 text-[#b7ab98]" />
                </div>
                
                <h3 
                  className="text-xl font-semibold text-white mb-4 group-hover:text-[#b7ab98] transition-colors duration-300"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  {service.title}
                </h3>
                
                <p className="text-zinc-400 leading-relaxed text-sm group-hover:text-zinc-300 transition-colors duration-300">
                  {service.description}
                </p>
              </div>

              {/* Decorative edge line */}
              <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#b7ab98]/10 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
