"use client";
import { authClient } from "../../lib/auth-client";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailLogin = async (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)
    const user = Object.fromEntries(formData.entries())

    console.log(user);

    const { data, error } = await authClient.signIn.email({
      ...user,
    })
    if (data) {
     
      alert(`Signing in with: ${email}`)
       redirect('/')
    }
    if (error) {
      console.log(error);

    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#2d1b4e] via-[#4a148c] via-[#9c27b0] via-[#e91e8c] to-[#ff9800] flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[2.5rem] p-10 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
        {/* Brand */}
        <div className="text-center mb-8">
          <img src="/images/logo.png" alt="SDEP Logo" className="mx-auto h-14 w-14 drop-shadow-[0_0_12px_rgba(255,255,255,0.5)] mb-3" />
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Welcome back</h1>
          <p className="text-white/70 mt-2">sign into organize and join community device </p>
        </div>

        <form
          onSubmit={handleEmailLogin}
          className="space-y-5"
        >
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-white/90 mb-2">
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
              className="w-full rounded-xl px-5 py-3.5 bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-transparent transition-all backdrop-blur-sm"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-white/90 mb-2">
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
              className="w-full rounded-xl px-5 py-3.5 bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-transparent transition-all backdrop-blur-sm"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="block w-full text-center rounded-full bg-white text-purple-900 font-extrabold text-base py-3.5 shadow-[0_8px_25px_rgba(255,255,255,0.3)] hover:bg-white/90 hover:shadow-[0_12px_35px_rgba(255,255,255,0.45)] transition-all active:scale-[0.98]"
          >
            Sign in
          </button>

          {/* Continue with Google */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              alert("Continuing with Google...");
            }}
            className="block w-full text-center rounded-full bg-[#4285F4] text-white font-extrabold text-base py-3.5 shadow-[0_8px_25px_rgba(66,133,244,0.4)] hover:bg-[#357ae8] hover:shadow-[0_12px_35px_rgba(66,133,244,0.55)] transition-all active:scale-[0.98] mt-4"
          >
            Continue with Google
          </a>
        </form>

        {/* Register link */}
        <div className="mt-6 text-center">
          <p className="text-white/70 text-sm">
            Don&apos;t have an account?{" "}
            <a href={"/Register"} className="text-amber-200 font-bold hover:text-amber-100 hover:underline transition-colors">
              Register Now
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
