import { Hero } from "@/components/ui/animated-hero"
import AnoAI from "@/components/ui/animated-shader-background"
import Logos from "@/components/ui/logos"
import Services from "@/components/ui/services"
import { ImageGallery } from "@/components/ui/image-gallery"
import About from "@/components/ui/about"
import Process from "@/components/ui/process"
import FAQ from "@/components/ui/faq"
import CTA from "@/components/ui/cta"

interface DemoOneProps {
  onContact: () => void
}

const DemoOne = ({ onContact }: DemoOneProps) => {
  return (
    <main className="relative w-full overflow-hidden bg-black">

      {/* 1. Крючок */}
      <section data-theme="dark" className="relative min-h-screen overflow-hidden bg-black">
        <AnoAI />
        <div className="relative z-10">
          <Hero onContact={onContact} />
        </div>
      </section>

      <Logos />
      <Services />
      <ImageGallery />
      <About />
      <Process />
      <FAQ />
      <CTA onContact={onContact} />

    </main>
  )
}

export { DemoOne }
