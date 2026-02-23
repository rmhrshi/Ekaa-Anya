"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, ChevronDown, ChevronUp } from "lucide-react";
import { galleryOutfits, outfitData } from "@/lib/outfitData";

const filters = ["All", "Formal", "Party", "Casual", "Business"];

function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

function Accordion({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-border last:border-0">
      <button
        className="w-full flex items-center justify-between py-3 text-xs font-semibold tracking-widest uppercase text-muted-foreground hover:text-[#C9956A] transition-colors"
        onClick={() => setOpen(!open)}
      >
        {title}
        {open ? <ChevronUp size={12} className="text-[#C9956A]" /> : <ChevronDown size={12} />}
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="pb-4 text-sm text-muted-foreground">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function GalleryModal({ outfit: galleryOutfit, onClose }: { outfit: typeof galleryOutfits[0]; onClose: () => void }) {
  const data = outfitData[galleryOutfit.id % outfitData.length] || outfitData[0];
  
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-end md:items-center justify-center"
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
        
        {/* Modal */}
        <motion.div
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="relative z-10 w-full md:max-w-2xl bg-card rounded-t-3xl md:rounded-3xl max-h-[85vh] overflow-y-auto shadow-2xl"
          onClick={e => e.stopPropagation()}
        >
          {/* Gradient swatch header */}
          <div className="h-36 rounded-t-3xl md:rounded-t-3xl relative" style={{ background: galleryOutfit.gradient }}>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white hover:bg-white/30 transition-colors"
            >
              <X size={16} />
            </button>
            <div className="absolute bottom-4 left-6">
              <span className="inline-block px-2 py-0.5 rounded-full bg-white/20 backdrop-blur text-white text-xs font-medium mr-2">
                {galleryOutfit.occasion}
              </span>
              <span className="inline-block px-2 py-0.5 rounded-full bg-white/20 backdrop-blur text-white text-xs font-medium">
                {galleryOutfit.skinTone}
              </span>
            </div>
          </div>

          {/* Color palette from swatch */}
          <div className="flex gap-2 px-6 pt-5 pb-2">
            {galleryOutfit.palette.map((c, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <div className="w-10 h-10 rounded-lg shadow-sm" style={{ background: c }} />
                <span className="text-[9px] font-mono text-muted-foreground">{c}</span>
              </div>
            ))}
          </div>

          <div className="px-6 pb-6">
            <h2 className="font-display text-2xl font-bold text-foreground mb-1">{galleryOutfit.name}</h2>
            <p className="text-sm text-muted-foreground mb-6">{galleryOutfit.description}</p>

            <div className="space-y-0 border-t border-border">
              <Accordion title="The Look" defaultOpen>
                <p className="leading-relaxed">{data.suggested_outfit}</p>
              </Accordion>
              <Accordion title="Top">
                <p><span className="font-medium text-foreground">{data.top.color} {data.top.type}</span> — {data.top.brand}, {data.top.fabric}</p>
              </Accordion>
              <Accordion title="Bottom">
                <p><span className="font-medium text-foreground">{data.bottom.color} {data.bottom.type}</span> — {data.bottom.brand}, {data.bottom.fabric}</p>
              </Accordion>
              <Accordion title="Shoes">
                <p><span className="font-medium text-foreground">{data.shoes.color} {data.shoes.type}</span> — {data.shoes.brand}</p>
              </Accordion>
              <Accordion title="Accessories">
                <ul className="space-y-1">
                  {data.accessories.map((a, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="text-[#C9956A]">✦</span> {a}
                    </li>
                  ))}
                </ul>
              </Accordion>
              <Accordion title="Why This Works">
                <p className="leading-relaxed">{data.why_it_works}</p>
              </Accordion>
            </div>

            {/* Shop items */}
            <div className="mt-6">
              <h3 className="font-display font-bold text-lg text-foreground mb-3">Shop This Look</h3>
              <div className="grid grid-cols-2 gap-3">
                {data.shopping_items.slice(0, 4).map((item, i) => (
                  <a
                    key={i}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl border border-border hover:border-[#C9956A]/40 hover:shadow-md transition-all duration-200 group"
                  >
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${galleryOutfit.palette[0]}22` }}>
                      <ShoppingBag size={16} className="text-[#C9956A]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-foreground truncate">{item.name}</p>
                      <p className="text-[10px] text-muted-foreground">{item.platform}</p>
                    </div>
                    <span className="text-[#C9956A] text-xs opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function GalleryCard({ outfit, index, onClick }: { outfit: typeof galleryOutfits[0]; index: number; onClick: () => void }) {
  const heights = [260, 320, 280, 300, 260, 340, 280, 260, 300, 320, 260, 280, 300, 320];
  const h = heights[index % heights.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ delay: index * 0.04, duration: 0.45 }}
      onClick={onClick}
      className="group relative rounded-2xl overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-500"
      style={{ height: h }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Gradient background */}
      <div
        className="absolute inset-0 transition-all duration-500 group-hover:scale-105"
        style={{ background: outfit.gradient }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
      
      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
        <div className="flex gap-1.5 mb-2">
          <span className="px-2 py-0.5 rounded-full bg-white/20 backdrop-blur text-white text-[10px] font-medium">
            {outfit.occasion}
          </span>
          <span className="px-2 py-0.5 rounded-full bg-white/20 backdrop-blur text-white text-[10px] font-medium">
            {outfit.skinTone}
          </span>
        </div>
        <h3 className="font-display font-bold text-white text-base leading-tight">{outfit.name}</h3>
        <p className="text-white/70 text-xs mt-0.5 line-clamp-1">{outfit.description}</p>
        
        {/* View Look button — slides up on hover */}
        <div className="mt-3 overflow-hidden h-0 group-hover:h-8 transition-all duration-300">
          <button className="w-full py-1.5 rounded-lg bg-white/20 backdrop-blur text-white text-xs font-semibold hover:bg-white/30 transition-colors">
            View Look →
          </button>
        </div>
      </div>

      {/* Palette circles */}
      <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {outfit.palette.map((c, i) => (
          <div key={i} className="w-5 h-5 rounded-full border border-white/30" style={{ background: c }} />
        ))}
      </div>
    </motion.div>
  );
}

export default function GalleryPage() {
  useScrollReveal();
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedOutfit, setSelectedOutfit] = useState<typeof galleryOutfits[0] | null>(null);

  const filtered = galleryOutfits.filter(
    o => activeFilter === "All" || o.occasion === activeFilter
  );

  return (
    <main className="pt-16 min-h-screen">
      {/* Header */}
      <div className="relative py-20 px-6 text-center overflow-hidden">
        <div className="grain-overlay opacity-50" />
        <div className="relative z-10 reveal">
          <h1 className="font-display text-6xl md:text-7xl font-black text-foreground mb-4">
            Style<br />
            <em className="text-[#C9956A]">Inspiration</em>
          </h1>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            AI-generated looks for every occasion and skin tone.
          </p>
        </div>
      </div>

      {/* Filter bar */}
      <div className="sticky top-16 z-30 bg-background/90 backdrop-blur-xl border-b border-border px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto">
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                activeFilter === filter
                  ? "bg-[#C9956A] text-white"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {filter}
            </button>
          ))}
          <span className="ml-auto text-xs text-muted-foreground whitespace-nowrap shrink-0">
            {filtered.length} looks
          </span>
        </div>
      </div>

      {/* Masonry gallery */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((outfit, i) => (
              <div key={outfit.id} className="break-inside-avoid mb-4">
                <GalleryCard
                  outfit={outfit}
                  index={i}
                  onClick={() => setSelectedOutfit(outfit)}
                />
              </div>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            <p className="font-display text-2xl mb-2">No looks found</p>
            <p className="text-sm">Try a different filter</p>
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedOutfit && (
          <GalleryModal outfit={selectedOutfit} onClose={() => setSelectedOutfit(null)} />
        )}
      </AnimatePresence>
    </main>
  );
}
