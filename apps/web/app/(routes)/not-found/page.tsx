"use client";

import { useRouter } from "next/navigation";

export default function NotaFound() {
  const router = useRouter();
  return (
    <div>
      <p>There was a problem providing this page</p>
      <button onClick={() => router.back()}>GO back</button>
    </div>
  );
}
