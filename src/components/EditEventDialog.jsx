"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export function DialogDemo({ event, onUpdated }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    title: event?.title || "",
    type: event?.type || "Donation",
    date: event?.date || "",
    location: event?.location || "",
    imageUrl: event?.imageUrl || "",
    description: event?.description || "",
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!event) return;

    setForm({
      title: event.title || "",
      type: event.type || "Donation",
      date: event.date || "",
      location: event.location || "",
      imageUrl: event.imageUrl || "",
      description: event.description || "",
    });
  }, [event]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (e) => {
      if (e.key === "Escape" && !saving) {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [open, saving]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const eventId = event?._id || event?.id;

    if (!eventId) {
      setError("Event ID not found.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      const res = await fetch(
        `http://localhost:5000/my-event/${eventId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(
          data.message || "Failed to update event."
        );
      }

      setOpen(false);

      if (onUpdated) {
        onUpdated({ ...event, ...form });
      } else {
        window.location.reload();
      }
    } catch (err) {
      console.error("Update error:", err);
      setError(err.message || "Update failed. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const closeDialog = () => {
    if (!saving) {
      setOpen(false);
      setError("");
    }
  };

  return (
    <>
      {/* Edit Button — Navbar matching UI */}
      <button
        type="button"
        onClick={() => {
          setError("");
          setOpen(true);
        }}
        className="w-full rounded-full border border-white/15
        bg-white/10 px-4 py-2 text-sm font-bold text-white
        backdrop-blur-xl transition-all duration-300
        hover:border-white/30 hover:bg-white/20
        hover:shadow-[0_0_18px_rgba(168,85,247,0.25)]"
      >
        Edit
      </button>

      {/* Full-screen modal */}
      {open &&
        mounted &&
        createPortal(
          <div
            className="fixed inset-0 z-[99999] flex items-center
            justify-center overflow-y-auto bg-[#10071d]/75
            px-4 py-6 backdrop-blur-xl sm:px-6"
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) {
                closeDialog();
              }
            }}
          >
            {/* Background glow */}
            <div
              className="pointer-events-none fixed left-1/2 top-1/2
              h-[500px] w-[500px] -translate-x-1/2
              -translate-y-1/2 rounded-full bg-purple-600/20
              blur-[120px]"
            />

            {/* Modal card */}
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="edit-event-title"
              className="relative my-auto w-full max-w-2xl
              overflow-hidden rounded-[2rem]
              border border-white/15
              bg-gradient-to-br from-[#29143f]/95
              via-[#1d1230]/95 to-[#35102f]/95
              shadow-[0_25px_100px_rgba(0,0,0,0.55)]
              backdrop-blur-2xl"
            >
              {/* Top gradient line */}
              <div
                className="h-1 w-full bg-gradient-to-r
                from-purple-500 via-pink-500 to-orange-400"
              />

              {/* Header */}
              <div
                className="flex items-start justify-between gap-4
                border-b border-white/10 px-6 py-6
                sm:px-9 sm:py-7"
              >
                <div>
                  <div
                    className="mb-3 inline-flex items-center gap-2
                    rounded-full border border-purple-300/20
                    bg-purple-400/10 px-3 py-1.5"
                  >
                    <span className="h-2 w-2 rounded-full bg-pink-400" />
                    <span
                      className="text-[10px] font-extrabold
                      uppercase tracking-[0.2em] text-purple-200"
                    >
                      Event Management
                    </span>
                  </div>

                  <h2
                    id="edit-event-title"
                    className="text-2xl font-extrabold
                    tracking-tight text-white sm:text-3xl"
                  >
                    Edit Event
                  </h2>

                  <p className="mt-2 text-sm leading-relaxed text-white/60">
                    Update your community event information.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={closeDialog}
                  disabled={saving}
                  aria-label="Close dialog"
                  className="flex h-10 w-10 shrink-0 items-center
                  justify-center rounded-full border
                  border-white/10 bg-white/5 text-2xl
                  text-white/70 transition-all
                  hover:rotate-90 hover:border-pink-400/40
                  hover:bg-pink-500/15 hover:text-white
                  disabled:opacity-50"
                >
                  ×
                </button>
              </div>

              {/* Form */}
              <form
                className="space-y-5 px-6 py-6 sm:px-9 sm:py-8"
                onSubmit={handleSave}
              >
                {/* Title */}
                <div>
                  <label
                    htmlFor={`edit-title-${event?._id || event?.id}`}
                    className="mb-2 block text-xs font-bold
                    uppercase tracking-wider text-white/80"
                  >
                    Event Title *
                  </label>

                  <input
                    id={`edit-title-${event?._id || event?.id}`}
                    name="title"
                    type="text"
                    required
                    value={form.title}
                    onChange={handleChange}
                    placeholder="Enter event title"
                    className="w-full rounded-xl border
                    border-white/10 bg-white/[0.06]
                    px-4 py-3 text-sm text-white
                    outline-none transition-all
                    placeholder:text-white/30
                    focus:border-purple-400/70
                    focus:bg-white/[0.09]
                    focus:ring-2 focus:ring-purple-500/20"
                  />
                </div>

                {/* Type and Date */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor={`edit-type-${event?._id || event?.id}`}
                      className="mb-2 block text-xs font-bold
                      uppercase tracking-wider text-white/80"
                    >
                      Event Type
                    </label>

                    <select
                      id={`edit-type-${event?._id || event?.id}`}
                      name="type"
                      value={form.type}
                      onChange={handleChange}
                      className="w-full rounded-xl border
                      border-white/10 bg-[#251535]
                      px-4 py-3 text-sm text-white
                      outline-none transition-all
                      focus:border-purple-400/70
                      focus:ring-2 focus:ring-purple-500/20"
                    >
                      {[
                        "Donation",
                        "Cleanup",
                        "Relief",
                        "Education",
                        "Health",
                        "Charity",
                        "Workshop",
                        "Plantation",
                      ].map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor={`edit-date-${event?._id || event?.id}`}
                      className="mb-2 block text-xs font-bold
                      uppercase tracking-wider text-white/80"
                    >
                      Event Date
                    </label>

                    <input
                      id={`edit-date-${event?._id || event?.id}`}
                      name="date"
                      type="date"
                      value={form.date}
                      onChange={handleChange}
                      className="w-full min-w-0 rounded-xl
                      border border-white/10 bg-white/[0.06]
                      px-4 py-3 text-sm text-white
                      outline-none transition-all
                      focus:border-purple-400/70
                      focus:ring-2 focus:ring-purple-500/20"
                    />
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label
                    htmlFor={`edit-location-${event?._id || event?.id}`}
                    className="mb-2 block text-xs font-bold
                    uppercase tracking-wider text-white/80"
                  >
                    Location
                  </label>

                  <input
                    id={`edit-location-${event?._id || event?.id}`}
                    name="location"
                    type="text"
                    value={form.location}
                    onChange={handleChange}
                    placeholder="Enter event location"
                    className="w-full rounded-xl border
                    border-white/10 bg-white/[0.06]
                    px-4 py-3 text-sm text-white
                    outline-none transition-all
                    placeholder:text-white/30
                    focus:border-purple-400/70
                    focus:ring-2 focus:ring-purple-500/20"
                  />
                </div>

                {/* Image URL */}
                <div>
                  <label
                    htmlFor={`edit-image-${event?._id || event?.id}`}
                    className="mb-2 block text-xs font-bold
                    uppercase tracking-wider text-white/80"
                  >
                    Thumbnail Image URL
                  </label>

                  <input
                    id={`edit-image-${event?._id || event?.id}`}
                    name="imageUrl"
                    type="url"
                    value={form.imageUrl}
                    onChange={handleChange}
                    placeholder="https://example.com/image.jpg"
                    className="w-full rounded-xl border
                    border-white/10 bg-white/[0.06]
                    px-4 py-3 text-sm text-white
                    outline-none transition-all
                    placeholder:text-white/30
                    focus:border-purple-400/70
                    focus:ring-2 focus:ring-purple-500/20"
                  />
                </div>

                {/* Description */}
                <div>
                  <label
                    htmlFor={`edit-description-${event?._id || event?.id}`}
                    className="mb-2 block text-xs font-bold
                    uppercase tracking-wider text-white/80"
                  >
                    Description
                  </label>

                  <textarea
                    id={`edit-description-${event?._id || event?.id}`}
                    name="description"
                    rows={4}
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Describe your community event..."
                    className="w-full resize-y rounded-xl
                    border border-white/10 bg-white/[0.06]
                    px-4 py-3 text-sm leading-relaxed text-white
                    outline-none transition-all
                    placeholder:text-white/30
                    focus:border-purple-400/70
                    focus:ring-2 focus:ring-purple-500/20"
                  />
                </div>

                {/* Error */}
                {error && (
                  <p
                    role="alert"
                    className="rounded-xl border border-red-400/20
                    bg-red-500/10 px-4 py-3 text-sm text-red-200"
                  >
                    {error}
                  </p>
                )}

                {/* Footer */}
                <div
                  className="flex flex-col-reverse gap-3
                  border-t border-white/10 pt-5
                  sm:flex-row sm:justify-end"
                >
                  <button
                    type="button"
                    onClick={closeDialog}
                    disabled={saving}
                    className="rounded-full border
                    border-white/15 bg-white/5 px-6 py-3
                    text-sm font-bold text-white/80
                    transition-all hover:bg-white/10
                    hover:text-white disabled:opacity-50"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={saving}
                    className="rounded-full bg-white px-7 py-3
                    text-sm font-extrabold text-purple-900
                    shadow-[0_4px_20px_rgba(255,255,255,0.15)]
                    transition-all hover:-translate-y-0.5
                    hover:bg-purple-100
                    hover:shadow-[0_6px_25px_rgba(168,85,247,0.3)]
                    disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {saving ? "Saving Changes..." : "Save Changes"}
                  </button>
                </div>
              </form>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}

export default DialogDemo;