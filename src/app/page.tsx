"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import GeminiChat from "@/components/GeminiChat";

import {
  Palette, Shirt, Star, ShoppingBag, Calendar, Zap,
  ChevronRight, Quote, Sparkles
} from "lucide-react";

// Marquee ticker
function Marquee() {
  const items = [
    "Skin Tone Analysis", "Outfit Recommendations", "Color Palette Matching",
    "Complete Look Builder", "Shopping Curated For You", "Gender Inclusive Styling",
    "Occasion Based Looks", "Accessory Pairing", "Hairstyle Guidance",
  ];
  const repeated = [...items, ...items];
  return (
    <div className="overflow-hidden py-4 border-y border-border my-12 bg-secondary/30">
      <div className="animate-marquee">
        {repeated.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-3 mx-6 text-xs font-medium tracking-widest uppercase text-muted-foreground whitespace-nowrap">
            {item} <span className="text-[#C9956A] text-lg">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// Bento feature cards
const features = [
  {
    icon: <Palette size={22} />,
    title: "Skin Tone Analysis",
    desc: "Precision color matching based on your unique complexion undertones.",
    wide: false, tall: false,
  },
  {
    icon: <Shirt size={22} />,
    title: "Full Outfit Builder",
    desc: "Complete head-to-toe looks with tops, bottoms, shoes, and accessories.",
    wide: true, tall: false,
  },
  {
    icon: <Calendar size={22} />,
    title: "Occasion Styling",
    desc: "Curated looks for every event — from boardrooms to date nights.",
    wide: false, tall: true,
  },
  {
    icon: <Sparkles size={22} />,
    title: "Color Palette",
    desc: "Your personal seasonal color palette scientifically matched to you.",
    wide: false, tall: false,
  },
  {
    icon: <Star size={22} />,
    title: "Gender Inclusive",
    desc: "Recommendations that celebrate every body and every expression.",
    wide: false, tall: false,
  },
  {
    icon: <ShoppingBag size={22} />,
    title: "Curated Shopping",
    desc: "Direct links to Amazon, Myntra, and Zara for every recommended item.",
    wide: true, tall: false,
  },
];

// How it works steps
const steps = [
  { num: "01", icon: <Palette size={28} />, title: "Upload Your Photo", desc: "Drop in a clear facial photo. Our AI analyzes your skin tone, undertones, and complexion in seconds." },
  { num: "02", icon: <Shirt size={28} />, title: "Set Your Preferences", desc: "Tell us your occasion, style vibe, gender, and budget. The more you share, the more personalized the magic." },
  { num: "03", icon: <Zap size={28} />, title: "AI Builds Your Look", desc: "StyleSense assembles a complete outfit — every piece chosen in harmony with your unique complexion." },
  { num: "04", icon: <ShoppingBag size={28} />, title: "Shop The Look", desc: "Get direct links to buy every recommended piece. Style meets commerce, seamlessly." },
];

// Testimonials
const testimonials = [
  {
    quote: "I've always struggled to find colors that work for my deep skin tone. StyleSense gave me the exact color story I didn't know I needed. The navy suit recommendation? Wore it to my company's gala and got complimented all night.",
    name: "Arjun K.",
    role: "Product Manager",
    color: "#C9956A",
  },
  {
    quote: "The emerald dress recommendation for my friend's wedding was so specifically matched to my undertone that even my colorist said it was perfect. I've never felt so put together.",
    name: "Priya M.",
    role: "Creative Director",
    color: "#9B7FA6",
  },
  {
    quote: "As someone who's non-binary, finding a styling tool that doesn't assume things about what I should wear is genuinely rare. StyleSense got it right. My look for the gallery opening was editorial-level.",
    name: "Alex T.",
    role: "Visual Artist",
    color: "#1A1A2E",
  },
];

function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

export default function HomePage() {
  useScrollReveal();
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <main className="pt-16">
      {/* HERO */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#FAFAF8] dark:bg-background px-6">
        <div className="grain-overlay" />
        {/* Geometric accent */}
        <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full opacity-5 bg-[#C9956A] blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/3 left-1/5 w-48 h-48 rounded-full opacity-5 bg-[#9B7FA6] blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          {/* Pre-headline */}
          <div
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C9956A]/30 bg-[#C9956A]/5 text-[#C9956A] text-xs font-medium tracking-widest uppercase mb-8 transition-all duration-700 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9956A] animate-pulse" />
            AI-Powered Personal Styling
          </div>

          {/* Hero headline — staggered word reveal */}
          <h1 className="font-display font-black text-6xl md:text-8xl lg:text-[100px] leading-none tracking-tight text-[#1A1A2E] dark:text-foreground mb-6">
            {["Dress", "like", "yourself,"].map((word, i) => (
              <span
                key={i}
                className="inline-block mr-4 fade-up"
                style={{ animationDelay: `${0.3 + i * 0.12}s` }}
              >
                {word}
              </span>
            ))}
            <br />
            {["only", "better."].map((word, i) => (
              <span
                key={i}
                className={`inline-block mr-4 fade-up ${i === 1 ? "gradient-text" : ""}`}
                style={{ animationDelay: `${0.69 + i * 0.12}s` }}
              >
                {word}
              </span>
            ))}
          </h1>

          <p
            className="fade-up text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10"
            style={{ animationDelay: "0.95s" }}
          >
            Your skin tone, your occasion, your vibe — analyzed and translated into complete outfits
            curated for exactly who you are.
          </p>

          <div
            className="fade-up flex flex-col sm:flex-row items-center justify-center gap-4"
            style={{ animationDelay: "1.1s" }}
          >
            <Link
              href="/style-tool"
              className="group flex items-center gap-2 px-8 py-4 rounded-full bg-[#C9956A] text-white font-semibold text-base hover:bg-[#b8845a] hover:scale-105 transition-all duration-200 shadow-lg shadow-[#C9956A]/20"
            >
              Discover My Style
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/gallery"
              className="px-8 py-4 rounded-full border border-border text-foreground font-medium text-base hover:border-[#C9956A] hover:text-[#C9956A] transition-all duration-200"
            >
              View Gallery
            </Link>
          </div>

          {/* Social proof */}
          <div
            className="fade-up flex items-center justify-center gap-6 mt-14 text-sm text-muted-foreground"
            style={{ animationDelay: "1.25s" }}
          >
            <div className="flex -space-x-2">
              {["#C9956A", "#9B7FA6", "#1A1A2E", "#C68642"].map((c, i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-white dark:border-background" style={{ background: c }} />
              ))}
            </div>
            <span>Trusted by <strong className="text-foreground">12,000+</strong> fashion-forward individuals</span>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 fade-up" style={{ animationDelay: "1.4s" }}>
          
          <span className="text-xs text-muted-foreground tracking-widest uppercase">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-[#C9956A] to-transparent" />
        </div>
      </section>

      {/* MARQUEE */}
      <Marquee />

      {/* BENTO FEATURES */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16 reveal">
          <h2 className="font-display text-5xl md:text-6xl font-bold text-[#1A1A2E] dark:text-foreground mb-4">
            Everything your wardrobe<br />
            <em className="text-[#C9956A]">has been missing.</em>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            One platform that understands the science behind style and the art behind fashion.
          </p>
        </div>

        {/* Asymmetric bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-auto">
          {/* Row 1 */}
          <div className="bento-card reveal bg-card rounded-2xl p-7 border border-border hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group" style={{ transitionDelay: "0ms" }}>
            <div className="w-11 h-11 rounded-xl bg-[#C9956A]/10 flex items-center justify-center text-[#C9956A] mb-5 group-hover:scale-110 transition-transform duration-300">{features[0].icon}</div>
            <h3 className="font-display font-bold text-xl text-foreground mb-2">{features[0].title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{features[0].desc}</p>
          </div>

          <div className="bento-card reveal md:col-span-2 bg-[#1A1A2E] rounded-2xl p-7 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group" style={{ transitionDelay: "80ms" }}>
            <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center text-[#C9956A] mb-5 group-hover:scale-110 transition-transform duration-300">{features[1].icon}</div>
            <h3 className="font-display font-bold text-2xl text-white mb-2">{features[1].title}</h3>
            <p className="text-white/60 text-sm leading-relaxed max-w-sm">{features[1].desc}</p>
            <div className="mt-6 flex gap-3">
              {["Top", "Bottom", "Shoes", "Accessories"].map(item => (
                <span key={item} className="px-3 py-1 rounded-full bg-white/10 text-white/80 text-xs">{item}</span>
              ))}
            </div>
          </div>

          {/* Row 2 */}
          <div className="bento-card reveal md:row-span-2 bg-gradient-to-b from-[#C9956A]/8 to-[#9B7FA6]/8 rounded-2xl p-7 border border-[#C9956A]/20 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group" style={{ transitionDelay: "160ms" }}>
            <div className="w-11 h-11 rounded-xl bg-[#C9956A]/15 flex items-center justify-center text-[#C9956A] mb-5 group-hover:scale-110 transition-transform duration-300">{features[2].icon}</div>
            <h3 className="font-display font-bold text-xl text-foreground mb-2">{features[2].title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">{features[2].desc}</p>
            <div className="flex flex-col gap-2">
              {["Formal", "Business", "Party", "Date Night", "Everyday", "Smart Casual"].map((occ, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C9956A]" />
                  {occ}
                </div>
              ))}
            </div>
          </div>

          <div className="bento-card reveal bg-card rounded-2xl p-7 border border-border hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group" style={{ transitionDelay: "240ms" }}>
            <div className="w-11 h-11 rounded-xl bg-[#9B7FA6]/10 flex items-center justify-center text-[#9B7FA6] mb-5 group-hover:scale-110 transition-transform duration-300">{features[3].icon}</div>
            <h3 className="font-display font-bold text-xl text-foreground mb-2">{features[3].title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{features[3].desc}</p>
            {/* Color palette preview */}
            <div className="mt-4 flex gap-2">
              {["#C9956A", "#9B7FA6", "#1A1A2E", "#F5F0EC", "#8B7355"].map((c, i) => (
                <div key={i} className="w-7 h-7 rounded-full border-2 border-white shadow-sm" style={{ background: c }} />
              ))}
            </div>
          </div>

          <div className="bento-card reveal bg-card rounded-2xl p-7 border border-border hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group" style={{ transitionDelay: "320ms" }}>
            <div className="w-11 h-11 rounded-xl bg-[#1A1A2E]/10 dark:bg-white/10 flex items-center justify-center text-[#1A1A2E] dark:text-white mb-5 group-hover:scale-110 transition-transform duration-300">{features[4].icon}</div>
            <h3 className="font-display font-bold text-xl text-foreground mb-2">{features[4].title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{features[4].desc}</p>
          </div>

          {/* Row 3 */}
          <div className="bento-card reveal md:col-span-2 bg-gradient-to-r from-[#C9956A]/5 to-[#9B7FA6]/5 rounded-2xl p-7 border border-border hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group" style={{ transitionDelay: "400ms" }}>
            <div className="w-11 h-11 rounded-xl bg-[#C9956A]/10 flex items-center justify-center text-[#C9956A] mb-5 group-hover:scale-110 transition-transform duration-300">{features[5].icon}</div>
            <h3 className="font-display font-bold text-xl text-foreground mb-2">{features[5].title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-md">{features[5].desc}</p>
            <div className="mt-5 flex items-center gap-4">
              <span className="px-3 py-1.5 rounded-lg bg-orange-500/10 text-orange-600 text-xs font-semibold">Amazon</span>
              <span className="px-3 py-1.5 rounded-lg bg-pink-500/10 text-pink-600 text-xs font-semibold">Myntra</span>
              <span className="px-3 py-1.5 rounded-lg bg-gray-900/10 text-gray-800 dark:text-gray-200 text-xs font-semibold">Zara</span>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 px-6 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20 reveal">
            <h2 className="font-display text-6xl md:text-7xl font-black text-[#1A1A2E] dark:text-foreground mb-4">
              How it works.
            </h2>
            <p className="text-muted-foreground text-lg">Four steps to your perfect look.</p>
          </div>

          {/* Desktop stepper */}
          <div className="hidden md:block relative">
            {/* Connecting line */}
            <div className="absolute top-12 left-[12.5%] right-[12.5%] h-px bg-border">
              <div className="h-full bg-gradient-to-r from-[#C9956A] to-[#9B7FA6] line-draw reveal" />
            </div>

            <div className="grid grid-cols-4 gap-8">
              {steps.map((step, i) => (
                <div key={i} className="reveal flex flex-col items-center text-center" style={{ transitionDelay: `${i * 150}ms` }}>
                  <div className="relative z-10 w-24 h-24 rounded-full bg-card border-2 border-[#C9956A]/30 flex flex-col items-center justify-center mb-6 hover:border-[#C9956A] hover:scale-110 transition-all duration-300 shadow-sm group">
                    <div className="text-[#C9956A] group-hover:scale-110 transition-transform">{step.icon}</div>
                    <span className="text-[10px] font-bold text-[#C9956A] tracking-widest mt-1">{step.num}</span>
                  </div>
                  <h3 className="font-display font-bold text-lg text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile stepper */}
          <div className="md:hidden flex flex-col gap-8">
            {steps.map((step, i) => (
              <div key={i} className="reveal flex gap-5" style={{ transitionDelay: `${i * 120}ms` }}>
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full bg-card border-2 border-[#C9956A]/30 flex items-center justify-center text-[#C9956A] shrink-0">
                    {step.icon}
                  </div>
                  {i < steps.length - 1 && <div className="w-px flex-1 bg-[#C9956A]/20 my-3" />}
                </div>
                <div className="pt-2">
                  <span className="text-[10px] font-bold text-[#C9956A] tracking-widest">{step.num}</span>
                  <h3 className="font-display font-bold text-lg text-foreground mb-1">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16 reveal">
          <h2 className="font-display text-5xl font-bold text-[#1A1A2E] dark:text-foreground mb-3">
            Worn. Loved. Repeated.
          </h2>
          <p className="text-muted-foreground">Real people. Real style transformations.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="reveal bg-card rounded-2xl p-7 border border-border hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <Quote size={28} className="text-[#C9956A]/30 mb-4" />
              <p className="font-display italic text-foreground text-base leading-relaxed mb-6">&ldquo;{t.quote}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ background: t.color }}>
                  {t.name[0]}
                </div>
                <div>
                  <div className="font-semibold text-sm text-foreground">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="mx-6 mb-24 rounded-3xl overflow-hidden reveal">
        <div className="relative bg-gradient-to-br from-[#1A1A2E] via-[#2D2A4A] to-[#1A1A2E] py-24 px-8 text-center">
          <div className="absolute inset-0 opacity-10">
            <div className="grain-overlay" />
          </div>
          <div className="relative z-10">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 text-white/70 text-xs font-medium tracking-widest uppercase mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9956A] animate-pulse" />
              Your Style Journey Starts Here
            </span>
            <h2 className="font-display text-5xl md:text-6xl font-black text-white mb-5 leading-tight">
              Ready to discover your<br />
              <span className="gradient-text">perfect style?</span>
            </h2>
            <p className="text-white/60 text-lg mb-10 max-w-lg mx-auto">
              Join thousands who&apos;ve already found their signature look. It only takes a photo.
            </p>
            <Link
              href="/style-tool"
              className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-[#C9956A] text-white font-semibold text-base hover:bg-[#b8845a] hover:scale-105 transition-all duration-200 shadow-xl shadow-[#C9956A]/30"
            >
              Analyze My Style ✦
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border px-6 py-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <Link href="/" className="font-display font-bold text-lg text-foreground">
            Style<span className="text-[#C9956A]">Sense</span>
          </Link>
          <nav className="flex items-center gap-6">
            {navLinks.map(l => (
              <Link key={l.href} href={l.href} className="hover:text-[#C9956A] transition-colors">{l.label}</Link>
            ))}
          </nav>
          <span>Crafted with ❤️</span>
        </div>
      </footer>
      <GeminiChat />
    </main>
  );
}

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/style-tool", label: "Style Tool" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/how-it-works", label: "How It Works" },
];
