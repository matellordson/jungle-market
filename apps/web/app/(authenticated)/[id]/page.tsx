"use client";

import { notFound } from "next/navigation";
import { use } from "react";
import { useAccount } from "wagmi";

export default function AddressPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { address } = useAccount();
  const { id } = use(params);
  if (id !== address) {
    notFound();
  }
  return null;
}
