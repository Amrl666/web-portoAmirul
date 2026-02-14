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
import { motion, AnimatePresence } from "framer-motion";

type NavbarProps = React.HTMLAttributes<HTMLDivElement>;

const navLinkVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.4,
    },
  }),
};

const mobileMenuVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.2,
    },
  },
};

const mobileNavItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.3,
    },
  }),
};

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
        <motion.div 
          className="flex lg:flex-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Link href="/" className="-m-1.5 p-1.5 font-bold tracking-tight text-2xl transition-colors hover:text-primary">
              <span className="sr-only">amrl.</span>
              amrl.
            </Link>
          </motion.div>
        </motion.div>
        <motion.div 
          className="flex lg:hidden"
          whileTap={{ scale: 0.95 }}
        >
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            <AnimatePresence mode="wait">
              {mobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="h-6 w-6" aria-hidden="true" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="h-6 w-6" aria-hidden="true" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </motion.div>
        <motion.div 
          className="hidden lg:flex lg:gap-x-8"
          initial="hidden"
          animate="visible"
        >
          {navItems.map((item, i) => {
            const isActive = pathname === item.href;
            return (
              <motion.div
                key={item.name}
                variants={navLinkVariants}
                custom={i}
                initial="hidden"
                animate="visible"
              >
                <Link
                  href={item.href}
                  className={cn(
                    "text-sm font-medium leading-6 transition-all hover:text-primary relative group",
                    isActive ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  {item.name}
                  <motion.span 
                    className={cn(
                      "absolute -bottom-1 left-0 h-0.5 bg-primary",
                      isActive ? "w-full" : "w-0"
                    )}
                    animate={{ width: isActive ? "100%" : "0%" }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
        <motion.div 
          className="hidden lg:flex lg:flex-1 lg:justify-end items-center gap-4"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.05,
                delayChildren: 0.2,
              },
            },
          }}
        >
          <motion.div variants={navLinkVariants} custom={10}>
            <ThemeToggle />
          </motion.div>
          <div className="h-4 w-[1px] bg-border" />
          {userInfo?.githubUrl && (
            <motion.div
              variants={navLinkVariants}
              custom={11}
              whileHover={{ scale: 1.2, rotate: 10 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                target="_blank" 
                href={userInfo?.githubUrl}
                className="text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                <Github size={20} />
              </Link>
            </motion.div>
          )}
          {userInfo?.linkedInUrl && (
            <motion.div
              variants={navLinkVariants}
              custom={12}
              whileHover={{ scale: 1.2, rotate: -10 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                target="_blank" 
                href={userInfo.linkedInUrl}
                className="text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                <Linkedin size={20} />
              </Link>
            </motion.div>
          )}
        </motion.div>
      </nav>
      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="lg:hidden fixed inset-x-0 top-[80px] z-40 bg-background/95 backdrop-blur-xl border-t border-b border-border origin-top overflow-hidden"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="flex flex-col space-y-4 p-6 overflow-y-auto max-h-[calc(100vh-100px)]">
              {navItems.map((item, i) => {
                const isActive = pathname === item.href;
                return (
                  <motion.div
                    key={item.name}
                    variants={mobileNavItemVariants}
                    custom={i}
                    initial="hidden"
                    animate="visible"
                  >
                    <Link
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
                  </motion.div>
                );
              })}
              <motion.div 
                className="pt-6 border-t border-border"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <motion.div 
                  className="flex items-center justify-between mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.35 }}
                >
                  <span className="text-sm text-muted-foreground">Switch Theme</span>
                  <ThemeToggle />
                </motion.div>
                <motion.div 
                  className="flex gap-4 justify-center"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.1,
                      },
                    },
                  }}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.4 }}
                >
                  {userInfo?.githubUrl && (
                    <motion.div
                      variants={mobileNavItemVariants}
                      custom={0}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link 
                        target="_blank" 
                        href={userInfo?.githubUrl}
                        className="p-3 rounded-md bg-accent/50 hover:bg-accent text-foreground transition-colors"
                      >
                        <Github size={24} />
                      </Link>
                    </motion.div>
                  )}
                  {userInfo?.linkedInUrl && (
                    <motion.div
                      variants={mobileNavItemVariants}
                      custom={1}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link 
                        target="_blank" 
                        href={userInfo.linkedInUrl}
                        className="p-3 rounded-md bg-accent/50 hover:bg-accent text-foreground transition-colors"
                      >
                        <Linkedin size={24} />
                      </Link>
                    </motion.div>
                  )}
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
