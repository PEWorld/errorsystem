"use client"

const logos = [
  "/logos/123123123.svg",
  "/logos/1232131231232.svg",
  "/logos/12321313213123.svg",
  "/logos/213123213.svg",
  "/logos/213213123.svg",
  "/logos/213213211.svg",
  "/logos/2132132213.svg",
  "/logos/312312321.svg",
  "/logos/Blessed1.svg",
]

export default function Logos() {
  const track = [...logos, ...logos]

  return (
    <section data-theme="dark" className="relative overflow-hidden bg-black">
      <style>{`
        @keyframes logos-left {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .logos-track {
          animation: logos-left 36s linear infinite;
          will-change: transform;
        }
        .logos-track:hover { animation-play-state: paused; }
      `}</style>

      {/* Верхняя черта */}
      <div className="h-px bg-white/8" />

      <div className="py-8">
        {/* Лейбл */}
        <p className="mb-6 px-6 text-[9px] uppercase tracking-[0.5em] text-white/20 sm:px-8 lg:px-12">
          Trusted by leading brands
        </p>

        {/* Полоса с fade-масками по краям */}
        <div className="relative overflow-hidden">
          {/* Левый fade */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 top-0 z-10 h-full w-32"
            style={{ background: "linear-gradient(to right, #000, transparent)" }}
          />
          {/* Правый fade */}
          <div
            aria-hidden
            className="pointer-events-none absolute right-0 top-0 z-10 h-full w-32"
            style={{ background: "linear-gradient(to left, #000, transparent)" }}
          />

          <div className="logos-track flex items-center">
            {track.map((src, i) => (
              <div key={i} className="flex shrink-0 items-center">
                <div className="flex items-center justify-center px-10 opacity-30 transition-opacity duration-300 hover:opacity-70">
                  <img
                    src={src}
                    alt=""
                    className="max-h-10 w-auto max-w-[160px] object-contain sm:max-h-16 sm:max-w-[240px] lg:max-h-20 lg:max-w-[320px]"
                    style={{ filter: "brightness(0) invert(1)" }}
                    draggable={false}
                  />
                </div>
                <span aria-hidden className="h-3 w-px shrink-0 bg-white/10" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Нижняя черта */}
      <div className="h-px bg-white/8" />
    </section>
  )
}
