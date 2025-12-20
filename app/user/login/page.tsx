"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function UserLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulasi login sederhana (ganti dengan backend nanti)
    if (email === "user@example.com" && password === "123456") {
      document.cookie = "user_token=loggedin; path=/;";
      router.push("/user/dashboard");
    } else {
      setError("Email atau password salah!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#FADADD] via-[#E8B4B8] to-white text-[#5a3d3a]">
      <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-lg w-[400px]">
        <h1 className="text-2xl font-semibold text-center mb-6">Login User 👗</h1>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="border border-[#E8B4B8] p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E8B4B8]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="border border-[#E8B4B8] p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E8B4B8]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            className="bg-[#E8B4B8] hover:bg-[#FADADD] text-white py-2 rounded-lg font-medium"
          >
            Masuk
          </button>
        </form>
      </div>
    </div>
  );
}
