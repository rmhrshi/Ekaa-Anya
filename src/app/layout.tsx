import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import { VisualEditsMessenger } from "orchids-visual-edits";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { CustomCursor } from "@/components/CustomCursor";
import { ScrollProgress } from "@/components/ScrollProgress";
import { ToastProvider } from "@/components/ToastProvider";
import { BackToTop } from "@/components/BackToTop";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "StyleSense — AI-Powered Personal Fashion Advisor",
  description: "Discover your perfect style with AI. Personalized outfit recommendations based on your skin tone, occasion, and aesthetic.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${playfair.variable} ${dmSans.variable} antialiased`}>
        <ThemeProvider>
          <CustomCursor />
          <ScrollProgress />
          <Navbar />
          <ToastProvider>
            {children}
          </ToastProvider>
          <BackToTop />
          <VisualEditsMessenger />
        </ThemeProvider>
      </body>
    </html>
  );
}
