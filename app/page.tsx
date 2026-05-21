"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import StoryMap from "@/components/story-map"

export default function Home() {
  const [currentPage, setCurrentPage] = useState(0)

  return (
    <main>
      <Navigation
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      <StoryMap />
    </main>
  )
}
