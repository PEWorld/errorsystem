import { useState } from "react"
import Header from "@/components/ui/header"
import { DemoOne } from "@/components/ui/demo"
import { ContactModal } from "@/components/ui/contact-modal"

function App() {
  const [contactOpen, setContactOpen] = useState(false)
  const openContact = () => setContactOpen(true)

  return (
    <>
      <Header />
      <DemoOne onContact={openContact} />
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  )
}

export default App
