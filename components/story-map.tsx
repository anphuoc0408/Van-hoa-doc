"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

type Tone = "childhood" | "prison" | "family" | "paris" | "education" | "digital"

type Slide = {
  id: number
  phase: Tone
  coordinates: [number, number] // [lng, lat]
  zoom: number
  title: string
  year: string
  narrative: string // right-side narrative (<120 words)
  quote: string
  markerKind: "note" | "flame" | "dot" | "gold" | "green" | "neon"
}

const slidesData: Slide[] = [
  {
    id: 1,
    phase: "childhood",
    coordinates: [105.8647, 10.2323],
    zoom: 12,
    title: "Cái nôi văn hóa và Tuổi thơ",
    year: "(1927 – 1940)",
    narrative:
      "Hình bóng miền sông nước và những câu chuyện tạo nên nền tảng tinh thần. Văn hóa không chỉ là kiến thức—mà là ký ức: mềm, ấm, và bền bỉ. Từ đó, hành trình sau này bắt đầu bằng sự hiểu mình và tin vào ngày mai.",
    quote: "Tuổi thơ tôi được dệt bằng những câu chuyện về lòng yêu nước và kỷ luật của trái tim.",
    markerKind: "note",
  },
  {
    id: 2,
    phase: "prison",
    coordinates: [106.6744, 10.7797],
    zoom: 15,
    title: "Bản lĩnh người chiến sĩ trẻ",
    year: "(1951 – 1954)",
    narrative:
      "Trong bóng tối, niềm tin trở thành ánh sáng. Thử thách rèn luyện sự kiên cường: im lặng không phải để khuất phục, mà để tích tụ ý chí. Mỗi lần đứng dậy là một lần định nghĩa lại hy vọng.",
    quote: "Trái tim tôi học cách cháy—ngay cả khi mọi thứ xung quanh trở nên lạnh lẽo.",
    markerKind: "flame",
  },
  {
    id: 3,
    phase: "family",
    coordinates: [105.7952, 21.0370],
    zoom: 14,
    title: "Hậu phương và Sứ mệnh mới",
    year: "(1954 – 1962)",
    narrative:
      "Khi gia đình và lý tưởng hòa làm một, sự chuẩn bị trở thành một hành động. Hà Nội mở ra những trang mới: tri thức, kỷ luật và trách nhiệm. Tình thương biến thành sức mạnh—để sẵn sàng bước ra thế giới.",
    quote: "Gia đình cho tôi một nền móng; lý tưởng dạy tôi phải sống có mục đích.",
    markerKind: "dot",
  },
  {
    id: 4,
    phase: "paris",
    coordinates: [2.2925, 48.8715],
    zoom: 6,
    title: "Bản lĩnh Việt Nam trên bàn đàm phán quốc tế",
    year: "(1968 – 1973)",
    narrative:
      "Paris không chỉ là địa điểm—đó là sân khấu của ngoại giao. Giữa ánh đèn và những cuộc tranh luận dài, một dân tộc kiên cường đòi quyền tự quyết. Khi từ Đông sang Tây được nối bằng niềm tin, thế giới lắng nghe.",
    quote: "Chúng tôi đến Paris để đòi tự do—và mang hòa bình về đúng nghĩa.",
    markerKind: "gold",
  },
  {
    id: 5,
    phase: "education",
    coordinates: [105.8488, 21.0115],
    zoom: 15,
    title: "Kiến tạo nền móng giáo dục hòa bình",
    year: "(1976 – 1987)",
    narrative:
      "Giáo dục là con đường dài—được xây bằng kiên nhẫn và tầm nhìn. Từ sau chiến tranh, sự công bằng tri thức trở thành nhiệm vụ. Những đổi thay nhỏ hôm nay sẽ trở thành sức mạnh của mai sau.",
    quote: "Dạy cho người trẻ biết suy nghĩ đúng đắn—là trao cho họ tự do thật sự.",
    markerKind: "green",
  },
  {
    id: 6,
    phase: "digital",
    coordinates: [106.6921, 10.7795],
    zoom: 16,
    title: "Sự tiếp nối của lý tưởng “Live like her”",
    year: "(2026)",
    narrative:
      "Thế hệ mới tiếp tục bằng kỹ thuật số: lan tỏa giá trị, kết nối cộng đồng, biến cảm xúc thành hành động. Live Like Her trở thành một lời hứa—sáng, nhanh, và có trách nhiệm.",
    quote: "Khi bạn học cách sống như điều mình tin, câu chuyện sẽ không bao giờ kết thúc.",
    markerKind: "neon",
  },
]

export default function StoryMap() {
  const rootRef = useRef<HTMLDivElement>(null)

  const MAP_W = 1000
  const MAP_H = 620

  // camera
  const [activeIndex, setActiveIndex] = useState(0)
  const [quoteOpenIndex, setQuoteOpenIndex] = useState<number | null>(0)

  // Paris zoom animation: continental -> street(zoom 16)
  const [parisZoomPhase, setParisZoomPhase] = useState<"continental" | "street">("continental")

  const active = slidesData[activeIndex]

  const mapLongToX = (longitude: number) => ((longitude + 20) / 160) * MAP_W
  const mapLatToY = (latitude: number) => ((90 - latitude) / 120) * MAP_H
  const toXY = (coords: [number, number]) => ({ x: mapLongToX(coords[0]), y: mapLatToY(coords[1]) })
  const activeXY = toXY(active.coordinates)

  const cameraScale = (() => {
    if (active.phase === "paris") return 6
    return active.zoom
  })()
  const cameraScale2 = active.phase === "paris" ? 16 : cameraScale

  useEffect(() => {
    if (active.phase !== "paris") return
    setParisZoomPhase("continental")
    const t = window.setTimeout(() => setParisZoomPhase("street"), 1400)
    return () => window.clearTimeout(t)
  }, [active.phase])

  const finalScale =
    active.phase === "paris" ? (parisZoomPhase === "street" ? cameraScale2 : cameraScale) : cameraScale

  const centerX = MAP_W / 2
  const centerY = MAP_H / 2
  const translateX = centerX - activeXY.x
  const translateY = centerY - activeXY.y

  const themeByPhase = (phase: Tone) => {
    switch (phase) {
      case "childhood":
        return { toneBg: "tone-childhood" }
      case "prison":
        return { toneBg: "tone-prison" }
      case "family":
        return { toneBg: "tone-family" }
      case "paris":
        return { toneBg: "tone-paris" }
      case "education":
        return { toneBg: "tone-education" }
      case "digital":
        return { toneBg: "tone-digital" }
      default:
        return { toneBg: "" }
    }
  }

  const { toneBg } = themeByPhase(active.phase)

  // Scroll-triggered slide switching
  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const els = Array.from(root.querySelectorAll<HTMLElement>("[data-slide]"))
    if (!els.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const intersecting = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))
        const top = intersecting[0]
        if (!top) return
        const idxStr = (top.target as HTMLElement).dataset.slide
        const idx = idxStr ? Number(idxStr) : 0
        setActiveIndex(idx)
      },
      { threshold: [0.35, 0.5, 0.65], rootMargin: "-10% 0px -55% 0px" }
    )

    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const quoteIdx = quoteOpenIndex ?? -1
  const showQuote = quoteIdx >= 0 && quoteIdx < slidesData.length
  const quoteSlide = showQuote ? slidesData[quoteIdx] : null
  const quoteXY = quoteSlide ? toXY(quoteSlide.coordinates) : null

  const [musicOn, setMusicOn] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (!audioRef.current) return
    if (musicOn) {
      audioRef.current.volume = 0.25
      audioRef.current.play().catch(() => {})
    } else {
      audioRef.current.pause()
    }
  }, [musicOn])

  const flyTo = (idx: number) => {
    setActiveIndex(idx)
    setQuoteOpenIndex(idx)
  }

  return (
    <div ref={rootRef} className="min-h-screen bg-background">
      {/* HERO */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background to-background" />
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] rounded-full bg-primary/10 blur-3xl" />

          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="none" aria-hidden>
            <defs>
              <filter id="heroRouteGlow">
                <feGaussianBlur stdDeviation="6" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <linearGradient id="heroRoute" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(212,175,55,0.4)" />
                <stop offset="55%" stopColor="rgba(56,189,248,0.45)" />
                <stop offset="100%" stopColor="rgba(138,43,226,0.35)" />
              </linearGradient>
            </defs>
            {/* Sa Đéc → Paris route (stylized) */}
            <path
              d="M 430 520 C 520 400 650 320 720 270 S 940 120 980 140"
              fill="none"
              stroke="url(#heroRoute)"
              strokeWidth="3"
              strokeDasharray="12 12"
              strokeLinecap="round"
              filter="url(#heroRouteGlow)"
            />
            <motion.path
              d="M 430 520 C 520 400 650 320 720 270 S 940 120 980 140"
              fill="none"
              stroke="rgba(212,175,55,0.95)"
              strokeWidth="2.5"
              strokeDasharray="16 16"
              strokeLinecap="round"
              filter="url(#heroRouteGlow)"
              initial={{ strokeDashoffset: 0 }}
              animate={{ strokeDashoffset: -320 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
          </svg>
        </div>

        {/* Optional background music toggle */}
        <div className="absolute top-24 right-4 sm:right-8 z-10">
          <button
            type="button"
            className="glass px-3 py-2 rounded-full border border-primary/20 text-sm flex items-center gap-2 hover:neon-purple transition"
            onClick={() => setMusicOn((v) => !v)}
          >
            <span className={`w-2.5 h-2.5 rounded-full ${musicOn ? "bg-primary" : "bg-muted"}`} />
            <span className="text-foreground/90">Nhạc nền</span>
            <span className="text-muted-foreground">{musicOn ? "Bật" : "Tắt"}</span>
          </button>
          <audio ref={audioRef} src="/placeholder.mp3" loop />
        </div>

        <div className="relative z-10 text-center px-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-sm text-primary font-medium">A Digital StoryMap Experience</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight">
<span className="block">Kết Nối</span>
            <span className="block text-primary neon-text">Văn Hóa Đọc</span>
            <span className="block text-accent">Việt Nam</span>
          </h1>

          <p className="mt-5 text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Cinematic scrolling with interactive markers, quote popups, and smooth fly-to map transitions.
          </p>

          <button
            type="button"
            onClick={() => document.getElementById("story-start")?.scrollIntoView({ behavior: "smooth", block: "start" })}
            className="mt-8 bg-primary text-primary-foreground px-8 py-4 rounded-2xl text-lg font-semibold neon-purple hover:bg-primary/90 transition"
          >
            Start the Journey
          </button>
        </div>
      </section>

      {/* STICKY TIMELINE DOTS */}
      <div className="sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between gap-3 glass border border-border/40 rounded-2xl px-3">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-primary/20 flex items-center justify-center neon-purple">
                <span className="w-2.5 h-2.5 rounded-full bg-primary" />
              </div>
              <div>
                <div className="text-sm font-semibold">Timeline</div>
                <div className="text-xs text-muted-foreground">Scroll to move • Click a dot</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {slidesData.map((s, idx) => (
                <button
                  key={s.id}
                  type="button"
                  aria-label={`Go to slide ${idx + 1}`}
                  onClick={() => {
                    document.getElementById(`slide-${s.id}`)?.scrollIntoView({ behavior: "smooth", block: "start" })
                    flyTo(idx)
                  }}
                  className={`w-3.5 h-3.5 rounded-full transition-all ${
                    idx === activeIndex
                      ? "bg-primary shadow-[0_0_18px_rgba(138,43,226,0.6)]"
                      : "bg-muted"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* SLIDES */}
      <div id="story-start" className="relative">
        <div className="grid lg:grid-cols-2 gap-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Sticky map on desktop */}
          <div className="lg:sticky lg:top-[92px] self-start hidden lg:block">
            <div className={`relative rounded-3xl overflow-hidden border border-border/50 ${toneBg}`}>
              {/* loading animation line path */}
              <div className="absolute inset-0 pointer-events-none opacity-70">
                <svg viewBox={`0 0 ${MAP_W} ${MAP_H}`} className="w-full h-full" preserveAspectRatio="xMidYMid meet">
                  <defs>
                    <linearGradient id="loadPath" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="rgba(138,43,226,0.2)" />
                      <stop offset="50%" stopColor="rgba(212,175,55,0.35)" />
                      <stop offset="100%" stopColor="rgba(56,189,248,0.35)" />
                    </linearGradient>
                  </defs>
                  <motion.path
                    d={`M ${mapLongToX(slidesData[0].coordinates[0])} ${mapLatToY(slidesData[0].coordinates[1])} C ${mapLongToX(
                      115
                    )} ${mapLatToY(15)} ${mapLongToX(50)} ${mapLatToY(30)} ${mapLongToX(slidesData[3].coordinates[0])} ${mapLatToY(slidesData[3].coordinates[1])}`}
                    fill="none"
                    stroke="url(#loadPath)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray="14 10"
                    animate={{ strokeDashoffset: -240 }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
                  />
                </svg>
              </div>

              <svg viewBox={`0 0 ${MAP_W} ${MAP_H}`} className="w-full h-full" preserveAspectRatio="xMidYMid meet">
                <defs>
                  <filter id="cameraGlow">
                    <feGaussianBlur stdDeviation="6" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <linearGradient id="landGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(138,43,226,0.25)" />
                    <stop offset="100%" stopColor="rgba(138,43,226,0.06)" />
                  </linearGradient>
                </defs>

                <motion.g
                  animate={{ transform: `translate(${translateX}px ${translateY}px) scale(${finalScale})` }}
                  transition={{ duration: 0.9, ease: "easeInOut" }}
                >
                  {/* Minimal silhouettes (stylized “world map”) */}
                  <g opacity={0.35}>
                    <path
                      d="M220 250 C260 210 320 190 380 220 C420 240 450 290 440 330 C425 390 330 420 275 400 C220 380 190 300 220 250 Z"
                      fill="url(#landGrad)"
                    />
                    <path
                      d="M520 110 C570 80 650 90 690 140 C720 180 705 240 660 260 C610 282 535 260 512 210 C495 170 485 130 520 110 Z"
                      fill="url(#landGrad)"
                    />
                    <path
                      d="M630 360 C680 330 760 340 800 390 C830 430 820 495 770 515 C720 535 650 510 620 460 C600 430 590 385 630 360 Z"
                      fill="url(#landGrad)"
                    />
                  </g>

                  {/* connection between slides (up to active) */}
                  {slidesData.slice(0, activeIndex + 1).map((s, i) => {
                    if (i === 0) return null
                    const prev = slidesData[i - 1]
                    const p = toXY(prev.coordinates)
                    const c = toXY(s.coordinates)
                    return (
                      <motion.path
                        key={`c-${s.id}`}
                        d={`M ${p.x} ${p.y} Q ${(p.x + c.x) / 2} ${(p.y + c.y) / 2 - 120} ${c.x} ${c.y}`}
                        fill="none"
                        stroke="rgba(56,189,248,0.35)"
                        strokeWidth="2"
                        strokeDasharray="8 6"
                      />
                    )
                  })}

                  {/* markers */}
                  {slidesData.map((s, idx) => {
                    const { x, y } = toXY(s.coordinates)
                    const isActive = idx === activeIndex
                    const isPast = idx < activeIndex

                    const onClick = () => {
                      setActiveIndex(idx)
                      setQuoteOpenIndex(idx)
                    }

                    return (
                      <g
                        key={s.id}
                        opacity={isActive ? 1 : 0.75}
                        filter={isActive ? "url(#cameraGlow)" : undefined}
                      >
                        {isActive && (
                          <motion.circle
                            cx={x}
                            cy={y}
                            r={28}
                            fill="rgba(138,43,226,0.25)"
                            initial={{ scale: 0.65, opacity: 0.85 }}
                            animate={{ scale: 1.9, opacity: 0 }}
                            transition={{ duration: 1.7, repeat: Infinity, ease: "easeOut" }}
                            stroke="transparent"
                          />
                        )}

                        {s.markerKind === "flame" ? (
                          <path
                            d={`M ${x} ${y - 22} C ${x - 8} ${y - 5} ${x - 3} ${y + 2} ${x - 10} ${y + 14} C ${x - 2} ${y + 10} ${x + 2} ${y + 8} ${x + 10} ${y + 14} C ${x + 3} ${y + 2} ${x + 8} ${y - 5} ${x} ${y - 22} Z`}
                            fill="rgba(239,68,68,0.95)"
                            stroke="rgba(255,255,255,0.25)"
                            strokeWidth={2}
                            onClick={onClick}
                            style={{ cursor: "pointer" }}
                          />
                        ) : s.markerKind === "gold" ? (
                          <g>
                            <circle cx={x} cy={y} r={isActive ? 16 : 12} fill="rgba(212,175,55,0.95)" />
                            <circle cx={x} cy={y} r={isActive ? 30 : 22} fill="rgba(212,175,55,0.15)" />
                          </g>
                        ) : s.markerKind === "note" ? (
                          <g>
                            <rect
                              x={x - 14}
                              y={y - 12}
                              width={28}
                              height={24}
                              rx={8}
                              fill="rgba(240,230,210,0.95)"
                              stroke="rgba(0,0,0,0.25)"
                              strokeWidth={2}
                              onClick={onClick}
                              style={{ cursor: "pointer" }}
                            />
                            <text
                              x={x}
                              y={y + 5}
                              textAnchor="middle"
                              fontSize={12}
                              fill="rgba(0,0,0,0.6)"
                              fontStyle="italic"
                            >
                              ✎
                            </text>
                          </g>
                        ) : s.markerKind === "green" ? (
                          <g>
                            <circle cx={x} cy={y} r={isActive ? 16 : 12} fill="rgba(34,197,94,0.9)" />
                            <circle cx={x} cy={y} r={isActive ? 30 : 22} fill="rgba(34,197,94,0.12)" />
                          </g>
                        ) : s.markerKind === "neon" ? (
                          <g>
                            <circle
                              cx={x}
                              cy={y}
                              r={isActive ? 14 : 10}
                              fill="rgba(59,130,246,0.95)"
                              stroke="rgba(0,0,0,0.25)"
                              onClick={onClick}
                              style={{ cursor: "pointer" }}
                            />
                            {isActive && (
                              <motion.circle
                                cx={x}
                                cy={y}
                                r={26}
                                fill="rgba(99,102,241,0.12)"
                                initial={{ opacity: 0.4 }}
                                animate={{ opacity: 0 }}
                                transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }}
                              />
                            )}
                          </g>
                        ) : (
                          <g>
                            <circle cx={x} cy={y} r={isActive ? 14 : 10} fill="rgba(168,85,247,0.6)" onClick={onClick} style={{ cursor: "pointer" }} />
                          </g>
                        )}

                        {!isActive && isPast && <circle cx={x} cy={y} r={4} fill="rgba(138,43,226,0.35)" />}
                      </g>
                    )
                  })}

                  {/* quote popup */}
                  {showQuote && quoteXY && (
                    <foreignObject x={quoteXY.x - 110} y={quoteXY.y - 110} width={220} height={150}>
                      <div
                        className={`quote-popup ${quoteSlide?.phase === "childhood" ? "quote-handwritten" : "quote-card"}`}
                      >
                        <div className="quote-title">Trích dẫn</div>
                        <div className="quote-text">“{quoteSlide?.quote}”</div>
                        <div className="quote-author">— Nguyễn Thị Bình</div>
                        <button
                          type="button"
                          className="quote-close"
                          aria-label="Close quote"
                          onClick={() => setQuoteOpenIndex(null)}
                        >
                          ×
                        </button>
                      </div>
                    </foreignObject>
                  )}
                </motion.g>
              </svg>

              {/* Visual peak for Paris */}
              {active.phase === "paris" && (
                <div className="absolute bottom-5 left-5 right-5 text-center">
                  <div className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-background/60 backdrop-blur-sm border border-border/40">
                    <span className="text-2xl font-extrabold tracking-widest text-gold">LIVE LIKE HER</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* right narrative cards */}
          <div className="space-y-10 lg:space-y-14">
            {slidesData.map((s, idx) => (
              <article
                key={s.id}
                id={`slide-${s.id}`}
                data-slide={idx}
                className="relative rounded-3xl overflow-hidden border border-border/50 bg-card/40 backdrop-blur-sm"
              >
                <div className="absolute inset-0 pointer-events-none opacity-80" />

                <div className="grid md:grid-cols-2 gap-0 min-h-[72vh]">
                  {/* Left media placeholder */}
                  <div className="relative">
                    <div
                      className={`h-full min-h-[240px] md:min-h-[72vh] bg-gradient-to-br ${
                        s.phase === "childhood"
                          ? "from-amber-900/40 via-background to-background"
                          : s.phase === "prison"
                            ? "from-red-950/40 via-background to-background"
                            : s.phase === "family"
                              ? "from-amber-100/20 via-background to-background"
                              : s.phase === "paris"
                                ? "from-blue-950/50 via-background to-background"
                                : s.phase === "education"
                                  ? "from-green-900/35 via-background to-background"
                                  : "from-indigo-700/40 via-background to-background"
                      }`}
                    >
                      <div className="absolute inset-0">
                        <div
                          className="h-full w-full"
                          style={{ filter: s.phase === "childhood" ? "grayscale(1) sepia(0.7)" : "none" }}
                        />
                      </div>
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(138,43,226,0.22),transparent_55%)]" />

                      <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between gap-3">
                        <div className="px-4 py-2 rounded-2xl bg-background/65 backdrop-blur-sm border border-border/40">
                          <div className="text-xs text-muted-foreground">Slide</div>
                          <div className="text-sm font-semibold">{idx + 1} / 6</div>
                        </div>
                        <div className="px-4 py-2 rounded-2xl bg-background/65 backdrop-blur-sm border border-border/40">
                          <div className="text-xs text-muted-foreground">Tone</div>
                          <div className="text-sm font-semibold capitalize">{s.phase}</div>
                        </div>
                      </div>
                    </div>

                    {/* Clickable marker to open quote */}
                    <button
                      type="button"
                      className="absolute top-5 right-5 glass rounded-full border border-border/40 px-4 py-2 text-sm hover:neon-purple transition"
                      onClick={() => {
                        setActiveIndex(idx)
                        setQuoteOpenIndex(idx)
                      }}
                    >
                      <span className={`inline-flex items-center gap-2 ${s.phase === "prison" ? "text-red-300" : "text-primary"}`}>✦ Quote</span>
                    </button>
                  </div>

                  {/* Right narrative */}
                  <div className="p-7 sm:p-10 flex flex-col justify-center relative">
                    <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full blur-2xl bg-primary/10" />

                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div>
                        <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">{s.title}</h2>
                        <p className="text-sm text-muted-foreground mt-1">{s.year}</p>
                      </div>
                      <div className="hidden sm:block">
                        <div
                          className={`w-12 h-12 rounded-2xl flex items-center justify-center border border-border/40 ${
                            s.phase === "paris"
                              ? "bg-accent/15 text-accent"
                              : s.phase === "prison"
                                ? "bg-red-900/20 text-red-300"
                                : "bg-primary/10 text-primary"
                          }`}
                        >
                          {s.markerKind === "flame"
                            ? "♨"
                            : s.markerKind === "gold"
                              ? "✹"
                              : s.markerKind === "note"
                                ? "✎"
                                : s.markerKind === "green"
                                  ? "♣"
                                  : s.markerKind === "neon"
                                    ? "◇"
                                    : "◇"}
                        </div>
                      </div>
                    </div>

                    <p className="text-muted-foreground leading-relaxed max-w-prose">{s.narrative}</p>

                    {/* Quote note style */}
                    <div className="mt-6">
                      <div className={`quote-inline ${s.phase === "childhood" ? "quote-handwritten-note" : "quote-inline-card"}`}>
                        <div className="text-xs uppercase tracking-widest opacity-80">Quote</div>
                        <p className="mt-1 text-foreground italic">“{s.quote}”</p>
                        <div className="mt-2 text-sm font-medium text-primary">— Nguyễn Thị Bình</div>
                      </div>
                    </div>

                    {/* Paris peak highlighted bold text */}
                    {s.phase === "paris" && (
                      <div className="mt-8">
                        <div className="inline-block px-5 py-3 rounded-2xl bg-background/60 border border-border/40 backdrop-blur-sm">
                          <div className="text-2xl sm:text-3xl font-extrabold tracking-widest text-gold">LIVE LIKE HER</div>
                          <div className="text-sm text-muted-foreground mt-1">Bản lĩnh Việt Nam trên bàn đàm phán quốc tế</div>
                        </div>
                      </div>
                    )}

                    {/* Slide 6 QR */}
                    {s.phase === "digital" && (
                      <div className="mt-8 flex items-start justify-between gap-4">
                        <div>
                          <div className="text-sm font-semibold text-foreground">Scan to experience the interactive legacy</div>
                          <div className="text-xs text-muted-foreground mt-1">QR code section (mô phỏng) ở góc dưới phải.</div>
                        </div>
                        <div className="w-20 h-20 rounded-2xl bg-background/60 border border-border/40 flex items-center justify-center text-xs font-semibold text-muted-foreground">
                          QR
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            ))}

            {/* Footer with historical references */}
            <footer className="mt-6 pb-14">
              <div className="rounded-3xl border border-border/50 glass p-7 sm:p-10">
                <h3 className="text-lg font-bold">Historical References</h3>
                <p className="text-muted-foreground leading-relaxed mt-2 max-w-3xl">
                  Nội dung được tái hiện theo các mốc hành trình: tuổi thơ ở Sa Đéc, giai đoạn thử thách, chuẩn bị tại Hà Nội,
                  bước ngoặt ngoại giao tại Paris, di sản giáo dục hòa bình và sự tiếp nối số hóa. (Bạn có thể thay text này bằng nguồn/tài liệu
                  chính thức để phù hợp bài thi.)
                </p>
                <div className="mt-4 text-sm text-muted-foreground">© LIVE LIKE HER — StoryMap prototype</div>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </div>
  )
}

