"use client";

import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

export default function QRPage() {
  const targetUrl = "https://van-hoa-doc-mu.vercel.app";
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
      
      <h1 className="text-3xl font-bold mb-6">
        Quét để vào Website nhéee
      </h1>

      {/* Nút mở QR */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-semibold transition"
        >
          Mở QR Code
        </button>
      )}

      {/* QR hiển thị khi isOpen = true */}
      {isOpen && (
        <div className="flex flex-col items-center">
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <QRCodeCanvas
              value={targetUrl}
              size={220}
              bgColor="#ffffff"
              fgColor="#000000"
            />
          </div>

          <p className="mt-4 text-gray-400 text-sm">
            {targetUrl}
          </p>

          {/* Nút đóng */}
          <button
            onClick={() => setIsOpen(false)}
            className="mt-6 bg-red-600 hover:bg-red-700 px-6 py-2 rounded-xl font-semibold transition"
          >
            Đóng QR
          </button>
        </div>
      )}
    </div>
  );
}