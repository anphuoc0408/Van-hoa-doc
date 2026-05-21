"use client"

import { motion } from "framer-motion"
import { useState } from "react"

const timeline = [
  {
    year: "1927",
    location: "Sa Đéc, Đồng Tháp",
    title: "Cái nôi văn hóa và Tuổi thơ",
    color: "yellow",
    quote:
      "Tuổi thơ tôi được dệt bằng những câu chuyện về lòng yêu nước.",
    story:
      "Những năm tháng tuổi thơ tại miền Tây Nam Bộ đã hình thành nên tâm hồn mộc mạc và giàu bản sắc vùng miền.",
    icon: "🌾",
  },

  {
    year: "1951 – 1954",
    location: "Khám Chí Hòa – Sài Gòn",
    title: "Bản lĩnh người chiến sĩ trẻ",
    color: "red",
    quote:
      "Trong bóng tối lao tù, niềm tin vẫn không bao giờ tắt.",
    story:
      "Bị giam giữ tại Khám Chí Hòa nhưng tinh thần cách mạng vẫn không bị khuất phục.",
    icon: "⚔️",
  },

  {
    year: "1954",
    location: "Hà Nội",
    title: "Hậu phương và Sứ mệnh mới",
    color: "orange",
    quote:
      "Có những tình yêu phải đặt phía sau Tổ quốc.",
    story:
      "Tập kết ra Bắc và bắt đầu hành trình mới cho lý tưởng cách mạng.",
    icon: "🕊️",
  },

  {
    year: "1968 – 1973",
    location: "Paris, Pháp",
    title: "Bông hồng thép",
    color: "gold",
    quote:
      "Áo dài Việt Nam đã bước vào bàn đàm phán thế giới.",
    story:
      "Đại diện Việt Nam tham gia Hiệp định Paris, trở thành biểu tượng ngoại giao quốc tế.",
    icon: "✍️",
  },

  {
    year: "1976 – 1987",
    location: "Hà Nội – Bộ Giáo Dục",
    title: "Những tâm huyết giáo dục",
    color: "violet",
    quote:
      "Giáo dục là con đường dài nhất để xây dựng hòa bình.",
    story:
      "Góp phần xây dựng nền giáo dục mới và Ngày Nhà giáo Việt Nam.",
    icon: "📚",
  },

  {
    year: "Từ năm 2000",
    location: "TP.HCM & Hà Nội",
    title: "Sống mãi một lý tưởng",
    color: "purple",
    quote:
      "Khi bạn học cách sống vì điều mình tin, câu chuyện sẽ không bao giờ kết thúc.",
    story:
      "Tinh thần Nguyễn Thị Bình tiếp tục được lan tỏa trong thời đại số.",
    icon: "✨",
  },
]

export default function StoryMap() {
  const [selected, setSelected] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const toggleModal = (item?: any) => {
    if (item) {
      // Mở theo mốc cũ
      if (selected?.year === item.year) {
        setIsModalOpen((prev) => !prev)
      } else {
        setSelected(item)
        setIsModalOpen(true)
      }
      return
    }

    // toggle đóng/mở lại theo mốc đang chọn
    setIsModalOpen((prev) => {
      // nếu đang mở thì đóng (giữ selected)
      if (prev) return false
      // nếu đang đóng và có selected thì mở lại
      return selected ? true : false
    })
  }


  return (
    <section className="relative min-h-screen overflow-hidden bg-[#050816] text-white">

      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:80px_80px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-24">

        <div className="text-center">

          <p className="mb-4 tracking-[0.4em] text-yellow-400">
            HÀNH TRÌNH LỊCH SỬ
          </p>

          <h1 className="bg-gradient-to-b from-yellow-200 to-yellow-500 bg-clip-text text-7xl font-black text-transparent">
            Nguyễn Thị Bình
          </h1>

          <p className="mt-6 text-2xl text-gray-300">
            Nữ ngoại giao gia cách mạng — Từ quê hương ra thế giới
          </p>
        </div>

        <div className="relative mt-32 flex items-center justify-between">

          <div className="absolute left-0 top-1/2 h-[2px] w-full bg-gradient-to-r from-yellow-500 via-violet-500 to-purple-500" />

          {timeline.map((item, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.1 }}
              onClick={() => toggleModal(item)}

              className="relative z-10 flex flex-col items-center"
            >

              <div className="mb-5 rounded-full border border-white/10 bg-[#0d1224] px-6 py-3 text-lg font-bold backdrop-blur-xl">
                {item.year}
              </div>

              <div
                className={`flex h-20 w-20 items-center justify-center rounded-full text-3xl shadow-2xl
                ${
                  item.color === "yellow"
                    ? "bg-yellow-500/30 shadow-yellow-500/50"
                    : item.color === "red"
                    ? "bg-red-500/30 shadow-red-500/50"
                    : item.color === "orange"
                    ? "bg-orange-500/30 shadow-orange-500/50"
                    : item.color === "gold"
                    ? "bg-yellow-400/30 shadow-yellow-400/50"
                    : item.color === "violet"
                    ? "bg-violet-500/30 shadow-violet-500/50"
                    : "bg-purple-500/30 shadow-purple-500/50"
                }
                `}
              >
                {item.icon}
              </div>

              <div className="mt-5 text-center">
                <p className="text-xl font-bold">
                  {item.location}
                </p>
              </div>
            </motion.button>
          ))}
        </div>

        <div className="mt-24 flex justify-center">
          <div className="rounded-full border border-white/10 bg-[#0d1224]/80 px-8 py-4 text-gray-300 backdrop-blur-xl">
            ✦ Nhấp vào mốc thời gian để khám phá hành trình
          </div>
        </div>
      </div>

      {selected && isModalOpen && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md">

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="relative w-[700px] rounded-[40px] border border-white/10 bg-[#0d1224] p-10"
          >

            <button
              type="button"
              onClick={() => toggleModal()}
              className="absolute right-6 top-6 text-2xl text-gray-400 hover:text-white"
              aria-label="Close"
            >
              ✕
            </button>

            <button
              type="button"
              onClick={() => toggleModal()}
              className="absolute right-6 bottom-6 rounded-full bg-white/5 px-4 py-2 text-sm font-semibold text-gray-200 border border-white/10 hover:bg-white/10"
            >
              {isModalOpen ? "Đóng" : "Mở"}
            </button>


            <p className="tracking-[0.3em] text-yellow-400">
              {selected.year}
            </p>

            <h2 className="mt-4 text-5xl font-black">
              {selected.title}
            </h2>

            <p className="mt-3 text-2xl text-violet-300">
              {selected.location}
            </p>

            <div className="mt-8 rounded-3xl border border-violet-500/20 bg-violet-500/10 p-6 italic text-gray-200">
              “{selected.quote}”
            </div>

            <p className="mt-8 text-lg leading-relaxed text-gray-300">
              {selected.story}
            </p>
          </motion.div>
        </div>
      )}
    </section>
  )
}