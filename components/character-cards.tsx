"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Award, 
  Calendar, 
  Feather, 
  BookOpen, 
  Lock, 
  Unlock,
  ChevronLeft,
  ChevronRight,
  Star,
  Sparkles
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface CharacterCard {
  id: string
  name: string
  nameChinese?: string
  yearOfBirth: string
  yearOfDeath?: string
  context: string
  writingStyle: string
  achievements: string[]
  badgeUnlocked: boolean
  badgeName: string
  color: string
  quote?: string
}

const characters: CharacterCard[] = [
  {
    id: "ho-chi-minh",
    name: "Hồ Chí Minh",
    yearOfBirth: "1890",
    yearOfDeath: "1969",
    context: "Lãnh tụ cách mạng, nhà thơ, nhà văn hóa lớn của dân tộc Việt Nam",
    writingStyle: "Giản dị, súc tích, giàu hình ảnh, đậm chất triết lý",
    achievements: ["Nhật ký trong tù", "Tuyên ngôn độc lập", "Di chúc"],
    badgeUnlocked: true,
    badgeName: "Người Cha Kính Yêu",
    color: "from-red-500 to-amber-500",
    quote: "Không có gì quý hơn độc lập, tự do"
  },
  {
    id: "nguyen-du",
    name: "Nguyễn Du",
    nameChinese: "阮攸",
    yearOfBirth: "1765",
    yearOfDeath: "1820",
    context: "Đại thi hào dân tộc, được UNESCO vinh danh là danh nhân văn hóa thế giới",
    writingStyle: "Lục bát điêu luyện, ngôn ngữ tinh tế, giàu cảm xúc",
    achievements: ["Truyện Kiều", "Thanh Hiên thi tập", "Nam trung tạp ngâm"],
    badgeUnlocked: true,
    badgeName: "Đại Thi Hào",
    color: "from-amber-500 to-yellow-500",
    quote: "Trăm năm trong cõi người ta, chữ tài chữ mệnh khéo là ghét nhau"
  },
  {
    id: "nguyen-thi-binh",
    name: "Nguyễn Thị Bình",
    yearOfBirth: "1927",
    yearOfDeath: "2024",
    context: "Nhà ngoại giao, chính trị gia, người phụ nữ ký Hiệp định Paris",
    writingStyle: "Sắc sảo, logic, đầy thuyết phục",
    achievements: ["Ký Hiệp định Paris", "Phó Chủ tịch nước", "Hồi ký ngoại giao"],
    badgeUnlocked: false,
    badgeName: "Nữ Anh Hùng",
    color: "from-pink-500 to-rose-500",
    quote: "Hòa bình không tự đến, phải đấu tranh giành lấy"
  },
  {
    id: "kim-lan",
    name: "Kim Lân",
    yearOfBirth: "1920",
    yearOfDeath: "2007",
    context: "Nhà văn hiện thực, bậc thầy truyện ngắn Việt Nam",
    writingStyle: "Hiện thực, giản dị, đậm chất nông thôn Bắc Bộ",
    achievements: ["Vợ nhặt", "Làng", "Con chó xấu xí"],
    badgeUnlocked: false,
    badgeName: "Bút Làng Quê",
    color: "from-emerald-500 to-teal-500",
    quote: "Văn chương phải bắt nguồn từ cuộc sống"
  },
  {
    id: "chinh-huu",
    name: "Chính Hữu",
    yearOfBirth: "1926",
    yearOfDeath: "2007",
    context: "Nhà thơ chiến sĩ, tiếng thơ của người lính Cụ Hồ",
    writingStyle: "Hào hùng, lãng mạn, đậm chất anh hùng ca",
    achievements: ["Đồng chí", "Ngọn đèn đứng gác", "Tàu đến giữa sông"],
    badgeUnlocked: false,
    badgeName: "Thi Sĩ Chiến Trận",
    color: "from-blue-500 to-indigo-500",
    quote: "Đêm nay rừng hoang sương muối, đứng cạnh bên nhau chờ giặc tới"
  },
]

export function CharacterCards() {
  const [selectedCard, setSelectedCard] = useState<string | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set())

  const toggleFlip = (id: string) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  const nextCard = () => {
    setCurrentIndex((prev) => (prev + 1) % characters.length)
  }

  const prevCard = () => {
    setCurrentIndex((prev) => (prev - 1 + characters.length) % characters.length)
  }

  const selectedCharacter = characters.find(c => c.id === selectedCard)

  return (
    <section className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full bg-accent/10 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-4">
            <Star className="w-4 h-4 text-accent" />
            <span className="text-sm text-accent font-medium">Danh Nhân Việt Nam</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Những <span className="text-accent">Ngôi Sao</span> Văn Hóa
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Khám phá các nhân vật lịch sử qua bộ thẻ bài tương tác. 
            Thu thập huy hiệu đại sứ văn hóa!
          </p>
        </motion.div>

        {/* Card Carousel */}
        <div className="relative">
          {/* Navigation Buttons */}
          <Button
            variant="ghost"
            size="icon"
            onClick={prevCard}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-background/50 backdrop-blur-sm hidden md:flex"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={nextCard}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-background/50 backdrop-blur-sm hidden md:flex"
          >
            <ChevronRight className="w-6 h-6" />
          </Button>

          {/* Cards */}
          <div className="flex justify-center items-center gap-4 perspective-1000 overflow-x-auto pb-8 px-8 md:px-16">
            {characters.map((character, index) => {
              const offset = index - currentIndex
              const isActive = offset === 0
              const isFlipped = flippedCards.has(character.id)

              return (
                <motion.div
                  key={character.id}
                  className="flex-shrink-0 cursor-pointer"
                  initial={false}
                  animate={{
                    scale: isActive ? 1 : 0.85,
                    opacity: Math.abs(offset) > 2 ? 0 : 1 - Math.abs(offset) * 0.2,
                    x: offset * 20,
                    zIndex: isActive ? 10 : 5 - Math.abs(offset),
                    rotateY: isFlipped ? 180 : 0,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  onClick={() => isActive && toggleFlip(character.id)}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Card Front */}
                  <div
                    className={`w-64 h-96 rounded-2xl relative overflow-hidden ${
                      isFlipped ? "invisible" : ""
                    }`}
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${character.color} opacity-90`} />
                    <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10" />
                    
                    {/* Card Content */}
                    <div className="relative h-full p-6 flex flex-col">
                      {/* Header */}
                      <div className="flex items-start justify-between">
                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                          <Feather className="w-5 h-5 text-white" />
                        </div>
                        {character.badgeUnlocked ? (
                          <Badge className="bg-white/20 text-white border-0">
                            <Unlock className="w-3 h-3 mr-1" />
                            Mở khóa
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="border-white/30 text-white/70">
                            <Lock className="w-3 h-3 mr-1" />
                            Khóa
                          </Badge>
                        )}
                      </div>

                      {/* Center Circle */}
                      <div className="flex-1 flex items-center justify-center">
                        <motion.div
                          className="w-32 h-32 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-4 border-white/30"
                          animate={isActive ? { scale: [1, 1.05, 1] } : {}}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <span className="text-4xl font-bold text-white">
                            {character.name.split(" ").pop()?.charAt(0)}
                          </span>
                        </motion.div>
                      </div>

                      {/* Footer */}
                      <div className="text-center text-white">
                        <h3 className="text-xl font-bold mb-1">{character.name}</h3>
                        {character.nameChinese && (
                          <p className="text-sm opacity-70 mb-2">{character.nameChinese}</p>
                        )}
                        <div className="flex items-center justify-center gap-2 text-sm opacity-80">
                          <Calendar className="w-4 h-4" />
                          <span>{character.yearOfBirth} - {character.yearOfDeath || "nay"}</span>
                        </div>
                      </div>

                      {/* Tap hint */}
                      {isActive && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-xs text-white/60 text-center mt-3"
                        >
                          Nhấn để xem chi tiết
                        </motion.p>
                      )}
                    </div>

                    {/* Decorative elements */}
                    <div className="absolute top-4 right-4 w-16 h-16 border border-white/20 rounded-full" />
                    <div className="absolute bottom-4 left-4 w-8 h-8 border border-white/20 rounded-full" />
                  </div>

                  {/* Card Back */}
                  <div
                    className={`w-64 h-96 rounded-2xl absolute top-0 left-0 overflow-hidden ${
                      isFlipped ? "" : "invisible"
                    }`}
                    style={{ 
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)"
                    }}
                  >
                    <div className="absolute inset-0 bg-card" />
                    <div className="absolute inset-0 glass" />
                    
                    <div className="relative h-full p-5 flex flex-col text-foreground">
                      <h3 className="text-lg font-bold mb-1">{character.name}</h3>
                      <p className="text-xs text-muted-foreground mb-4">{character.yearOfBirth} - {character.yearOfDeath || "nay"}</p>

                      <div className="space-y-3 flex-1 overflow-y-auto text-sm">
                        <div>
                          <div className="flex items-center gap-2 text-primary mb-1">
                            <BookOpen className="w-3 h-3" />
                            <span className="font-medium text-xs">Bối cảnh</span>
                          </div>
                          <p className="text-muted-foreground text-xs leading-relaxed">{character.context}</p>
                        </div>

                        <div>
                          <div className="flex items-center gap-2 text-primary mb-1">
                            <Feather className="w-3 h-3" />
                            <span className="font-medium text-xs">Phong cách</span>
                          </div>
                          <p className="text-muted-foreground text-xs leading-relaxed">{character.writingStyle}</p>
                        </div>

                        <div>
                          <div className="flex items-center gap-2 text-accent mb-1">
                            <Award className="w-3 h-3" />
                            <span className="font-medium text-xs">Tác phẩm tiêu biểu</span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {character.achievements.map((achievement) => (
                              <Badge 
                                key={achievement} 
                                variant="outline" 
                                className="text-xs border-accent/30 text-accent"
                              >
                                {achievement}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {character.quote && (
                          <div className="italic text-xs text-muted-foreground border-l-2 border-primary/50 pl-3 mt-2">
                            &quot;{character.quote}&quot;
                          </div>
                        )}
                      </div>

                      {/* Badge Section */}
                      <div className="mt-3 pt-3 border-t border-border">
                        <div className={`flex items-center gap-2 p-2 rounded-lg ${
                          character.badgeUnlocked ? "bg-accent/10" : "bg-muted"
                        }`}>
                          {character.badgeUnlocked ? (
                            <Sparkles className="w-4 h-4 text-accent" />
                          ) : (
                            <Lock className="w-4 h-4 text-muted-foreground" />
                          )}
                          <div className="flex-1">
                            <p className={`text-xs font-medium ${
                              character.badgeUnlocked ? "text-accent" : "text-muted-foreground"
                            }`}>
                              {character.badgeName}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {character.badgeUnlocked ? "Đã mở khóa!" : "Đọc 3 tác phẩm để mở"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Mobile Navigation */}
          <div className="flex justify-center gap-4 mt-4 md:hidden">
            <Button variant="outline" size="icon" onClick={prevCard}>
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="icon" onClick={nextCard}>
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {characters.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex 
                    ? "bg-primary w-6" 
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Collection Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 glass rounded-2xl p-6 max-w-md mx-auto"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Bộ Sưu Tập</h3>
            <span className="text-sm text-muted-foreground">
              {characters.filter(c => c.badgeUnlocked).length}/{characters.length} huy hiệu
            </span>
          </div>
          <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-accent"
              initial={{ width: 0 }}
              animate={{ 
                width: `${(characters.filter(c => c.badgeUnlocked).length / characters.length) * 100}%` 
              }}
              transition={{ duration: 1, delay: 0.8 }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Hoàn thành bộ sưu tập để nhận danh hiệu &quot;Đại Sứ Văn Hóa&quot;
          </p>
        </motion.div>
      </div>
    </section>
  )
}
