"use client";
import { useState, useEffect } from "react";
import { mockEvents } from "../../lib/mockEvents";

export default function UpcomingEventsPage() {
  const [upcoming, setUpcoming] = useState([]);

  useEffect(() => {
    const now = new Date();
    const result = mockEvents
      .filter((e) => e.date >= now)
      .sort((a, b) => a.date - b.date)
      .slice(0, 6);
    setUpcoming(result);
  }, []);

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#4a148c] via-[#9c27b0] via-[#e91e8c] to-[#ff9800] px-6 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight drop-shadow-[0_8px_30px_rgba(0,0,0,0.35)]">
            Upcoming Events
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-white/80 max-w-xl mx-auto">Join our community service gatherings</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {upcoming.map((event) => (
            <article
              key={event._id}
              className="group bg-white/10 backdrop-blur-md rounded-3xl overflow-hidden shadow-[0_4px_30px_rgba(255,255,255,0.05)] hover:shadow-[0_16px_50px_rgba(255,255,255,0.15)] transition-all duration-300 border border-white/10 hover:-translate-y-1 hover:bg-white/15"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-bold text-purple-900 shadow-sm">
                  {formatDate(event.date)}
                </div>
              </div>
              <div className="p-7">
                <h3 className="text-xl font-extrabold text-white mb-2 leading-tight group-hover:text-amber-200 transition-colors">
                  {event.title}
                </h3>
                <p className="text-sm text-amber-200 font-semibold mb-3">{event.location}</p>
                <p className="text-white/70 text-sm leading-relaxed mb-5">{event.description}</p>
                <a
                  href="#"
                  className="inline-flex items-center text-sm font-bold text-amber-200 hover:text-amber-100 transition-colors"
                >
                  Learn more →
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
