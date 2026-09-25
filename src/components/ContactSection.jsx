import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, Mail, User, MessageSquare } from 'lucide-react';

export default function ContactSection() {
  const [status, setStatus] = useState(null); // 'sending', 'success', 'error'

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    
    setStatus('sending');
    
    try {
      const response = await fetch("https://formsubmit.co/ajax/264studiodigital@gmail.com", {
        method: 'POST',
        body: data,
        headers: {
            'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <section id="contato" className="py-24 bg-black relative overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#fa6851]/5 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* CTA Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 
              className="text-[#b7ab98] text-sm uppercase tracking-[0.3em] font-medium mb-6 flex items-center gap-4"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              <span className="w-12 h-px bg-[#b7ab98]/30"></span>
              VAMOS CONVERSAR
            </h2>
            <h3 
              className="text-4xl md:text-5xl lg:text-6xl text-white leading-[1.1] mb-8"
              style={{ fontFamily: "'Anton', sans-serif", fontWeight: 400 }}
            >
              O futuro da sua marca começa com uma <span className="text-[#fa6851]">conversa.</span>
            </h3>
            <p className="text-zinc-400 text-lg font-light leading-relaxed max-w-lg mb-12">
              Estamos prontos para transformar suas ideias em resultados mensuráveis. Preencha o formulário e nossa equipe entrará em contato em breve.
            </p>

            <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-full bg-zinc-900 border border-white/5 flex items-center justify-center group-hover:border-[#fa6851]/30 transition-colors">
                        <Mail className="w-5 h-5 text-[#b7ab98] group-hover:text-[#fa6851] transition-colors" />
                    </div>
                    <div>
                        <p className="text-xs text-zinc-500 uppercase tracking-widest">E-mail Direto</p>
                        <p className="text-white font-medium">264studiodigital@gmail.com</p>
                    </div>
                </div>
            </div>
          </motion.div>

          {/* Form Column */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="p-8 lg:p-12 rounded-[2.5rem] bg-zinc-950 border border-white/5 shadow-2xl relative overflow-hidden">
                {/* Subtle Form Glow */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#fa6851]/10 blur-[80px] rounded-full pointer-events-none" />
                
                {status === 'success' ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <CheckCircle className="w-20 h-20 text-[#fa6851] mx-auto mb-6" />
                    <h4 className="text-2xl font-semibold text-white mb-4">Mensagem Enviada!</h4>
                    <p className="text-zinc-400 mb-8">Obrigado pelo contato. Responderemos o mais rápido possível.</p>
                    <button 
                        onClick={() => setStatus(null)}
                        className="px-8 py-3 bg-[#b7ab98] text-black rounded-full font-bold uppercase text-xs tracking-widest hover:bg-[#fa6851] transition-colors"
                    >
                        Enviar nova mensagem
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                    <div className="space-y-2">
                        <label className="text-xs text-zinc-500 ml-1 uppercase tracking-widest">Nome Completo</label>
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                            <input 
                                required
                                type="text" 
                                name="name"
                                className="w-full bg-zinc-900 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-zinc-700 focus:outline-none focus:border-[#fa6851]/50 transition-colors"
                                placeholder="Como podemos te chamar?"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs text-zinc-500 ml-1 uppercase tracking-widest">E-mail</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                            <input 
                                required
                                type="email" 
                                name="email"
                                className="w-full bg-zinc-900 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-zinc-700 focus:outline-none focus:border-[#fa6851]/50 transition-colors"
                                placeholder="Seu melhor e-mail"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs text-zinc-500 ml-1 uppercase tracking-widest">Sua Mensagem</label>
                        <div className="relative">
                            <MessageSquare className="absolute left-4 top-5 w-4 h-4 text-zinc-600" />
                            <textarea 
                                required
                                name="message"
                                rows="4"
                                className="w-full bg-zinc-900 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-zinc-700 focus:outline-none focus:border-[#fa6851]/50 transition-colors resize-none"
                                placeholder="Conte um pouco sobre o seu projeto..."
                            ></textarea>
                        </div>
                    </div>

                    <button 
                        disabled={status === 'sending'}
                        type="submit"
                        className="w-full py-5 bg-[#b7ab98] text-black rounded-2xl font-bold uppercase text-xs tracking-[0.3em] hover:bg-[#fa6851] transition-all duration-500 shadow-xl shadow-black/20 flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {status === 'sending' ? (
                            'ENVIANDO...'
                        ) : (
                            <>
                                ENVIAR MENSAGEM
                                <Send className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </>
                        )}
                    </button>
                    
                    {status === 'error' && (
                        <p className="text-red-500 text-sm text-center">Ocorreu um erro ao enviar. Tente novamente.</p>
                    )}

                    <input type="hidden" name="_subject" value="Novo Contato - 264 Studio Site" />
                    <input type="hidden" name="_captcha" value="false" />
                    <input type="hidden" name="_template" value="table" />
                  </form>
                )}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
