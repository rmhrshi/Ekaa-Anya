"use client";
import { useEffect, useRef, useState } from "react";
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

function CountUpStat({ value, label, suffix = "" }: { value: number; label: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const triggered = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !triggered.current) {
          triggered.current = true;
          const duration = 1200;
          const steps = 40;
          const increment = value / steps;
          let current = 0;
          const interval = setInterval(() => {
            current += increment;
            if (current >= value) {
              setCount(value);
              clearInterval(interval);
            } else {
              setCount(Math.round(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="reveal text-center p-8">
      <div className="font-display font-black text-6xl md:text-7xl text-[#C9956A] mb-2">
        {count}{suffix}
      </div>
      <p className="text-muted-foreground font-medium">{label}</p>
    </div>
  );
}

const timeline = [
  { icon: "👁️", title: "Virtual Try-On", desc: "See exactly how each outfit looks on your body using augmented reality." },
  { icon: "📈", title: "Seasonal Trend Integration", desc: "Weekly updates with runway and street style trends matched to your palette." },
  { icon: "📚", title: "Personal Style History", desc: "A living lookbook of every recommendation you've received and loved." },
  { icon: "🌍", title: "Community Lookbook", desc: "Share and discover looks from thousands of StyleSense users worldwide." },
  { icon: "🤖", title: "AI Personal Shopper", desc: "A conversational shopping assistant who knows your style better than you do." },
];

export default function AboutPage() {
  useScrollReveal();
  return (
    <main className="pt-16">
      {/* Hero — typographic */}
      <section className="relative min-h-[70vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden bg-[#FAFAF8] dark:bg-background">
        <div className="grain-overlay" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="fade-up" style={{ animationDelay: "0.1s" }}>
            <h1 className="font-display font-black text-7xl md:text-9xl text-[#1A1A2E] dark:text-foreground leading-none tracking-tight mb-6">
              Fashion should<br />
              <em className="text-[#C9956A]">feel like you.</em>
            </h1>
          </div>
          <p className="fade-up text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed" style={{ animationDelay: "0.4s" }}>
            StyleSense was built on a radical belief: that great style is not a privilege of the lucky few — it&apos;s a science that can be learned, and we&apos;ve made the AI that teaches it.
          </p>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 fade-up" style={{ animationDelay: "0.8s" }}>
          <div className="w-px h-12 bg-gradient-to-b from-[#C9956A] to-transparent" />
        </div>
      </section>

      {/* Mission — pull quote + body */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <div className="reveal">
            <p className="font-display text-4xl md:text-5xl font-bold italic text-[#C9956A] leading-tight">
              &ldquo;Your skin tone is not a limitation. It&apos;s the most powerful styling tool you own.&rdquo;
            </p>
          </div>
          <div className="reveal space-y-5 pt-2" style={{ transitionDelay: "100ms" }}>
            <p className="text-muted-foreground leading-relaxed">
              StyleSense was founded on the conviction that personalized styling should be accessible to everyone — regardless of skin tone, gender expression, body type, or budget. For too long, fashion advice has been written for a narrow demographic and ignored the rest.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We built an AI that understands the color science behind why certain hues make your skin glow and others wash you out. It&apos;s rooted in seasonal color theory, complementary color wheels, and undertone analysis — the same framework professional stylists use with their celebrity clients.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The difference is we made it free, instant, and available to anyone with a phone. Your stylist is now in your pocket.
            </p>
            <Link
              href="/style-tool"
              className="inline-flex items-center gap-2 mt-2 text-[#C9956A] font-semibold hover:gap-4 transition-all duration-200"
            >
              Try StyleSense →
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-[#1A1A2E] dark:bg-secondary">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 reveal">
            <p className="text-white/50 text-xs tracking-widest uppercase">By the numbers</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4">
            <div className="border-r border-white/10">
              <CountUpStat value={4} label="Skin Tone Categories" />
            </div>
            <div className="md:border-r border-white/10">
              <CountUpStat value={7} label="Style Vibes" />
            </div>
            <div className="border-r border-white/10">
              <CountUpStat value={6} label="Occasions" />
            </div>
            <div>
              <CountUpStat value={3} label="Shopping Platforms" suffix="+" />
            </div>
          </div>
        </div>
      </section>

      {/* What we're building toward — zigzag timeline */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 reveal">
            <h2 className="font-display text-5xl font-bold text-foreground mb-3">
              What we&apos;re building toward.
            </h2>
            <p className="text-muted-foreground">The future of StyleSense is already in motion.</p>
          </div>

          <div className="relative">
            {/* Center line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2" />

            <div className="space-y-16">
              {timeline.map((item, i) => (
                <div key={i} className={`reveal flex flex-col md:flex-row gap-6 md:gap-16 items-center ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`} style={{ transitionDelay: `${i * 80}ms` }}>
                  {/* Content */}
                  <div className="flex-1 md:text-right" style={{ textAlign: i % 2 === 0 ? "right" : "left" }}>
                    {i % 2 === 0 ? (
                      <div className="md:text-right text-left">
                        <h3 className="font-display text-2xl font-bold text-foreground mb-2">{item.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                      </div>
                    ) : (
                      <div className="md:text-left text-left">
                        <h3 className="font-display text-2xl font-bold text-foreground mb-2">{item.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                      </div>
                    )}
                  </div>

                  {/* Center icon */}
                  <div className="relative z-10 w-16 h-16 rounded-full bg-card border-2 border-[#C9956A]/30 flex items-center justify-center text-2xl shadow-sm hover:border-[#C9956A] hover:scale-110 transition-all duration-300 shrink-0">
                    {item.icon}
                  </div>

                  {/* Empty spacer for alternating layout */}
                  <div className="flex-1 hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20 px-6">
        <div className="max-w-2xl mx-auto text-center reveal">
          <h2 className="font-display text-4xl font-bold text-foreground mb-4">Join the movement.</h2>
          <p className="text-muted-foreground mb-8">
            Style is personal. It&apos;s time your fashion advice was too.
          </p>
          <Link
            href="/style-tool"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#C9956A] text-white font-semibold hover:bg-[#b8845a] hover:scale-105 transition-all duration-200"
          >
            Analyze My Style ✦
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-6 py-6">
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
