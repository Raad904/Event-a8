"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light Mode" : "Dark Mode"}
      className="relative p-2 rounded-full bg-white/10 border border-white/10 hover:bg-white/20 hover:border-white/20 transition-all duration-300 text-white focus:outline-none focus:ring-2 focus:ring-[#e91e8c]/50"
    >
      <span className="sr-only">{isDark ? "Switch to light mode" : "Switch to dark mode"}</span>
      {isDark ? (
        <Sun size={18} className="transition-transform duration-300 rotate-0" />
      ) : (
        <Moon size={18} className="transition-transform duration-300 rotate-0" />
      )}
    </button>
  );
}
