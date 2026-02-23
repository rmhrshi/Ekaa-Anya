"use client";
import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload, Check, ChevronDown, ChevronUp, ShoppingBag,
  RotateCcw, Sparkles, User, Users
} from "lucide-react";
import { getOutfit, OutfitData } from "@/lib/outfitData";
import { useToast } from "@/components/ToastProvider";

// ─── SCAN PANEL ──────────────────────────────────────────────────────────────
const scanMessages = [
  "Reading skin tone...",
  "Matching color theory...",
  "Building your complete outfit...",
  "Selecting complementary accessories...",
  "Preparing your shopping list...",
];

function TypewriterText({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    setDisplayed("");
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else clearInterval(interval);
    }, 38);
    return () => clearInterval(interval);
  }, [text]);
  return (
    <span>
      {displayed}
      <span className="typewriter-cursor" />
    </span>
  );
}

function ScanPanel() {
  const [msgIdx, setMsgIdx] = useState(0);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const cycle = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setMsgIdx(i => (i + 1) % scanMessages.length);
        setVisible(true);
      }, 400);
    }, 2000);
    return () => clearInterval(cycle);
  }, []);
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[400px] relative overflow-hidden">
      {/* Scanner lines */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl">
        <div className="scanner-line" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#C9956A]/3 to-transparent" />
      </div>
      <div className="relative z-10 text-center px-8">
        <div className="w-16 h-16 rounded-full border-2 border-[#C9956A]/30 flex items-center justify-center mx-auto mb-8 relative">
          <Sparkles className="text-[#C9956A] animate-pulse" size={24} />
          <div className="absolute inset-0 rounded-full border-2 border-[#C9956A] opacity-40 animate-ping" />
        </div>
        <div className="text-[#1A1A2E] dark:text-foreground font-medium text-lg min-h-[2rem] transition-opacity duration-400" style={{ opacity: visible ? 1 : 0 }}>
          <TypewriterText text={scanMessages[msgIdx]} />
        </div>
        <p className="text-muted-foreground text-sm mt-3">Analyzing your style profile...</p>
        <div className="flex items-center justify-center gap-1.5 mt-6">
          {[0, 1, 2].map(i => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#C9956A]" style={{ animationDelay: `${i * 0.2}s`, animation: "pulse 1.2s ease-in-out infinite" }} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── EMPTY STATE ──────────────────────────────────────────────────────────────
function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center px-8">
      {/* Editorial line-art fashion illustration */}
      <svg width="140" height="160" viewBox="0 0 140 160" fill="none" className="mb-6 opacity-70">
        {/* Figure */}
        <circle cx="70" cy="28" r="16" stroke="#C9956A" strokeWidth="1.5" fill="none" />
        {/* Body */}
        <path d="M55 44 L45 100 L95 100 L85 44" stroke="#C9956A" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
        {/* Waist detail */}
        <line x1="47" y1="70" x2="93" y2="70" stroke="#9B7FA6" strokeWidth="1" strokeDasharray="3 3" />
        {/* Left arm */}
        <path d="M55 50 L35 80" stroke="#C9956A" strokeWidth="1.5" strokeLinecap="round" />
        {/* Right arm */}
        <path d="M85 50 L105 80" stroke="#C9956A" strokeWidth="1.5" strokeLinecap="round" />
        {/* Legs */}
        <path d="M55 100 L48 140" stroke="#C9956A" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M85 100 L92 140" stroke="#C9956A" strokeWidth="1.5" strokeLinecap="round" />
        {/* Decorative stars */}
        <text x="10" y="50" fill="#9B7FA6" fontSize="10">✦</text>
        <text x="118" y="90" fill="#C9956A" fontSize="8">✦</text>
        <text x="60" y="155" fill="#9B7FA6" fontSize="7">✦</text>
      </svg>
      <h3 className="font-display text-2xl font-bold text-foreground mb-2">Your style profile<br />will appear here</h3>
      <p className="text-muted-foreground text-sm max-w-xs leading-relaxed">
        Fill in your details and click &ldquo;Analyze My Style&rdquo; to receive a fully personalized outfit recommendation.
      </p>
    </div>
  );
}

// ─── ACCORDION ────────────────────────────────────────────────────────────────
function Accordion({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-border last:border-0">
      <button
        className="w-full flex items-center justify-between py-3 text-sm font-semibold text-foreground hover:text-[#C9956A] transition-colors"
        onClick={() => setOpen(!open)}
      >
        <span className="tracking-widest text-xs uppercase text-muted-foreground">{title}</span>
        {open ? <ChevronUp size={14} className="text-[#C9956A]" /> : <ChevronDown size={14} className="text-muted-foreground" />}
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
            <div className="pb-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── RESULTS PANEL ────────────────────────────────────────────────────────────
function TypewriterParagraph({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    setDisplayed("");
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else clearInterval(interval);
    }, 18);
    return () => clearInterval(interval);
  }, [text]);
  return (
    <span className="text-sm text-muted-foreground leading-relaxed">
      {displayed}
      {displayed.length < text.length && <span className="typewriter-cursor" />}
    </span>
  );
}

const platformColors: Record<string, string> = {
  Amazon: "bg-orange-500/10 text-orange-600",
  Myntra: "bg-pink-500/10 text-pink-600",
  Zara: "bg-gray-900/10 text-gray-700 dark:text-gray-300",
};

function ResultsPanel({ outfit, onReset }: { outfit: OutfitData; onReset: () => void }) {
  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.12, duration: 0.55 } }),
  };

  return (
    <div className="flex flex-col gap-5 px-6 py-6">
      {/* Card 1 — Skin Tone */}
      <motion.div custom={0} variants={itemVariants} initial="hidden" animate="visible"
        className="bg-card rounded-2xl p-6 border border-border shadow-sm"
      >
        <div className="flex items-center gap-5">
          <div className="relative shrink-0">
            <div
              className="w-20 h-20 rounded-full skin-glow"
              style={{ background: outfit.skin_hex }}
            />
          </div>
          <div className="flex-1">
            <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Detected Skin Tone</p>
            <h3 className="font-display text-2xl font-bold text-foreground mb-1">{outfit.skin_tone}</h3>
            <p className="text-sm text-muted-foreground mb-3">{outfit.skin_description}</p>
            <div className="flex gap-2 flex-wrap">
              {[`R ${outfit.rgb.r}`, `G ${outfit.rgb.g}`, `B ${outfit.rgb.b}`].map((v, i) => (
                <span key={i} className="px-2 py-0.5 rounded bg-muted text-xs font-mono text-muted-foreground">{v}</span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Card 2 — Complete Look */}
      <motion.div custom={1} variants={itemVariants} initial="hidden" animate="visible"
        className="bg-card rounded-2xl overflow-hidden border border-border shadow-sm"
      >
        <div className="border-l-4 border-[#C9956A] p-6">
          <h3 className="font-display text-xl font-bold text-foreground mb-4">Your Complete Look</h3>
          <div className="space-y-0">
            <Accordion title="Dress Code">
              <div className="flex gap-2 flex-wrap">
                {outfit.dress_codes.map(d => (
                  <span key={d} className="px-3 py-1 rounded-full bg-[#C9956A]/10 text-[#C9956A] text-xs font-medium">{d}</span>
                ))}
              </div>
            </Accordion>
            <Accordion title="The Look" defaultOpen>
              <p className="text-sm text-muted-foreground leading-relaxed">{outfit.suggested_outfit}</p>
            </Accordion>
            <Accordion title="Top">
              <div className="space-y-2">
                {[["Color", outfit.top.color], ["Type", outfit.top.type], ["Brand", outfit.top.brand], ["Fabric", outfit.top.fabric]].map(([k, v]) => (
                  <div key={k} className="flex items-center gap-3 text-sm">
                    {k === "Color" && <div className="w-3 h-3 rounded-full shrink-0" style={{ background: outfit.color_palette.secondary }} />}
                    <span className="text-muted-foreground w-14 shrink-0">{k}</span>
                    <span className="text-foreground">{v}</span>
                  </div>
                ))}
              </div>
            </Accordion>
            <Accordion title="Bottom">
              <div className="space-y-2">
                {[["Color", outfit.bottom.color], ["Type", outfit.bottom.type], ["Brand", outfit.bottom.brand], ["Fabric", outfit.bottom.fabric]].map(([k, v]) => (
                  <div key={k} className="flex items-center gap-3 text-sm">
                    {k === "Color" && <div className="w-3 h-3 rounded-full shrink-0" style={{ background: outfit.color_palette.primary }} />}
                    <span className="text-muted-foreground w-14 shrink-0">{k}</span>
                    <span className="text-foreground">{v}</span>
                  </div>
                ))}
              </div>
            </Accordion>
            <Accordion title="Shoes">
              <div className="space-y-2">
                {[["Color", outfit.shoes.color], ["Type", outfit.shoes.type], ["Brand", outfit.shoes.brand]].map(([k, v]) => (
                  <div key={k} className="flex items-center gap-3 text-sm">
                    {k === "Color" && <div className="w-3 h-3 rounded-full shrink-0" style={{ background: outfit.color_palette.accent }} />}
                    <span className="text-muted-foreground w-14 shrink-0">{k}</span>
                    <span className="text-foreground">{v}</span>
                  </div>
                ))}
              </div>
            </Accordion>
            <Accordion title="Hairstyle">
              <p className="font-semibold text-sm text-foreground mb-2">{outfit.hairstyle.style_name}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{outfit.hairstyle.how_to}</p>
            </Accordion>
            <Accordion title="Accessories">
              <ul className="space-y-2">
                {outfit.accessories.map((a, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-[#C9956A] mt-0.5 shrink-0">✦</span> {a}
                  </li>
                ))}
              </ul>
            </Accordion>
            <Accordion title="Color Palette">
              <div className="flex gap-4">
                {[["Primary", outfit.color_palette.primary], ["Secondary", outfit.color_palette.secondary], ["Accent", outfit.color_palette.accent]].map(([label, hex]) => (
                  <div key={label} className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 rounded-xl shadow-sm border border-border" style={{ background: hex }} />
                    <span className="text-xs text-muted-foreground">{label}</span>
                    <span className="text-xs font-mono text-foreground">{hex}</span>
                  </div>
                ))}
              </div>
            </Accordion>
            <Accordion title="Why This Works" defaultOpen>
              <TypewriterParagraph text={outfit.why_it_works} />
            </Accordion>
          </div>
        </div>
      </motion.div>

      {/* Card 3 — Shop The Look */}
      <motion.div custom={2} variants={itemVariants} initial="hidden" animate="visible"
        className="bg-card rounded-2xl p-6 border border-border shadow-sm"
      >
        <h3 className="font-display text-xl font-bold text-foreground mb-4">Shop The Look</h3>
        <div className="flex gap-4 overflow-x-auto pb-2 -mx-1 px-1">
          {outfit.shopping_items.map((item, i) => (
            <div key={i} className="group shrink-0 w-40 rounded-xl border border-border bg-muted/40 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="h-24 flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${outfit.color_palette.primary}22, ${outfit.color_palette.secondary}22)` }}>
                <ShoppingBag className="text-[#C9956A]" size={28} />
              </div>
              <div className="p-3">
                <p className="text-xs font-semibold text-foreground mb-1 line-clamp-2 leading-tight">{item.name}</p>
                <span className="inline-block text-[10px] px-2 py-0.5 rounded-full bg-border text-muted-foreground mb-2">{item.category}</span>
                <div className="mb-2">
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${platformColors[item.platform]}`}>{item.platform}</span>
                </div>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center text-xs font-semibold py-1.5 rounded-lg bg-[#C9956A] text-white hover:bg-[#b8845a] transition-colors mt-1"
                  onClick={(e) => e.stopPropagation()}
                >
                  Shop →
                </a>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Reset */}
      <motion.button
        custom={3} variants={itemVariants} initial="hidden" animate="visible"
        onClick={onReset}
        className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-border text-muted-foreground hover:border-[#C9956A] hover:text-[#C9956A] transition-all duration-200 text-sm font-medium"
      >
        <RotateCcw size={14} />
        Try Another Look
      </motion.button>
    </div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
const genderOptions = [
  { value: "Male", icon: <User size={20} />, label: "Male" },
  { value: "Female", icon: <User size={20} />, label: "Female" },
  { value: "Non-binary", icon: <Users size={20} />, label: "Non-binary" },
];
const occasions = ["Formal", "Business", "Smart Casual", "Party", "Date Night", "Everyday", "Casual"];
const styleVibes = [
  { label: "Minimalist", icon: "◻" },
  { label: "Streetwear", icon: "🧢" },
  { label: "Bohemian", icon: "🌿" },
  { label: "Classic", icon: "👔" },
  { label: "Trendy", icon: "✨" },
  { label: "Sporty", icon: "⚡" },
  { label: "Vintage", icon: "🎞" },
];
const skinTones = [
  { label: "Fair", hex: "#FDDBB4" },
  { label: "Light", hex: "#F1C27D" },
  { label: "Medium", hex: "#C68642" },
  { label: "Olive", hex: "#8D5524" },
  { label: "Tan", hex: "#6D4C41" },
  { label: "Deep", hex: "#3B1F0F" },
];

export default function StyleToolPage() {
  const { showToast } = useToast();

  // Form state
  const [photoURL, setPhotoURL] = useState<string | null>(null);
  const [gender, setGender] = useState("");
  const [occasion, setOccasion] = useState("");
  const [vibes, setVibes] = useState<string[]>([]);
  const [budget, setBudget] = useState(5000);
  const [skinTone, setSkinTone] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Result state
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<OutfitData | null>(null);
  const [ripple, setRipple] = useState(false);
  const [hoveredSkin, setHoveredSkin] = useState("");

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) {
      showToast("Please upload an image file", "error");
      return;
    }
    const url = URL.createObjectURL(file);
    setPhotoURL(url);
    showToast("Photo uploaded successfully!", "success");
  }, [showToast]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const handleAnalyze = () => {
    if (!gender) { showToast("Please select your gender", "error"); return; }
    if (!occasion) { showToast("Please select an occasion", "error"); return; }

    setRipple(true);
    setTimeout(() => setRipple(false), 600);
    setResult(null);
    setLoading(true);
    showToast("Analyzing your style profile...", "info");

    setTimeout(() => {
      const outfit = getOutfit(gender, occasion, skinTone || "Medium");
      setResult(outfit);
      setLoading(false);
      showToast("Your style profile is ready!", "success");
    }, 3200);
  };

  const handleReset = () => {
    setResult(null);
    setLoading(false);
    setPhotoURL(null);
    setGender("");
    setOccasion("");
    setVibes([]);
    setBudget(5000);
    setSkinTone("");
    showToast("Ready for a fresh look!", "info");
  };

  const toggleVibe = (v: string) => {
    setVibes(prev => prev.includes(v) ? prev.filter(x => x !== v) : [...prev, v]);
  };

  const formatBudget = (v: number) =>
    v >= 1000 ? `₹${(v / 1000).toFixed(0)}K` : `₹${v}`;

  return (
    <div className="pt-16 min-h-screen">
      {/* Page header */}
      <div className="text-center py-10 px-6 border-b border-border">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C9956A]/10 text-[#C9956A] text-xs font-medium tracking-widest uppercase mb-3">
          <Sparkles size={12} />
          AI Style Analysis
        </span>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground">Your Personal Stylist</h1>
        <p className="text-muted-foreground mt-2">Personalized from your skin tone outward.</p>
      </div>

      {/* Split layout */}
      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-200px)]">
        {/* LEFT PANEL */}
        <div className="lg:w-1/2 lg:border-r border-border overflow-y-auto bg-[#FAFAF8] dark:bg-secondary/10">
          <div className="max-w-xl mx-auto px-6 py-8 space-y-10">

            {/* Section 1 — Photo Upload */}
            <div>
              <h2 className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-4">01 — Your Photo</h2>
              {!photoURL ? (
                <div
                  onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`relative h-52 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${
                    isDragging ? "border-[#C9956A] bg-[#C9956A]/5" : "border-border hover:border-[#C9956A]/50"
                  }`}
                  style={{ border: "2px dashed" }}
                >
                  {/* Rotating dashed border animation */}
                  <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none opacity-30">
                    <div className="rotate-dash absolute -inset-2 rounded-2xl border-2 border-dashed border-[#C9956A]/40" />
                  </div>
                  <div className="relative z-10 flex flex-col items-center gap-3">
                    <div className="w-14 h-14 rounded-full bg-[#C9956A]/10 flex items-center justify-center">
                      <Upload className="text-[#C9956A]" size={22} />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-foreground">Drop your photo here</p>
                      <p className="text-xs text-muted-foreground mt-1">or <span className="text-[#C9956A] underline">Browse</span></p>
                    </div>
                  </div>
                  <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])} />
                </div>
              ) : (
                <div className="relative h-52 rounded-2xl overflow-hidden group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={photoURL} alt="Uploaded" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                    <Check size={16} className="text-white animate-bounce" />
                  </div>
                  <button
                    onClick={() => setPhotoURL(null)}
                    className="absolute bottom-3 right-3 px-3 py-1 rounded-lg bg-white/20 backdrop-blur text-white text-xs hover:bg-white/30 transition-colors"
                  >
                    Change
                  </button>
                </div>
              )}
            </div>

            {/* Section 2 — Gender */}
            <div>
              <h2 className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-4">02 — I Am</h2>
              <div className="grid grid-cols-3 gap-3">
                {genderOptions.map(opt => (
                  <motion.button
                    key={opt.value}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setGender(opt.value)}
                    className={`relative flex flex-col items-center gap-2 py-4 rounded-xl border-2 transition-all duration-200 ${
                      gender === opt.value
                        ? "border-[#C9956A] bg-[#C9956A] text-white"
                        : "border-border bg-card text-muted-foreground hover:border-[#C9956A]/40"
                    }`}
                  >
                    {opt.icon}
                    <span className="text-xs font-semibold">{opt.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Section 3 — Occasion */}
            <div>
              <h2 className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-4">03 — Occasion</h2>
              <div className="pill-scroll-container overflow-x-auto">
                <div className="flex gap-2 pb-2" style={{ width: "max-content" }}>
                  {occasions.map(occ => (
                    <motion.button
                      key={occ}
                      whileTap={{ scale: 0.93 }}
                      onClick={() => setOccasion(occ)}
                      className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 border ${
                        occasion === occ
                          ? "bg-[#C9956A] text-white border-[#C9956A]"
                          : "border-border text-muted-foreground hover:border-[#C9956A]/40 hover:text-foreground"
                      }`}
                    >
                      {occ}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            {/* Section 4 — Style Vibe */}
            <div>
              <h2 className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-4">04 — Style Vibe</h2>
              <div className="flex flex-wrap gap-2">
                {styleVibes.map(v => (
                  <motion.button
                    key={v.label}
                    whileTap={{ scale: 0.88 }}
                    onClick={() => toggleVibe(v.label)}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                      vibes.includes(v.label)
                        ? "bg-[#C9956A] text-white border-[#C9956A] scale-105"
                        : "border-border text-muted-foreground hover:border-[#C9956A]/40"
                    }`}
                  >
                    <span className="text-base leading-none">{v.icon}</span>
                    {v.label}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Section 5 — Budget Slider */}
            <div>
              <h2 className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-4">05 — Budget</h2>
              <div className="relative pt-8">
                <div
                  className="absolute top-0 text-xs font-semibold bg-[#C9956A] text-white px-2 py-0.5 rounded-full transition-all duration-100"
                  style={{ left: `calc(${((budget - 500) / (50000 - 500)) * 100}% - 20px)` }}
                >
                  {formatBudget(budget)}
                </div>
                <div className="relative h-2 rounded-full bg-border">
                  <div
                    className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-[#C9956A] to-[#9B7FA6] transition-all duration-100"
                    style={{ width: `${((budget - 500) / (50000 - 500)) * 100}%` }}
                  />
                </div>
                <input
                  type="range"
                  min={500}
                  max={50000}
                  step={500}
                  value={budget}
                  onChange={e => setBudget(Number(e.target.value))}
                  className="absolute inset-0 w-full opacity-0 cursor-pointer h-2 mt-6"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-3">
                  <span>₹500</span>
                  <span>₹50,000</span>
                </div>
              </div>
            </div>

            {/* Section 6 — Skin Tone Override */}
            <div>
              <h2 className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-4">06 — Skin Tone</h2>
              <div className="flex gap-3 flex-wrap">
                {skinTones.map(st => (
                  <div key={st.label} className="relative group">
                    <button
                      onClick={() => setSkinTone(st.label)}
                      onMouseEnter={() => setHoveredSkin(st.label)}
                      onMouseLeave={() => setHoveredSkin("")}
                      className={`w-10 h-10 rounded-full transition-all duration-200 ${
                        skinTone === st.label ? "ring-2 ring-offset-2 ring-[#C9956A] scale-110 shadow-lg" : "hover:scale-110"
                      }`}
                      style={{ background: st.hex }}
                    />
                    {hoveredSkin === st.label && (
                      <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-foreground text-background text-[10px] px-2 py-0.5 rounded whitespace-nowrap pointer-events-none z-10">
                        {st.label}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              {skinTone && (
                <p className="text-xs text-muted-foreground mt-2">Selected: <span className="text-[#C9956A] font-medium">{skinTone}</span></p>
              )}
            </div>

            {/* Submit */}
            <div className="pb-4">
              <motion.button
                onClick={handleAnalyze}
                disabled={loading}
                whileTap={{ scale: 0.97 }}
                className="relative w-full py-4 rounded-2xl font-semibold text-white text-base overflow-hidden transition-all duration-200 hover:scale-[1.01] disabled:opacity-70 disabled:cursor-not-allowed"
                style={{ background: loading ? "#b8845a" : "linear-gradient(135deg, #C9956A 0%, #b8845a 50%, #C9956A 100%)", backgroundSize: "200%" }}
              >
                {/* Ripple */}
                {ripple && (
                  <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="w-8 h-8 rounded-full bg-white/30 ripple-effect" />
                  </span>
                )}
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                    Analyzing...
                  </span>
                ) : (
                  "Analyze My Style ✦"
                )}
              </motion.button>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="lg:w-1/2 overflow-y-auto bg-card">
          {loading ? (
            <ScanPanel />
          ) : result ? (
            <ResultsPanel outfit={result} onReset={handleReset} />
          ) : (
            <EmptyState />
          )}
        </div>
      </div>
    </div>
  );
}
