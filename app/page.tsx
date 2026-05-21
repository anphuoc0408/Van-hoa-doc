"use client";

import { useState } from "react"
import Navigation from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { AudioCenter } from "@/components/audio-center"
import { CharacterCards } from "@/components/character-cards"
import { SocialSidebar } from "@/components/social-sidebar"

export default function Home() {
  const [currentPage, setCurrentPage] = useState(0)
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
     <Navigation
  currentPage={currentPage}
  setCurrentPage={setCurrentPage}
/> 

      <HeroSection setCurrentPage={setCurrentPage} />

      <AudioCenter />

      <CharacterCards />

      <SocialSidebar />
    </main>
  );
}