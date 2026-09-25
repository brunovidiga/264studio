const items = [
  { label: 'BRANDING', img: '/imagem/04k.webp', alt: 'Branding' },
  { label: 'WEBFLOW', img: '/imagem/03.webp', alt: 'Webflow' },
  { label: 'DESIGN UI/UX', img: '/imagem/02.webp', alt: 'UI/UX Design' },
  { label: 'COMUNICAÇÃO INTERNA', img: '/imagem/05.webp', alt: 'Comunicação Interna' },
  {
    label: 'PUBLICIDADE',
    img: 'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/c543a9e1-f226-4ced-80b0-feb8445a75b9_1600w.jpg',
    alt: 'Advertising',
  },
  { label: 'SEO & CONTEÚDO', img: '/imagem/07.webp', alt: 'SEO & Content' },
]

export default function ServicesStack() {
  return (
    <section className="flex flex-col z-20 py-10 md:py-32 relative items-center bg-black min-h-0 md:min-h-screen justify-center w-full overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 md:mb-16">
        <h2
          className="text-[#b7ab98] text-sm uppercase tracking-[0.3em] font-medium mb-4 flex items-center gap-4"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          <span className="w-12 h-px bg-[#b7ab98]/30"></span>
          O que fazemos
        </h2>
      </div>
      <ul className="w-full flex flex-col items-center justify-center group/list">
        {items.map((item) => (
          <li key={item.label} className="group/item relative w-full text-center flex items-center justify-center py-2 md:py-1">
            <span
              className="text-[clamp(2.5rem,8vw,8rem)] leading-[0.85] uppercase tracking-tighter text-[#b7ab98] md:text-zinc-700 transition-all duration-500 ease-out md:group-hover/list:opacity-20 md:group-hover/item:!opacity-100 md:group-hover/item:!text-[#fa6851] cursor-pointer inline-block z-20 relative will-change-auto"
              style={{ fontFamily: "'Anton', sans-serif" }}
            >
              {item.label}
            </span>
            <img
              src={item.img}
              alt={item.alt}
              loading="lazy"
              className="hidden md:block absolute left-4 top-1/2 -translate-y-1/2 w-[20vw] max-w-[350px] aspect-[16/10] object-cover rounded-2xl opacity-0 md:group-hover/item:opacity-100 transition-all duration-500 ease-out pointer-events-none z-10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] scale-95 md:group-hover/item:scale-100 will-change-transform"
            />
          </li>
        ))}
      </ul>
    </section>
  )
}
