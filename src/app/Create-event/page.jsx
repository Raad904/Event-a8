"use client";
import { useState } from "react";

export default function CreateEventPage() {
    const [form, setForm] = useState({
        title: "",
        type: "Donation",
        date: "",
        location: "",
        imageUrl: "",
        description: "",
    });

    const handleSubmit = async (e) => {
    e.preventDefault();
      const res = await fetch("http://localhost:5000/Create-event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
     
      const data = await res.json()
      console.log(data);
     
      
  };

  const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        // console.log(form)
    };

    return (
        <main className="min-h-screen bg-gradient-to-br from-[#4a148c] via-[#9c27b0] via-[#e91e8c] to-[#ff9800] flex justify-center items-start px-6 pt-36 pb-12">
            <div className="w-full max-w-2xl bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[2rem] p-8 sm:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
                <div className="mb-8">
                    <div className="flex items-center gap-2 text-white font-bold text-sm tracking-wide mb-3">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
                        Social Service Drive
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Create a Community Event</h1>
                    <p className="text-white/70 mt-3 text-base">Organize a local relief effort, environmental cleanup, or community support drive.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="title" className="block text-sm font-extrabold text-white/90 mb-2">Event Title <span className="text-rose-300">*</span></label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></svg>
                            </span>
                            <input
                                id="title" name="title" type="text" required
                                value={form.title} onChange={handleChange}
                                placeholder="e.g. Winter Clothes Distribution — Mirpur 10, Dhaka"
                                className="w-full rounded-xl pl-11 pr-4 py-3.5 bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#e91e8c]/40 focus:border-[#e91e8c] transition-all"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                            <label htmlFor="type" className="block text-sm font-extrabold text-white/90 mb-2">Event Type <span className="text-rose-300">*</span></label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                                </span>
                                <select
                                    id="type" name="type" value={form.type} onChange={handleChange}
                                    className="w-full rounded-xl pl-11 pr-4 py-3.5 bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-[#e91e8c]/40 focus:border-[#e91e8c] transition-all appearance-none"
                                >
                                    <option className="text-black">Donation</option>
                                    <option className="text-black">Cleanup</option>
                                    <option className="text-black">Relief</option>
                                    <option className="text-black">Education</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="date" className="block text-sm font-extrabold text-white/90 mb-2">Event Date <span className="text-rose-300">*</span></label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                                </span>
                                <input
                                    id="date" name="date" type="date" required
                                    value={form.date} onChange={handleChange}
                                    className="w-full rounded-xl pl-11 pr-4 py-3.5 bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-[#e91e8c]/40 focus:border-[#e91e8c] transition-all"
                                />
                            </div>
                            <p className="text-xs text-white/60 mt-2">Dates must be in the future (today or later)</p>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="location" className="block text-sm font-extrabold text-white/90 mb-2">Location / Venue <span className="text-rose-300">*</span></label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                            </span>
                            <input
                                id="location" name="location" type="text" required
                                value={form.location} onChange={handleChange}
                                placeholder="e.g. Mohammadpur Town Hall, Dhaka"
                                className="w-full rounded-xl pl-11 pr-4 py-3.5 bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#e91e8c]/40 focus:border-[#e91e8c] transition-all"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="imageUrl" className="block text-sm font-extrabold text-white/90 mb-2">Profile Picture URL <span className="text-rose-300">*</span></label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" /></svg>
                            </span>
                            <input
                                id="imageUrl" name="imageUrl" type="url" required
                                value={form.imageUrl} onChange={handleChange}
                                placeholder="https://images.unsplash.com/photo-..."
                                className="w-full rounded-xl pl-11 pr-4 py-3.5 bg-white/10 border border-[#e91e8c] text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#e91e8c]/40 focus:border-[#e91e8c] transition-all"
                            />
                        </div>
                        <p className="text-xs text-white/60 mt-2">Quick photo presets: <span className="font-semibold">Winter Clothes</span> · <span className="font-semibold">Blanket Relief</span> · <span className="font-semibold">Cleanup</span> · <span className="font-semibold">Tree Plantation</span></p>
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm font-extrabold text-white/90 mb-2">Event Description <span className="text-rose-300">*</span></label>
                        <textarea
                            id="description" name="description" required rows={5}
                            value={form.description} onChange={handleChange}
                            placeholder="Explain the purpose of the drive, volunteers required, items being distributed or tasks to complete..."
                            className="w-full rounded-xl px-4 py-3.5 bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#e91e8c]/40 focus:border-[#e91e8c] transition-all resize-none"
                        />
                    </div>

                    <div className="bg-white/10 rounded-2xl px-5 py-4 flex items-center justify-between border border-white/10">
                        <span className="text-sm text-white/90 font-medium">Organizer Email attached:</span>
                        <span className="text-sm text-white font-bold">mppit@mailinator.com</span>
                    </div>

                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className="w-full rounded-full bg-gradient-to-r from-[#e91e8c] to-[#9c27b0] text-white font-extrabold text-base py-4 shadow-[0_8px_25px_rgba(233,30,140,0.4)] hover:shadow-[0_12px_35px_rgba(233,30,140,0.5)] hover:from-[#9c27b0] hover:to-[#4a148c] transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
                        Publish Event
                    </button>
                </form>
            </div>
        </main>
    );
}
