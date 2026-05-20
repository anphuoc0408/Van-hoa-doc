"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX,
  Repeat,
  Shuffle,
  Heart,
  Share2,
  ListMusic,
  Mic2,
  QrCode
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

const transcript = [
  { time: 0, text: "Tôi yêu tiếng nước tôi từ khi mới ra đời" },
  { time: 5, text: "Người ơi người ở đừng về" },
  { time: 10, text: "Mẹ hiền ru những câu ca dao" },
  { time: 15, text: "Tiếng nước tôi, tiếng mẹ sinh ra từ nghìn đời" },
  { time: 20, text: "Nghe như đời cha ông vọng về" },
  { time: 25, text: "Trong sáng ấm êm như tình người" },
]

export function AudioCenter() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration] = useState(180)
  const [volume, setVolume] = useState(80)
  const [isMuted, setIsMuted] = useState(false)
  const [showTranscript, setShowTranscript] = useState(true)
  const [isLiked, setIsLiked] = useState(false)
  const [isRepeat, setIsRepeat] = useState(false)
  const [isShuffle, setIsShuffle] = useState(false)
  const [showQR, setShowQR] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | null>(null)

  // Animated waveform
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const bars = 60
    const barWidth = canvas.width / bars

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      for (let i = 0; i < bars; i++) {
        const height = isPlaying 
          ? Math.random() * canvas.height * 0.8 + canvas.height * 0.1
          : canvas.height * 0.2
        
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
        gradient.addColorStop(0, "rgba(138, 43, 226, 0.9)")
        gradient.addColorStop(0.5, "rgba(138, 43, 226, 0.6)")
        gradient.addColorStop(1, "rgba(138, 43, 226, 0.2)")
        
        ctx.fillStyle = gradient
        ctx.fillRect(
          i * barWidth + 2, 
          (canvas.height - height) / 2, 
          barWidth - 4, 
          height
        )
      }
      
      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isPlaying])

  // Progress simulation
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying && currentTime < duration) {
      interval = setInterval(() => {
        setCurrentTime(prev => Math.min(prev + 1, duration))
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isPlaying, currentTime, duration])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const currentTranscriptIndex = transcript.findIndex(
    (item, index) => 
      currentTime >= item.time && 
      (index === transcript.length - 1 || currentTime < transcript[index + 1].time)
  )

  return (
    <section className="min-h-screen pt-20 pb-32 px-4 sm:px-6 lg:px-8 flex flex-col justify-center relative">
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/20 blur-3xl"
          animate={{
            scale: isPlaying ? [1, 1.1, 1] : 1,
            opacity: isPlaying ? [0.2, 0.4, 0.2] : 0.1,
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>

      <div className="max-w-4xl mx-auto w-full relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <Mic2 className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">Podcast Bảo Ngọc</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Podcast <span className="text-primary neon-text">Bảo Ngọc</span>
          </h2>
          <p className="text-muted-foreground mt-2">Tình Ca - Tập thơ Quê Hương</p>
          
          {/* QR Code Button */}
          <motion.button
            onClick={() => setShowQR(!showQR)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 hover:border-primary hover:bg-primary/20 transition-all"
          >
            <QrCode className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">Mã QR Podcast</span>
          </motion.button>
        </motion.div>

        {/* QR Code Modal */}
        <AnimatePresence>
          {showQR && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50"
              onClick={() => setShowQR(false)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-card p-8 rounded-2xl neon-purple max-w-sm mx-4"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-foreground mb-2">Podcast Bảo Ngọc</h3>
                  <p className="text-sm text-muted-foreground">Quét mã QR để truy cập podcast</p>
                </div>
                
                {/* QR Code SVG */}
                <div className="w-48 h-48 mx-auto bg-white p-4 rounded-xl">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    {/* QR Code Pattern */}
                    <rect fill="#000" x="4" y="4" width="8" height="8"/>
                    <rect fill="#000" x="12" y="4" width="8" height="8"/>
                    <rect fill="#000" x="20" y="4" width="8" height="8"/>
                    <rect fill="#000" x="28" y="4" width="8" height="8"/>
                    <rect fill="#000" x="36" y="4" width="8" height="8"/>
                    <rect fill="#000" x="44" y="4" width="8" height="8"/>
                    <rect fill="#000" x="52" y="4" width="8" height="8"/>
                    <rect fill="#000" x="68" y="4" width="8" height="8"/>
                    <rect fill="#000" x="84" y="4" width="8" height="8"/>
                    
                    <rect fill="#000" x="4" y="12" width="8" height="8"/>
                    <rect fill="#000" x="52" y="12" width="8" height="8"/>
                    <rect fill="#000" x="68" y="12" width="8" height="8"/>
                    <rect fill="#000" x="76" y="12" width="8" height="8"/>
                    <rect fill="#000" x="84" y="12" width="8" height="8"/>
                    
                    <rect fill="#000" x="4" y="20" width="8" height="8"/>
                    <rect fill="#000" x="20" y="20" width="8" height="8"/>
                    <rect fill="#000" x="28" y="20" width="8" height="8"/>
                    <rect fill="#000" x="36" y="20" width="8" height="8"/>
                    <rect fill="#000" x="52" y="20" width="8" height="8"/>
                    <rect fill="#000" x="68" y="20" width="8" height="8"/>
                    <rect fill="#000" x="84" y="20" width="8" height="8"/>
                    
                    <rect fill="#000" x="4" y="28" width="8" height="8"/>
                    <rect fill="#000" x="20" y="28" width="8" height="8"/>
                    <rect fill="#000" x="28" y="28" width="8" height="8"/>
                    <rect fill="#000" x="36" y="28" width="8" height="8"/>
                    <rect fill="#000" x="52" y="28" width="8" height="8"/>
                    <rect fill="#000" x="60" y="28" width="8" height="8"/>
                    <rect fill="#000" x="76" y="28" width="8" height="8"/>
                    <rect fill="#000" x="84" y="28" width="8" height="8"/>
                    
                    <rect fill="#000" x="4" y="36" width="8" height="8"/>
                    <rect fill="#000" x="20" y="36" width="8" height="8"/>
                    <rect fill="#000" x="28" y="36" width="8" height="8"/>
                    <rect fill="#000" x="36" y="36" width="8" height="8"/>
                    <rect fill="#000" x="52" y="36" width="8" height="8"/>
                    <rect fill="#000" x="68" y="36" width="8" height="8"/>
                    <rect fill="#000" x="76" y="36" width="8" height="8"/>
                    <rect fill="#000" x="84" y="36" width="8" height="8"/>
                    
                    <rect fill="#000" x="4" y="44" width="8" height="8"/>
                    <rect fill="#000" x="52" y="44" width="8" height="8"/>
                    <rect fill="#000" x="60" y="44" width="8" height="8"/>
                    <rect fill="#000" x="84" y="44" width="8" height="8"/>
                    
                    <rect fill="#000" x="4" y="52" width="8" height="8"/>
                    <rect fill="#000" x="12" y="52" width="8" height="8"/>
                    <rect fill="#000" x="20" y="52" width="8" height="8"/>
                    <rect fill="#000" x="28" y="52" width="8" height="8"/>
                    <rect fill="#000" x="36" y="52" width="8" height="8"/>
                    <rect fill="#000" x="44" y="52" width="8" height="8"/>
                    <rect fill="#000" x="52" y="52" width="8" height="8"/>
                    <rect fill="#000" x="68" y="52" width="8" height="8"/>
                    <rect fill="#000" x="84" y="52" width="8" height="8"/>
                    
                    <rect fill="#000" x="68" y="60" width="8" height="8"/>
                    <rect fill="#000" x="76" y="60" width="8" height="8"/>
                    
                    <rect fill="#000" x="4" y="68" width="8" height="8"/>
                    <rect fill="#000" x="12" y="68" width="8" height="8"/>
                    <rect fill="#000" x="28" y="68" width="8" height="8"/>
                    <rect fill="#000" x="44" y="68" width="8" height="8"/>
                    <rect fill="#000" x="60" y="68" width="8" height="8"/>
                    <rect fill="#000" x="68" y="68" width="8" height="8"/>
                    <rect fill="#000" x="84" y="68" width="8" height="8"/>
                    
                    <rect fill="#000" x="4" y="76" width="8" height="8"/>
                    <rect fill="#000" x="36" y="76" width="8" height="8"/>
                    <rect fill="#000" x="52" y="76" width="8" height="8"/>
                    <rect fill="#000" x="60" y="76" width="8" height="8"/>
                    <rect fill="#000" x="76" y="76" width="8" height="8"/>
                    <rect fill="#000" x="84" y="76" width="8" height="8"/>
                    
                    <rect fill="#000" x="4" y="84" width="8" height="8"/>
                    <rect fill="#000" x="20" y="84" width="8" height="8"/>
                    <rect fill="#000" x="28" y="84" width="8" height="8"/>
                    <rect fill="#000" x="36" y="84" width="8" height="8"/>
                    <rect fill="#000" x="44" y="84" width="8" height="8"/>
                    <rect fill="#000" x="68" y="84" width="8" height="8"/>
                    <rect fill="#000" x="76" y="84" width="8" height="8"/>
                    <rect fill="#000" x="84" y="84" width="8" height="8"/>
                    
                    {/* Center Logo */}
                    <rect fill="#8A2BE2" x="40" y="40" width="20" height="20" rx="4"/>
                    <text x="50" y="54" fontSize="10" fill="white" textAnchor="middle" fontWeight="bold">B</text>
                  </svg>
                </div>
                
                <div className="mt-6 text-center">
                  <p className="text-xs text-muted-foreground mb-4">podcastbaongoc.readconnect.vn</p>
                  <button
                    onClick={() => setShowQR(false)}
                    className="px-6 py-2 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-medium transition-colors"
                  >
                    Đóng
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Album Art */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="relative mx-auto w-64 h-64 sm:w-80 sm:h-80 mb-8"
        >
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/40 to-accent/40 neon-purple" />
          <div className="absolute inset-2 rounded-xl bg-card flex items-center justify-center overflow-hidden">
            <motion.div
              animate={{ rotate: isPlaying ? 360 : 0 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center"
            >
              <div className="w-8 h-8 rounded-full bg-background" />
            </motion.div>
          </div>
        </motion.div>

        {/* Waveform Visualization */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <canvas
            ref={canvasRef}
            width={800}
            height={100}
            className="w-full h-24 rounded-lg"
          />
        </motion.div>

        {/* Progress Bar */}
        <div className="mb-6">
          <Slider
            value={[currentTime]}
            max={duration}
            step={1}
            onValueChange={([value]) => setCurrentTime(value)}
            className="cursor-pointer"
          />
          <div className="flex justify-between mt-2 text-sm text-muted-foreground">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex items-center justify-center gap-4 mb-8"
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsShuffle(!isShuffle)}
            className={isShuffle ? "text-primary" : "text-muted-foreground"}
          >
            <Shuffle className="w-5 h-5" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCurrentTime(Math.max(0, currentTime - 10))}
          >
            <SkipBack className="w-6 h-6" />
          </Button>
          
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-16 h-16 rounded-full bg-primary hover:bg-primary/90 neon-purple"
            >
              {isPlaying ? (
                <Pause className="w-8 h-8" />
              ) : (
                <Play className="w-8 h-8 ml-1" />
              )}
            </Button>
          </motion.div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCurrentTime(Math.min(duration, currentTime + 10))}
          >
            <SkipForward className="w-6 h-6" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsRepeat(!isRepeat)}
            className={isRepeat ? "text-primary" : "text-muted-foreground"}
          >
            <Repeat className="w-5 h-5" />
          </Button>
        </motion.div>

        {/* Secondary Controls */}
        <div className="flex items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsLiked(!isLiked)}
              className={isLiked ? "text-red-500" : "text-muted-foreground"}
            >
              <Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
            </Button>
            <Button variant="ghost" size="icon" className="text-muted-foreground">
              <Share2 className="w-5 h-5" />
            </Button>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMuted(!isMuted)}
              className="text-muted-foreground"
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </Button>
            <Slider
              value={[isMuted ? 0 : volume]}
              max={100}
              step={1}
              onValueChange={([value]) => {
                setVolume(value)
                setIsMuted(value === 0)
              }}
              className="w-24"
            />
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowTranscript(!showTranscript)}
            className={showTranscript ? "text-primary" : "text-muted-foreground"}
          >
            <ListMusic className="w-5 h-5" />
          </Button>
        </div>

        {/* Live Transcript */}
        <AnimatePresence>
          {showTranscript && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-8 glass rounded-2xl p-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-sm font-medium text-primary">Live Transcript</span>
              </div>
              <div className="space-y-3">
                {transcript.map((item, index) => (
                  <motion.p
                    key={index}
                    initial={{ opacity: 0.5 }}
                    animate={{ 
                      opacity: index === currentTranscriptIndex ? 1 : 0.5,
                      scale: index === currentTranscriptIndex ? 1.02 : 1,
                    }}
                    className={`text-lg transition-all ${
                      index === currentTranscriptIndex 
                        ? "text-foreground neon-text" 
                        : "text-muted-foreground"
                    }`}
                  >
                    {item.text}
                  </motion.p>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Fixed Bottom Player Bar */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-0 left-0 right-0 glass border-t border-primary/20"
      >
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-accent" />
            <div>
              <p className="font-medium text-sm">Tình Ca</p>
              <p className="text-xs text-muted-foreground">Nhà thơ Bảo Ngọc</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <SkipBack className="w-4 h-4" />
            </Button>
            <Button
              size="icon"
              onClick={() => setIsPlaying(!isPlaying)}
              className="bg-primary hover:bg-primary/90"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
            </Button>
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <SkipForward className="w-4 h-4" />
            </Button>
          </div>

          <div className="hidden md:flex items-center gap-4 text-sm text-muted-foreground">
            <span>{formatTime(currentTime)}</span>
            <div className="w-32 h-1 bg-secondary rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              />
            </div>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
