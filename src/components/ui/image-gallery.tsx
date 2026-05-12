"use client"

import { useRef, useState, useEffect } from "react"
import { useInView, motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

const works = [
  {
    title: "KNIGHT I",
    category: "3D",
    software: "Blender, After Effects, Daz 3D, Sketchfab",
    deliveredIn: "4 days",
    src: "/works/knight.mp4",
    description: "A cinematic 3D series produced for an artist's Instagram, engineered to attract an audience that values meaning and visual depth. Each render was built around the artist's narrative identity — translating abstract emotion into concrete three-dimensional imagery. The series follows a consistent visual language: dark atmosphere, precise lighting, and deliberate composition. Every frame was designed to stop the scroll and invite reflection. The result is a cohesive content system that elevates the artist's digital presence beyond standard promotional material.",
  },
  {
    title: "YOUNG SIPPAZ II",
    category: "3D",
    software: "Blender, After Effects, Daz 3D, Sketchfab",
    deliveredIn: "2 days",
    src: "/works/stories.mp4",
    description: "The second installment of the DA YOUNG SIPPAZ content universe — a deeper exploration of the brand's visual world. Building on the foundation of the first series, this chapter expands the mascot's presence with more complex animation and richer environments. The brief called for elevated production value while maintaining the energy and accessibility of the original. Each piece was crafted to perform on Instagram Stories — short format, high impact, zero compromise on quality. A brand world that keeps growing with every drop.",
  },
  {
    title: "DA YOUNG SIPPAZ III",
    category: "3D",
    software: "Blender, After Effects, Daz 3D, Sketchfab",
    deliveredIn: "3 days",
    src: "/works/withBG.mp4",
    description: "Full end-to-end 3D mascot development for DA YOUNG SIPPAZ — from concept through modelling, rigging, and final animation. The mascot was built from scratch as a long-term brand asset, engineered to work across multiple content formats and platforms. Particular attention was given to the rig — ensuring the character could move with the fluid, expressive quality the brand required. The hero animation, a signature spinning loop, became the visual anchor of the brand's Instagram identity. A character designed not just to appear, but to be remembered.",
  },
  {
    title: "YOUNG SIPPAZ I",
    category: "3D",
    software: "Blender, After Effects, Daz 3D, Sketchfab",
    deliveredIn: "7 days",
    src: "/works/0001-0600.mp4",
    description: "A mascot-driven 3D reel series developed to grow the DA YOUNG SIPPAZ brand across social platforms. The mascot was deployed as the central character — giving the brand a recognizable face and a consistent visual voice. Each reel was engineered for maximum retention: dynamic motion, tight pacing, and a bold aesthetic that speaks directly to the brand's target community. The series establishes a repeatable content framework that scales with the brand. Personality, energy, and identity — delivered in under 15 seconds.",
  },
  {
    title: "NOISE FESTIVAL I",
    category: "3D",
    software: "Blender, After Effects, Daz 3D, Sketchfab",
    deliveredIn: "6 days",
    src: "/works/0001-1800.mp4",
    description: "A 3D motion content system developed for НОЙЗФЕСТ — Moscow's festival built on raw energy and underground sound. The visual direction required a language aggressive enough to represent the festival's identity without diluting its edge. Heavy geometry, kinetic motion, and a colour palette pulled from industrial aesthetics define this series. Each animation was optimised for both large-format display and social media distribution. The outcome is a motion identity that feels as loud as the music it represents.",
  },
  {
    title: "MONARCH",
    category: "AI",
    software: "Kling, Nano Banana, Photoshop, After Effects, Veo 3",
    deliveredIn: "5 days",
    src: "/works/0129 (2)(1).mp4",
    description: "An AI-generated motion content series produced for MONARCH — a Russian automotive brand with a vision aimed squarely at the future. The project required visuals that could communicate technological ambition and premium positioning simultaneously. AI generation tools were directed with precision to produce imagery that feels crafted, not accidental — every frame art-directed to align with the brand's identity. The final content was optimised for Instagram performance: scroll-stopping, brand-consistent, and built for a discerning audience. A demonstration that AI, in the right hands, is a precision instrument.",
  },
  {
    title: "MORGENSHTERN III",
    category: "3D",
    software: "Blender, After Effects, Daz 3D, Sketchfab",
    deliveredIn: "3 days",
    src: "/works/3.mp4",
    description: "The third and final chapter of the ALISHER album render series — closing the visual trilogy with precision and atmosphere. This phase brought the most technically complex compositions of the project, incorporating multi-layered environments and refined post-production work in After Effects. The goal was to deliver a conclusion that felt earned — visually richer than what came before while remaining coherent with the established system. Every render in this chapter was designed to stand as the definitive visual representation of its corresponding track. An ending built to leave an impression.",
  },
  {
    title: "MORGENSHTERN I",
    category: "3D",
    software: "Blender, After Effects, Daz 3D, Sketchfab",
    deliveredIn: "4 days",
    src: "/works/4.mp4",
    description: "The first chapter of a 3D lyric video render series created for MORGENSHTERN's album ALISHER. This project demanded a visual system capable of matching the scale and ambition of one of Russia's most-streamed artists. Each render was built as a standalone visual statement while contributing to the larger album narrative. Typography, depth, and motion were choreographed to amplify the emotional weight of every track. The result is a visual identity for the album that extends its world beyond audio.",
  },
  {
    title: "MORGENSHTERN II",
    category: "3D",
    software: "Blender, After Effects, Daz 3D, Sketchfab",
    deliveredIn: "2 days",
    src: "/works/5.mp4",
    description: "The second volume of 3D renders for the ALISHER album visual campaign — expanding the narrative established in the first chapter. This phase pushed further into atmospheric depth, introducing new spatial compositions and more complex lighting setups. The renders were designed to function both as lyric video backdrops and as standalone visual assets for broader campaign use. Consistency with the established album aesthetic was maintained while introducing enough variation to sustain audience engagement. A continuation that deepens the world rather than repeating it.",
  },
  {
    title: "KNIGHT II",
    category: "AI",
    software: "Kling, Nano Banana, Photoshop, After Effects, Veo 3",
    deliveredIn: "5 days",
    src: "/works/Композиция 1.mp4",
    description: "The second chapter of the KNIGHT content series — this time executed through AI motion production. The shift in toolset opened new visual territory while preserving the conceptual depth that defines the project. AI generation was used not as a shortcut but as a deliberate creative choice, allowing for imagery that sits at the intersection of realism and the surreal. Each piece was post-produced in After Effects to ensure motion quality and pacing met the standard set by the first series. Proof that the tools change, but the vision stays constant.",
  },
  {
    title: "NOISE FESTIVAL II",
    category: "3D",
    software: "Blender, After Effects, Daz 3D, Sketchfab",
    deliveredIn: "8 days",
    src: "/works/post2.mp4",
    description: "An alternative visual identity system for НОЙЗФЕСТ — a parallel aesthetic direction that reimagines the festival's look from a different angle. Where the first series leaned into industrial aggression, this chapter explores a more architectural, spatial approach to the same energy. The brief was to create something that could coexist with the original system while offering genuine creative contrast. Each animation was built to the same distribution standard — optimised for both event screens and digital channels. Two directions, one festival, zero repetition.",
  },
]

interface Work {
  title: string
  category: string
  software: string
  deliveredIn: string
  src: string
  description: string
}

// ─── Gallery ──────────────────────────────────────────────────────────────────

export function ImageGallery() {
  const [active, setActive] = useState<Work | null>(null)

  return (
    <>
      <section id="work" data-theme="dark" className="relative w-full overflow-hidden bg-black py-16 text-white sm:py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">

          <div className="flex flex-col justify-between gap-8 border-t border-white/10 pt-8 md:flex-row md:items-end">
            <div>
              <p className="mb-5 text-[11px] uppercase tracking-[0.32em] text-white/40">
                Selected work / Error System
              </p>
              <h2 className="whitespace-nowrap text-5xl font-medium leading-[0.86] tracking-[-0.08em] sm:text-6xl md:text-8xl lg:text-[8.5rem]">
                Work gallery.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-7 text-white/55 sm:text-base sm:leading-8">
              A rolling archive of brand films, AI campaigns, 3D worlds, and
              cinematic content built for ambitious launches.
            </p>
          </div>

          <div className="mt-12 columns-1 gap-5 sm:columns-2 sm:mt-16 lg:columns-3 lg:gap-6">
            {works.map((work, i) => (
              <div key={work.title} className="mb-5 break-inside-avoid lg:mb-6">
                <VideoCard work={work} delay={i * 60} onOpen={() => setActive(work)} />
              </div>
            ))}
          </div>

        </div>
      </section>

      <WorkModal work={active} onClose={() => setActive(null)} />
    </>
  )
}

// ─── Video card ───────────────────────────────────────────────────────────────

function VideoCard({
  work,
  delay,
  onOpen,
}: {
  work: Work
  delay: number
  onOpen: () => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-8%" })
  const [loaded, setLoaded] = useState(false)

  return (
    <div
      ref={ref}
      onClick={onOpen}
      className={cn(
        "group relative cursor-pointer overflow-hidden transition-all duration-700 ease-out",
        isInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {!loaded && (
        <div className="aspect-video w-full animate-pulse bg-white/5" />
      )}

      {/* src set only when in view — prevents loading all 11 videos at once */}
      <video
        autoPlay
        loop
        muted
        playsInline
        src={isInView ? work.src : undefined}
        className={cn(
          "block w-full transition-transform duration-700 group-hover:scale-[1.03]",
          loaded ? "opacity-100" : "absolute inset-0 h-0 w-0 overflow-hidden",
        )}
        onLoadedMetadata={() => setLoaded(true)}
      />

      {loaded && (
        <div className="pointer-events-none absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/65 via-black/10 to-transparent p-5">
          <div className="flex items-end justify-between gap-2">
            <h3 className="text-xl font-medium tracking-[-0.04em] text-white">
              {work.title}
            </h3>
            <span className="shrink-0 rounded-full border border-white/20 px-2 py-0.5 text-[9px] uppercase tracking-[0.2em] text-white/60">
              {work.category}
            </span>
          </div>
          <p className="mt-0.5 text-[10px] uppercase tracking-[0.28em] text-white/50">
            delivered in {work.deliveredIn}
          </p>
        </div>
      )}
    </div>
  )
}

// ─── Modal popup ──────────────────────────────────────────────────────────────

function WorkModal({ work, onClose }: { work: Work | null; onClose: () => void }) {
  useEffect(() => {
    if (!work) return
    document.body.style.overflow = "hidden"
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", onKey)
    }
  }, [work, onClose])

  return (
    <AnimatePresence>
      {work && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 24 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-4 top-1/2 z-[101] mx-auto max-w-3xl -translate-y-1/2 overflow-hidden rounded-2xl bg-[#0f0f0f] sm:inset-x-8 max-h-[90vh] overflow-y-auto"
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/60 transition-colors hover:bg-white/20 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Video */}
            <div className="relative bg-black">
              <video
                key={work.src}
                autoPlay
                loop
                muted
                playsInline
                src={work.src}
                className="block max-h-[60vh] w-full object-contain"
              />
            </div>

            {/* Info */}
            <div className="p-6 sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <h2 className="text-2xl font-medium tracking-[-0.05em] text-white sm:text-3xl">
                  {work.title}
                </h2>
                <span className="shrink-0 rounded-full border border-white/15 px-3 py-1 text-[10px] uppercase tracking-[0.28em] text-white/40">
                  {work.deliveredIn}
                </span>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-full bg-white/8 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white/60">
                  {work.category}
                </span>
                {work.software.split(", ").map(tool => (
                  <span
                    key={tool}
                    className="rounded-full bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-white/40"
                  >
                    {tool}
                  </span>
                ))}
              </div>

              <p className="mt-5 text-sm leading-7 text-white/55 sm:text-base sm:leading-8">
                {work.description}
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
