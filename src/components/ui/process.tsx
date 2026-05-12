"use client"

import { motion, AnimatePresence, type Variants } from "framer-motion"
import { useEffect, useRef, useState } from "react"

const steps = [
  {
    number: "01",
    title: "Brief & Strategy",
    meta: "Discovery / Goals",
    icon: "📋",
  },
  {
    number: "02",
    title: "AI Concept & Storyboard",
    meta: "Ideation / Visual",
    icon: "✦",
  },
  {
    number: "03",
    title: "Production & Post",
    meta: "Generation / Craft",
    icon: "🎬",
  },
  {
    number: "04",
    title: "Delivery & Scale",
    meta: "Export / Launch",
    icon: "🚀",
  },
]

const scaleAnimation: Variants = {
  initial: { scale: 0, x: "-50%", y: "-50%" },
  closed: {
    scale: 0, x: "-50%", y: "-50%",
    transition: { duration: 0.35, ease: [0.32, 0, 0.67, 0] as [number, number, number, number] },
  },
  enter: {
    scale: 1, x: "-50%", y: "-50%",
    transition: { duration: 0.35, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] },
  },
}

type ModalState = { active: boolean; index: number }
type Step = (typeof steps)[number]

export default function Process() {
  const [modal, setModal] = useState<ModalState>({ active: false, index: 0 })
  const [activeStep, setActiveStep] = useState<number | null>(null)

  const toggleStep = (index: number) =>
    setActiveStep(prev => (prev === index ? null : index))

  return (
    <section id="process" data-theme="dark" className="relative overflow-hidden bg-black py-16 text-white sm:py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">

        <div className="flex flex-col justify-between gap-8 border-t border-white/10 pt-8 md:flex-row md:items-start">
          <div>
            <p className="mb-5 text-[11px] uppercase tracking-[0.32em] text-white/40">
              How it works / Error System
            </p>
            <h2 className="text-5xl font-medium leading-[0.86] tracking-[-0.08em] sm:text-6xl md:text-8xl lg:text-[8.5rem]">
              Process.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-white/50 sm:text-base sm:leading-8">
            Four steps from brief to final delivery. Transparent, fast, and
            built around the way modern brands actually work.
          </p>
        </div>

        <div className="relative flex flex-col py-4 md:min-h-[480px] md:justify-center lg:min-h-[560px]">
          <div className="flex w-full flex-col">
            {steps.map((step, index) => (
              <StepRow
                key={step.title}
                index={index}
                step={step}
                setModal={setModal}
                isExpanded={activeStep === index}
                onToggle={() => toggleStep(index)}
              />
            ))}
            <div className="border-t border-white/10" />
          </div>
          <IconModal modal={modal} steps={steps} />
        </div>

      </div>
    </section>
  )
}

function StepRow({
  index,
  step,
  setModal,
  isExpanded,
  onToggle,
}: {
  index: number
  step: Step
  setModal: (modal: ModalState) => void
  isExpanded: boolean
  onToggle: () => void
}) {
  return (
    <div className="border-t border-white/10">
      {/* Row */}
      <div
        className="group flex w-full cursor-pointer items-center justify-between py-7 transition-all duration-200 sm:px-8 sm:py-10 lg:px-24 lg:py-12 md:hover:opacity-40"
        onMouseEnter={() => setModal({ active: true, index })}
        onMouseLeave={() => setModal({ active: false, index })}
        onClick={onToggle}
      >
        <div className="flex items-center gap-5 lg:gap-8">
          <span className="text-[11px] uppercase tracking-[0.32em] text-white/25 transition-all duration-300 group-hover:translate-x-2">
            {step.number}
          </span>
          <h3 className="text-2xl font-medium tracking-[-0.05em] transition-all duration-300 group-hover:translate-x-2 sm:text-3xl md:text-5xl lg:text-6xl">
            {step.title}
          </h3>
        </div>
        <p className="text-[11px] uppercase tracking-[0.24em] text-white/35 transition-all duration-300 group-hover:translate-x-2 sm:text-right">
          {step.meta}
        </p>
      </div>

      {/* Mobile accordion icon */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden md:hidden"
          >
            <div className="mb-5 flex items-center justify-center py-8 sm:px-8">
              <span className="text-8xl leading-none">{step.icon}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function IconModal({ modal, steps }: { modal: ModalState; steps: Step[] }) {
  const { active, index } = modal
  const modalContainer = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    let containerX = 0, containerY = 0
    let targetX = 0, targetY = 0
    let frame = 0

    const animate = () => {
      containerX += (targetX - containerX) * 0.12
      containerY += (targetY - containerY) * 0.12
      if (modalContainer.current) {
        modalContainer.current.style.left = `${containerX}px`
        modalContainer.current.style.top = `${containerY}px`
      }
      frame = requestAnimationFrame(animate)
    }

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX
      targetY = e.clientY
    }

    window.addEventListener("mousemove", handleMouseMove)
    frame = requestAnimationFrame(animate)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <motion.div
      animate={active ? "enter" : "closed"}
      className="pointer-events-none fixed z-30 hidden h-40 w-40 items-center justify-center rounded-full bg-white/8 backdrop-blur-md md:flex"
      initial="initial"
      ref={modalContainer}
      variants={scaleAnimation}
    >
      <span className="text-6xl leading-none select-none">
        {steps[index]?.icon}
      </span>
    </motion.div>
  )
}
