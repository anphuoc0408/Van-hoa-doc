"use client";

import { QRCodeCanvas } from "qrcode.react";

export default function QRPage() {
  const targetUrl = "https://van-hoa-doc-mu.vercel.app";

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
      <h1 className="text-3xl font-bold mb-6">
        Quét để vào Website nhéee
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