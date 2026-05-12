"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { label: "Work",     href: "#work" },
  { label: "Services", href: "#services" },
  { label: "About",    href: "#about" },
  { label: "Process",  href: "#process" },
  { label: "Contact",  href: "#contact" },
]

type Pos = { left: number; width: number; opacity: number }

// ─── Desktop sliding nav ───────────────────────────────────────────────────

function SlidingNav({ isDark }: { isDark: boolean }) {
  const [pos, setPos] = useState<Pos>({ left: 0, width: 0, opacity: 0 })
  const [activeHref, setActiveHref] = useState<string | null>(null)

  return (
    <ul
      className={cn(
        "relative hidden items-center rounded-full border p-1 backdrop-blur-sm transition-colors duration-500 md:flex",
        isDark ? "border-white/20 bg-white/5" : "border-black/20 bg-black/5",
      )}
      onMouseLeave={() => { setPos(p => ({ ...p, opacity: 0 })); setActiveHref(null) }}
    >
      {navItems.map(item => (
        <NavTab
          key={item.label}
          href={item.href}
          isDark={isDark}
          isActive={activeHref === item.href}
          setPos={setPos}
          setActiveHref={setActiveHref}
        >
          {item.label}
        </NavTab>
      ))}
      <motion.li
        animate={pos}
        className={cn(
          "pointer-events-none absolute z-0 h-7 rounded-full transition-colors duration-500",
          isDark ? "bg-white" : "bg-black",
        )}
      />
    </ul>
  )
}

function NavTab({
  children, href, isDark, isActive, setPos, setActiveHref,
}: {
  children: React.ReactNode
  href: string
  isDark: boolean
  isActive: boolean
  setPos: (p: Pos) => void
  setActiveHref: (href: string | null) => void
}) {
  const ref = useRef<HTMLLIElement>(null)
  return (
    <li
      ref={ref}
      className="relative z-10 cursor-pointer"
      onMouseEnter={() => {
        if (!ref.current) return
        const { width } = ref.current.getBoundingClientRect()
        setPos({ width, opacity: 1, left: ref.current.offsetLeft })
        setActiveHref(href)
      }}
    >
      <a
        href={href}
        className={cn(
          "block px-4 py-1.5 text-[11px] uppercase tracking-[0.2em] transition-colors duration-150",
          isActive
            ? isDark ? "text-black" : "text-white"
            : isDark ? "text-white" : "text-black",
        )}
        onClick={e => { e.preventDefault(); document.querySelector(href)?.scrollIntoView({ behavior: "smooth" }) }}
      >
        {children}
      </a>
    </li>
  )
}

// ─── Mobile fullscreen menu ────────────────────────────────────────────────

function MobileMenu({ isDark, visible }: { isDark: boolean; visible: boolean }) {
  const [open, setOpen] = useState(false)

  const handleLink = (href: string) => {
    setOpen(false)
    setTimeout(() => document.querySelector(href)?.scrollIntoView({ behavior: "smooth" }), 350)
  }

  // Lock scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [open])

  return (
    <>
      {/* Trigger — floating pill bottom-center */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        className={cn(
          "fixed bottom-5 left-1/2 z-50 -translate-x-1/2 flex h-11 items-center gap-2.5 rounded-full border px-5 backdrop-blur-md transition-all duration-500 md:hidden",
          visible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0 pointer-events-none",
          isDark ? "border-white/20 bg-black/70 text-white" : "border-black/15 bg-white/80 text-black",
        )}
      >
        <Menu className="h-3.5 w-3.5" strokeWidth={2} />
        <span className="text-[10px] uppercase tracking-[0.22em]">Menu</span>
      </button>

      {/* Fullscreen overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[200] flex flex-col bg-black md:hidden"
          >
            {/* Header row */}
            <div className="flex items-center justify-between px-6 py-5">
              <span className="text-[11px] font-medium uppercase tracking-[0.28em] text-white/50">
                Error System
              </span>
              <button
                onClick={() => setOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/50 transition-colors hover:border-white/30 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex flex-1 flex-col justify-center px-6 pb-8">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.07, ease: [0.22, 1, 0.36, 1], duration: 0.45 }}
                  onClick={e => { e.preventDefault(); handleLink(item.href) }}
                  className="border-t border-white/8 py-5 text-5xl font-medium tracking-[-0.07em] text-white transition-colors duration-200 hover:text-white/60 active:text-white/60"
                >
                  {item.label}
                </motion.a>
              ))}
              <div className="border-t border-white/8" />
            </nav>

            {/* Footer row */}
            <div className="flex items-center justify-between px-6 pb-8 text-[10px] uppercase tracking-[0.24em] text-white/25">
              <span>borisichinmax@gmail.com</span>
              <span>© {new Date().getFullYear()}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// ─── Header root ──────────────────────────────────────────────────────────

export default function Header() {
  const [visible, setVisible] = useState(false)
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    const HEADER_Y = 40
    const update = () => {
      setVisible(window.scrollY > 80)
      const sections = document.querySelectorAll<HTMLElement>("[data-theme]")
      let theme = "dark"
      sections.forEach(el => {
        const rect = el.getBoundingClientRect()
        if (rect.top <= HEADER_Y && rect.bottom >= HEADER_Y) theme = el.dataset.theme ?? "dark"
      })
      setIsDark(theme === "dark")
    }
    window.addEventListener("scroll", update, { passive: true })
    update()
    return () => window.removeEventListener("scroll", update)
  }, [])

  return (
    <>
      {/* Desktop — top pill */}
      <header
        className={cn(
          "fixed left-0 right-0 top-0 z-50 hidden items-center justify-center py-3.5 transition-all duration-500 md:flex",
          visible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none",
        )}
      >
        <SlidingNav isDark={isDark} />
      </header>

      {/* Mobile — bottom pill + fullscreen menu */}
      <MobileMenu isDark={isDark} visible={visible} />
    </>
  )
}
