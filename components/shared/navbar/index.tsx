"use client";
import React, { useState } from "react";
import { Linkedin, Github, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import useSWR from "swr";
import { getUserInfo } from "@/sanity/lib/queries";
import { fetcher } from "@/sanity/lib/client";
import { UserInfo } from "@/sanity/lib/types/userInfo";
import { navItems } from "@/lib/navItems";
import { ThemeToggle } from "@/components/shared/theme-toggle";

type NavbarProps = React.HTMLAttributes<HTMLDivElement>;

function Navbar({ className }: NavbarProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: userInfo } = useSWR<UserInfo>(
    getUserInfo,
    fetcher
  );

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border transition-all duration-300",
        className
      )}
    >
      <nav
        className="flex items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5 font-bold tracking-tight text-2xl transition-colors hover:text-primary">
            <span className="sr-only">amrl.</span>
            amrl.
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            {mobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-8">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "text-sm font-medium leading-6 transition-all hover:text-primary relative group",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
              >
                {item.name}
                <span className={cn(
                  "absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full",
                  isActive && "w-full"
                )} />
              </Link>
            );
          })}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center gap-4">
          <ThemeToggle />
          <div className="h-4 w-[1px] bg-border" />
          {userInfo?.githubUrl && (
            <Link 
              target="_blank" 
              href={userInfo?.githubUrl}
              className="text-muted-foreground hover:text-foreground transition-colors hover:scale-110 active:scale-95 duration-200"
            >
              <Github size={20} />
            </Link>
          )}
          {userInfo?.linkedInUrl && (
            <Link 
              target="_blank" 
              href={userInfo.linkedInUrl}
              className="text-muted-foreground hover:text-foreground transition-colors hover:scale-110 active:scale-95 duration-200"
            >
              <Linkedin size={20} />
            </Link>
          )}
        </div>
      </nav>
      {/* Mobile menu */}
      <div 
        className={cn(
          "lg:hidden fixed inset-x-0 top-[80px] z-40 bg-background/95 backdrop-blur-xl border-t border-b border-border transition-all duration-300 ease-in-out origin-top",
          mobileMenuOpen ? "opacity-100 scale-y-100 translate-y-0" : "opacity-0 scale-y-0 -translate-y-4 pointer-events-none display-none"
        )}
      >
        <div className="flex flex-col space-y-4 p-6 overflow-y-auto max-h-[calc(100vh-100px)]">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "block px-3 py-3 text-lg font-medium rounded-md transition-colors",
                     isActive 
                     ? "bg-accent text-accent-foreground" 
                     : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                  )}
                >
                  {item.name}
                </Link>
              );
            })}
            <div className="pt-6 border-t border-border">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-muted-foreground">Switch Theme</span>
                <ThemeToggle />
              </div>
               <div className="flex gap-4 justify-center">
                  {userInfo?.githubUrl && (
                    <Link 
                      target="_blank" 
                      href={userInfo?.githubUrl}
                      className="p-3 rounded-md bg-accent/50 hover:bg-accent text-foreground transition-colors"
                    >
                      <Github size={24} />
                    </Link>
                  )}
                  {userInfo?.linkedInUrl && (
                      <Link 
                        target="_blank" 
                        href={userInfo.linkedInUrl}
                        className="p-3 rounded-md bg-accent/50 hover:bg-accent text-foreground transition-colors"
                      >
                        <Linkedin size={24} />
                      </Link>
                  )}
               </div>
            </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
