"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Shirt } from "lucide-react";

interface Warna {
  id_warna: number;
  nama_warna: string;
}

interface Bahan {
  id_bahan: number;
  nama_bahan: string;
}

interface Gaya {
  id_gaya: number;
  nama_gaya: string;
}


export default function PilihTemaPage() {
  const router = useRouter();

  const [warna, setWarna] = useState("");
  const [bahan, setBahan] = useState("");
  const [gaya, setGaya] = useState("");

  const [listWarna, setListWarna] = useState<Warna[]>([]);
const [listBahan, setListBahan] = useState<Bahan[]>([]);
const [listGaya, setListGaya] = useState<Gaya[]>([]);

  useEffect(() => {
    fetch("/api/warna")
      .then((r) => r.json())
      .then((d) => setListWarna(d.data || []));

    fetch("/api/bahan")
      .then((r) => r.json())
      .then((d) => setListBahan(d.data || []));

    fetch("/api/gaya")
      .then((r) => r.json())
      .then((d) => setListGaya(d.data || []));
  }, []);

  const handleSubmit = () => {
    if (!warna || !bahan || !gaya) {
      alert("Silakan lengkapi semua pilihan");
      return;
    }

    router.push(
      `/hasil?id_warna=${warna}&id_bahan=${bahan}&id_gaya=${gaya}`
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">NyariGamis</span>
          </div>
          <Link href="/">
            <Button variant="outline" size="sm">Beranda</Button>
          </Link>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 py-16">
        <Card>
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <Shirt className="h-10 w-10 mx-auto text-primary mb-3" />
              <h1 className="text-3xl font-bold mb-2">
                Pilih Preferensi Gamis
              </h1>
              <p className="text-muted-foreground">
                Sesuaikan gamis dengan kebutuhan dan gayamu
              </p>
            </div>

            <div className="space-y-6">

              {/* WARNA */}
              <div>
                <label className="text-sm font-medium">Warna Gamis</label>
                <select
                  value={warna}
                  onChange={(e) => setWarna(e.target.value)}
                  className="w-full mt-2 rounded-md border px-3 py-2"
                >
                  <option value="">Pilih warna</option>
                  {listWarna.map((w) => (
                    <option key={w.id_warna} value={w.id_warna}>
                      {w.nama_warna}
                    </option>
                  ))}
                </select>
              </div>

              {/* BAHAN */}
              <div>
                <label className="text-sm font-medium">Bahan</label>
                <select
                  value={bahan}
                  onChange={(e) => setBahan(e.target.value)}
                  className="w-full mt-2 rounded-md border px-3 py-2"
                >
                  <option value="">Pilih bahan</option>
                  {listBahan.map((b) => (
                    <option key={b.id_bahan} value={b.id_bahan}>
                      {b.nama_bahan}
                    </option>
                  ))}
                </select>
              </div>

              {/* GAYA */}
              <div>
                <label className="text-sm font-medium">Gaya / Aktivitas</label>
                <select
                  value={gaya}
                  onChange={(e) => setGaya(e.target.value)}
                  className="w-full mt-2 rounded-md border px-3 py-2"
                >
                  <option value="">Pilih gaya</option>
                  {listGaya.map((g) => (
                    <option key={g.id_gaya} value={g.id_gaya}>
                      {g.nama_gaya}
                    </option>
                  ))}
                </select>
              </div>

              <Button
                className="w-full mt-6"
                size="lg"
                onClick={handleSubmit}
              >
                Lihat Rekomendasi
              </Button>

            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
