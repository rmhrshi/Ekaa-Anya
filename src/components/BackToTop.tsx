"use client";
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 left-6 z-50 w-11 h-11 rounded-full bg-[#C9956A] text-white flex items-center justify-center shadow-lg hover:scale-110 hover:bg-[#b8845a] transition-all duration-200 fade-in"
      aria-label="Back to top"
    >
      <ArrowUp size={18} />
    </button>
  );
}
