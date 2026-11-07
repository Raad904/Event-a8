
"use client";

import { authClient } from "../../lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";


export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState("");

  // Email Login
  const handleEmailLogin = async (e) => {
    e.preventDefault();

    if (loading || socialLoading) return;

    try {
      setLoading(true);

      const { data, error } = await authClient.signIn.email({
        email,
        password,
      });

      if (error) {
        toast.error(
          error.message || "Login failed. Please check your credentials."
        );
        return;
      }

      if (data) {
        toast.success("Login successful! Welcome back.");
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Google Login
  const handleGoogleLogin = async () => {
    if (loading || socialLoading) return;

    try {
      setSocialLoading("google");

      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (error) {
      console.error("Google login error:", error);
      toast.error("Unable to continue with Google. Please try again.");
      setSocialLoading("");
    }
  };

  // GitHub Login
  const handleGithubLogin = async () => {
    if (loading || socialLoading) return;

    try {
      setSocialLoading("github");

      await authClient.signIn.social({
        provider: "github",
        callbackURL: "/",
      });
    } catch (error) {
      console.error("GitHub login error:", error);
      toast.error("Unable to continue with GitHub. Please try again.");
      setSocialLoading("");
    }
  };

  const isDisabled = loading || !!socialLoading;

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#e0e7ff] via-[#f3e8ff] via-[#fce7f3] to-[#ffedd5] dark:bg-gradient-to-br dark:from-[#2d1b4e] dark:via-[#4a148c] dark:via-[#9c27b0] dark:via-[#e91e8c] dark:to-[#ff9800] flex items-center justify-center px-4 sm:px-6 py-10 transition-colors duration-300">

      <div className="w-full max-w-md bg-white dark:bg-white/10 backdrop-blur-xl dark:backdrop-blur-2xl border border-gray-200 dark:border-white/20 rounded-[2.5rem] p-6 sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.35)]">

        {/* Brand */}
        <div className="text-center mb-8">
          <img
            src="/images/logo.png"
            alt="SDEP Logo"
            className="mx-auto h-14 w-14 drop-shadow-[0_0_12px_rgba(0,0,0,0.2)] dark:drop-shadow-[0_0_12px_rgba(255,255,255,0.5)] mb-3"
          />

          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Welcome back
          </h1>

          <p className="text-gray-600 dark:text-white/70 mt-2">
            Sign in to organize and join community events
          </p>
        </div>

        {/* Email Login Form */}
        <form onSubmit={handleEmailLogin} className="space-y-5">

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700 dark:text-white/90 mb-2"
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-xl px-5 py-3.5 bg-white dark:bg-white/10 border border-gray-300 dark:border-white/20 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-white/40 focus:border-transparent transition-all"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-700 dark:text-white/90 mb-2"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full rounded-xl px-5 py-3.5 bg-white dark:bg-white/10 border border-gray-300 dark:border-white/20 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-white/40 focus:border-transparent transition-all"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isDisabled}
            className="block w-full text-center rounded-full bg-white text-purple-900 font-extrabold text-base py-3.5 shadow-lg hover:bg-gray-100 transition-all active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>

        </form>

        {/* Divider */}
        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-gray-300 dark:bg-white/20" />
          <span className="text-sm text-gray-500 dark:text-white/60">
            OR CONTINUE WITH
          </span>
          <div className="flex-1 h-px bg-gray-300 dark:bg-white/20" />
        </div>

        {/* Google Login */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={isDisabled}
          className="flex items-center justify-center gap-3 w-full rounded-full bg-white text-gray-800 border border-gray-300 font-bold text-base py-3.5 shadow-md hover:bg-gray-100 transition-all active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {/* Google Icon */}
          <svg viewBox="0 0 48 48" className="w-5 h-5" aria-hidden="true">
            <path
              fill="#EA4335"
              d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 3.03 13.22l7.98 6.19C12.9 13.72 18.06 9.5 24 9.5z"
              transform="translate(0 4)"
            />
            <path
              fill="#4285F4"
              d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.76 7.18l7.73 6C44.42 37.91 46.98 31.7 46.98 24.55z"
              transform="translate(0 0)"
            />
            <path
              fill="#FBBC05"
              d="M10.99 28.59A14.4 14.4 0 0 1 10.22 24c0-1.59.27-3.12.76-4.59L3 13.22A23.9 23.9 0 0 0 0 24c0 3.87.93 7.52 3 10.78l7.99-6.19z"
              transform="translate(0 4)"
            />
            <path
              fill="#34A853"
              d="M24 48c6.48 0 11.93-2.13 15.91-5.8l-7.73-6c-2.15 1.45-4.92 2.3-8.18 2.3-5.94 0-11.1-4.22-12.99-9.91L3 34.78C6.51 42.62 14.62 48 24 48z"
              transform="translate(0 -4)"
            />
          </svg>

          {socialLoading === "google"
            ? "Connecting to Google..."
            : "Continue with Google"}
        </button>


        {/* GitHub Login */}
        <button
          type="button"
          onClick={handleGithubLogin}
          disabled={isDisabled}
          className="flex items-center justify-center gap-3 w-full rounded-full bg-[#24292f] text-white font-bold text-base py-3.5 shadow-lg hover:bg-[#32383f] transition-all active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed mt-4"
        >
          <svg
            viewBox="0 0 24 24"
            className="w-5 h-5 fill-current"
            aria-hidden="true"
          >
            <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.53v-2.08c-3.1.67-3.75-1.32-3.75-1.32-.5-1.28-1.23-1.62-1.23-1.62-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15 1 .1.7 2.16 3.3 1.65.1-.72.4-1.2.72-1.48-2.48-.28-5.09-1.24-5.09-5.5 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.05 1.14a10.6 10.6 0 0 1 5.55 0c2.11-1.44 3.05-1.14 3.05-1.14.61 1.54.23 2.68.11 2.96.72.78 1.15 1.78 1.15 3 0 4.27-2.61 5.22-5.1 5.5.4.35.76 1.02.76 2.06V22c0 .29.2.64.77.53A11.1 11.1 0 0 0 12 .9Z" />
          </svg>

          {socialLoading === "github"
            ? "Connecting to GitHub..."
            : "Continue with GitHub"}
        </button>


        {/* Register Link */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 dark:text-white/70 text-sm">
            Don&apos;t have an account?{" "}
            <a
              href="/Register"
              className="text-amber-600 dark:text-amber-200 font-bold hover:text-amber-700 dark:hover:text-amber-100 hover:underline transition-colors"
            >
              Register Now
            </a>
          </p>
        </div>

      </div>
    </main>
  );
}
