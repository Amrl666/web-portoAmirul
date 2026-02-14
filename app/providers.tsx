'use client';

import { ThemeProvider } from 'next-themes';
import { ReactNode } from 'react';
import { EasterEggHandler } from '@/components/ui/easter-egg-handler';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <EasterEggHandler />
      {children}
    </ThemeProvider>
  );
}
