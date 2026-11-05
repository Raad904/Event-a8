"use client";
export default function NewsletterSection() {
  return (
    <section className="py-24 bg-gradient-to-br from-[#e0e7ff] via-[#f3e8ff] via-[#fce7f3] to-[#ffedd5] dark:bg-gradient-to-br dark:from-[#4a148c] dark:via-[#7b1fa2] dark:via-[#9c27b0] dark:to-[#c2185b]">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center">
        <div className="bg-white dark:bg-white/5 backdrop-blur-xl dark:backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-[2.5rem] p-10 sm:p-14 shadow-[0_20px_60px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.25)]">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4">Stay in the Loop</h2>
          <p className="text-gray-600 dark:text-purple-100/80 text-lg mb-8 max-w-xl mx-auto">
            Get updates on upcoming service events, volunteer opportunities, and community impact stories delivered to your inbox.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Thanks for subscribing! (No backend configured for this demo)");
            }}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              placeholder="Enter your email"
              required
              className="flex-1 rounded-full px-6 py-3.5 bg-white dark:bg-white/10 border border-gray-300 dark:border-white/20 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-white/40 focus:border-transparent transition-all backdrop-blur-sm dark:backdrop-blur-sm"
            />
            <button
              type="submit"
              className="rounded-full px-8 py-3.5 bg-white text-purple-900 dark:bg-white dark:text-purple-900 font-extrabold shadow-[0_4px_20px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_20px_rgba(255,255,255,0.35)] hover:bg-gray-100 dark:hover:bg-white/90 hover:shadow-[0_6px_30px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_6px_30px_rgba(255,255,255,0.45)] transition-all"
            >
              Subscribe
            </button>
          </form>
          <p className="mt-5 text-xs text-gray-400 dark:text-white/40">No spam. Unsubscribe anytime. We respect your privacy.</p>
        </div>
      </div>
    </section>
  );
}
