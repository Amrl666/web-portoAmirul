import type { Metadata } from "next";
import "./globals.css";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import Head from "next/head";
import { Toaster } from "@/components/ui/toaster";
import { Providers } from "./providers";
import GalaxyBackground from "@/components/shared/galaxy-background/index";
import AnimatedCursor from "@/components/ui/animated-cursor";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Amirul | Home",
  description:
    "Hi, I'm an IT Enthusiast with a passion for learning and growing across all IT fields. With a strong drive and dedication to building fast, reliable, and modern applications, I continuously expand my skills and knowledge. With a history of contributions to projects in both corporate and freelance capacities, I have developed strong collaboration and communication skills, along with an innovative and adaptable approach that allows me to perform well under pressure. I'm always looking for new ways to learn and improve, exploring innovations in open-source space and beyond.",
  icons: {
    icon: "/logo A.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <Head>
        <link
          rel="preload"
          href="/hero-image.webp"
          as="image"
          imageSrcSet={`/hero-image.webp?q=70 400, 
          /hero-image.webp?w=200?q=70 200w,
          /hero-image.webp?w=400?q=70 400w, 
          /hero-image.webp?w=800?q=70 400w, 
          /hero-image.webp?w=1024?q=70 400w`}
        />
      </Head>
      <body
        suppressHydrationWarning={true}
        className={cn(
          "min-h-screen font-sans antialiased relative",
          fontSans.variable
        )}
      >
        <Providers>
          <GalaxyBackground 
            className="fixed inset-0 -z-10"
            density={3.5}
            glowIntensity={0.22}
            speed={0.8}
            starSpeed={0.2}
            rotationSpeed={0.02}
            mouseRepulsion={false}
            repulsionStrength={3}
            mouseInteraction={true}
          />
          <AnimatedCursor />
          <div className="relative z-10">
            {children}
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
