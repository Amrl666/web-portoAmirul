import type { Metadata } from "next";
import "./globals.css";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import Head from "next/head";
import { Toaster } from "@/components/ui/toaster";

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
          "min-h-screen bg-gradient-to-br from-background via-background to-accent/5 font-sans antialiased light relative",
          fontSans.variable
        )}
      >
        <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.05),rgba(255,255,255,0))] pointer-events-none" />
        <div className="relative z-10">
          {children}
        </div>
        <Toaster />
      </body>
    </html>
  );
}
