"use client";

import { use, useEffect, useState } from "react";
import { Header } from "./components/header";
import { url } from "../../../../../../../utils/url";

interface ParamsType {
  id: string;
  product_id: string;
}

interface storeType {
  id: string;
  name: string;
  owner: string;
  created_at: Date;
}

interface productType {
  id: string;
  name: string;
  metadata: [];
  created_at: Date;
  updated_at: Date;
  store_id: string;
  plugins: [];
}

export default function Public({ params }: { params: Promise<ParamsType> }) {
  const { id: store_id, product_id } = use(params);

  const [storeData, setStoreData] = useState<storeType>();
  const [productData, setProductData] = useState<productType>();

  const [storeDataLoading, setStoreDataLoading] = useState(true);
  const [productDataLoading, setProductDataLoading] = useState(true);

  useEffect(() => {
    const getStoreData = async () => {
      const dataApi = await fetch(`${url}/stores/${store_id}`);
      const data = await dataApi.json();
      setStoreData(data);
      setStoreDataLoading(false);
    };
    getStoreData();
  }, [store_id]);

  useEffect(() => {
    const getProductData = async () => {
      const dataApi = await fetch(`${url}/products/${product_id}`);
      const data = await dataApi.json();
      setProductData(data);
      setProductDataLoading(false);
    };
    getProductData();
    console.log(productData);
  }, [product_id]);

  return (
    <Header isLoading={productDataLoading} productName={productData?.name} />
  );
}
