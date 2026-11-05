"use client";

import { authClient } from "../../lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function RegisterPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleEmailRegister = async (e) => {
    e.preventDefault();

    if (loading) return;

    // Password validation
    if (password.length < 8) {
      toast.warning("Password must be at least 8 characters long.");
      return;
    }

    if (!/[A-Z]/.test(password)) {
      toast.warning("Password must contain at least one uppercase letter.");
      return;
    }

    if (!/[a-z]/.test(password)) {
      toast.warning("Password must contain at least one lowercase letter.");
      return;
    }

    try {
      setLoading(true);

      const { data, error } = await authClient.signUp.email({
        name: fullName,
        email,
        image: photoUrl || undefined,
        password,
      });

      if (error) {
        toast.error(
          error.message || "Registration failed. Please try again."
        );
        return;
      }

      if (data) {
        toast.success("Account created successfully! Welcome aboard. 🎉");

        router.push("/");
      }
    } catch (error) {
      console.error("Registration error:", error);

      toast.error(
        error.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#e0e7ff] via-[#f3e8ff] via-[#fce7f3] to-[#ffedd5] dark:bg-gradient-to-br dark:from-[#4a148c] dark:via-[#9c27b0] dark:via-[#e91e8c] dark:to-[#ff9800] flex items-center justify-center px-6 py-28 transition-colors duration-300">
      <div className="w-full max-w-md bg-white dark:bg-white/10 backdrop-blur-xl dark:backdrop-blur-2xl border border-gray-200 dark:border-white/20 rounded-[2rem] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.35)]">

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            src="/images/logo.png"
            alt="SDEP Logo"
            className="h-14 w-14 drop-shadow-[0_0_15px_rgba(0,0,0,0.2)] dark:drop-shadow-[0_0_15px_rgba(255,255,255,0.6)]"
          />
        </div>

        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Create Account
          </h1>

          <p className="text-gray-600 dark:text-white/70 mt-2 text-base">
            Join the community and start driving social change
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleEmailRegister}>

          {/* Full Name */}
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-bold text-gray-700 dark:text-white/90 mb-2"
            >
              Full Name
            </label>

            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-white/60">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </span>

              <input
                id="fullName"
                type="text"
                name="name"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Your Name"
                className="w-full rounded-xl pl-11 pr-4 py-3 bg-white dark:bg-white/10 border border-gray-300 dark:border-white/20 text-gray-900 dark:text-white/90 placeholder:text-gray-400 dark:placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#9c27b0]/40 focus:border-[#9c27b0] transition-all"
              />
            </div>
          </div>

          {/* Email Address */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-bold text-gray-700 dark:text-white/90 mb-2"
            >
              Email Address
            </label>

            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-white/60">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M22 7l-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </span>

              <input
                id="email"
                type="email"
                name="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full rounded-xl pl-11 pr-4 py-3 bg-white dark:bg-white/10 border border-gray-300 dark:border-white/20 text-gray-900 dark:text-white/90 placeholder:text-gray-400 dark:placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#9c27b0]/40 focus:border-[#9c27b0] transition-all"
              />
            </div>
          </div>

          {/* Profile Photo URL */}
          <div>
            <label
              htmlFor="photoUrl"
              className="block text-sm font-bold text-gray-700 dark:text-white/90 mb-2"
            >
              Profile Photo URL
            </label>

            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-white/60">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="M21 15l-5-5L5 21" />
                </svg>
              </span>

              <input
                id="photoUrl"
                type="url"
                name="image"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                placeholder="Your Profile Photo"
                className="w-full rounded-xl pl-11 pr-4 py-3 bg-white dark:bg-white/10 border border-gray-300 dark:border-white/20 text-gray-900 dark:text-white/90 placeholder:text-gray-400 dark:placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#9c27b0]/40 focus:border-[#9c27b0] transition-all"
              />
            </div>

            <p className="text-xs text-gray-500 dark:text-white/60 mt-2">
              Optional: Leave empty for default avatar
            </p>
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-bold text-gray-700 dark:text-white/90 mb-2"
            >
              Password
            </label>

            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-white/60">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </span>

              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                className="w-full rounded-xl pl-11 pr-12 py-3 bg-white dark:bg-white/10 border border-gray-300 dark:border-white/20 text-gray-900 dark:text-white/90 placeholder:text-gray-400 dark:placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#9c27b0]/40 focus:border-[#9c27b0] transition-all"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-white/60 hover:text-gray-900 dark:hover:text-white transition-colors"
                aria-label="Toggle password visibility"
              >
                {showPassword ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>

            {/* Password requirements */}
            <ul className="mt-3 space-y-1.5 text-xs text-gray-500 dark:text-white/60">
              <li className="flex items-center gap-2">
                <span className="text-[#e91e8c] dark:text-[#e91e8c]">✓</span>
                At least one uppercase letter (A-Z)
              </li>

              <li className="flex items-center gap-2">
                <span className="text-[#e91e8c] dark:text-[#e91e8c]">✓</span>
                At least one lowercase letter (a-z)
              </li>

              <li className="flex items-center gap-2">
                <span className="text-[#e91e8c] dark:text-[#e91e8c]">✓</span>
                Minimum 8 characters length
              </li>
            </ul>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-gradient-to-r from-[#9c27b0] to-[#4a148c] text-white font-extrabold text-base py-3.5 shadow-[0_8px_25px_rgba(16,185,129,0.35)] hover:shadow-[0_12px_35px_rgba(16,185,129,0.45)] hover:from-[#059669] hover:to-[#047857] transition-all active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Creating Account..." : "Register →"}
          </button>

        </form>

        {/* Login Link */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 dark:text-white/70 text-sm">
            Already have an account?{" "}
            <a
              href="/Login"
              className="text-[#e91e8c] dark:text-[#e91e8c] font-bold hover:text-[#047857] dark:hover:text-[#047857] hover:underline transition-colors"
            >
              Login here
            </a>
          </p>
        </div>

      </div>
    </main>
  );
}
