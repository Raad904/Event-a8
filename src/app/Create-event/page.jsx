"use client";

import { useState, useEffect } from "react";
import { authClient } from "../../lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function CreateEventPage() {
  const {
    data: session,
    isPending,
    error,
  } = authClient.useSession();
  const router = useRouter();
  const user = session?.user;

  useEffect(() => {
    if (isPending || session === undefined) return;

    // Session API-তে সমস্যা হলে ভুল করে Login-এ পাঠাবে না
    if (error) {
      console.error("Session verification failed:", error);
      toast.error("Unable to verify your session. Please try again.");
      return;
    }

    // নিশ্চিতভাবে লগইন না থাকলেই redirect
    if (session === null) {
      toast.warning("Please login to create an event.");
      router.replace("/Login");
    }
  }, [session, isPending, error, router]);

  const initialForm = {
    title: "",
    type: "Donation",
    date: "",
    location: "",
    imageUrl: "",
    description: "",
  };

  const [form, setForm] = useState(initialForm);
  const [publishing, setPublishing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (publishing) return;

    // Check authentication
    if (!session?.user?.id) {
      toast.warning("Please login before creating an event.");
      router.push("/Login");
      return;
    }

    try {
      setPublishing(true);

      const eventData = {
        ...form,
        createdBy: session.user.id,
        organizerEmail: session.user.email,
      };

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Create-event`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });

      const data = await res.json().catch(() => ({}));

      if (res.status === 401) {
        toast.warning("Your session has expired. Please login again.");
        router.push("/Login");
        return;
      }

      if (!res.ok) {
        throw new Error(data.message || "Failed to publish event.");
      }

      setForm({ ...initialForm });

      toast.success("Event published successfully! 🎉");

      router.push("/My-events");

    } catch (error) {
      console.error("Publish error:", error);

      toast.error(
        error.message || "Failed to publish event. Please try again."
      );
    } finally {
      setPublishing(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e0e7ff] via-[#f3e8ff] via-[#fce7f3] to-[#ffedd5] dark:bg-gradient-to-br dark:from-[#4a148c] dark:via-[#9c27b0] dark:via-[#e91e8c] dark:to-[#ff9800] transition-colors duration-300">
        <p className="text-gray-900 dark:text-white text-lg font-semibold">
          Checking authentication...
        </p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#e0e7ff] via-[#f3e8ff] via-[#fce7f3] to-[#ffedd5] dark:bg-gradient-to-br dark:from-[#4a148c] dark:via-[#9c27b0] dark:via-[#e91e8c] dark:to-[#ff9800] flex justify-center items-start px-6 pt-36 pb-12 transition-colors duration-300">
      <div className="w-full max-w-2xl bg-white dark:bg-white/10 backdrop-blur-xl dark:backdrop-blur-2xl border border-gray-200 dark:border-white/20 rounded-[2rem] p-8 sm:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-gray-900 dark:text-white font-bold text-sm tracking-wide mb-3">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-purple-600 dark:text-purple-400"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            Social Service Drive
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Create a Community Event
          </h1>

          <p className="text-gray-600 dark:text-white/70 mt-3 text-base">
            Organize a local relief effort, environmental cleanup, or community support drive.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Event Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-extrabold text-gray-700 dark:text-white/90 mb-2">
              Event Title <span className="text-rose-500 dark:text-rose-300">*</span>
            </label>

            <input
              id="title"
              name="title"
              type="text"
              required
              value={form.title}
              onChange={handleChange}
              placeholder="Enter event title"
              className="w-full rounded-xl px-4 py-3.5 bg-white dark:bg-white/10 border border-gray-300 dark:border-white/20 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#e91e8c]/40 focus:border-[#e91e8c] transition-all"
            />
          </div>

          {/* Type and Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="type" className="block text-sm font-extrabold text-gray-700 dark:text-white/90 mb-2">
                Event Type <span className="text-rose-500 dark:text-rose-300">*</span>
              </label>

              <select
                id="type"
                name="type"
                value={form.type}
                onChange={handleChange}
                className="w-full rounded-xl px-4 py-3.5 bg-gray-100 dark:bg-[#4a245f] border border-gray-300 dark:border-white/20 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#e91e8c]/40"
              >
                <option value="Donation">Donation</option>
                <option value="Cleanup">Cleanup</option>
                <option value="Relief">Relief</option>
                <option value="Education">Education</option>
              </select>
            </div>

            <div>
              <label htmlFor="date" className="block text-sm font-extrabold text-gray-700 dark:text-white/90 mb-2">
                Event Date <span className="text-rose-500 dark:text-rose-300">*</span>
              </label>

              <input
                id="date"
                name="date"
                type="date"
                required
                min={new Date().toLocaleDateString("en-CA")}
                value={form.date}
                onChange={handleChange}
                className="w-full rounded-xl px-4 py-3.5 bg-white dark:bg-white/10 border border-gray-300 dark:border-white/20 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#e91e8c]/40"
              />

              <p className="text-xs text-gray-500 dark:text-white/60 mt-2">
                Select today or a future date.
              </p>
            </div>
          </div>

          {/* Location */}
          <div>
            <label htmlFor="location" className="block text-sm font-extrabold text-gray-700 dark:text-white/90 mb-2">
              Location / Venue <span className="text-rose-500 dark:text-rose-300">*</span>
            </label>

            <input
              id="location"
              name="location"
              type="text"
              required
              value={form.location}
              onChange={handleChange}
              placeholder="Enter event location"
              className="w-full rounded-xl px-4 py-3.5 bg-white dark:bg-white/10 border border-gray-300 dark:border-white/20 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#e91e8c]/40"
            />
          </div>

          {/* Image URL */}
          <div>
            <label htmlFor="imageUrl" className="block text-sm font-extrabold text-gray-700 dark:text-white/90 mb-2">
              Event Image URL <span className="text-rose-500 dark:text-rose-300">*</span>
            </label>

            <input
              id="imageUrl"
              name="imageUrl"
              type="url"
              required
              value={form.imageUrl}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className="w-full rounded-xl px-4 py-3.5 bg-white dark:bg-white/10 border border-gray-300 dark:border-white/20 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#e91e8c]/40"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-extrabold text-gray-700 dark:text-white/90 mb-2">
              Event Description <span className="text-rose-500 dark:text-rose-300">*</span>
            </label>

            <textarea
              id="description"
              name="description"
              required
              rows={5}
              value={form.description}
              onChange={handleChange}
              placeholder="Describe the purpose of your event..."
              className="w-full rounded-xl px-4 py-3.5 bg-white dark:bg-white/10 border border-gray-300 dark:border-white/20 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#e91e8c]/40 resize-none"
            />
          </div>

          {/* Organizer */}
          <div className="bg-gray-50 dark:bg-white/10 rounded-2xl px-5 py-4 flex flex-wrap items-center justify-between gap-2 border border-gray-200 dark:border-white/10">
            <span className="text-sm text-gray-700 dark:text-white/90 font-medium">
              Organizer Email attached:
            </span>

            <span className="text-sm text-gray-900 dark:text-white font-bold">
              {user?.email || "Loading..."}
            </span>
          </div>

          {/* Publish Button */}
          <button
            type="submit"
            disabled={publishing}
            className="w-full rounded-full bg-gradient-to-r from-[#e91e8c] to-[#9c27b0] text-white font-extrabold text-base py-4 shadow-[0_8px_25px_rgba(233,30,140,0.4)] hover:shadow-[0_12px_35px_rgba(233,30,140,0.5)] hover:from-[#9c27b0] hover:to-[#4a148c] transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {publishing ? "Publishing..." : "Publish Event"}
          </button>
        </form>
      </div>
    </main>
  );
}
