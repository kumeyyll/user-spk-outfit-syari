"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Shirt } from "lucide-react";

export default function PilihTemaPage() {
  const router = useRouter();

  const [warna, setWarna] = useState("");
  const [bahan, setBahan] = useState("");
  const [gaya, setGaya] = useState("");

  const handleSubmit = () => {
    router.push(
      `/hasil?warna=${warna}&bahan=${bahan}&gaya=${gaya}`
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">NyariOutfit</span>
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
                Pilih Preferensi Outfit
              </h1>
              <p className="text-muted-foreground">
                Sesuaikan outfit syar’i dengan kebutuhan dan gayamu
              </p>
            </div>

            <div className="space-y-6">
              {/* Warna */}
              <div>
                <label className="text-sm font-medium">Warna Outfit</label>
                <select
                  value={warna}
                  onChange={(e) => setWarna(e.target.value)}
                  className="w-full mt-2 rounded-md border border-border bg-background px-3 py-2"
                >
                  <option value="">Pilih warna</option>
                  <option value="Hijau">Hijau</option>
                  <option value="Hitam">Hitam</option>
                  <option value="Pink">Pink</option>
                  <option value="Orange">Orange</option>
                  <option value="Coklat">Coklat</option>
                  <option value="Maroon">Maroon</option>
                  <option value="Putih">Putih</option>
                  <option value="Navy">Navy</option>
                  <option value="Biru">Biru</option>
                  <option value="Abu-abu">Abu-abu</option>
                  <option value="Ungu">Ungu</option>
                  <option value="Cream">Cream</option>
                </select>
              </div>

              {/* Bahan */}
              <div>
                <label className="text-sm font-medium">Bahan</label>
                <select
                  value={bahan}
                  onChange={(e) => setBahan(e.target.value)}
                  className="w-full mt-2 rounded-md border border-border bg-background px-3 py-2"
                >
                  <option value="">Pilih bahan</option>
                  <option value="Katun">Katun</option>
                  <option value="Rayon">Rayon</option>
                  <option value="Silk">Silk</option>
                  <option value="Ceruty">Ceruty</option>
                  <option value="Polyester">Polyester</option>
                </select>
              </div>

              {/* Gaya */}
              <div>
                <label className="text-sm font-medium">Gaya / Aktivitas</label>
                <select
                  value={gaya}
                  onChange={(e) => setGaya(e.target.value)}
                  className="w-full mt-2 rounded-md border border-border bg-background px-3 py-2"
                >
                  <option value="">Pilih gaya</option>
                  <option value="Formal">Formal</option>
                  <option value="Pesta">Pesta</option>
                  <option value="Daily">Daily</option>
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
