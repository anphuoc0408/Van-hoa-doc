"use client";

import { useRouter } from "next/navigation";
import Navigation from "@/components/navigation";
import StoryMap from "@/components/story-map";

export default function StoryMapPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-black text-white">
      <Navigation
        currentPage={3}
        setCurrentPage={(page) => {
          if (page === 0) router.push("/");
          if (page === 1) router.push("/podcast");
          if (page === 2) router.push("/characters");
          if (page === 3) router.push("/storymap");
        }}
      />

      <StoryMap />
    </main>
  );
}