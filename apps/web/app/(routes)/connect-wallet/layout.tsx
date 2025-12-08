"use client";

import { useEffect, useState } from "react";
import { url } from "../../../utils/url";
import { useAccount } from "wagmi";
import { redirect } from "next/navigation";

export default function ConnectWalletLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { address } = useAccount();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (address) {
      const getAccount = async () => {
        const accountApi = await fetch(`${url}/accounts/${address}`);
        const accountData = await accountApi.json();

        // For Sellers
        const storeApi = await fetch(`${url}/stores/owner/${address}`);
        const storeData = await storeApi.json();

        if (address === accountData[0]?.address && storeData) {
          redirect(`${storeData.id}`);
        } else {
          setIsLoading(false);
        }
      };
      getAccount();
    } else {
      setIsLoading(false);
    }
  }, [address]);
  return <div>{!isLoading ? <div>{children}</div> : "Loading..."}</div>;
}
