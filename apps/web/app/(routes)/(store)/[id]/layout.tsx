"use client";

import { use, useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { url } from "../../../../utils/url";
import { notFound, redirect } from "next/navigation";
import Navigation from "../navigation";

export default function StoreLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { address } = useAccount();
  const [storeData, setStoreData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (address) {
      const getStoreId = async () => {
        const storeId = await fetch(`${url}/stores/${id}`);
        const storeData = await storeId.json();
        if (!storeData || address !== storeData.owner) {
          redirect("/not-found");
        } else {
          setStoreData(storeData);
          setIsLoading(false);
        }
      };
      getStoreId();
    }
    // else {
    //   redirect("/not-found");
    // }
  }, [address]);
  return (
    <div>
      {!isLoading ? (
        <Navigation storeId={id}>{children}</Navigation>
      ) : (
        "Loading..."
      )}
    </div>
  );
}
