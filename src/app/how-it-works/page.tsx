"use client";
import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

// Animated flowchart for Section 3
function FlowChart() {
  const [step, setStep] = useState(0);
  const inputs = ["Skin Tone", "Occasion", "Gender", "Style Vibe"];
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let i = 0;
          const interval = setInterval(() => {
            if (i <= inputs.length) {
              setStep(i);
              i++;
            } else clearInterval(interval);
          }, 400);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="flex flex-col items-center gap-4">
      <div className="grid grid-cols-2 gap-3 w-full max-w-xs">
        {inputs.map((input, i) => (
          <motion.div
            key={input}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: step > i ? 1 : 0.2, scale: step > i ? 1 : 0.9 }}
            transition={{ duration: 0.35 }}
            className="px-4 py-3 rounded-xl border-2 text-center text-sm font-medium transition-all duration-300"
            style={{
              borderColor: step > i ? "#C9956A" : "#E8E0D8",
              color: step > i ? "#C9956A" : "#8B7B70",
              background: step > i ? "#C9956A10" : "transparent",
            }}
          >
            {input}
          </motion.div>
        ))}
      </div>
      {/* Arrow */}
      <motion.div
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{ opacity: step >= inputs.length ? 1 : 0, scaleY: step >= inputs.length ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center"
        style={{ transformOrigin: "top" }}
      >
        <div className="w-px h-8 bg-gradient-to-b from-[#C9956A] to-[#9B7FA6]" />
        <div className="w-2 h-2 rounded-full bg-[#9B7FA6]" />
      </motion.div>
      {/* Output */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: step >= inputs.length ? 1 : 0, y: step >= inputs.length ? 0 : 20 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="px-8 py-4 rounded-2xl text-center font-bold text-white"
        style={{ background: "linear-gradient(135deg, #C9956A, #9B7FA6)" }}
      >
        ✦ Perfect Outfit
      </motion.div>
    </div>
  );
}

// Animated color wheel
function ColorWheel() {
  const segments = [
    { color: "#FF6B6B", label: "Warm Red", angle: 0 },
    { color: "#FF8E53", label: "Orange", angle: 30 },
    { color: "#FFC107", label: "Yellow", angle: 60 },
    { color: "#8BC34A", label: "Yellow-Green", angle: 90 },
    { color: "#4CAF50", label: "Green", angle: 120 },
    { color: "#00BCD4", label: "Teal", angle: 150 },
    { color: "#2196F3", label: "Blue", angle: 180 },
    { color: "#673AB7", label: "Violet", angle: 210 },
    { color: "#9C27B0", label: "Purple", angle: 240 },
    { color: "#E91E63", label: "Pink", angle: 270 },
    { color: "#F44336", label: "Red", angle: 300 },
    { color: "#FF5722", label: "Deep Orange", angle: 330 },
  ];
  const [hovered, setHovered] = useState(-1);

  return (
    <div className="relative w-48 h-48 mx-auto spin-slow">
      {segments.map((seg, i) => {
        const rad = (seg.angle * Math.PI) / 180;
        const r = 64;
        const x = 96 + r * Math.cos(rad);
        const y = 96 + r * Math.sin(rad);
        return (
          <div
            key={i}
            className="absolute w-10 h-10 rounded-full transition-transform duration-200 hover:scale-125"
            style={{
              left: x - 20,
              top: y - 20,
              background: seg.color,
              boxShadow: hovered === i ? `0 0 16px ${seg.color}80` : "none",
              animationPlayState: "paused",
            }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(-1)}
          />
        );
      })}
      <div className="absolute inset-[30%] rounded-full bg-card border-2 border-border flex items-center justify-center">
        <span className="text-lg">🎨</span>
      </div>
    </div>
  );
}

// Animated product cards
function ProductCards() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const cards = [
    { name: "Navy Slim Suit", price: "₹8,999", platform: "Myntra", color: "#1B2A4A" },
    { name: "White Oxford Shirt", price: "₹1,299", platform: "Amazon", color: "#F5F5F5" },
    { name: "Cognac Oxford Shoes", price: "₹4,499", platform: "Amazon", color: "#8B4513" },
  ];
  return (
    <div ref={ref} className="flex flex-col gap-3">
      {cards.map((card, i) => (
        <motion.div
          key={i}
          initial={{ x: 80, opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : {}}
          transition={{ delay: i * 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-3 p-3 rounded-xl border border-border bg-card shadow-sm"
        >
          <div className="w-10 h-10 rounded-lg shrink-0" style={{ background: card.color }} />
          <div className="flex-1">
            <p className="text-sm font-semibold text-foreground">{card.name}</p>
            <p className="text-xs text-muted-foreground">{card.platform}</p>
          </div>
          <span className="text-sm font-bold text-[#C9956A]">{card.price}</span>
        </motion.div>
      ))}
    </div>
  );
}

// Face detection diagram
function FaceDetectionDiagram() {
  return (
    <div className="relative w-48 h-48 mx-auto">
      {/* Face outline */}
      <svg width="192" height="192" viewBox="0 0 192 192">
        {/* Head */}
        <ellipse cx="96" cy="80" rx="60" ry="72" stroke="#C9956A" strokeWidth="1.5" fill="none" strokeDasharray="4 3" />
        {/* Detection regions */}
        <rect x="60" y="50" width="28" height="20" rx="4" stroke="#C9956A" strokeWidth="1" fill="#C9956A10" />
        <rect x="104" y="50" width="28" height="20" rx="4" stroke="#C9956A" strokeWidth="1" fill="#C9956A10" />
        <rect x="74" y="82" width="20" height="16" rx="4" stroke="#9B7FA6" strokeWidth="1" fill="#9B7FA610" />
        <rect x="62" y="105" width="68" height="16" rx="4" stroke="#C9956A" strokeWidth="1" fill="#C9956A10" />
        {/* Labels */}
        <text x="68" y="64" fill="#C9956A" fontSize="7" textAnchor="middle">Eye L</text>
        <text x="118" y="64" fill="#C9956A" fontSize="7" textAnchor="middle">Eye R</text>
        <text x="84" y="93" fill="#9B7FA6" fontSize="7" textAnchor="middle">Nose</text>
        <text x="96" y="117" fill="#C9956A" fontSize="7" textAnchor="middle">Lip / Tone Zone</text>
        {/* Corner brackets */}
        <path d="M30 30 L30 50 L50 50" stroke="#C9956A" strokeWidth="1.5" fill="none" />
        <path d="M162 30 L162 50 L142 50" stroke="#C9956A" strokeWidth="1.5" fill="none" />
        <path d="M30 162 L30 142 L50 142" stroke="#C9956A" strokeWidth="1.5" fill="none" />
        <path d="M162 162 L162 142 L142 142" stroke="#C9956A" strokeWidth="1.5" fill="none" />
      </svg>
      {/* Scan line */}
      <div className="scanner-line" style={{ animation: "scanner 3s ease-in-out infinite" }} />
    </div>
  );
}

const sections = [
  {
    num: "01",
    title: "Photo Analysis",
    headline: "Reading your skin at the pixel level.",
    body: "Our computer vision model analyzes 47 distinct facial zones to identify your true undertone — warm, cool, or neutral. It measures hue distribution, saturation levels, and reflectance patterns to produce a precise skin tone classification that goes far beyond what the eye can see.",
    visual: <FaceDetectionDiagram />,
  },
  {
    num: "02",
    title: "Color Theory",
    headline: "The science of what makes you glow.",
    body: "Every skin tone has a set of colors that either harmonize with or fight against it. StyleSense maps your detected undertone onto the Itten Color Circle to identify your seasonal color palette — the specific hues that will make your complexion appear luminous in any light.",
    visual: <ColorWheel />,
  },
  {
    num: "03",
    title: "AI Outfit Generation",
    headline: "Where data becomes style.",
    body: "Our recommendation engine combines your skin tone analysis with your chosen occasion, gender expression, and style vibe to assemble a complete outfit. Every component — top, bottom, shoes, accessories — is selected to create a harmonious color story that flatters your unique complexion.",
    visual: <FlowChart />,
  },
  {
    num: "04",
    title: "Shopping Curation",
    headline: "Style meets commerce, seamlessly.",
    body: "Each recommended item is matched to real products available on Amazon India, Myntra, and Zara. Product selection prioritizes quality brands, your stated budget range, and availability — so you can go from style recommendation to checkout in under two minutes.",
    visual: <ProductCards />,
  },
];

export default function HowItWorksPage() {
  useScrollReveal();

  return (
    <main className="pt-16">
      {/* Hero */}
      <div className="relative py-20 px-6 text-center overflow-hidden bg-[#FAFAF8] dark:bg-background">
        <div className="grain-overlay" />
        <div className="relative z-10">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C9956A]/10 text-[#C9956A] text-xs font-medium tracking-widest uppercase mb-4 fade-up">
            The Technology
          </span>
          <h1 className="font-display text-6xl md:text-8xl font-black text-[#1A1A2E] dark:text-foreground leading-none mb-4 fade-up" style={{ animationDelay: "0.2s" }}>
            The science of<br />
            <em className="text-[#C9956A]">looking great.</em>
          </h1>
          <p className="text-muted-foreground text-lg max-w-md mx-auto fade-up" style={{ animationDelay: "0.4s" }}>
            A scroll-through explanation of the AI technology behind StyleSense.
          </p>
        </div>
      </div>

      {/* Sections */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        {sections.map((section, i) => (
          <div key={i} className={`reveal flex flex-col ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} gap-16 items-center py-20 border-b border-border last:border-0`} style={{ transitionDelay: "0ms" }}>
            {/* Text */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-display text-7xl font-black text-[#C9956A]/20">{section.num}</span>
                <span className="px-3 py-1 rounded-full bg-[#C9956A]/10 text-[#C9956A] text-xs font-medium tracking-widest uppercase">{section.title}</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-5 leading-tight">
                {section.headline}
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg">{section.body}</p>
            </div>

            {/* Visual */}
            <div className="flex-1 flex items-center justify-center min-h-[240px]">
              <div className="w-full max-w-sm p-8 rounded-3xl bg-card border border-border shadow-sm">
                {section.visual}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <section className="py-16 px-6 text-center reveal">
        <h2 className="font-display text-4xl font-bold text-foreground mb-4">Now you know the science.</h2>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">See it in action on your own skin tone and style.</p>
        <Link
          href="/style-tool"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#C9956A] text-white font-semibold hover:bg-[#b8845a] hover:scale-105 transition-all duration-200"
        >
          Analyze My Style ✦
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-6 py-6 mt-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <Link href="/" className="font-display font-bold text-lg text-foreground">Style<span className="text-[#C9956A]">Sense</span></Link>
          <nav className="flex items-center gap-6 flex-wrap justify-center">
            {["/", "/style-tool", "/gallery", "/about", "/how-it-works"].map((href, i) => (
              <Link key={href} href={href} className="hover:text-[#C9956A] transition-colors">
                {["Home", "Style Tool", "Gallery", "About", "How It Works"][i]}
              </Link>
            ))}
          </nav>
          <span>Made with AI ✦ 2025</span>
        </div>
      </footer>
    </main>
  );
}
