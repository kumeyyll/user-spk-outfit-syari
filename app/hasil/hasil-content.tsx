"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Sparkles, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface Outfit {
  id_outfit: number;
  nama_outfit: string;
  harga: number;
  skor: number;
  gambar: string;
  link: string;
  normalisasi: {
    harga: number;
    kenyamanan: number;
    kesesuaian: number;
    kualitas: number;
  };
}

export default function HasilContent() {
  const params = useSearchParams();
  const [data, setData] = useState<Outfit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `/api/rekomendasi?warna=${params.get("warna")}&bahan=${params.get("bahan")}&gaya=${params.get("gaya")}`
      );
      const json = await res.json();
      setData(json.data || []);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/pilih-tema" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-4 w-4" />
                Kembali
              </Link>
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">NyariGamis</span>
          </div>
          <Link href="/">
            <Button variant="outline" size="sm">Beranda</Button>
          </Link>
          
        </div>
      </nav><br />
      <div className="max-w-5xl mx-auto">

        {/* JUDUL */}
        <h1 className="text-3xl font-bold text-center mb-4">
          🎉 Rekomendasi Gamis Terbaik
        </h1>

        <p className="text-center text-muted-foreground mb-10">
          Rekomendasi dihasilkan menggunakan metode{" "}<b>Simple Additive Weighting (SAW)</b> berdasarkan kriteria Harga, Kenyamanan, Kesesuaian Acara, dan Kualitas Bahan.
        </p>

        {/* LOADING */}
        {loading && (
          <p className="text-center text-muted-foreground">
            Memuat rekomendasi...
          </p>
        )}

        {/* TIDAK ADA DATA */}
        {!loading && data.length === 0 && (
          <p className="text-center text-muted-foreground">
            <b><i>Gamis dengan kombinasi tersebut belum tersedia.  
            Silakan pilih warna, bahan, atau gaya lain.</i></b>
          </p>
        )}

        {/* ================= CARD OUTFIT ================= */}
        <div className="space-y-6 mb-14">
          {data.map((o, i) => (
            <Card key={o.id_outfit}>
              <CardContent className="p-6 flex gap-6">
                <img
                  src={o.gambar}
                  alt={o.nama_outfit}
                  className="w-32 h-40 object-cover rounded-md"
                />

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    {i === 0 && <Trophy className="text-yellow-500" />}
                    <h2 className="text-xl font-semibold">
                      {o.nama_outfit}
                    </h2>
                  </div>

                  <p className="text-sm text-muted-foreground">
                    Harga: Rp {o.harga.toLocaleString("id-ID")}
                  </p>
                  <p className="text-sm">
                    Skor SAW: <b>{o.skor.toFixed(3)}</b>
                  </p>
                  <p className="text-sm">
                    Ranking: <b>{i + 1}</b>
                  </p>
                  {/* TOMBOL LIHAT TOKO */}
          {o.link && (
            <a
              href={o.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <Button size="sm" className="flex items-center gap-2">
                🛍️ Lihat Toko
              </Button>
            </a>
          )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* ================= TABEL NORMALISASI ================= */}
        {data.length > 0 && (
          <div className="mb-14">
            <h2 className="text-xl font-semibold mb-4">
              Tabel Normalisasi (R)
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full border text-sm">
                <thead className="bg-muted">
                  <tr>
                    <th className="border px-3 py-2">Outfit</th>
                    <th className="border px-3 py-2">Harga</th>
                    <th className="border px-3 py-2">Kenyamanan</th>
                    <th className="border px-3 py-2">Kesesuaian</th>
                    <th className="border px-3 py-2">Kualitas</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((o) => (
                    <tr key={o.id_outfit}>
                      <td className="border px-3 py-2">
                        {o.nama_outfit}
                      </td>
                      <td className="border px-3 py-2 text-center">
                        {o.normalisasi.harga.toFixed(3)}
                      </td>
                      <td className="border px-3 py-2 text-center">
                        {o.normalisasi.kenyamanan.toFixed(3)}
                      </td>
                      <td className="border px-3 py-2 text-center">
                        {o.normalisasi.kesesuaian.toFixed(3)}
                      </td>
                      <td className="border px-3 py-2 text-center">
                        {o.normalisasi.kualitas.toFixed(3)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ================= TABEL SAW ================= */}
        {data.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">
              Tabel Nilai Preferensi (SAW)
            </h2>

            <table className="w-full border text-sm">
              <thead className="bg-muted">
                <tr>
                  <th className="border px-3 py-2">Outfit</th>
                  <th className="border px-3 py-2">Skor SAW</th>
                  <th className="border px-3 py-2">Ranking</th>
                </tr>
              </thead>
              <tbody>
                {data
                  .sort((a, b) => b.skor - a.skor)
                  .map((o, i) => (
                    <tr key={o.id_outfit}>
                      <td className="border px-3 py-2">
                        {o.nama_outfit}
                      </td>
                      <td className="border px-3 py-2 text-center">
                        {o.skor.toFixed(3)}
                      </td>
                      <td className="border px-3 py-2 text-center">
                        {i + 1}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  );
}