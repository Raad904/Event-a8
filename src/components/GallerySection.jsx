export default function GallerySection() {
  const photos = [
    { src: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2a6?w=600&q=80", caption: "Beach Cleanup" },
    { src: "https://images.unsplash.com/photo-1593113630400-ea4288922497?w=600&q=80", caption: "Food Drive" },
    { src: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80", caption: "Community Gathering" },
    { src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80", caption: "Education Workshop" },
    { src: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=600&q=80", caption: "Park Restoration" },
    { src: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=600&q=80", caption: "Senior Care Visit" },
  ];

  return (
    <section id="gallery" className="py-24 bg-gradient-to-br from-[#3e1f5a] via-[#6d2c7a] to-[#a0522d]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">Community Moments</h2>
          <p className="mt-4 text-lg text-purple-200/80">Snapshots from our service events</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {photos.map((photo) => (
            <a
              key={photo.caption}
              href="#"
              className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow"
            >
              <img
                src={photo.src}
                alt={photo.caption}
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#4a148c]/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 text-white font-bold text-lg drop-shadow-md">
                {photo.caption}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
