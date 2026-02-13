'use client';

import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import { useLayoutEffect, useState } from 'react';

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useLayoutEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        className="inline-flex items-center justify-center w-10 h-10 rounded-md"
        aria-label="Toggle theme"
        disabled
      />
    );
  }

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <button
      onClick={toggleTheme}
      className="inline-flex items-center justify-center w-10 h-10 rounded-md text-foreground hover:bg-accent transition-colors"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
    >
      <div className="relative w-5 h-5">
        {theme === 'dark' ? (
          <Moon className="w-5 h-5 absolute inset-0 animate-in fade-in duration-300" />
        ) : (
          <Sun className="w-5 h-5 absolute inset-0 animate-in fade-in duration-300" />
        )}
      </div>
    </button>
  );
}
