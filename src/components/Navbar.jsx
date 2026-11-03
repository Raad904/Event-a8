"use client";
import { authClient } from "../lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const router = useRouter();

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[96%] sm:w-[92%] max-w-6xl rounded-full px-3 sm:px-5 py-2.5 sm:py-3 border border-white/10 bg-white/10 backdrop-blur-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.2)]">
      <div className="flex items-center justify-between gap-2">
        <Link href="/" className="flex items-center gap-2 shrink-0 group">
          <div className="relative flex items-center justify-center">
            <span className="absolute inset-0 scale-125 rounded-full bg-purple-500/50 blur-md transition-all duration-300 group-hover:bg-purple-400 group-hover:blur-lg" />
            <img
              src="/images/logo.png"
              alt="SDEP Logo"
              className="relative z-10 h-9 w-9 sm:h-10 sm:w-10 object-contain drop-shadow-[0_0_8px_rgba(168,85,247,0.8)] transition-transform duration-300 group-hover:scale-110"
            />
          </div>
          <span className="text-white font-extrabold text-lg sm:text-xl tracking-tight leading-none">
            SDEP
          </span>
        </Link>

        <ul className="flex items-center gap-0.5 overflow-x-auto no-scrollbar">
          <li>
            <Link href="/" className="whitespace-nowrap text-white/90 hover:text-white text-xs sm:text-sm font-medium px-3 py-2 rounded-full hover:bg-white/10 transition-colors">
              Home
            </Link>
          </li>
          <li>
            <Link href="/Upcoming-Events" className="whitespace-nowrap text-white/90 hover:text-white text-xs sm:text-sm font-medium px-3 py-2 rounded-full hover:bg-white/10 transition-colors">
              Upcoming Events
            </Link>
          </li>
          {user && (
            <>
              <li>
                <Link href="/My-events" className="whitespace-nowrap text-white/90 hover:text-white text-xs sm:text-sm font-medium px-3 py-2 rounded-full hover:bg-white/10 transition-colors">
                  My Events
                </Link>
              </li>
              <li>
                <Link href="/JoinedEvents" className="whitespace-nowrap text-white/90 hover:text-white text-xs sm:text-sm font-medium px-3 py-2 rounded-full hover:bg-white/10 transition-colors">
                  Joined Events
                </Link>
              </li>
            </>
          )}
        </ul>
        <div>
          <Link
            href={user ? "/Create-event" : "/Login"}
            className="hidden md:inline-flex shrink-0 ml-1 items-center justify-center text-xs sm:text-sm font-semibold text-purple-900 bg-white hover:bg-white/90 rounded-full px-3 sm:px-5 py-2 sm:py-2.5 shadow-[0_4px_14px_0_rgba(255,255,255,0.25)] transition-colors"
          >
            Create Event
          </Link>

          {user ? (
            <button
              onClick={async () => {
                await authClient.signOut();
                window.location.href = "/Login";
              }}
              className="shrink-0 ml-1 inline-flex items-center justify-center text-xs sm:text-sm font-semibold text-purple-900 bg-white hover:bg-white/90 rounded-full px-3 sm:px-5 py-2 sm:py-2.5 shadow-[0_4px_14px_0_rgba(255,255,255,0.25)] transition-colors"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/Login"
              className="shrink-0 ml-1 inline-flex items-center justify-center text-xs sm:text-sm font-semibold text-purple-900 bg-white hover:bg-white/90 rounded-full px-3 sm:px-5 py-2 sm:py-2.5 shadow-[0_4px_14px_0_rgba(255,255,255,0.25)] transition-colors"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
