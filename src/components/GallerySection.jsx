
"use client";

import { useState, useEffect } from "react";

export default function GallerySection() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/GallerySection`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch gallery");
        }

        const data = await response.json();

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Only past events, latest event date first
        const pastEvents = data
          .filter((event) => {
            const eventDate = new Date(event.date);
            return eventDate < today;
          })
          .sort(
            (a, b) =>
              new Date(b.date) - new Date(a.date)
          )
          .slice(0, 6);

        setPhotos(pastEvents);
      } catch (err) {
        console.error("Gallery Error:", err);
        setError("Failed to load gallery.");
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  return (
    <section
      id="gallery"
      className="py-24 bg-gradient-to-br from-[#3e1f5a] via-[#6d2c7a] to-[#a0522d]"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8">

        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Community Moments
          </h2>

          <p className="mt-4 text-lg text-purple-200/80">
            Snapshots from our service events
          </p>
        </div>

        {loading ? (
          <p className="text-center text-white text-lg">
            Loading gallery...
          </p>
        ) : error ? (
          <p className="text-center text-red-200 text-lg">
            {error}
          </p>
        ) : photos.length === 0 ? (
          <p className="text-center text-white text-lg">
            No past event photos available.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {photos.map((photo) => (
              <a
                key={photo._id}
                href={`/Upcoming-Events/${photo._id}`}
                className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow"
              >
                <img
                  src={photo.imageUrl || photo.image}
                  alt={photo.title}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#4a148c]/80 via-transparent to-transparent" />

                <div className="absolute bottom-4 left-4 text-white font-bold text-lg drop-shadow-md">
                  {photo.title}
                </div>
              </a>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
