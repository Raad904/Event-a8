"use client";

import { authClient,signIn } from "../../lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailLogin = async (e) => {
    e.preventDefault();

    if (loading) return;

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
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });

    } catch (error) {
      console.error("Google login error:", error);

      toast.error("Unable to continue with Google. Please try again.");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#e0e7ff] via-[#f3e8ff] via-[#fce7f3] to-[#ffedd5] dark:bg-gradient-to-br dark:from-[#2d1b4e] dark:via-[#4a148c] dark:via-[#9c27b0] dark:via-[#e91e8c] dark:to-[#ff9800] flex items-center justify-center px-6 transition-colors duration-300">
      <div className="w-full max-w-md bg-white dark:bg-white/10 backdrop-blur-xl dark:backdrop-blur-2xl border border-gray-200 dark:border-white/20 rounded-[2.5rem] p-10 shadow-[0_20px_60px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.35)]">

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
            sign into organize and join community device
          </p>
        </div>

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
              className="w-full rounded-xl px-5 py-3.5 bg-white dark:bg-white/10 border border-gray-300 dark:border-white/20 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-white/40 focus:border-transparent transition-all backdrop-blur-sm dark:backdrop-blur-sm"
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
              className="w-full rounded-xl px-5 py-3.5 bg-white dark:bg-white/10 border border-gray-300 dark:border-white/20 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-white/40 focus:border-transparent transition-all backdrop-blur-sm dark:backdrop-blur-sm"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="block w-full text-center rounded-full bg-white text-purple-900 dark:bg-white dark:text-purple-900 font-extrabold text-base py-3.5 shadow-[0_8px_25px_rgba(0,0,0,0.15)] dark:shadow-[0_8px_25px_rgba(255,255,255,0.3)] hover:bg-gray-100 dark:hover:bg-white/90 hover:shadow-[0_12px_35px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_12px_35px_rgba(255,255,255,0.45)] transition-all active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>

          {/* Continue with Google */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="block w-full text-center rounded-full bg-[#4285F4] text-white font-extrabold text-base py-3.5 shadow-[0_8px_25px_rgba(66,133,244,0.4)] hover:bg-[#357ae8] hover:shadow-[0_12px_35px_rgba(66,133,244,0.55)] transition-all active:scale-[0.98] mt-4"
          >
            Continue with Google
          </button>

        </form>

        {/* Register link */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 dark:text-white/70 text-sm">
            Don&apos;t have an account?{" "}
            <a
              href={"/Register"}
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