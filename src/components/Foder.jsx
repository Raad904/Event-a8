"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-[#e0e7ff] via-[#f3e8ff] via-[#fce7f3] to-[#ffedd5] dark:bg-gradient-to-br dark:from-[#4a148c] dark:via-[#9c27b0] dark:via-[#e91e8c] dark:to-[#ff9800] border-t border-gray-200 dark:border-white/10">
      {/* Subtle glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-[300px] bg-[#e91e8c]/10 dark:bg-[#e91e8c]/20 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 py-14">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Logo + Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative flex items-center justify-center">
              <span className="absolute inset-0 scale-125 rounded-full bg-purple-200/40 dark:bg-purple-400/40 blur-md transition-all duration-300 group-hover:bg-purple-300 dark:group-hover:bg-purple-300 group-hover:blur-lg" />
              <img
                src="/images/logo.png"
                alt="SDEP Logo"
                className="relative z-10 h-10 w-10 object-contain drop-shadow-[0_0_8px_rgba(168,85,247,0.4)] dark:drop-shadow-[0_0_8px_rgba(168,85,247,0.8)] transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <div>
              <span className="text-gray-900 dark:text-white font-extrabold text-xl tracking-tight leading-none block">SDEP</span>
              <span className="text-gray-500 dark:text-white/50 text-xs tracking-wide">Social Development Events</span>
            </div>
          </Link>

          {/* Nav links */}
          <nav className="flex flex-wrap items-center gap-6 md:gap-8">
            <Link href="/" className="text-gray-600 dark:text-white/80 hover:text-gray-900 dark:hover:text-white text-sm font-medium transition-colors">Home</Link>
            <Link href="/Upcoming-Events" className="text-gray-600 dark:text-white/80 hover:text-gray-900 dark:hover:text-white text-sm font-medium transition-colors">Upcoming Events</Link>
            <Link href="/Create-event" className="text-gray-600 dark:text-white/80 hover:text-gray-900 dark:hover:text-white text-sm font-medium transition-colors">Create Event</Link>
           
          </nav>
        </div>

        {/* Divider */}
        <div className="my-8 h-px bg-gradient-to-r from-transparent via-gray-300/50 dark:via-white/20 to-transparent" />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 dark:text-white/50">
          <p>© 2026 SDEP — Social Development Events Platform. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
