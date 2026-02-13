import Link from "next/link";
import React from "react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { navItems } from "@/lib/navItems";

function Footer() {
  return (
    <footer className="mt-20 mb-4 px-4 sm:px-6">
      <div className="mx-auto w-full max-w-5xl rounded-2xl bg-card/30 border border-border/40 backdrop-blur-xl shadow-sm p-6 md:flex md:items-center md:justify-between transition-all hover:bg-card/50 hover:shadow-md">
        <div className="flex justify-center md:justify-start items-center gap-4 mb-4 md:mb-0">
          <Link href="/" className="group flex items-center gap-2">
            <span className="font-bold text-xl tracking-tighter group-hover:text-primary transition-colors">amrl.</span>
          </Link>
          <span className="hidden md:inline-block h-4 w-[1px] bg-border/60"></span>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} All rights reserved.
          </p>
        </div>

        <ul className="flex flex-wrap justify-center items-center gap-2 md:gap-4">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={cn(
                  buttonVariants({ variant: "ghost", size: "sm" }),
                  "text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-all font-medium h-8"
                )}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}

export default Footer;

