"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  QrCode,
  Menu,
  X,
  BookOpen,
  Headphones,
  Users,
  Sparkles,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavigationProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

export default function Navigation({
  currentPage,
  setCurrentPage,
}: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

  const navItems = [
    { id: 0, label: "Trang Chủ", icon: BookOpen },
    { id: 1, label: "Podcast Bảo Ngọc", icon: Headphones },
    { id: 2, label: "Danh Nhân", icon: Users },
    { id: 3, label: "Story Map", icon: MapPin },
  ];

  const TARGET_URL = `${typeof window !== "undefined" ? window.location.origin : ""}/qr`;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 glass"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center neon-purple">
              <BookOpen className="w-5 h-5 text-primary" />
            </div>
            <span className="text-lg font-bold text-foreground tracking-tight">
              Read<span className="text-primary">Connect</span>
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => {
                  if (item.id === 3) {
                    window.location.href = "/storymap";
                  } else {
                    setCurrentPage(item.id);
                  }
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                  currentPage === item.id
                    ? "bg-primary/20 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </motion.button>
            ))}
          </div>

          {/* QR Toggle (Website QR) */}
          <div className="flex items-center gap-3">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => {
                  setIsScanning(true);
                }}
                variant="outline"
                className="relative border-primary/30 hover:border-primary hover:bg-primary/10 gap-2"
              >
                <QrCode className="w-4 h-4" />
                <span className="hidden sm:inline">QR Trang Web</span>
              </Button>
            </motion.div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-secondary"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-border"
          >
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => {
                    setCurrentPage(item.id);
                    setIsMenuOpen(false);
                  }}
                  className={`w-full px-4 py-3 rounded-lg text-left font-medium transition-all flex items-center gap-3 ${
                    currentPage === item.id
                      ? "bg-primary/20 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`}
                  whileTap={{ scale: 0.98 }}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* QR Overlay (toggle open/close) */}
      <AnimatePresence>
        {isScanning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setIsScanning(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card p-6 sm:p-8 rounded-2xl neon-purple max-w-sm w-full relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-xl font-bold text-foreground">
                    Quét QR website
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1 break-words">
                    {TARGET_URL}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsScanning(false)}
                  className="text-muted-foreground hover:text-foreground"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="w-full flex items-center justify-center">
                <div className="w-64 h-64 rounded-2xl border border-border/40 bg-white/5 glass flex items-center justify-center p-4 text-center">
                  <p className="text-xs text-muted-foreground">
                    Không tạo QR từ API ngoài.
                    <br />
                    Bấm "Mở /qr" bên dưới.
                  </p>
                </div>
              </div>

              <div className="mt-4 flex justify-center">
                <Button
                  onClick={() => {
                    window.location.href = TARGET_URL;
                  }}
                  className="gap-2"
                >
                  Mở /qr
                </Button>
              </div>

              <div className="mt-4 text-center text-xs text-muted-foreground">
                Quét để mở trang tương tác.
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
