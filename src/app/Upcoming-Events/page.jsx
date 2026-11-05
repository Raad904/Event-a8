
"use client";

import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";

const categories = [
  "All",
  "Donation",
  "Cleanup",
  "Plantation",
  "Winter Relief",
  "Food Drive",
  "Health Camp",
  "Education",
];

export default function UpcomingEventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Upcoming-Events`);

        if (!res.ok) {
          throw new Error("Failed to fetch events");
        }

        const data = await res.json().catch(() => ({}));

        if (!Array.isArray(data)) {
          throw new Error("Invalid events data");
        }

        setEvents(data);
      } catch (err) {
        console.error("Error fetching events:", err);
        setError("Unable to load events. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Format event date
  const formatDate = (date) => {
    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "Date unavailable";
    }

    return parsedDate.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Filter, sort and limit events
  const upcoming = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return events
      .filter((event) => {
        if (!event.date) return false;

        const eventDate = new Date(event.date);

        return (
          !Number.isNaN(eventDate.getTime()) &&
          eventDate >= today
        );
      })
      .sort(
        (a, b) =>
          new Date(b.date).getTime() - new Date(a.date).getTime()
      );
  }, [events]);

  // Apply category and search filters, then show maximum 6
  const filteredEvents = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return upcoming
      .filter((event) => {
        const eventCategory = (event.type || event.category || "")
          .toLowerCase()
          .trim();

        const matchesCategory =
          selectedCategory === "All" ||
          eventCategory === selectedCategory.toLowerCase();

        const matchesSearch =
          !query ||
          (event.title || "").toLowerCase().includes(query) ||
          (event.location || "").toLowerCase().includes(query);

        return matchesCategory && matchesSearch;
      })
      .slice(0, 6);
  }, [upcoming, selectedCategory, searchQuery]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#4a148c] via-[#9c27b0] via-[#e91e8c] to-[#ff9800] px-4 py-30 sm:px-6">
      <div className="mx-auto max-w-6xl">
        {/* Page Heading */}
        <div className="mb-10 text-center sm:mb-14">
          <h1 className="text-4xl font-extrabold tracking-tight text-white drop-shadow-[0_8px_30px_rgba(0,0,0,0.35)] sm:text-5xl md:text-6xl">
            Upcoming Events
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-lg text-white/80 sm:text-xl">
            Join our community service gatherings
          </p>
        </div>

        {/* Category Filters and Search */}
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Category Filter Bar */}
          <div className="flex max-w-full items-center gap-2 overflow-x-auto pb-2 lg:pb-0">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition-all duration-200 sm:text-sm ${selectedCategory === category
                    ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20"
                    : "border border-white/20 bg-white/10 text-white/90 hover:bg-white/20"
                  }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full shrink-0 lg:w-64 xl:w-72">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70"
            />

            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search events..."
              aria-label="Search events by title or location"
              className="w-full rounded-xl border border-emerald-300/80 bg-white/10 py-2.5 pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-white/60 focus:border-emerald-300 focus:ring-2 focus:ring-emerald-300/20"
            />
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="py-20 text-center text-lg text-white">
            Loading events...
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="py-20 text-center text-lg text-white">
            {error}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredEvents.length === 0 && (
          <div className="rounded-3xl border border-white/10 bg-white/10 p-10 text-center backdrop-blur-md">
            <h2 className="text-2xl font-bold text-white">
              No Events Found
            </h2>

            <p className="mt-3 text-white/70">
              No upcoming events match your selected category or search.
            </p>

            <button
              type="button"
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="mt-5 rounded-full bg-white px-5 py-2 text-sm font-bold text-purple-800 transition hover:bg-white/80"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Event Cards */}
        {!loading && !error && filteredEvents.length > 0 && (
          <>
            <div className="mb-5 text-sm text-white/75">
              Showing {filteredEvents.length} of up to 6 events
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredEvents.map((event) => (
                <article
                  key={event._id}
                  className="group overflow-hidden rounded-3xl border border-white/10 bg-white/10 shadow-[0_4px_30px_rgba(255,255,255,0.05)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/15 hover:shadow-[0_16px_50px_rgba(255,255,255,0.15)]"
                >
                  {/* Event Image */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={event.imageUrl || "/images/event-placeholder.png"}
                      alt={event.title || "Community event"}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Event Date */}
                    <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-purple-900 shadow-sm backdrop-blur-sm">
                      {formatDate(event.date)}
                    </div>

                    {/* Category Badge */}
                    {(event.type || event.category) && (
                      <div className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-purple-900 shadow-sm">
                        {event.type || event.category}
                      </div>
                    )}
                  </div>

                  {/* Event Information */}
                  <div className="p-7">
                    <h3 className="mb-2 text-xl font-extrabold leading-tight text-white transition-colors group-hover:text-amber-200">
                      {event.title}
                    </h3>

                    <p className="mb-3 text-sm font-semibold text-amber-200">
                      {event.location}
                    </p>

                    <p className="mb-5 text-sm leading-relaxed text-white/70">
                      {event.description}
                    </p>

                    <a
                       href={`/My-events/${event._id}`}
                      className="inline-flex items-center text-sm font-bold text-amber-200 transition-colors hover:text-amber-100"
                    >
                      Learn more →
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
