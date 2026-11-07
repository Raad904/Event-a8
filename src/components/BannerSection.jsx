"use client";

import { authClient } from "../lib/auth-client";

export default function BannerSection() {

   const { data: session } = authClient.useSession();
    const user = session?.user;
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#e0e7ff] via-[#f3e8ff] via-[#fce7f3] to-[#ffedd5] dark:bg-gradient-to-br dark:from-[#2d1b4e] dark:via-[#7b1fa2] dark:via-[#c2185b] dark:to-[#ff9800]">
      {/* Decorative shapes */}
      <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#e91e8c]/10 dark:bg-[#e91e8c]/30 blur-[120px]" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[400px] h-[400px] rounded-full bg-[#9c27b0]/10 dark:bg-[#9c27b0]/40 blur-[120px]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 py-28 sm:py-36 text-center">
        <h2 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight drop-shadow-[0_8px_30px_rgba(0,0,0,0.1)] dark:drop-shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
          Building Communities,<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-rose-600 dark:from-amber-300 dark:to-rose-300">Changing Lives</span>
        </h2>
        <p className="mt-8 text-lg sm:text-2xl text-gray-600 dark:text-white/80 max-w-2xl mx-auto font-light leading-relaxed">
          We connect passionate volunteers with meaningful social development and community service opportunities. Together, we create lasting impact.
        </p>
        <div className="mt-10 flex justify-center gap-4">
          <a href={'/Upcoming-Events'} className="inline-flex items-center justify-center rounded-full bg-white dark:bg-white/10 text-purple-900 dark:text-white font-bold px-8 py-3.5 shadow-[0_8px_30px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_30px_rgba(255,255,255,0.3)] hover:bg-gray-100 dark:hover:bg-white/20 transition-colors backdrop-blur-sm dark:backdrop-blur-md">
            Upcoming Events
          </a>
          <a href={user ? "/Create-event" : "/Login"} className="inline-flex items-center justify-center rounded-full bg-white/10 dark:bg-white/10 text-gray-900 dark:text-white font-semibold px-8 py-3.5 border border-gray-300 dark:border-white/20 hover:bg-gray-100 dark:hover:bg-white/20 transition-colors backdrop-blur-sm dark:backdrop-blur-md">
            Create Event
          </a>
        </div>
      </div>
    </section>
  );
}
