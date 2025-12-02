"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAccount } from "wagmi";
import { url } from "../../../../utils/url";

export default function OwnerCheck({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { address } = useAccount();

  useEffect(() => {
    if (id) {
      const checkId = async () => {
        try {
          await fetch(`${url}/stores/${id}`);
          if (address) {
            const checkAccountIsOwner = async () => {
              const res = await fetch(`${url}/stores/${id}`);
              const data = await res.json();
              if (address !== data.owner) {
                router.push("/404");
              }
            };
            checkAccountIsOwner();
          } else {
            router.push("/404");
          }
        } catch {
          router.push("/404");
        }
      };
      checkId();
    }
    if (address) {
      const checkAccountIsOwner = async () => {
        const res = await fetch(`${url}/stores/${id}`);
        const data = await res.json();
        if (address !== data.owner) {
          router.push("/404");
        }
      };
      checkAccountIsOwner();
    } else {
      router.push("/404");
    }
  }, [address, id, router]);

  return <div>{children}</div>;
}
