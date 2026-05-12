"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus } from "lucide-react"
import { cn } from "@/lib/utils"

const faqs = [
  {
    q: "How long does a project take?",
    a: "From approved brief to final delivery in 3–10 business days depending on scope. Rush delivery is available for time-sensitive launches — ask us about it.",
  },
  {
    q: "Do I need to provide footage or scripts?",
    a: "No. We handle everything — concept, scripting, voiceover, visuals, music, color grading, and delivery. You provide the brief and brand assets. That's it.",
  },
  {
    q: "Will my video look generic or AI-generated?",
    a: "Our process is AI-native but craft-led. Every frame is reviewed, refined, and art-directed by our creative team to meet cinematic standards. The output is indistinguishable from high-end traditional production.",
  },
  {
    q: "What's the minimum project size?",
    a: "Projects start from $1,000. Full brand films and campaigns typically range from $3,000–$15,000. For brands with ongoing content needs we offer monthly retainer packages at better rates and priority slots.",
  },
  {
    q: "What formats do you deliver?",
    a: "4K masters plus every format you need — 16:9, 9:16, 1:1, multi-platform cuts, localized versions, and platform-specific exports. Everything, ready to publish.",
  },
  {
    q: "Do you work with international clients?",
    a: "Yes. We're fully remote and work with clients across Europe, North America, Asia, and the Middle East. Time zones are never a barrier.",
  },
  {
    q: "Can you handle our ongoing content needs?",
    a: "Absolutely. We offer dedicated monthly retainers for brands that need a consistent pipeline — campaigns, product launches, social content, and beyond.",
  },
]

function FaqItem({ faq }: { faq: (typeof faqs)[number] }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-t border-black/12">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-start justify-between gap-6 py-7 text-left"
      >
        <span className="text-lg font-medium leading-snug tracking-[-0.03em] text-black sm:text-xl">
          {faq.q}
        </span>
        <Plus
          className={cn(
            "mt-1 h-5 w-5 shrink-0 text-black/35 transition-transform duration-300",
            open && "rotate-45",
          )}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="max-w-2xl pb-8 text-sm leading-7 text-black/55 sm:text-base sm:leading-8">
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ() {
  return (
    <section data-theme="light" className="relative overflow-hidden bg-[#f6f4ef] py-16 text-black sm:py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">

        <div className="flex flex-col justify-between gap-8 border-t border-black/15 pt-8 md:flex-row md:items-start">
          <div className="shrink-0">
            <p className="mb-5 text-[11px] uppercase tracking-[0.32em] text-black/45">
              Questions / Error System
            </p>
            <h2 className="text-5xl font-medium leading-[0.86] tracking-[-0.08em] sm:text-6xl md:text-8xl lg:text-[8.5rem]">
              FAQ.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-black/50 sm:text-base sm:leading-8">
            Everything you need to know before starting a project with us.
            Still have questions? Write to borisichinmax@gmail.com
          </p>
        </div>

        <div className="mt-14 lg:mt-20">
          {faqs.map((faq) => (
            <FaqItem key={faq.q} faq={faq} />
          ))}
          <div className="border-t border-black/12" />
        </div>

      </div>
    </section>
  )
}
