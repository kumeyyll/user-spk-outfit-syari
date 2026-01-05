import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const id_warna = searchParams.get("id_warna");
  const id_bahan = searchParams.get("id_bahan");
  const id_gaya = searchParams.get("id_gaya");

  const STORAGE_URL =
    "https://fdazwileicpofehanhbd.supabase.co/storage/v1/object/public/outfit-images/";

  /* 1️⃣ FILTER OUTFIT + JOIN */
  const { data: outfits } = await supabase
    .from("outfit")
    .select(`
      id_outfit,
      nama_outfit,
      harga,
      link,
      gambar,
      warna:id_warna (nama_warna),
      bahan:id_bahan (nama_bahan),
      gaya:id_gaya (nama_gaya)
    `)
    .eq("id_warna", id_warna)
    .eq("id_bahan", id_bahan)
    .eq("id_gaya", id_gaya);

  if (!outfits || outfits.length === 0) {
    return NextResponse.json({ data: [] });
  }

  /* 2️⃣ KRITERIA */
  const { data: kriteria } = await supabase
    .from("kriteria")
    .select("*");

  /* 3️⃣ NILAI */
  const { data: nilai } = await supabase
    .from("nilai_outfit")
    .select("*");

  /* 4️⃣ PEMBAGI */
  const pembagi = {};
  kriteria.forEach(k => {
    const values = nilai
      .filter(n => n.id_kriteria === k.id_kriteria)
      .map(n => n.nilai);

    pembagi[k.id_kriteria] = {
      max: Math.max(...values),
      min: Math.min(...values),
      tipe: k.tipe,
      bobot: k.bobot,
      nama: k.nama_kriteria,
    };
  });

  /* 5️⃣ HITUNG SAW */
  const hasil = outfits.map(o => {
    let total = 0;
    const normalisasi = {};

    kriteria.forEach(k => {
      const n = nilai.find(
        x =>
          x.id_outfit === o.id_outfit &&
          x.id_kriteria === k.id_kriteria
      );

      if (!n) return;

      let nilaiNormalisasi = 0;
      if (k.tipe === "benefit") {
        nilaiNormalisasi = n.nilai / pembagi[k.id_kriteria].max;
      } else {
        nilaiNormalisasi = pembagi[k.id_kriteria].min / n.nilai;
      }

      let key = "";
      if (k.nama_kriteria === "Harga") key = "harga";
      if (k.nama_kriteria === "Kenyamanan") key = "kenyamanan";
      if (k.nama_kriteria === "Kesesuaian Acara") key = "kesesuaian";
      if (k.nama_kriteria === "Kualitas Bahan") key = "kualitas";

      normalisasi[key] = nilaiNormalisasi;
      total += nilaiNormalisasi * k.bobot;
    });

    return {
      id_outfit: o.id_outfit,
      nama_outfit: o.nama_outfit,
      harga: o.harga,
      warna: o.warna?.nama_warna,
      bahan: o.bahan?.nama_bahan,
      gaya: o.gaya?.nama_gaya,
      link: o.link,
      skor: total,
      normalisasi,
      gambar: o.gambar
        ? `${STORAGE_URL}${o.gambar}`
        : null,
    };
  });

  hasil.sort((a, b) => b.skor - a.skor);

  return NextResponse.json({ data: hasil });
}
