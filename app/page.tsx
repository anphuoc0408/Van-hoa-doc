"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { AudioCenter } from "@/components/audio-center"
import { CharacterCards } from "@/components/character-cards"
import { AIAssistant } from "@/components/ai-assistant"
import { SocialSidebar } from "@/components/social-sidebar"
import { StoryMap } from "@/components/story-map"

export default function ReadConnectApp() {
  // Keep navigation for the whole site, but the cinematic StoryMap becomes the focus.
  const [currentPage, setCurrentPage] = useState(3)

  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="fixed inset-0 pointer-events-none opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(138, 43, 226, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(138, 43, 226, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />

      <AnimatePresence mode="wait">
        {currentPage === 3 ? (
          <motion.div
            key={3}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.35 }}
            className="lg:mr-0"
          >
            <StoryMap />
          </motion.div>
        ) : (
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.35 }}
            className="lg:mr-80"
          >
            {/* Fallback to original pages if user navigates away */}
            {currentPage === 0 && <HeroSection setCurrentPage={setCurrentPage} />}
            {currentPage === 1 && <AudioCenter />}
            {currentPage === 2 && <CharacterCards />}
          </motion.div>
        )}
      </AnimatePresence>

      <AIAssistant />
      <SocialSidebar />
    </main>
  )
}

