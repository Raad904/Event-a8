"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { authClient } from "../lib/auth-client";
import { LogOut, CalendarDays, PlusCircle, ChevronDown, Heart } from "lucide-react";
// import { ThemeToggle } from "./ThemeToggle";

export default function ProfileDropdown() {
  const { data: session, isPending } = authClient.useSession();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const user = session?.user;

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [open]);

  useEffect(() => {
    function handleRouteChange() {
      setOpen(false);
    }
    window.addEventListener("popstate", handleRouteChange);
    return () => window.removeEventListener("popstate", handleRouteChange);
  }, []);

  if (isPending) return null;
  if (!user) return null;

  const imageUrl = user.image || user.photoUrl || "";
  const displayName = user.name || user.email?.split("@")[0] || "User";
  const initial = displayName.charAt(0).toUpperCase();

  async function handleSignOut() {
    await authClient.signOut();
    window.location.href = "/Login";
  }

  return (
    <div ref={ref} className="fixed top-6 right-6 z-[60]">
      <button
        onClick={() => setOpen(!open)}
        aria-label="Profile menu"
        className="relative group flex items-center justify-center w-12 h-12 rounded-full overflow-hidden ring-[3px] ring-[#10b981] dark:ring-[#10b981] shadow-[0_8px_30px_rgba(16,185,129,0.2)] dark:shadow-[0_8px_30px_rgba(16,185,129,0.35)] hover:shadow-[0_12px_40px_rgba(16,185,129,0.3)] dark:hover:shadow-[0_12px_40px_rgba(16,185,129,0.55)] transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#10b981]/60"
      >
        {imageUrl ? (
          <img src={imageUrl} alt={displayName} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#9c27b0] via-[#e91e8c] to-[#ff9800] text-white font-extrabold text-lg shadow-inner">
            {initial}
          </div>
        )}
        <span className="absolute -bottom-1 -right-1 bg-[#10b981] rounded-full p-0.5 border-2 border-[#2d1b4e] dark:border-[#2d1b4e] shadow-md">
          <ChevronDown size={10} strokeWidth={3} className="text-white" />
        </span>
      </button>

      <div
        className={`absolute top-14 right-0 w-72 rounded-3xl overflow-hidden transition-all duration-300 origin-top-right ${
          open ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="bg-white dark:bg-white/10 backdrop-blur-xl dark:backdrop-blur-2xl border border-gray-200 dark:border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.2)] rounded-3xl p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full overflow-hidden ring-[3px] ring-[#10b981] dark:ring-[#10b981] shadow-md shrink-0">
              {imageUrl ? (
                <img src={imageUrl} alt={displayName} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#9c27b0] via-[#e91e8c] to-[#ff9800] text-white font-extrabold text-sm">
                  {initial}
                </div>
              )}
            </div>
            <div className="min-w-0">
              <p className="text-gray-900 dark:text-white font-extrabold text-sm truncate">{displayName}</p>
              <p className="text-gray-500 dark:text-white/60 text-xs truncate">{user.email}</p>
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-gray-300/50 dark:via-white/20 to-transparent mb-3" />

          {/* <div className="w-full">
            <ThemeToggle />
          </div> */}

          <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-3" />

          <nav className="flex flex-col gap-1">
            <Link
              href="/My-events"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-700 dark:text-white/90 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-colors text-sm font-medium"
            >
              <CalendarDays size={16} className="text-[#e91e8c] shrink-0" />
              My Events
            </Link>
            <Link
              href="/Create-event"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-700 dark:text-white/90 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-colors text-sm font-medium"
            >
              <PlusCircle size={16} className="text-[#e91e8c] shrink-0" />
              Create Event
            </Link>
            <Link
              href="/JoinedEvents"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-700 dark:text-white/90 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-colors text-sm font-medium"
            >
              <Heart size={16} className="text-[#e91e8c] shrink-0" />
              Joined Events
            </Link>
          </nav>

          <div className="h-px bg-gradient-to-r from-transparent via-gray-300/50 dark:via-white/20 to-transparent my-3" />

          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-rose-500 dark:text-rose-300 hover:text-rose-600 dark:hover:text-rose-200 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors text-sm font-semibold"
          >
            <LogOut size={16} className="shrink-0" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
