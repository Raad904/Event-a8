"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export function DialogDemo({ event, onUpdated }) {
  // console.log(event);
  
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

  // Event data form-এ load করা
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

  // Modal open থাকলে background scroll বন্ধ
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (e) => {
      if (e.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

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
        throw new Error(data.message || "Failed to update event.");
      }

      alert("Event updated successfully!");

      setOpen(false);

      if (onUpdated) {
        onUpdated({ ...event, ...form });
      }
    } catch (err) {
      console.error("Update error:", err);
      setError(err.message || "Update failed. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      {/* Edit Button */}
      <button
        type="button"
        onClick={() => {
          setError("");
          setOpen(true);
        }}
        className="w-full rounded-full bg-white/10 text-white text-sm font-bold py-2 hover:bg-white/20 transition-colors border border-white/10 text-center"
      >
        Edit
      </button>

      {/* Full-screen modal */}
      {open &&
        mounted &&
        createPortal(
          <div
            className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) {
                setOpen(false);
              }
            }}
          >
            <div className="bg-white rounded-[2rem] p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.4)] max-w-lg w-full max-h-[90vh] overflow-y-auto relative border border-[#e2e8f0]">
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold transition-colors"
                aria-label="Close dialog"
              >
                ×
              </button>

              {/* Header */}
              <h2 className="text-2xl font-extrabold text-[#1a1a2e] tracking-tight mb-1 pr-8">
                Update Event
              </h2>

              <p className="text-gray-500 text-sm mb-6">
                Modify the details for your social service initiative
              </p>

              {/* Form */}
              <form className="space-y-5" onSubmit={handleSave}>
                {/* Title */}
                <div>
                  <label
                    htmlFor={`edit-title-${event?._id || event?.id}`}
                    className="block text-xs font-extrabold text-[#1a1a2e] mb-2"
                  >
                    Title
                  </label>

                  <input
                    id={`edit-title-${event?._id || event?.id}`}
                    name="title"
                    type="text"
                    required
                    value={form.title}
                    onChange={handleChange}
                    placeholder="Event title"
                    className="w-full rounded-xl px-4 py-3 bg-[#f8fafc] border border-[#e2e8f0] text-[#1a1a2e] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#10b981]/30 focus:border-[#10b981] transition-all text-sm"
                  />
                </div>

                {/* Type and Date */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor={`edit-type-${event?._id || event?.id}`}
                      className="block text-xs font-extrabold text-[#1a1a2e] mb-2"
                    >
                      Event Type
                    </label>

                    <select
                      id={`edit-type-${event?._id || event?.id}`}
                      name="type"
                      value={form.type}
                      onChange={handleChange}
                      className="w-full rounded-xl px-4 py-3 bg-[#f8fafc] border border-[#e2e8f0] text-[#1a1a2e] text-sm focus:outline-none focus:ring-2 focus:ring-[#10b981]/30 focus:border-[#10b981] transition-all"
                    >
                      <option value="Donation">Donation</option>
                      <option value="Cleanup">Cleanup</option>
                      <option value="Relief">Relief</option>
                      <option value="Education">Education</option>
                      <option value="Health">Health</option>
                      <option value="Charity">Charity</option>
                      <option value="Workshop">Workshop</option>
                      <option value="Plantation">Plantation</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor={`edit-date-${event?._id || event?.id}`}
                      className="block text-xs font-extrabold text-[#1a1a2e] mb-2"
                    >
                      Event Date
                    </label>

                    <input
                      id={`edit-date-${event?._id || event?.id}`}
                      name="date"
                      type="date"
                      value={form.date}
                      onChange={handleChange}
                      className="w-full min-w-0 rounded-xl px-3 py-3 bg-[#f8fafc] border border-[#e2e8f0] text-[#1a1a2e] text-sm focus:outline-none focus:ring-2 focus:ring-[#10b981]/30 focus:border-[#10b981] transition-all"
                    />
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label
                    htmlFor={`edit-location-${event?._id || event?.id}`}
                    className="block text-xs font-extrabold text-[#1a1a2e] mb-2"
                  >
                    Location
                  </label>

                  <input
                    id={`edit-location-${event?._id || event?.id}`}
                    name="location"
                    type="text"
                    value={form.location}
                    onChange={handleChange}
                    placeholder="Event venue"
                    className="w-full rounded-xl px-4 py-3 bg-[#f8fafc] border border-[#e2e8f0] text-[#1a1a2e] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#10b981]/30 focus:border-[#10b981] transition-all text-sm"
                  />
                </div>

                {/* Image URL */}
                <div>
                  <label
                    htmlFor={`edit-image-${event?._id || event?.id}`}
                    className="block text-xs font-extrabold text-[#1a1a2e] mb-2"
                  >
                    Thumbnail Image URL
                  </label>

                  <input
                    id={`edit-image-${event?._id || event?.id}`}
                    name="imageUrl"
                    type="url"
                    value={form.imageUrl}
                    onChange={handleChange}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full rounded-xl px-4 py-3 bg-[#f8fafc] border border-[#e2e8f0] text-[#1a1a2e] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#10b981]/30 focus:border-[#10b981] transition-all text-sm"
                  />
                </div>

                {/* Description */}
                <div>
                  <label
                    htmlFor={`edit-description-${event?._id || event?.id}`}
                    className="block text-xs font-extrabold text-[#1a1a2e] mb-2"
                  >
                    Description
                  </label>

                  <textarea
                    id={`edit-description-${event?._id || event?.id}`}
                    name="description"
                    rows={4}
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Describe the event..."
                    className="w-full rounded-xl px-4 py-3 bg-[#f8fafc] border border-[#e2e8f0] text-[#1a1a2e] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#10b981]/30 focus:border-[#10b981] transition-all resize-y text-sm"
                  />
                </div>

                {/* Error Message */}
                {error && (
                  <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl p-3">
                    {error}
                  </p>
                )}

                {/* Footer Buttons */}
                <div className="flex justify-end gap-3 border-t border-gray-100 pt-5">
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    disabled={saving}
                    className="rounded-xl px-5 py-2.5 border border-gray-200 text-gray-700 text-sm font-bold hover:bg-gray-50 transition-colors disabled:opacity-50"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={saving}
                    className="rounded-xl px-5 py-2.5 bg-emerald-600 text-white text-sm font-extrabold hover:bg-emerald-700 transition-colors disabled:opacity-60"
                  >
                    {saving ? "Saving..." : "Save Changes"}
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