const stats = [
  { value: "100+", label: "Projects delivered" },
  { value: "48h",  label: "Fastest turnaround" },
  { value: "40+",  label: "Clients worldwide" },
  { value: "100%", label: "AI-native production" },
]

const colA = [
  "Brand Films", "AI Campaigns", "3D Worlds", "Launch Videos",
  "Social Content", "Motion Design", "Product Films", "Visual Identity",
  "Generative Art", "Campaign Reels",
]

const colB = [
  "Cinematic", "Fast", "AI-Native", "Precise",
  "Original", "Scalable", "Craft-Led", "Fearless",
  "Timeless", "Intentional",
]

function VerticalTicker() {
  const trackA = [...colA, ...colA]
  const trackB = [...colB, ...colB]

  return (
    <div className="relative flex h-72 gap-6 overflow-hidden sm:h-80">
      <style>{`
        @keyframes ticker-up {
          from { transform: translateY(0); }
          to   { transform: translateY(-50%); }
        }
        @keyframes ticker-down {
          from { transform: translateY(-50%); }
          to   { transform: translateY(0); }
        }
        .ticker-up   { animation: ticker-up   18s linear infinite; }
        .ticker-down { animation: ticker-down 22s linear infinite; }
        .ticker-up:hover, .ticker-down:hover { animation-play-state: paused; }
      `}</style>

      {/* Fade маски сверху и снизу */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-16"
           style={{ background: "linear-gradient(to bottom, #f6f4ef, transparent)" }} />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-16"
           style={{ background: "linear-gradient(to top, #f6f4ef, transparent)" }} />

      {/* Колонка A — вверх */}
      <div className="ticker-up flex flex-col items-start gap-3 md:items-end">
        {trackA.map((item, i) => (
          <span
            key={i}
            className="whitespace-nowrap text-left text-[11px] uppercase tracking-[0.3em] text-black/40 md:text-right"
          >
            {item}
          </span>
        ))}
      </div>

      {/* Колонка B — вниз */}
      <div className="ticker-down flex flex-col items-start gap-3 md:items-end">
        {trackB.map((item, i) => (
          <span
            key={i}
            className="whitespace-nowrap text-left text-[11px] uppercase tracking-[0.3em] text-black/25 md:text-right"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function About() {
  return (
    <section id="about" data-theme="light" className="relative overflow-hidden bg-[#f6f4ef] py-16 text-black sm:py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">

        <div className="flex flex-col justify-between gap-8 border-t border-black/15 pt-8 md:flex-row md:items-start">
          <div>
            <p className="mb-5 text-[11px] uppercase tracking-[0.32em] text-black/45">
              About / Error System
            </p>
            <h2 className="text-5xl font-medium leading-[0.86] tracking-[-0.08em] text-black sm:text-6xl md:text-8xl lg:text-[8.5rem]">
              About.
            </h2>
          </div>
        </div>

        <div className="mt-16 grid gap-12 md:grid-cols-2 lg:mt-20 lg:gap-20">
          <div>
            <p className="text-2xl font-medium leading-[1.3] tracking-[-0.04em] text-black sm:text-3xl lg:text-4xl">
              ERROR SYSTEM is an AI video production agency creating brand films,
              launch campaigns, and cinematic content for companies that refuse to
              look ordinary.
            </p>
            <p className="mt-8 text-sm leading-7 text-black/60 sm:text-base sm:leading-8">
              We fuse generative AI tools with real filmmaking principles —
              scripting, direction, cinematography, color grading — to deliver
              content at a speed and scale that was impossible just two years ago.
            </p>
          </div>

          <div className="flex items-start justify-start pt-2 md:justify-end">
            <VerticalTicker />
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-8 border-t border-black/15 pt-10 lg:mt-20 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-4xl font-medium tracking-[-0.06em] text-black sm:text-5xl lg:text-6xl">
                {stat.value}
              </p>
              <p className="mt-2 text-[11px] uppercase tracking-[0.24em] text-black/45">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 border-t border-black/15 pt-8 lg:mt-20">
          <p className="text-[11px] uppercase tracking-[0.32em] text-black/45">
            Our approach — AI is the tool. Vision is the product.
          </p>
        </div>

      </div>
    </section>
  )
}
