"use client";

import Navigation from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { AudioCenter } from "@/components/audio-center";
import { CharacterCards } from "@/components/character-cards";
import { SocialSidebar } from "@/components/social-sidebar";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      <Navigation
        currentPage={0}
        setCurrentPage={() => {}}
        />  

      <HeroSection setCurrentPage={() => {}} />

      <AudioCenter />

      <CharacterCards />

      <SocialSidebar />
    </main>
  );
}