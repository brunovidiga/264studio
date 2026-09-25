export default function ManifestoSection() {
  return (
    <section className="relative w-full py-16 md:py-24 px-4 flex justify-center items-center bg-black overflow-hidden">
      <div className="absolute left-0 top-0 w-[40%] h-full bg-[#fa6851]/15 blur-[150px] pointer-events-none rounded-r-full -translate-x-1/2"></div>
      <div className="absolute right-0 top-0 w-[40%] h-full bg-[#fa6851]/15 blur-[150px] pointer-events-none rounded-l-full translate-x-1/2"></div>

      <div
        className="relative z-10 flex flex-col items-center justify-center uppercase text-[#fa6851] leading-[0.85] text-[clamp(4rem,12vw,12rem)] tracking-tight text-center select-none"
        style={{ fontFamily: "'Anton', sans-serif", textShadow: '0 0 40px rgba(250,104,81,0.5), 0 0 80px rgba(250,104,81,0.2)' }}
      >
        <div className="relative whitespace-nowrap">
          MARCAS FORTES
          <svg
            className="absolute left-[15%] -bottom-[10%] w-[35%] h-auto text-[#b4ac98] drop-shadow-md z-20"
            viewBox="0 0 100 20"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
          >
            <path d="M0 10 Q 50 0 100 15" strokeWidth="4"></path>
            <path d="M5 13 Q 50 3 95 18" strokeWidth="2" opacity="0.6"></path>
          </svg>
        </div>

        <div className="relative whitespace-nowrap mt-2">
          <svg
            className="absolute -left-[12%] bottom-[10%] w-[12%] h-auto text-[#b4ac98] drop-shadow-md z-20"
            viewBox="0 0 100 100"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
          >
            <path d="M25 25 L75 75 M75 25 L25 75" strokeWidth="8"></path>
            <path d="M30 20 L70 80 M80 30 L20 70" strokeWidth="4" opacity="0.7"></path>
          </svg>
          NÃO ESPERAM
          <svg
            className="absolute -right-[15%] top-[0%] w-[15%] h-auto text-[#b4ac98] drop-shadow-md z-20"
            viewBox="0 0 100 100"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M30 70 L70 30 M70 30 L40 25 M70 30 L75 60" strokeWidth="6"></path>
            <path d="M32 72 L72 32 M72 32 L42 27 M72 32 L77 62" strokeWidth="3" opacity="0.6"></path>
          </svg>
        </div>

        <div className="relative whitespace-nowrap mt-2">
          OPORTUNIDADES.
          <span
            className="z-20 whitespace-nowrap font-medium text-[#b4ac98] tracking-tight absolute left-[30%] top-[-42%] -rotate-6 text-[clamp(1.5rem,4vw,3.5rem)]"
            style={{ fontFamily: "'Caveat', cursive", filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.6))', textShadow: 'none' }}
          >
            ESTRATÉGIA
          </span>
        </div>

        <div className="relative whitespace-nowrap mt-2">
          <span
            className="absolute left-[-16%] top-[10%] text-[#b4ac98] text-[clamp(1.5rem,4vw,3.5rem)] font-medium italic tracking-tight -rotate-12 z-20"
            style={{ fontFamily: "'Caveat', cursive", filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.6))', textShadow: 'none' }}
          >
            CRIATIVIDADE
          </span>
          CRIAM!
          <span
            className="absolute left-[108%] top-[30%] text-[#b4ac98] text-[clamp(1.5rem,4vw,3.5rem)] font-medium italic tracking-tight -rotate-3 z-20 whitespace-nowrap"
            style={{ fontFamily: "'Caveat', cursive", filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.6))', textShadow: 'none' }}
          >
            RESULTADOS
          </span>
        </div>
      </div>
    </section>
  )
}
