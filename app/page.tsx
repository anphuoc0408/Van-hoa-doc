"use client";

import Navigation from "@/components/navigation";
import StoryMap from "@/components/story-map";

export default function Home() {
  return (
    <main>
      <Navigation
        currentPage={0}
        setCurrentPage={() => {}}
      />

      <StoryMap />
    </main>
  );
}