"use client"

import { motion, type Variants } from "framer-motion"
import { useEffect, useRef, useState } from "react"

const services = [
  {
    color: "#0b0b0b",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80",
    title: "Web Experiences",
    meta: "Digital Products",
  },
  {
    color: "#d8ff2f",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=900&q=80",
    title: "Brand Systems",
    meta: "Identity Design",
  },
  {
    color: "#c7c7c7",
    image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=900&q=80",
    title: "3D Worlds",
    meta: "CGI / Spatial",
  },
  {
    color: "#ff4f1f",
    image: "https://images.unsplash.com/photo-1626544827763-d516dce335e2?auto=format&fit=crop&w=900&q=80",
    title: "Motion Design",
    meta: "Films / Launches",
  },
  {
    color: "#455ce9",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=900&q=80",
    title: "AI Films",
    meta: "Generative Video",
  },
]

const scaleAnimation: Variants = {
  closed: {
    scale: 0,
    x: "-50%",
    y: "-50%",
    transition: { duration: 0.35, ease: [0.32, 0, 0.67, 0] as [number, number, number, number] },
  },
  enter: {
    scale: 1,
    x: "-50%",
    y: "-50%",
    transition: { duration: 0.35, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] },
  },
  initial: { scale: 0, x: "-50%", y: "-50%" },
}

type ModalState = {
  active: boolean
  index: number
}

type Service = (typeof services)[number]

export default function ServicesWithAnimatedHoverModal() {
  const [modal, setModal] = useState<ModalState>({ active: false, index: 0 })

  return (
    <section className="relative overflow-hidden bg-[#f6f4ef] py-16 text-black sm:py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col justify-between gap-8 border-t border-black/15 pt-8 md:flex-row md:items-start">
          <div>
            <p className="mb-5 text-[11px] uppercase tracking-[0.32em] text-black/45">
              Capabilities / Error System
            </p>
            <h2 className="text-6xl font-medium leading-[0.86] tracking-[-0.08em] text-black sm:text-7xl md:text-8xl lg:text-[8.5rem]">
              Services.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-black/58 sm:text-base sm:leading-8">
            We build complete visual systems for brands that need to look sharp,
            move fast, and feel impossible to ignore across every digital surface.
          </p>
        </div>

        <div className="relative flex min-h-[520px] items-center justify-center py-12 sm:py-16 lg:min-h-[680px] lg:py-20">
          <div className="flex w-full flex-col items-center justify-center">
            {services.map((service, index) => (
              <Project
                index={index}
                key={service.title}
                service={service}
                setModal={setModal}
              />
            ))}
          </div>
          <Modal modal={modal} services={services} />
        </div>
      </div>
    </section>
  )
}

function Project({
  index,
  service,
  setModal,
}: {
  index: number
  service: Service
  setModal: (modal: ModalState) => void
}) {
  return (
    <div
      className="group flex w-full cursor-pointer flex-col gap-4 border-t border-black/20 py-8 transition-all duration-200 last:border-b hover:opacity-50 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-10 lg:px-24 lg:py-12"
      onMouseEnter={() => setModal({ active: true, index })}
      onMouseLeave={() => setModal({ active: false, index })}
    >
      <h3 className="m-0 text-4xl font-normal leading-none tracking-[-0.06em] transition-all duration-300 group-hover:translate-x-2 sm:text-5xl md:text-6xl lg:text-7xl">
        {service.title}
      </h3>
      <p className="text-xs uppercase tracking-[0.24em] text-black/50 transition-all duration-300 group-hover:translate-x-2 sm:text-right">
        {service.meta}
      </p>
    </div>
  )
}

function Modal({ modal, services }: { modal: ModalState; services: Service[] }) {
  const { active, index } = modal
  const modalContainer = useRef<HTMLDivElement | null>(null)
  const cursor = useRef<HTMLDivElement | null>(null)
  const cursorLabel = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    let containerX = 0
    let containerY = 0
    let cursorX = 0
    let cursorY = 0
    let labelX = 0
    let labelY = 0
    let targetX = 0
    let targetY = 0
    let frame = 0

    const animate = () => {
      containerX += (targetX - containerX) * 0.12
      containerY += (targetY - containerY) * 0.12
      cursorX += (targetX - cursorX) * 0.2
      cursorY += (targetY - cursorY) * 0.2
      labelX += (targetX - labelX) * 0.24
      labelY += (targetY - labelY) * 0.24

      if (modalContainer.current) {
        modalContainer.current.style.left = `${containerX}px`
        modalContainer.current.style.top = `${containerY}px`
      }
      if (cursor.current) {
        cursor.current.style.left = `${cursorX}px`
        cursor.current.style.top = `${cursorY}px`
      }
      if (cursorLabel.current) {
        cursorLabel.current.style.left = `${labelX}px`
        cursorLabel.current.style.top = `${labelY}px`
      }

      frame = requestAnimationFrame(animate)
    }

    const handleMouseMove = (event: MouseEvent) => {
      targetX = event.clientX
      targetY = event.clientY
    }

    window.addEventListener("mousemove", handleMouseMove)
    frame = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <>
      <motion.div
        animate={active ? "enter" : "closed"}
        className="pointer-events-none fixed z-30 hidden h-[22rem] w-[25rem] items-center justify-center overflow-hidden bg-white shadow-2xl shadow-black/20 md:flex"
        initial="initial"
        ref={modalContainer}
        variants={scaleAnimation}
      >
        <div
          className="absolute h-full w-full transition-[top] duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
          style={{ top: `${index * -100}%` }}
        >
          {services.map((service) => (
            <div
              className="flex h-full w-full items-center justify-center p-10"
              key={service.title}
              style={{ backgroundColor: service.color }}
            >
              <img
                alt={`${service.title} preview`}
                className="h-full w-full object-cover grayscale"
                src={service.image}
              />
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        animate={active ? "enter" : "closed"}
        className="pointer-events-none fixed z-40 hidden h-20 w-20 items-center justify-center rounded-full bg-black text-sm font-light text-white md:flex"
        initial="initial"
        ref={cursor}
        variants={scaleAnimation}
      />
      <motion.div
        animate={active ? "enter" : "closed"}
        className="pointer-events-none fixed z-40 hidden h-20 w-20 items-center justify-center rounded-full bg-transparent text-sm font-light text-white md:flex"
        initial="initial"
        ref={cursorLabel}
        variants={scaleAnimation}
      >
        View
      </motion.div>
    </>
  )
}
