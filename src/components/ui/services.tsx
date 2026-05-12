"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

const services = [
  {
    number: "01",
    title: "AI Production",
    headline: "Cinema-grade video, delivered in days.",
    description:
      "We combine generative AI with traditional filmmaking craft — scripting, direction, color — to produce brand films, campaigns, and launch content that would take a traditional studio months to make.",
    deliverables: ["Brand Films", "AI Commercials", "Launch Campaigns", "Generative Content"],
    stat: { value: "3–7", unit: "days avg. turnaround" },
  },
  {
    number: "02",
    title: "VFX",
    headline: "Every frame, technically impossible.",
    description:
      "Compositing, particle simulation, generative effects, and AI-powered retouching. We build the visual moments your brand needs to stop the scroll and hold attention.",
    deliverables: ["Compositing", "CGI Integration", "Particle FX", "AI Retouching"],
    stat: { value: "4K", unit: "final output standard" },
  },
  {
    number: "03",
    title: "3D Motion",
    headline: "Products and worlds in three dimensions.",
    description:
      "Photorealistic product renders, spatial brand systems, and cinematic 3D animation built for digital-first launches. No physical set required.",
    deliverables: ["Product Visualization", "3D Animation", "Motion Branding", "Spatial Design"],
    stat: { value: "360°", unit: "product coverage" },
  },
  {
    number: "04",
    title: "Video Editing",
    headline: "Speed, craft, and zero compromise.",
    description:
      "High-velocity post-production with precise color science, adaptive formats, and tight brand alignment. From raw footage to platform-ready masters — fast.",
    deliverables: ["Post-Production", "Color Grading", "Sound Design", "Multi-format Export"],
    stat: { value: "24h", unit: "express turnaround" },
  },
]

export default function Services() {
  const [active, setActive] = useState(0)
  const current = services[active]

  return (
    <section id="services" data-theme="light" className="relative overflow-hidden bg-[#f6f4ef] py-16 text-black sm:py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">

        <div className="flex flex-col justify-between gap-8 border-t border-black/15 pt-8 md:flex-row md:items-start">
          <div>
            <p className="mb-5 text-[11px] uppercase tracking-[0.32em] text-black/45">
              Capabilities / Error System
            </p>
            <h2 className="text-5xl font-medium leading-[0.86] tracking-[-0.08em] sm:text-6xl md:text-8xl lg:text-[8.5rem]">
              Services.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-black/55 sm:text-base sm:leading-8">
            Full-stack video production powered by AI — every capability
            under one roof, from first frame to final delivery.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-10 lg:mt-20 lg:grid-cols-[340px_1fr] lg:gap-20 xl:grid-cols-[380px_1fr]">

          {/* Список слева */}
          <div className="flex flex-col">
            {services.map((service, index) => (
              <button
                key={service.number}
                onMouseEnter={() => setActive(index)}
                onClick={() => setActive(index)}
                className={cn(
                  "group flex items-center gap-5 border-t border-black/10 py-5 text-left transition-all duration-300 last:border-b",
                  active === index ? "opacity-100" : "opacity-30 hover:opacity-60",
                )}
              >
                <span className="w-7 shrink-0 text-[11px] uppercase tracking-[0.3em] text-black/40">
                  {service.number}
                </span>
                <span
                  className={cn(
                    "text-xl font-medium tracking-[-0.04em] transition-transform duration-300",
                    active === index && "translate-x-1",
                  )}
                >
                  {service.title}
                </span>
                <span
                  className={cn(
                    "ml-auto h-1.5 w-1.5 shrink-0 rounded-full bg-black transition-all duration-300",
                    active === index ? "opacity-100 scale-100" : "opacity-0 scale-0",
                  )}
                />
              </button>
            ))}
          </div>

          {/* Панель справа */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col"
              >
                <p className="text-[11px] uppercase tracking-[0.32em] text-black/35">
                  {current.number} — {current.title}
                </p>

                <h3 className="mt-5 text-3xl font-medium leading-[1.1] tracking-[-0.06em] sm:text-4xl lg:text-5xl">
                  {current.headline}
                </h3>

                <p className="mt-6 max-w-lg text-sm leading-7 text-black/60 sm:text-base sm:leading-8">
                  {current.description}
                </p>

                <div className="mt-8 flex flex-wrap gap-2">
                  {current.deliverables.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-black/15 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-black/45"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <div className="mt-12 border-t border-black/10 pt-8">
                  <p className="text-5xl font-medium tracking-[-0.07em] lg:text-6xl">
                    {current.stat.value}
                  </p>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.28em] text-black/40">
                    {current.stat.unit}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  )
}
