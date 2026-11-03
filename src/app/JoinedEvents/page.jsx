"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { authClient } from "../../lib/auth-client";
import { useRouter } from "next/navigation";

export default function JoinedEventsPage() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const user = session?.user;

  useEffect(() => {
    if (isPending) return;
    if (!user) router.push("/Login");
  }, [user, isPending, router]);

  const [events, setEvents] = useState([]);

  useEffect(() => {
    const joined = JSON.parse(localStorage.getItem("joinedEvents") || "[]");
    setEvents(Array.isArray(joined) ? joined : []);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#4a148c] via-[#9c27b0] via-[#e91e8c] to-[#ff9800] px-6 pt-36 pb-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">Joined Events</h1>
        <p className="text-white/70 text-lg mb-12">Events you have joined</p>

        {events.length === 0 ? (
          <div className="text-center text-white/60 py-20">
            <p className="text-xl">No joined events yet.</p>
            <Link href="/My-events" className="inline-block mt-4 text-amber-200 font-bold hover:underline">Browse events →</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <article
                key={event._id}
                className="group bg-white/10 backdrop-blur-md rounded-3xl overflow-hidden shadow-[0_4px_30px_rgba(255,255,255,0.05)] hover:shadow-[0_16px_50px_rgba(255,255,255,0.15)] transition-all duration-300 border border-white/10 hover:-translate-y-1"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={event.imageUrl || "https://images.unsplash.com/photo-1531206715517-5c0ba140b2a6?w=600&q=80"}
                    alt={event.title || "Event image"}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-bold text-purple-900 shadow-sm">
                    {event.type}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-extrabold text-white mb-1">{event.title}</h3>
                  <p className="text-sm text-amber-200 font-semibold mb-3">{event.location}</p>
                  <p className="text-xs text-white/50 mb-1">{event.date}</p>
                  <p className="text-white/70 text-sm leading-relaxed mb-5 line-clamp-3">{event.description}</p>
                  <Link
                    href={`/My-events/${event._id}`}
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#e91e8c] to-[#9c27b0] text-white font-extrabold text-xs px-4 py-2.5 shadow-[0_4px_14px_rgba(233,30,140,0.35)] hover:shadow-[0_8px_25px_rgba(233,30,140,0.5)] transition-all active:scale-[0.98]"
                  >
                    View Details
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
