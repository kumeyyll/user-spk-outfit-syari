"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Sparkles, ArrowLeft } from "lucide-react";

export default function AboutPage() {
  const router = useRouter();
  const [user, setUser] = useState<boolean>(false);

  // ✅ Cek apakah user sudah login (dari cookie)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const loggedIn = document.cookie.includes("user_token=loggedin");
      setUser(loggedIn);
    }
  }, []);

  // ✅ Tombol "Mulai Pilih Outfit"
  const handleMulai = () => {
    if (!user) {
      router.push("/user/login"); // kalau belum login diarahkan ke login user
    } else {
      router.push("/pilih-outfit"); // kalau sudah login lanjut ke pemilihan outfit
    }
  };

  // ✅ Tombol "Masuk"
  const handleMasuk = () => {
    router.push("/user/login"); // langsung ke login user
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FADADD] via-[#E8B4B8]/40 to-white font-[Poppins] text-[#5C3D3D]">
      {/* 🔹 Navigation Bar */}
      <nav className="border-b border-[#F3D7DB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Kiri */}
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="flex items-center gap-2 text-[#704B50] hover:text-[#8C4C58]"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="text-sm">Kembali</span>
              </Link>

              <div className="flex items-center gap-2">
                <Sparkles className="h-6 w-6 text-[#E8B4B8]" />
                <span className="text-xl font-bold text-[#5C3D3D]">
                  NyariOutfit
                </span>
              </div>
            </div>

            {/* Kanan */}
            <div className="flex items-center gap-6">
              <button
                onClick={handleMulai}
                className="hidden sm:inline-flex items-center gap-2 bg-gradient-to-r from-[#E8B4B8] to-[#FADADD] text-white px-4 py-2 rounded-full shadow-md hover:scale-[1.02] transition"
              >
                Mulai Pilih Outfit
              </button>

              <button
                onClick={handleMasuk}
                className="px-3 py-1.5 border border-[#E8B4B8] rounded-full text-sm hover:bg-[#FADADD]/50 transition"
              >
                Masuk
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* 🔹 Konten Utama */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
            Temukan Outfit Syar'i{" "}
            <span className="text-[#E8B4B8]">Terbaik</span> Untukmu
          </h1>
          <p className="text-lg text-[#6f5c5c] max-w-3xl mx-auto">
            NyariOutfit membantu muslimah menemukan outfit syar'i yang tepat
            sesuai preferensi. Sistem menggunakan metode SAW untuk rekomendasi
            yang terukur dan personal.
          </p>
        </div>
      </div>
    </div>
  );
}
