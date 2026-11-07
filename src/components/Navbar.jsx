"use client";
import { authClient } from "../lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ProfileDropdown from "./ProfileDropdown";
import { ThemeToggle } from "./ThemeToggle";

const navLink = (href, children) => (
  <Link
    href={href}
    className="whitespace-nowrap text-gray-700 dark:text-white/90 hover:text-gray-900 dark:hover:text-white text-xs sm:text-sm font-medium px-3 py-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
  >
    {children}
  </Link>
);

export default function Navbar() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[96%] sm:w-[92%] max-w-6xl rounded-full px-3 sm:px-5 py-2.5 sm:py-3 border border-gray-300/50 dark:border-white/10 bg-white dark:bg-white/10 backdrop-blur-xl dark:backdrop-blur-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.08)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.2)]">
      <div className="flex items-center justify-between gap-2 w-full">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0 group">
          <div className="relative flex items-center justify-center">
            <span className="absolute inset-0 scale-125 rounded-full bg-purple-200/40 dark:bg-purple-500/50 blur-md transition-all duration-300 group-hover:bg-purple-300 dark:group-hover:bg-purple-400 group-hover:blur-lg" />
            <img
              src="/images/logo.png"
              alt="SDEP Logo"
              className="relative z-10 h-9 w-9 sm:h-10 sm:w-10 object-contain drop-shadow-[0_0_8px_rgba(168,85,247,0.6)] dark:drop-shadow-[0_0_8px_rgba(168,85,247,0.8)] transition-transform duration-300 group-hover:scale-110"
            />
          </div>
          <span className="text-gray-900 dark:text-white font-extrabold text-lg sm:text-xl tracking-tight leading-none">
            SDEP
          </span>
        </Link>

        {/* Nav links: Home on all screens; Upcoming/My/Joined hidden on mobile */}
        <ul className="flex items-center gap-0.5 overflow-x-auto no-scrollbar">
          <li>{navLink("/", "Home")}</li>
          <li className="hidden sm:flex">{navLink("/Upcoming-Events", "Upcoming Events")}</li>
          {user && (
            <>
              <li className="hidden sm:flex">{navLink("/My-events", "My Events")}</li>
              <li className="hidden sm:flex">{navLink("/JoinedEvents", "Joined Events")}</li>
            </>
          )}
        </ul>

        <div className="flex items-center gap-1">
          {/* Desktop: Create Event (logged in) / Login (logged out) — hidden on mobile */}
          {user ? (
            <Link
              href="/Create-event"
              className="hidden sm:inline-flex shrink-0 ml-1 items-center justify-center text-xs sm:text-sm font-semibold text-purple-900 dark:text-purple-900 bg-white dark:bg-white hover:bg-gray-100 dark:hover:bg-white/90 rounded-full px-3 sm:px-5 py-2 sm:py-2.5 shadow-[0_4px_14px_0_rgba(0,0,0,0.1)] dark:shadow-[0_4px_14px_0_rgba(255,255,255,0.25)] transition-colors"
            >
              Create Event
            </Link>
          ) : (
            <Link
              href="/Login"
              className="hidden sm:inline-flex shrink-0 ml-1 items-center justify-center text-xs sm:text-sm font-semibold text-purple-900 dark:text-purple-900 bg-white dark:bg-white hover:bg-gray-100 dark:hover:bg-white/90 rounded-full px-3 sm:px-5 py-2 sm:py-2.5 shadow-[0_4px_14px_0_rgba(0,0,0,0.1)] dark:shadow-[0_4px_14px_0_rgba(255,255,255,0.25)] transition-colors"
            >
              Login
            </Link>
          )}

          {/* Desktop: Logout (logged in) — hidden on mobile */}
          {user && (
            <button
              onClick={async () => {
                await authClient.signOut();
                window.location.href = "/Login";
              }}
              className="hidden sm:inline-flex shrink-0 ml-1 items-center justify-center text-xs sm:text-sm font-semibold text-purple-900 dark:text-purple-900 bg-white dark:bg-white hover:bg-gray-100 dark:hover:bg-white/90 rounded-full px-3 sm:px-5 py-2 sm:py-2.5 shadow-[0_4px_14px_0_rgba(0,0,0,0.1)] dark:shadow-[0_4px_14px_0_rgba(255,255,255,0.25)] transition-colors"
            >
              Logout
            </button>
          )}

          {/* Mobile: ProfileDropdown replaces Login/Logout (center of navbar) */}
          <ProfileDropdown inline className="sm:hidden" />
          {/* Mobile: Login link when not logged in (ProfileDropdown renders null without a session) */}
          {!user && (
            <Link
              href="/Login"
              className="sm:hidden shrink-0 ml-1 items-center justify-center text-xs sm:text-sm font-semibold text-purple-900 dark:text-purple-900 bg-white dark:bg-white hover:bg-gray-100 dark:hover:bg-white/90 rounded-full px-3 sm:px-5 py-2 sm:py-2.5 shadow-[0_4px_14px_0_rgba(0,0,0,0.1)] dark:shadow-[0_4px_14px_0_rgba(255,255,255,0.25)] transition-colors"
            >
              Login
            </Link>
          )}

          {/* Mobile: ThemeToggle replaces Create Event */}
          <ThemeToggle className="sm:hidden" />
        </div>
      </div>
    </nav>
  );
}
