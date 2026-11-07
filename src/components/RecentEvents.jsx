
"use client";

import { useState, useEffect } from "react";

export default function RecentEvents() {
  const [upcoming, setUpcoming] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecentEvents = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/RecentEvents`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch recent events");
        }

        const data = await response.json();

        // Latest created events first, maximum 6
        const result = data
          .sort(
            (a, b) =>
              new Date(b.createdAt) - new Date(a.createdAt)
          )
          .slice(0, 6);

        setUpcoming(result);
      } catch (err) {
        console.error("Recent Events Error:", err);
        setError("Failed to load recent events.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecentEvents();
  }, []);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <section
      id="events"
      className="py-24 bg-gradient-to-br from-[#e0e7ff] via-[#f3e8ff] via-[#fce7f3] to-[#ffedd5] dark:bg-gradient-to-br dark:from-[#6a1b9a] dark:via-[#ab47bc] dark:via-[#ec407a] dark:to-[#ff9800]"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8">

        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Recent Events
          </h2>

          <p className="mt-4 text-lg text-gray-600 dark:text-white/80">
            Join us at these community service gatherings
          </p>
        </div>

        {loading ? (
          <p className="text-center text-gray-700 dark:text-white text-lg">
            Loading recent events...
          </p>
        ) : error ? (
          <p className="text-center text-rose-500 dark:text-red-100 text-lg">
            {error}
          </p>
        ) : upcoming.length === 0 ? (
          <p className="text-center text-gray-700 dark:text-white text-lg">
            No recent events available.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcoming.map((event) => (
              <article
                key={event._id}
                className="group bg-white dark:bg-white/10 backdrop-blur-md dark:backdrop-blur-md rounded-3xl overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_30px_rgba(255,255,255,0.05)] hover:shadow-[0_16px_50px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_16px_50px_rgba(255,255,255,0.15)] transition-all duration-300 border border-gray-200 dark:border-white/10 hover:-translate-y-1 hover:bg-gray-50 dark:hover:bg-white/15"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={event.imageUrl || event.image}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  <div className="absolute top-4 left-4 bg-white dark:bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-bold text-purple-700 dark:text-purple-900 shadow-sm">
                    {formatDate(event.date)}
                  </div>
                </div>

                <div className="p-7">
                  <h3 className="text-xl font-extrabold text-gray-900 dark:text-white mb-2 leading-tight group-hover:text-amber-600 dark:group-hover:text-amber-200 transition-colors">
                    {event.title}
                  </h3>

                  <p className="text-sm text-amber-600 dark:text-amber-200 font-semibold mb-3">
                    {event.location}
                  </p>

                  <p className="text-gray-600 dark:text-white/70 text-sm leading-relaxed mb-5">
                    {event.description}
                  </p>

                  <a
                    href={`/My-events/${event._id}`}
                    className="inline-flex items-center text-sm font-bold text-amber-600 dark:text-amber-200 hover:text-amber-700 dark:hover:text-amber-100 transition-colors"
                  >
                    Learn more →
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
