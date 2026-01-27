"use client";
import React from "react";
import { Linkedin, Github } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import useSWR from "swr";
import { getUserInfo } from "@/sanity/lib/queries";
import { fetcher } from "@/sanity/lib/client";
import { UserInfo } from "@/sanity/lib/types/userInfo";
import { navItems } from "@/lib/navItems";

type NavbarProps = React.HTMLAttributes<HTMLDivElement>;

function Navbar({ className }: NavbarProps) {
  const pathname = usePathname();
  const { data: userInfo } = useSWR<UserInfo>(
    getUserInfo,
    fetcher
  );

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 bg-background/30 backdrop-blur-[7px] border-b-[0.5px] border-b-border",
        className
      )}
    >
      <nav
        className="flex items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">amrl.</span>
            <h1 className="text-2xl text-foreground">amrl.</h1>
          </Link>
        </div>
        <div className="flex lg:hidden">
          {/* Mobile menu hidden - using footer navigation instead */}
        </div>
        <div className="hidden lg:flex lg:gap-x-3">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  " text-[15px] leading-6 text-foreground hover:text-muted-foreground hover:bg-accent transition-colors",
                  isActive && "bg-accent/80 font-semibold"
                )}
              >
                {item.name}
              </Link>
            );
          })}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-2">
          {userInfo?.githubUrl && (
            <Link target="_blank" href={userInfo?.githubUrl}>
              <Github size={25} />
            </Link>
          )}
          {userInfo?.linkedInUrl && (
            <Link target="_blank" href={userInfo.linkedInUrl}>
              <Linkedin size={25} />
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
