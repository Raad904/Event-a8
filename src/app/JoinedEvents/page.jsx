"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { authClient } from "../../lib/auth-client";
import { useRouter } from "next/navigation";

export default function JoinedEventsPage() {
  const { data: session, isPending } = authClient.useSession();

  const router = useRouter();
  const user = session?.user;

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch joined events from backend
  useEffect(() => {
    if (isPending) return;

    if (!user) {
      router.replace("/Login");
      return;
    }

    if (!user.email) {
      setError("User email not found.");
      setLoading(false);
      return;
    }

    const controller = new AbortController();

    const fetchJoinedEvents = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/join/${encodeURIComponent(user.email)}`,
          {
            method: "GET",
            signal: controller.signal,
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch joined events.");
        }

        const joining = await res.json().catch(() => ({}));


        console.log("Joined Events API Response:", joining);

        // Support array response and common object response formats
        const joinedData = Array.isArray(joining)
          ? joining
          : Array.isArray(joining.joinedEvents)
            ? joining.joinedEvents
            : Array.isArray(joining.data)
              ? joining.data
              : [];

        // Convert joined records into event objects
        const formattedEvents = joinedData.map((item) => {
          const event = item.event || item;

          const originalEventId = item.eventId || event.eventId || event._id;

          return {
            ...event,
            _id: originalEventId,
            eventId: originalEventId,
            title: event.title || item.eventTitle,
            type: event.type || item.eventType,
            date: event.date || item.eventDate,
            location: event.location || item.eventLocation,
            imageUrl: event.imageUrl || item.eventImageUrl,
            description: event.description || item.eventDescription,
          };
        });

        setEvents(formattedEvents);

      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Joined Events Error:", err);
          setError(err.message || "Something went wrong.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchJoinedEvents();

    return () => controller.abort();

  }, [user, isPending, router]);

  // Remove all joined events from MongoDB
  const handleClearAll = async () => {
    if (!user?.email) return;

    const confirmed = window.confirm(
      "Are you sure you want to remove all joined events?"
    );

    if (!confirmed) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/join/${encodeURIComponent(user.email)}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to clear joined events.");
      }

      setEvents([]);

      console.log("Clear All Response:", data);
    } catch (error) {
      console.error("Clear All Error:", error);
      setError(error.message || "Unable to clear joined events.");
    }
  };


  // Remove a single joined event from MongoDB
  const handleRemoveEvent = async (eventId) => {
    if (!user?.email || !eventId) return;

    const confirmed = window.confirm(
      "Are you sure you want to remove this joined event?"
    );

    if (!confirmed) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/join/${encodeURIComponent(user.email)}/${encodeURIComponent(eventId)}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to remove event.");
      }

      setEvents((prev) =>
        prev.filter(
          (event) => String(event.eventId) !== String(eventId)
        )
      );

      console.log("Remove Event Response:", data);

    } catch (error) {
      console.error("Remove Event Error:", error);
      setError(error.message || "Unable to remove joined event.");
    }
  };

  if (isPending || loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#4a148c] via-[#9c27b0] via-[#e91e8c] to-[#ff9800]">
        <p className="text-white text-xl font-bold">
          Loading Joined Events...
        </p>
      </main>
    );
  }

  if (!user) return null;

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#4a148c] via-[#9c27b0] via-[#e91e8c] to-[#ff9800] px-6 pt-36 pb-12">

      <div className="max-w-6xl mx-auto">

        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">

          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Joined Events
          </h1>

          {events.length > 0 && (
            <button
              onClick={handleClearAll}
              className="bg-red-500 hover:bg-red-600 text-white font-bold px-5 py-3 rounded-full transition-all"
            >
              Clear All
            </button>
          )}

        </div>

        <p className="text-white/70 text-lg mb-12">
          Events you have joined
        </p>

        {error ? (
          <div className="text-center text-white py-20">
            <p className="text-xl text-red-200">{error}</p>
          </div>
        ) : events.length === 0 ? (

          <div className="text-center text-white/60 py-20">

            <p className="text-xl">
              No joined events yet.
            </p>

            <Link
              href="/My-events"
              className="inline-block mt-4 text-amber-200 font-bold hover:underline"
            >
              Browse events →
            </Link>

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
                    src={
                      event.imageUrl ||
                      "https://images.unsplash.com/photo-1531206715517-5c0ba140b2a6?w=600&q=80"
                    }
                    alt={event.title || "Event image"}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-bold text-purple-900 shadow-sm">
                    {event.type}
                  </div>

                </div>

                <div className="p-6">

                  <h3 className="text-xl font-extrabold text-white mb-1">
                    {event.title}
                  </h3>

                  <p className="text-sm text-amber-200 font-semibold mb-3">
                    {event.location}
                  </p>

                  <p className="text-xs text-white/50 mb-1">
                    {event.date}
                  </p>

                  <p className="text-white/70 text-sm leading-relaxed mb-5 line-clamp-3">
                    {event.description}
                  </p>

                  <div className="flex flex-wrap gap-3">

                    <button
                      onClick={() => handleRemoveEvent(event.eventId)}
                      className="rounded-full bg-red-500/80 hover:bg-red-600 text-white font-bold text-xs px-4 py-2.5 transition-all"
                    >
                      Remove
                    </button>

                  </div>

                </div>

              </article>

            ))}

          </div>

        )}

      </div>

    </main>
  );
}