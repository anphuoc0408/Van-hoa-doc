"use client"

import { motion } from "framer-motion"
import { ArrowRight, BookOpen, Headphones, Sparkles, Users } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HeroSectionProps {
  setCurrentPage: (page: number) => void
}

export function HeroSection({ setCurrentPage }: HeroSectionProps) {
  return (
    <section className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center relative overflow-hidden">
      {/* Animated map-line background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[520px] rounded-[999px] bg-primary/10 blur-3xl"
          animate={{ opacity: [0.15, 0.25, 0.15], scale: [0.98, 1.05, 0.98] }}
          transition={{ duration: 7, repeat: Infinity }}
        />

        {/* SVG line: Sa Đéc → Paris → Vietnam */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1200 800"
          preserveAspectRatio="none"
          aria-hidden
        >
          <defs>
            <linearGradient id="heroLine" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(138,43,226,0.05)" />
              <stop offset="25%" stopColor="rgba(212,175,55,0.35)" />
              <stop offset="60%" stopColor="rgba(56,189,248,0.35)" />
              <stop offset="100%" stopColor="rgba(138,43,226,0.05)" />
            </linearGradient>
            <filter id="heroGlow">
              <feGaussianBlur stdDeviation="6" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <path
            d="M 430 500 C 520 380 630 320 720 260 S 940 120 980 140"
            fill="none"
            stroke="url(#heroLine)"
            strokeWidth="3"
            strokeDasharray="10 10"
            filter="url(#heroGlow)"
            strokeLinecap="round"
          />
          <path
            d="M 980 140 C 910 190 840 260 760 340 S 600 520 500 640"
            fill="none"
            stroke="rgba(56,189,248,0.35)"
            strokeWidth="2"
            strokeDasharray="6 8"
            filter="url(#heroGlow)"
            strokeLinecap="round"
          />
          {/* Moving dash */}
          <motion.path
            d="M 430 500 C 520 380 630 320 720 260 S 940 120 980 140"
            fill="none"
            stroke="rgba(212,175,55,0.9)"
            strokeWidth="2.5"
            strokeLinecap="round"
            filter="url(#heroGlow)"
            strokeDasharray="14 14"
            initial={{ strokeDashoffset: 0 }}
            animate={{ strokeDashoffset: -280 }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "linear" }}
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">A Digital StoryMap Experience</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
<span className="block">Kết Nối</span>
            <span className="block text-primary neon-text">Văn Hóa Đọc</span>
            <span className="block text-accent">Việt Nam</span>
          </h1>

          
        </motion.div>
      </div>
    </section>
  )
}

