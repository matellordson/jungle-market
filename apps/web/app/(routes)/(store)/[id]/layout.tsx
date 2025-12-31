"use client";

import { use, useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { url } from "../../../../utils/url";
import { notFound, redirect } from "next/navigation";
import Navigation from "../navigation";

interface productType {
  id: string;
}

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
  const [productData, setProductData] = useState<productType[]>();
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
    } else {
      redirect("/connect-wallet");
    }
  }, [address]);

  // this product data is to enable active state for product list in nav items
  useEffect(() => {
    const getProducts = async () => {
      const api = await fetch(`${url}/products/name/${id}`);
      const apiData = await api.json();
      setProductData(apiData);
    };
    getProducts();
  }, [productData]);

  const productId = productData?.map((product) => {
    return product.id;
  });

  console.log(productId);

  return (
    <div>
      {!isLoading ? (
        <Navigation storeId={id} productsId={productId}>
          {children}
        </Navigation>
      ) : (
        "Loading..."
      )}
    </div>
  );
}
