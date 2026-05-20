"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Flame, 
  Trophy, 
  Camera, 
  ChevronLeft, 
  ChevronRight,
  Crown,
  Medal,
  Zap,
  Heart,
  MessageCircle,
  Share2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface LeaderboardUser {
  id: string
  name: string
  avatar: string
  points: number
  streak: number
  rank: number
}

interface LocketPhoto {
  id: string
  user: string
  caption: string
  likes: number
  time: string
}

const leaderboard: LeaderboardUser[] = [
  { id: "1", name: "Minh Anh", avatar: "MA", points: 12450, streak: 47, rank: 1 },
  { id: "2", name: "Hoàng Nam", avatar: "HN", points: 11200, streak: 32, rank: 2 },
  { id: "3", name: "Thu Hà", avatar: "TH", points: 10800, streak: 28, rank: 3 },
  { id: "4", name: "Đức Minh", avatar: "DM", points: 9500, streak: 21, rank: 4 },
  { id: "5", name: "Lan Anh", avatar: "LA", points: 8900, streak: 19, rank: 5 },
]

const locketPhotos: LocketPhoto[] = [
  { id: "1", user: "Minh Anh", caption: "Đang đọc Truyện Kiều 📚", likes: 24, time: "2 phút" },
  { id: "2", user: "Hoàng Nam", caption: "Check-in thư viện!", likes: 18, time: "15 phút" },
  { id: "3", user: "Thu Hà", caption: "Sáng nay với café và sách 🌅", likes: 31, time: "1 giờ" },
]

export function SocialSidebar() {
  const [isOpen, setIsOpen] = useState(true)
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)
  const [userStreak] = useState(47)

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % locketPhotos.length)
  }

  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev - 1 + locketPhotos.length) % locketPhotos.length)
  }

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-1/2 -translate-y-1/2 right-0 z-30 bg-primary/20 backdrop-blur-sm p-2 rounded-l-lg border border-r-0 border-primary/30 hidden lg:block"
        whileHover={{ x: -2 }}
      >
        {isOpen ? (
          <ChevronRight className="w-4 h-4 text-primary" />
        ) : (
          <ChevronLeft className="w-4 h-4 text-primary" />
        )}
      </motion.button>

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: 320, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 320, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-20 right-0 bottom-0 w-80 z-20 glass border-l border-primary/20 overflow-y-auto hidden lg:block"
          >
            <div className="p-6 space-y-8">
              {/* User Streak */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
              >
                <div className="relative inline-block">
                  <motion.div
                    className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center neon-purple"
                    animate={{ 
                      scale: [1, 1.05, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Flame className="w-12 h-12 text-white" />
                  </motion.div>
                  <motion.div
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-card px-3 py-1 rounded-full border border-border"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <span className="font-bold text-foreground">{userStreak}</span>
                    <span className="text-xs text-muted-foreground ml-1">ngày</span>
                  </motion.div>
                </div>
                <h3 className="font-semibold text-foreground mt-4">Reading Chain 🔥</h3>
                <p className="text-sm text-muted-foreground">Chuỗi đọc sách của bạn</p>
              </motion.div>

              {/* Knowledge Check-in (Locket Style) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Camera className="w-4 h-4 text-primary" />
                    <h3 className="font-semibold text-foreground">Knowledge Check-in</h3>
                  </div>
                  <span className="text-xs text-muted-foreground">Live</span>
                </div>

                <div className="relative">
                  <motion.div
                    key={currentPhotoIndex}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 p-1"
                  >
                    <div className="w-full h-full rounded-xl bg-card flex flex-col items-center justify-center relative overflow-hidden">
                      {/* Simulated photo content */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10" />
                      <div className="relative z-10 text-center p-4">
                        <Avatar className="w-16 h-16 mx-auto mb-3 border-2 border-primary">
                          <AvatarFallback className="bg-primary/20 text-primary">
                            {locketPhotos[currentPhotoIndex].user.split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <p className="font-medium text-foreground">
                          {locketPhotos[currentPhotoIndex].user}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {locketPhotos[currentPhotoIndex].caption}
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {locketPhotos[currentPhotoIndex].time} trước
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Navigation */}
                  <button
                    onClick={prevPhoto}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/80 flex items-center justify-center"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={nextPhoto}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/80 flex items-center justify-center"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Photo Actions */}
                <div className="flex items-center justify-center gap-4">
                  <button className="flex items-center gap-1 text-muted-foreground hover:text-red-500 transition-colors">
                    <Heart className="w-4 h-4" />
                    <span className="text-xs">{locketPhotos[currentPhotoIndex].likes}</span>
                  </button>
                  <button className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-xs">Reply</span>
                  </button>
                  <button className="flex items-center gap-1 text-muted-foreground hover:text-accent transition-colors">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Dots */}
                <div className="flex justify-center gap-1.5">
                  {locketPhotos.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPhotoIndex(index)}
                      className={`w-1.5 h-1.5 rounded-full transition-all ${
                        index === currentPhotoIndex 
                          ? "bg-primary w-4" 
                          : "bg-muted-foreground/30"
                      }`}
                    />
                  ))}
                </div>
              </motion.div>

              {/* Leaderboard */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-3"
              >
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-accent" />
                  <h3 className="font-semibold text-foreground">Bảng Xếp Hạng</h3>
                </div>

                <div className="space-y-2">
                  {leaderboard.map((user, index) => (
                    <motion.div
                      key={user.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                        index === 0 
                          ? "bg-accent/10 border border-accent/20" 
                          : "bg-secondary/50 hover:bg-secondary"
                      }`}
                    >
                      <div className="flex items-center justify-center w-6">
                        {index === 0 && <Crown className="w-5 h-5 text-accent" />}
                        {index === 1 && <Medal className="w-5 h-5 text-gray-400" />}
                        {index === 2 && <Medal className="w-5 h-5 text-amber-600" />}
                        {index > 2 && (
                          <span className="text-sm font-medium text-muted-foreground">
                            {user.rank}
                          </span>
                        )}
                      </div>
                      
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className={`text-xs ${
                          index === 0 ? "bg-accent/20 text-accent" : "bg-primary/20 text-primary"
                        }`}>
                          {user.avatar}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm text-foreground truncate">
                          {user.name}
                        </p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Flame className="w-3 h-3 text-orange-500" />
                          <span>{user.streak} ngày</span>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className={`font-bold text-sm ${
                          index === 0 ? "text-accent" : "text-foreground"
                        }`}>
                          {user.points.toLocaleString()}
                        </p>
                        <p className="text-xs text-muted-foreground">điểm</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <Button variant="outline" className="w-full text-sm" size="sm">
                  Xem tất cả
                </Button>
              </motion.div>

              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="space-y-3"
              >
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <Zap className="w-4 h-4 text-primary" />
                  Thử thách hôm nay
                </h3>
                <div className="space-y-2">
                  <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Đọc 30 phút</span>
                      <span className="text-xs text-primary">+50 điểm</span>
                    </div>
                    <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-primary"
                        initial={{ width: 0 }}
                        animate={{ width: "70%" }}
                        transition={{ duration: 1, delay: 0.8 }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">21/30 phút</p>
                  </div>
                  
                  <div className="p-3 rounded-xl bg-accent/10 border border-accent/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Chia sẻ 1 trích dẫn</span>
                      <span className="text-xs text-accent">+30 điểm</span>
                    </div>
                    <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-accent"
                        initial={{ width: 0 }}
                        animate={{ width: "0%" }}
                        transition={{ duration: 1, delay: 0.9 }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">0/1 trích dẫn</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Mobile Bottom Sheet Trigger */}
      <div className="fixed bottom-24 left-4 z-30 lg:hidden">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          className="gap-2 glass border-primary/30"
        >
          <Trophy className="w-4 h-4 text-accent" />
          <span className="text-sm">Xếp hạng</span>
        </Button>
      </div>

      {/* Mobile Bottom Sheet */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-x-0 bottom-0 z-50 glass border-t border-primary/20 rounded-t-3xl max-h-[70vh] overflow-y-auto lg:hidden"
          >
            <div className="w-12 h-1 bg-muted-foreground/30 rounded-full mx-auto mt-3" />
            <div className="p-6 pb-28">
              {/* Streak */}
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="flex items-center gap-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 px-4 py-2 rounded-full">
                  <Flame className="w-5 h-5 text-orange-500" />
                  <span className="font-bold text-foreground">{userStreak}</span>
                  <span className="text-sm text-muted-foreground">ngày liên tục</span>
                </div>
              </div>

              {/* Compact Leaderboard */}
              <div className="space-y-2">
                {leaderboard.slice(0, 3).map((user, index) => (
                  <div
                    key={user.id}
                    className={`flex items-center gap-3 p-3 rounded-xl ${
                      index === 0 ? "bg-accent/10" : "bg-secondary/50"
                    }`}
                  >
                    <div className="w-6 flex justify-center">
                      {index === 0 && <Crown className="w-5 h-5 text-accent" />}
                      {index === 1 && <Medal className="w-5 h-5 text-gray-400" />}
                      {index === 2 && <Medal className="w-5 h-5 text-amber-600" />}
                    </div>
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="text-xs bg-primary/20 text-primary">
                        {user.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <span className="flex-1 font-medium text-sm">{user.name}</span>
                    <span className="font-bold text-sm">{user.points.toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <Button 
                variant="ghost" 
                className="w-full mt-4"
                onClick={() => setIsOpen(false)}
              >
                Đóng
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
