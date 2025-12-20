"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function UserDashboard() {
  const router = useRouter();

  useEffect(() => {
    const cookie = document.cookie.includes("user_token=ok");
    if (!cookie) {
      router.push("/user/login");
    }
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-pink-50">
      <h1 className="text-3xl font-bold text-pink-600 mb-4">
        Selamat Datang di Dashboard User 💕
      </h1>
      <button
        onClick={() => {
          document.cookie = "user_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
          router.push("/user/login");
        }}
        className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-md"
      >
        Logout
      </button>
    </div>
  );
}
