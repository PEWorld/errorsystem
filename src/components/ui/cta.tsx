import { ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CTAProps {
  onContact: () => void
}

export default function CTA({ onContact }: CTAProps) {
  const scrollToWork = () => {
    document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section id="contact" data-theme="dark" className="relative overflow-hidden bg-black py-16 text-white sm:py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">

        <div className="border-t border-white/10 pt-8">
          <p className="mb-8 text-[11px] uppercase tracking-[0.32em] text-white/40">
            Let's work / Error System
          </p>
        </div>

        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-6">
            <h2 className="max-w-4xl text-5xl font-medium leading-[0.88] tracking-[-0.07em] sm:text-6xl md:text-7xl lg:text-[7rem]">
              Ready to make something that can't be ignored?
            </h2>

            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <p className="text-[11px] uppercase tracking-[0.24em] text-white/45">
                Currently accepting projects for Q3 2026 — 2 spots remaining
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 md:shrink-0 md:items-end md:pb-2">
            <Button
              size="lg"
              onClick={onContact}
              className="h-12 w-full rounded-full bg-white px-8 text-black hover:bg-white/85 md:w-auto"
            >
              Start a project <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="ghost"
              onClick={scrollToWork}
              className="h-12 w-full rounded-full px-2 text-white/45 hover:bg-transparent hover:text-white md:w-auto"
            >
              View works
            </Button>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-6 text-[11px] uppercase tracking-[0.24em] text-white/30 sm:flex-row sm:items-center sm:justify-between lg:mt-20">
          <span>© {new Date().getFullYear()} Error System</span>
          <div className="grid grid-cols-2 gap-x-6 gap-y-2 sm:flex sm:flex-wrap sm:gap-6">
            <a href="mailto:borisichinmax@gmail.com" className="transition-colors hover:text-white">
              borisichinmax@gmail.com
            </a>
            <a href="https://www.instagram.com/bymax.cover/" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">
              Instagram
            </a>
            <a href="https://t.me/bory_de" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">
              Telegram
            </a>
            <a href="https://wa.me/79120408338" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">
              WhatsApp
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}
