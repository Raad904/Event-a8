export default function FeatureSection() {
  const features = [
    {
      title: "Volunteer Matching",
      desc: "Intelligent pairing connects volunteers with events that match their skills, location, and availability.",
      icon: "🤝",
    },
    {
      title: "Real-Time Updates",
      desc: "Live notifications keep participants informed about event changes, weather, and new opportunities.",
      icon: "🔔",
    },
    {
      title: "Community Impact Tracking",
      desc: "Measure and visualize the collective impact of every volunteer hour, donation, and event.",
      icon: "📊",
    },
    {
      title: "Safe & Verified",
      desc: "All events and organizations go through verification to ensure safe, trustworthy experiences.",
      icon: "🛡️",
    },
  ];

  return (
    <section id="features" className="py-24 bg-gradient-to-br from-[#e0e7ff] via-[#f3e8ff] via-[#fce7f3] to-[#ffedd5] dark:bg-gradient-to-br dark:from-[#2d1b4e] dark:via-[#4a148c] dark:via-[#7b1fa2] dark:to-[#9c27b0]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">What We Offer</h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-white/80">Powerful tools to amplify community service</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f) => (
            <div
              key={f.title}
              className="group relative rounded-3xl bg-white dark:bg-white/10 backdrop-blur-md dark:backdrop-blur-md border border-gray-200 dark:border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_30px_rgba(255,255,255,0.05)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_12px_40px_rgba(255,255,255,0.15)] p-8 transition-all duration-300 hover:-translate-y-1 hover:bg-gray-50 dark:hover:bg-white/15"
            >
              <div className="text-5xl mb-6">{f.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{f.title}</h3>
              <p className="text-gray-600 dark:text-white/70 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
