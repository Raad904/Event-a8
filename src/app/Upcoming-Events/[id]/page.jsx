"use client";

import { authClient } from "../../../lib/auth-client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function EventDetailsPage() {
  const { id } = useParams();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isJoined, setIsJoined] = useState(false);
  const [checkingJoinStatus, setCheckingJoinStatus] = useState(true);

  // const { data: session } = authClient.useSession();
  // const user = session?.user;

  const {
    data: session,
    isPending,
    error: authError,
  } = authClient.useSession();

  const user = session?.user;



  useEffect(() => {
    if (isPending || !id) return;

    let cancelled = false;

    const fetchEvent = async () => {
      try {
        setLoading(true);
        setError("");

        // Fetch event details
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/Upcoming-Events/${id}`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch event");
        }

        const data = await res.json();

        if (cancelled) return;

        setEvent(data);

        // Check joined status from MongoDB
        if (user?.email) {
          setCheckingJoinStatus(true);

          const joinRes = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/join/${encodeURIComponent(user.email)}`
          );

          if (!joinRes.ok) {
            throw new Error("Failed to check joined status");
          }

          const joinedData = await joinRes.json();

          if (cancelled) return;

          const alreadyJoined = Array.isArray(joinedData) &&
            joinedData.some(
              (item) => String(item.eventId) === String(data._id)
            );

          setIsJoined(alreadyJoined);
        } else {
          setIsJoined(false);
        }

      } catch (err) {
        if (!cancelled) {
          console.error("Event fetch error:", err);
          setError("Unable to load event details.");
          toast.error("Unable to load event details.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
          setCheckingJoinStatus(false);
        }
      }
    };

    fetchEvent();

    return () => {
      cancelled = true;
    };
  }, [id, user?.email, isPending]);

  // Join Event Handler
  const handleJoinEvent = async (e) => {
    e.preventDefault();

    if (!user?.id) {
      toast.error("Please login first to join this event.");
      return;
    }

    if (!event?._id) {
      toast.error("Event information is unavailable.");
      return;
    }

    if (isJoined) {
      toast.info("You have already joined this event.");
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/joining`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: user.name,
          email: user.email,
          image: user.image,
          ...event,
        }),
      });

      const data = await res.json().catch(() => ({}));

      // Already joined
      if (res.status === 409) {
        setIsJoined(true);
        toast.info("You have already joined this event.");
        return;
      }

      if (!res.ok) {
        throw new Error(
          data.message || `Failed to join event (status ${res.status})`
        );
      }

      setIsJoined(true);

      toast.success("Successfully joined the event! 🎉");

      console.log("Joining API Response:", data);

    } catch (error) {
      console.error("Join Event Error:", error);

      toast.error(error.message || "Unable to join this event.");
    }
  };
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 dark:bg-purple-900 flex items-center justify-center text-gray-900 dark:text-white text-xl">
        Loading event details...
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen bg-gray-900 dark:bg-purple-900 flex flex-col items-center justify-center text-gray-900 dark:text-white gap-4">
        <p>{error || "Event not found."}</p>

        <Link
          href="/Upcoming-Events"
          className="text-amber-600 dark:text-amber-200 underline"
        >
          Back to Upcoming Events
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#e0e7ff] via-[#f3e8ff] via-[#fce7f3] to-[#ffedd5] dark:bg-gradient-to-br dark:from-[#4a148c] dark:via-[#9c27b0] dark:via-[#e91e8c] dark:to-[#ff9800] px-6 pt-36 pb-20 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">

        <article className="bg-white dark:bg-white/10 backdrop-blur-xl dark:backdrop-blur-2xl border border-gray-200 dark:border-white/20 rounded-[2.5rem] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.35)]">

          {/* Top decorative icon */}
          <div className="flex justify-center pt-10">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#e91e8c] to-[#9c27b0] dark:from-[#e91e8c] dark:to-[#9c27b0] flex items-center justify-center shadow-[0_8px_25px_rgba(233,30,140,0.2)] dark:shadow-[0_8px_25px_rgba(233,30,140,0.35)]">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="text-gray-900 dark:text-white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>
          </div>

          {/* Venue / Event Title */}
          <div className="text-center px-8 pt-6 pb-2">
            <div className="flex items-center justify-center gap-4 mb-3">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#e91e8c]/60" />

              <span className="text-[#e91e8c] text-xs font-extrabold tracking-widest uppercase dark:text-[#e91e8c]">
                Event Details
              </span>

              <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#e91e8c]/60" />
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              {event.title}
            </h1>

            <p className="text-white/70 mt-4 text-base leading-relaxed max-w-xl mx-auto dark:text-white/70">
              {event.description}
            </p>
          </div>

          {/* Image + Details split */}
          <div className="grid md:grid-cols-2 gap-0 mt-6">

            <div className="p-8 md:p-10 flex flex-col justify-center">

              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white mb-3">
                About This Event
              </h2>

              <div className="space-y-3 text-sm text-gray-600 dark:text-white/70 mb-6">

                <p>
                  <span className="font-bold text-gray-900 dark:text-white">Type:</span>{" "}
                  {event.type}
                </p>

                <p>
                  <span className="font-bold text-gray-900 dark:text-white">Date:</span>{" "}
                  {event.date}
                </p>

                <p>
                  <span className="font-bold text-gray-900 dark:text-white">Location:</span>{" "}
                  {event.location}
                </p>

                <p>
                  <span className="font-bold text-gray-900 dark:text-white">Image:</span>{" "}
                  <a
                    href={event.imageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-600 dark:text-amber-200 hover:underline"
                  >
                    {event.imageUrl}
                  </a>
                </p>

              </div>

              <Link
                href="/My-events"
                className="inline-flex items-center gap-2 text-gray-900 dark:text-white font-bold hover:text-amber-600 dark:hover:text-amber-200 transition-colors"
              >
                ← Back to My Events
              </Link>

              {/* Join Event Button */}
              <form onSubmit={handleJoinEvent}>
                <button
                  type="submit"
                  disabled={isJoined || checkingJoinStatus || !user?.id}
                  className={`mt-4 inline-flex items-center gap-2 rounded-full text-white font-extrabold text-sm px-6 py-3 transition-all
    ${isJoined
        ? "bg-gradient-to-r from-emerald-500 to-teal-600 cursor-not-allowed opacity-80"
        : checkingJoinStatus || !user?.id
          ? "bg-gray-400 dark:bg-gray-500 cursor-not-allowed opacity-60"
          : "bg-gradient-to-r from-[#e91e8c] to-[#9c27b0] hover:shadow-[0_12px_35px_rgba(233,30,140,0.5)]"
      }
`}
                >
                  {isJoined
                    ? "Joined Event"
                    : checkingJoinStatus
                      ? "Checking..."
                      : "Join Event"}
                </button>
              </form>

            </div>

            {/* Event Image */}
            <div className="relative h-72 md:h-auto overflow-hidden rounded-b-[2.5rem] md:rounded-r-[2.5rem] md:rounded-bl-none">

              <img
                src={
                  event.imageUrl ||
                  "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&q=80"
                }
                alt={event.title}
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#4a148c]/60 dark:from-[#4a148c]/60 via-transparent to-transparent" />

            </div>
          </div>

          {/* Schedule of Events */}
          <div className="px-8 md:px-12 py-12">

            <div className="text-center mb-8">

              <div className="flex items-center justify-center gap-4 mb-3">
                <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#e91e8c]/60" />

                <span className="text-[#e91e8c] text-xs font-extrabold tracking-widest uppercase dark:text-[#e91e8c]">
                  Schedule
                </span>

                <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#e91e8c]/60" />
              </div>

              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                Schedule of Events
              </h2>

              <p className="text-gray-600 dark:text-white/60 mt-3 text-sm">
                Plan your day with these key activities
              </p>

            </div>

            <div className="grid sm:grid-cols-3 gap-6">

              {[
                {
                  time: "09:00",
                  title: "Registration & Welcome",
                  desc: "Check in at the main gate, receive your welcome kit, and meet fellow volunteers.",
                },
                {
                  time: "10:30",
                  title: "Main Activity Starts",
                  desc: "Group leaders will brief everyone on tasks and distribute equipment.",
                },
                {
                  time: "13:00",
                  title: "Community Lunch",
                  desc: "A shared meal to celebrate progress and build connections among participants.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-gray-50 dark:bg-white/5 rounded-2xl p-6 border border-gray-200 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                >
                  <div className="text-[#e91e8c] text-xs font-extrabold tracking-widest mb-2">
                    {item.time}
                  </div>

                  <h3 className="text-lg font-extrabold text-gray-900 dark:text-white mb-2">
                    {item.title}
                  </h3>

                  <p className="text-sm text-gray-600 dark:text-white/60 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}

            </div>
          </div>

          {/* Event Info Bottom */}
          <div className="px-8 md:px-12 pb-10">

            <div className="bg-gray-50 dark:bg-white/5 rounded-2xl px-6 py-5 border border-gray-200 dark:border-white/10">

              <div className="grid sm:grid-cols-3 gap-6 text-sm">

                <div>
                  <p className="text-[#e91e8c] font-extrabold mb-1 dark:text-[#e91e8c]">
                    Type
                  </p>

                  <p className="text-gray-900 dark:text-white font-medium">
                    {event.type}
                  </p>
                </div>

                <div>
                  <p className="text-[#e91e8c] font-extrabold mb-1 dark:text-[#e91e8c]">
                    Date
                  </p>

                  <p className="text-gray-900 dark:text-white font-medium">
                    {event.date}
                  </p>
                </div>

                <div>
                  <p className="text-[#e91e8c] font-extrabold mb-1 dark:text-[#e91e8c]">
                    Location
                  </p>

                  <p className="text-gray-900 dark:text-white font-medium">
                    {event.location}
                  </p>
                </div>

              </div>

            </div>
          </div>

        </article>
      </div>
    </main>
  );
}
