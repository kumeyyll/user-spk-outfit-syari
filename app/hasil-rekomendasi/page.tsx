"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"

export default function HasilRekomendasi() {
  const params = useSearchParams()
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `/api/rekomendasi?bahan=${params.get("bahan")}&warna=${params.get("warna")}&acara=${params.get("acara")}`
      )
      const json = await res.json()
      setData(json.data)
    }
    fetchData()
  }, [])

  return (
    <div className="min-h-screen px-6 py-10 bg-background">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Hasil Rekomendasi Gamis
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        {data.map((o, i) => (
          <Card key={o.id_outfit}>
            <CardContent className="p-6">
              <h2 className="font-bold text-xl mb-2">
                Rank #{i + 1}
              </h2>
              <p><b>Nama:</b> {o.nama_outfit}</p>
              <p><b>Bahan:</b> {o.bahan}</p>
              <p><b>Warna:</b> {o.warna}</p>
              <p><b>Skor:</b> {o.skor.toFixed(3)}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
