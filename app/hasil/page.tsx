"use client";

export const dynamic = "force-dynamic";

import { Suspense } from "react";
import HasilContent from "./hasil-content";

export default function HasilPage() {
  return (
    <Suspense fallback={<p className="text-center">Memuat rekomendasi...</p>}>
      <HasilContent />
    </Suspense>
  );
}
