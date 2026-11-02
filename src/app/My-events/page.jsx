
"use client";



import Link from "next/link";
import { DialogDemo } from "../../components/EditEventDialog.jsx";
import { useEffect, useState } from "react";

export default function MyEventsPage() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await fetch("http://localhost:5000/my-event");

                if (!res.ok) {
                    throw new Error("Failed to fetch events");
                }

                const data = await res.json();
                setEvents(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error("Fetch error:", err);
                setError("Failed to load events. Please check your server.");
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    const viewEvent = (event) => {
        alert(
            `Title: ${event.title} \nLocation: ${event.location} \nDescription: ${event.description} `
        );
    };

    const deleteEvent = async (id) => {
        if (!id) {
            alert("Event ID not found.");
            return;
        }

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this event?"
        );

        if (!confirmDelete) return;

        try {
            const res = await fetch(`http://localhost:5000/my-event/${id}`, {
                method: "DELETE",
            });

            if (!res.ok) {
                throw new Error("Failed to delete event");
            }

            setEvents((prevEvents) =>
                prevEvents.filter((event) => event._id !== id)
            );
        } catch (err) {
            console.error("Delete error:", err);
            alert("Could not delete the event. Please try again.");
        }
    };

    if (loading) {
        return (
            <main className="min-h-screen bg-gradient-to-br from-[#4a148c] via-[#9c27b0] via-[#e91e8c] to-[#ff9800] px-6 pt-36 pb-12">
                <p className="text-center text-white text-xl">
                    Loading events...
                </p>
            </main>
        );
    }

    if (error) {
        return (
            <main className="min-h-screen bg-gradient-to-br from-[#4a148c] via-[#9c27b0] via-[#e91e8c] to-[#ff9800] px-6 pt-36 pb-12">
                <p className="text-center text-white text-xl">{error}</p>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-gradient-to-br from-[#4a148c] via-[#9c27b0] via-[#e91e8c] to-[#ff9800] px-6 pt-36 pb-12 ">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
                    My Events
                </h1>

                <p className="text-white/70 text-lg mb-12">
                    Events you have created
                </p>

                {events.length === 0 ? (
                    <div className="text-center text-white/60 py-20">
                        <p className="text-xl">No events created yet.</p>

                        <a
                            href="/Create-event"
                            className="inline-block mt-4 text-amber-200 font-bold hover:underline"
                        >
                            Create one →
                        </a>
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

                                    <div className="flex items-center gap-2">
                                        {/* View Button */}
                                        <Link
                                            href={`/My-events/${event._id}`}
                                            className="shrink-0 rounded-full border border-white/20
    bg-white/10 px-3 py-2 text-xs font-bold text-white
    transition hover:bg-white/20"
                                        >
                                            View
                                        </Link>

                                        {/* Edit Button */}
                                        <div className="min-w-0 flex-1">
                                            <DialogDemo
                                                event={event}
                                                onUpdated={(updatedEvent) => {
                                                    setEvents((prevEvents) =>
                                                        prevEvents.map((item) =>
                                                            item._id === updatedEvent._id
                                                                ? updatedEvent
                                                                : item
                                                        )
                                                    );
                                                }}
                                            />
                                        </div>

                                        {/* Delete Button */}
                                        <button
                                            onClick={() => deleteEvent(event._id)}
                                            className="shrink-0 rounded-full bg-pink-600
  px-3 py-2 text-xs font-bold text-white
  transition hover:bg-pink-700
  hover:shadow-[0_0_15px_rgba(236,72,153,0.5)]
  disabled:opacity-50"
                                        >
                                            Delete
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
