"use client";

import { authClient } from "../lib/auth-client";

export default function BannerSection() {

   const { data: session } = authClient.useSession();
    const user = session?.user;
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#2d1b4e] via-[#7b1fa2] via-[#c2185b] to-[#ff9800]">
      {/* Decorative shapes */}
      <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#e91e8c]/30 blur-[120px]" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[400px] h-[400px] rounded-full bg-[#9c27b0]/40 blur-[120px]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 py-28 sm:py-36 text-center">
        <h2 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-tight drop-shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
          Building Communities,<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-rose-300">Changing Lives</span>
        </h2>
        <p className="mt-8 text-lg sm:text-2xl text-white/80 max-w-2xl mx-auto font-light leading-relaxed">
          We connect passionate volunteers with meaningful social development and community service opportunities. Together, we create lasting impact.
        </p>
        <div className="mt-10 flex justify-center gap-4">
          <a href="#events" className="inline-flex items-center justify-center rounded-full bg-white text-purple-900 font-bold px-8 py-3.5 shadow-[0_8px_30px_rgba(255,255,255,0.3)] hover:bg-white/90 transition-colors">
            Upcoming Events
          </a>
          <a href={user ? "/Create-event" : "/Login"} className="inline-flex items-center justify-center rounded-full bg-white/10 text-white font-semibold px-8 py-3.5 border border-white/20 hover:bg-white/20 transition-colors backdrop-blur-sm">
            Create Event
          </a>
        </div>
      </div>
    </section>
  );
}
