"use client";

import { useRouter } from "next/navigation";

export default function NotaFound() {
  const router = useRouter();
  return (
    <div>
      <p>Page not found</p>
      <button onClick={() => router.back()}>GO back</button>
    </div>
  );
}
