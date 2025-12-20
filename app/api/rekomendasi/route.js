import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "spk_outfit_syari",
});

const ADMIN_BASE_URL = "http://localhost:3001";


export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const warna = searchParams.get("warna");
  const bahan = searchParams.get("bahan");
  const gaya = searchParams.get("gaya");

  const conn = await pool.getConnection();

  // 1️⃣ FILTER OUTFIT
  const [outfits] = await conn.query(
    `SELECT * FROM outfit 
     WHERE warna = ? AND bahan = ? AND gaya = ?`,
    [warna, bahan, gaya]
  );

  if (outfits.length === 0) {
    conn.release();
    return NextResponse.json({ data: [] });
  }

  // 2️⃣ AMBIL KRITERIA
  const [kriteria] = await conn.query("SELECT * FROM kriteria");

  // 3️⃣ AMBIL NILAI OUTFIT
  const [nilai] = await conn.query(`
    SELECT * FROM nilai_outfit
  `);

  // 4️⃣ HITUNG MAX & MIN
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
    };
  });

  // 5️⃣ HITUNG SAW + SIMPAN NORMALISASI
const hasil = outfits.map(o => {
  let total = 0;
  const normalisasi = {};
  const perhitungan = {};

  kriteria.forEach(k => {
    const n = nilai.find(
      x => x.id_outfit === o.id_outfit && x.id_kriteria === k.id_kriteria
    );

    if (!n) return;

    let nilaiNormalisasi = 0;
    if (k.tipe === "benefit") {
      nilaiNormalisasi = n.nilai / pembagi[k.id_kriteria].max;
    } else {
      nilaiNormalisasi = pembagi[k.id_kriteria].min / n.nilai;
    }

    // normalisasi[k.nama_kriteria] = nilaiNormalisasi;
    // perhitungan[k.nama_kriteria] = nilaiNormalisasi * k.bobot;

    let key = "";

if (k.nama_kriteria === "Harga") key = "harga";
if (k.nama_kriteria === "Kenyamanan") key = "kenyamanan";
if (k.nama_kriteria === "Kesesuaian Acara") key = "kesesuaian";
if (k.nama_kriteria === "Kualitas Bahan") key = "kualitas";

normalisasi[key] = nilaiNormalisasi;
perhitungan[key] = nilaiNormalisasi * k.bobot;



    total += nilaiNormalisasi * k.bobot;
  });

  return {
  id_outfit: o.id_outfit,
  nama_outfit: o.nama_outfit,
  harga: o.harga,
  warna: o.warna,
  bahan: o.bahan,
  gaya: o.gaya,
  skor: total,
  normalisasi,
  perhitungan,
  gambar: o.gambar
    ? `${ADMIN_BASE_URL}/uploads/${o.gambar}`
    : null,
};

});


  // 6️⃣ RANKING
  hasil.sort((a, b) => b.skor - a.skor);

  conn.release();
  return NextResponse.json({ data: hasil });
}
