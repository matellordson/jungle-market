"use client";

import { FolderSimpleIcon } from "@phosphor-icons/react/FolderSimple";
import { FolderPlusIcon } from "@phosphor-icons/react/FolderPlus";
import { FoldersIcon } from "@phosphor-icons/react/Folders";
import NavTree from "./tree";
import { useEffect, useState } from "react";
import { url } from "../../../../../../utils/url";
import styled, { keyframes } from "styled-components";

const pulse = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProductActionsWrapper = styled.div`
  padding: 3px 7px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  & p {
    font-size: 14px;
    color: var(--text-light);
    font-weight: 500;
  }

  & svg:hover {
    color: var(--text-dark);
    cursor: pointer;
  }
`;

const ProductActions = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Skeleton = styled.div`
  margin-bottom: 5px;
  height: 30px;
  width: 100%;
  border-radius: 10px;
  background-color: var(--highlight);
  animation: ${pulse} 1.4s ease-in-out infinite;
`;

export default function Product({
  active,
  href,
  storeId,
}: {
  active: boolean;
  href: string;
  storeId: string;
}) {
  interface productNameType {
    name: string;
  }

  const [productNames, setProductNames] = useState<productNameType[] | null>(
    []
  );
  const [loading, setLoading] = useState(true);

  const arr = Array.from({ length: 4 }).map((_, i) => i);

  const [isAddingProduct, setIsAddingProduct] = useState(false);

  // useEffect(() => {
  //   const getSubordinate = async () => {
  //     const api = await fetch(`${url}/product/${storeId}`);

  //     const apiData = await api.json();
  //     setSubordinateData(apiData);
  //   };

  //   getSubordinate();
  // }, [storeId]);

  useEffect(() => {
    const getProductName = async () => {
      const api = await fetch(`${url}/products/name/${storeId}`);

      const apiData = await api.json();
      setProductNames(apiData);

      setLoading(false);
    };

    getProductName();
  }, [storeId]);

  // const subordinateItems = [
  //   ...subordinateData.map((item) => ({
  //     icon: <FileIcon size={19} weight="duotone" />,
  //     name: item.name,
  //     href: `/${storeId}/product/${item.name}`,
  //   })),

  // ];

  return (
    <Wrapper>
      <ProductActionsWrapper>
        <p>Products</p>
        <ProductActions>
          <FolderPlusIcon
            onClick={() => {
              if (isAddingProduct) {
                setIsAddingProduct(false);
              } else {
                setIsAddingProduct(true);
              }
            }}
            size={20}
            weight="duotone"
          />
          <FoldersIcon size={20} weight="duotone" />
        </ProductActions>
      </ProductActionsWrapper>
      {loading ? (
        <>
          {arr.map((_, index) => (
            <Skeleton key={index}></Skeleton>
          ))}
        </>
      ) : (
        <>
          {isAddingProduct ? <p>add new product</p> : ""}
          {productNames?.map((product, index) => (
            <NavTree
              key={index}
              active={active}
              icon={<FolderSimpleIcon size={21} weight="duotone" />}
              name={product.name}
              // subordinate=
              href={href}
            />
          ))}
        </>
      )}
    </Wrapper>
  );
}
