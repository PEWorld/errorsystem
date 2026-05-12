"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, ArrowRight } from "lucide-react"

const testimonials = [
  {
    quote:
      "ERROR SYSTEM delivered a brand film in 6 days that our previous agency quoted 3 months for. The quality was beyond what we thought was possible with AI.",
    author: "Sarah Chen",
    role: "CMO",
    company: "Parallax Technologies",
  },
  {
    quote:
      "They didn't just make a video — they built us a visual language. Every frame felt intentional. Our launch campaign got 4× the engagement we expected.",
    author: "Marcus Delroy",
    role: "Founder",
    company: "Noma Studio",
  },
  {
    quote:
      "Working with ERROR SYSTEM felt like the future. Concepts in 48 hours, final delivery in 10 days. The output looked like a $500K production.",
    author: "Irina Volkov",
    role: "Head of Brand",
    company: "Strata Capital",
  },
  {
    quote:
      "The AI-native approach isn't a shortcut — it's a superpower. ERROR SYSTEM uses it to go deeper on craft, not skip it.",
    author: "James Okafor",
    role: "Creative Director",
    company: "Dune Collective",
  },
]

const AUTOPLAY_INTERVAL = 5000

const variants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 60 : -60,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -60 : 60,
    opacity: 0,
  }),
}

export default function Testimonials() {
  const [[index, dir], setPage] = useState([0, 0])

  const paginate = useCallback(
    (newDir: number) => {
      setPage(([prev]) => [
        (prev + newDir + testimonials.length) % testimonials.length,
        newDir,
      ])
    },
    [],
  )

  useEffect(() => {
    const timer = setInterval(() => paginate(1), AUTOPLAY_INTERVAL)
    return () => clearInterval(timer)
  }, [paginate])

  const current = testimonials[index]

  return (
    <section data-theme="light" className="relative overflow-hidden bg-[#f6f4ef] py-16 text-black sm:py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">

        <div className="flex flex-col justify-between gap-8 border-t border-black/15 pt-8 md:flex-row md:items-start">
          <div>
            <p className="mb-5 text-[11px] uppercase tracking-[0.32em] text-black/45">
              Client voices / Error System
            </p>
            <h2 className="text-5xl font-medium leading-[0.86] tracking-[-0.08em] text-black sm:text-6xl md:text-8xl lg:text-[8.5rem]">
              Words.
            </h2>
          </div>

          <div className="flex items-end gap-3 md:pb-3">
            <button
              onClick={() => paginate(-1)}
              aria-label="Previous"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-black/20 text-black/50 transition-colors hover:border-black hover:text-black"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => paginate(1)}
              aria-label="Next"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-black/20 text-black/50 transition-colors hover:border-black hover:text-black"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="relative mt-14 min-h-[360px] overflow-hidden sm:mt-16 sm:min-h-[280px] lg:mt-20 lg:min-h-[240px]">
          <AnimatePresence custom={dir} mode="wait">
            <motion.div
              key={index}
              custom={dir}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <blockquote className="max-w-5xl text-2xl font-medium leading-[1.35] tracking-[-0.04em] text-black sm:text-3xl lg:text-[2.6rem] lg:leading-[1.25]">
                "{current.quote}"
              </blockquote>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex flex-col gap-6 border-t border-black/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <AnimatePresence mode="wait">
            <motion.div
              key={index + "-author"}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="flex items-center gap-5"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-[11px] font-medium uppercase tracking-wider text-white">
                {current.author.split(" ").map((n) => n[0]).join("")}
              </div>
              <div>
                <p className="text-sm font-medium tracking-[-0.02em] text-black">
                  {current.author}
                </p>
                <p className="text-[11px] uppercase tracking-[0.24em] text-black/45">
                  {current.role} — {current.company}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(([prev]) => [i, i > prev ? 1 : -1])}
                aria-label={`Go to slide ${i + 1}`}
                className="group flex h-5 w-5 items-center justify-center"
              >
                <span
                  className={`block h-1.5 rounded-full transition-all duration-300 ${
                    i === index
                      ? "w-6 bg-black"
                      : "w-1.5 bg-black/25 group-hover:bg-black/50"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
