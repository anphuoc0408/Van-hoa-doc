"use client";

import { QRCodeCanvas } from "qrcode.react";
import { useRouter } from "next/navigation";

export default function QRPage() {
  const router = useRouter();
  const targetUrl = "https://van-hoa-doc-mu.vercel.app";

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white relative">
      
      {/* Nút đóng góc phải */}
      <button
        onClick={() => router.push("/")}
        className="absolute top-6 right-6 bg-white text-black px-4 py-2 rounded-full font-semibold hover:bg-gray-200 transition"
      >
        ✕ Đóng
      </button>

      <h1 className="text-3xl font-bold mb-6">
        Quét để vào Website
      </h1>

      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <QRCodeCanvas
          value={targetUrl}
          size={220}
          bgColor="#ffffff"
          fgColor="#000000"
        />
      </div>

      <p className="mt-6 text-gray-400 text-sm">
        {targetUrl}
      </p>
    </div>
  );
}