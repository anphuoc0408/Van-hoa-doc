"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  MessageCircle, 
  X, 
  Send, 
  Sparkles, 
  BookOpen, 
  Lightbulb,
  Bot,
  User
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

const suggestedQuestions = [
  "Truyện Kiều nói về điều gì?",
  "Hồ Chí Minh có bao nhiêu bút danh?",
  "Tác phẩm nào hay nhất của Kim Lân?",
  "Giải thích thể thơ lục bát",
]

const initialMessages: Message[] = [
  {
    id: "1",
    role: "assistant",
    content: "Xin chào! Mình là G-Reader, trợ lý AI của ReadConnect. Mình có thể giúp bạn tìm hiểu về văn học Việt Nam, các danh nhân, và nhiều điều thú vị khác. Bạn muốn khám phá gì hôm nay? 📚",
    timestamp: new Date(),
  },
]

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateResponse = (question: string): string => {
    const responses: Record<string, string> = {
      "truyện kiều": "Truyện Kiều là tác phẩm thơ Nôm nổi tiếng của đại thi hào Nguyễn Du, kể về cuộc đời đầy bi kịch của Thúy Kiều - một người con gái tài sắc vẹn toàn. Tác phẩm gồm 3.254 câu thơ lục bát, được coi là đỉnh cao của văn học Việt Nam.",
      "hồ chí minh": "Chủ tịch Hồ Chí Minh có rất nhiều bút danh, ước tính khoảng 174 tên gọi và bút danh khác nhau! Một số bút danh nổi tiếng: Nguyễn Ái Quốc, Anh Ba, Già Thu, Trần Dân Tiên...",
      "kim lân": "Nhà văn Kim Lân nổi tiếng với các truyện ngắn về nông thôn Việt Nam. Tác phẩm tiêu biểu nhất là 'Vợ nhặt' - một câu chuyện xúc động về tình người trong nạn đói năm 1945.",
      "lục bát": "Thể thơ lục bát là thể thơ truyền thống của Việt Nam, gồm các câu 6 chữ (lục) và 8 chữ (bát) xen kẽ nhau. Đây là thể thơ dễ nhớ, dễ thuộc và rất phù hợp với nhịp điệu tiếng Việt. Ví dụ:\n'Trăm năm trong cõi người ta\nChữ tài chữ mệnh khéo là ghét nhau'",
    }

    const lowercaseQuestion = question.toLowerCase()
    for (const [key, value] of Object.entries(responses)) {
      if (lowercaseQuestion.includes(key)) {
        return value
      }
    }

    return "Đó là một câu hỏi thú vị! Mình đang tìm hiểu thêm về chủ đề này. Trong lúc đó, bạn có thể khám phá các thẻ Danh Nhân hoặc Audio Center để tìm hiểu thêm về văn học Việt Nam nhé! 🌟"
  }

  const handleSend = (text?: string) => {
    const messageText = text || input.trim()
    if (!messageText) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: messageText,
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: generateResponse(messageText),
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, assistantMessage])
      setIsTyping(false)
    }, 1500)
  }

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-24 right-6 z-40 w-14 h-14 rounded-full bg-primary flex items-center justify-center neon-purple shadow-lg"
          >
            <MessageCircle className="w-6 h-6 text-primary-foreground" />
            <motion.div
              className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-accent flex items-center justify-center"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="w-2.5 h-2.5 text-accent-foreground" />
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-24 right-4 sm:right-6 z-40 w-[calc(100vw-2rem)] sm:w-96 h-[500px] rounded-2xl overflow-hidden shadow-2xl"
            style={{
              background: "rgba(15, 23, 42, 0.85)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(138, 43, 226, 0.3)",
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">G-Reader AI</h3>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs text-muted-foreground">Đang hoạt động</span>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 h-[calc(100%-180px)]">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${
                    message.role === "user" ? "flex-row-reverse" : ""
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.role === "assistant" 
                      ? "bg-primary/20" 
                      : "bg-accent/20"
                  }`}>
                    {message.role === "assistant" ? (
                      <Bot className="w-4 h-4 text-primary" />
                    ) : (
                      <User className="w-4 h-4 text-accent" />
                    )}
                  </div>
                  <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
                    message.role === "assistant"
                      ? "bg-secondary text-foreground rounded-tl-none"
                      : "bg-primary text-primary-foreground rounded-tr-none"
                  }`}>
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-3"
                >
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                  <div className="bg-secondary rounded-2xl rounded-tl-none px-4 py-3">
                    <div className="flex gap-1">
                      <motion.div
                        className="w-2 h-2 rounded-full bg-muted-foreground"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                      />
                      <motion.div
                        className="w-2 h-2 rounded-full bg-muted-foreground"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                      />
                      <motion.div
                        className="w-2 h-2 rounded-full bg-muted-foreground"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Questions */}
            {messages.length <= 2 && (
              <div className="px-4 pb-2">
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb className="w-3 h-3 text-accent" />
                  <span className="text-xs text-muted-foreground">Gợi ý</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {suggestedQuestions.slice(0, 2).map((question) => (
                    <button
                      key={question}
                      onClick={() => handleSend(question)}
                      className="text-xs px-3 py-1.5 rounded-full bg-secondary hover:bg-secondary/80 text-foreground transition-colors"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-border">
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleSend()
                }}
                className="flex gap-2"
              >
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Hỏi gì đi..."
                  className="flex-1 bg-secondary border-0 focus-visible:ring-primary"
                />
                <Button 
                  type="submit" 
                  size="icon"
                  disabled={!input.trim() || isTyping}
                  className="bg-primary hover:bg-primary/90"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
