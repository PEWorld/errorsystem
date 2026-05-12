import { ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HeroProps {
  onContact: () => void
}

function Hero({ onContact }: HeroProps) {
  const scrollToWork = () => {
    document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="w-full">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col justify-between px-6 py-8 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.28em] text-white/55">
          <span>ERROR SYSTEM</span>
          <span>AI Video / Production / Post</span>
        </div>

        <div className="flex flex-1 items-center py-16 sm:py-20 lg:py-24">
          <div className="max-w-5xl">
            <p className="mb-6 text-[11px] uppercase tracking-[0.32em] text-white/45 sm:mb-8">
              AI Video Production Agency
            </p>

            <h1 className="max-w-6xl text-5xl font-medium leading-[0.9] tracking-[-0.07em] text-white sm:text-6xl md:text-7xl lg:text-[7.5rem]">
              We produce cinematic AI videos that make brands impossible to ignore.
            </h1>

            <p className="mt-8 max-w-2xl text-sm leading-7 text-white/68 sm:text-base sm:leading-8 md:text-lg">
              ERROR SYSTEM combines generative AI with cinematic craft to create
              brand films, launch campaigns, and visual worlds that feel unlike
              anything made before — faster, sharper, and built to last.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                size="lg"
                onClick={onContact}
                className="h-12 rounded-full bg-white px-6 text-black hover:bg-white/85"
              >
                Start a project <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="ghost"
                onClick={scrollToWork}
                className="h-12 rounded-full px-2 text-white hover:bg-transparent hover:text-white/65"
              >
                View selected work
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6 border-t border-white/10 pt-5 text-[11px] uppercase tracking-[0.24em] text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <span>Remote · Worldwide</span>
          <span>Built for fashion, culture, tech, and future-facing brands</span>
        </div>
      </div>
    </section>
  )
}

export { Hero }
