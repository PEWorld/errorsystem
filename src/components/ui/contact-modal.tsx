"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

interface ContactModalProps {
  open: boolean
  onClose: () => void
}

export function ContactModal({ open, onClose }: ContactModalProps) {
  const [form, setForm] = useState({ name: "", email: "", message: "" })
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle")

  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [open, onClose])

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [open])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("sending")
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: "f7c890f5-719c-4bf0-912f-13b45da5200b",
          name: form.name,
          email: form.email,
          message: form.message,
          subject: `New project inquiry from ${form.name}`,
        }),
      })
      const data = await res.json()
      if (data.success) {
        setStatus("sent")
        setTimeout(() => {
          onClose()
          setStatus("idle")
          setForm({ name: "", email: "", message: "" })
        }, 3000)
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Mobile: slide up from bottom. Desktop: centered */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-3 bottom-3 z-[101] max-h-[88vh] overflow-y-auto rounded-3xl bg-[#f6f4ef] px-6 pb-8 pt-7 sm:inset-x-auto sm:bottom-auto sm:left-1/2 sm:top-1/2 sm:w-full sm:max-w-md sm:-translate-x-1/2 sm:-translate-y-1/2 sm:px-10"
          >
            <button
              onClick={onClose}
              className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full bg-black/8 text-black/45 transition-colors hover:bg-black/15 hover:text-black"
            >
              <X className="h-4 w-4" />
            </button>

            {status === "sent" ? (
              <div className="flex min-h-[160px] flex-col items-center justify-center gap-3 text-center">
                <p className="text-2xl font-medium tracking-[-0.05em]">Message sent!</p>
                <p className="text-sm text-black/50">We'll get back within 24 hours.</p>
              </div>
            ) : (
              <>
                <p className="mb-1 text-[10px] uppercase tracking-[0.36em] text-black/40">
                  Start a project
                </p>
                <h2 className="mb-6 text-2xl font-medium tracking-[-0.05em]">
                  Tell us about your project
                </h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <label className="flex flex-col gap-1.5">
                    <span className="text-[10px] uppercase tracking-[0.28em] text-black/40">Name *</span>
                    <input
                      required
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      className="rounded-xl border border-black/15 bg-white/60 px-4 py-2.5 text-sm outline-none placeholder:text-black/25 focus:border-black/35"
                      placeholder="Alex Smith"
                    />
                  </label>

                  <label className="flex flex-col gap-1.5">
                    <span className="text-[10px] uppercase tracking-[0.28em] text-black/40">Email *</span>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      className="rounded-xl border border-black/15 bg-white/60 px-4 py-2.5 text-sm outline-none placeholder:text-black/25 focus:border-black/35"
                      placeholder="alex@brand.com"
                    />
                  </label>

                  <label className="flex flex-col gap-1.5">
                    <span className="text-[10px] uppercase tracking-[0.28em] text-black/40">Project brief *</span>
                    <textarea
                      required
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      rows={4}
                      className="resize-none rounded-xl border border-black/15 bg-white/60 px-4 py-2.5 text-sm outline-none placeholder:text-black/25 focus:border-black/35"
                      placeholder="What do you need, what's the deadline, any references?"
                    />
                  </label>

                  {status === "error" && (
                    <p className="text-[11px] text-red-500">
                      Something went wrong — write us directly below.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="h-12 w-full rounded-full bg-black text-[11px] font-medium uppercase tracking-[0.2em] text-white transition-colors hover:bg-black/80 disabled:opacity-50"
                  >
                    {status === "sending" ? "Sending…" : "Send inquiry"}
                  </button>
                </form>

                {/* Соцсети */}
                <div className="mt-6 border-t border-black/10 pt-5">
                  <p className="mb-3 text-[10px] uppercase tracking-[0.28em] text-black/35">
                    Or reach us directly
                  </p>
                  <div className="flex gap-2">
                    {[
                      { label: "Telegram", href: "https://t.me/bory_de" },
                      { label: "WhatsApp", href: "https://wa.me/79120408338" },
                      { label: "Instagram", href: "https://www.instagram.com/bymax.cover/" },
                    ].map(({ label, href }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          "flex h-10 flex-1 items-center justify-center rounded-xl border border-black/12 bg-white/50",
                          "text-[10px] uppercase tracking-[0.15em] text-black/50 transition-colors hover:border-black/25 hover:text-black",
                        )}
                      >
                        {label}
                      </a>
                    ))}
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
