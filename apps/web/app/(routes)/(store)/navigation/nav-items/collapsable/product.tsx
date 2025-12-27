"use client";

import { FolderSimpleIcon } from "@phosphor-icons/react/FolderSimple";
import { PlusIcon } from "@phosphor-icons/react/Plus";
import { DotsThreeIcon } from "@phosphor-icons/react/DotsThree";
import { FolderSimplePlusIcon } from "@phosphor-icons/react/FolderSimplePlus";
import NavTree from "./tree";
import { useEffect, useState } from "react";
import { url } from "../../../../../../utils/url";
import styled, { keyframes } from "styled-components";
import { Input } from "@repo/ui/input";

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
  border-radius: 10px;
  padding: 5px 7px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;

  & p {
    font-size: 15px;
    color: var(--text-light);
    font-weight: 500;
  }

  & svg {
    cursor: pointer;
  }

  & svg:hover {
    color: var(--text-dark);
  }

  &:hover {
    background-color: var(--highlight);
  }

  &:hover .actions {
    visibility: visible;
  }
`;

const ProductActions = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
  visibility: hidden;
`;

const Skeleton = styled.div`
  margin-bottom: 5px;
  height: 30px;
  width: 100%;
  border-radius: 10px;
  background-color: var(--highlight);
  animation: ${pulse} 1.4s ease-in-out infinite;
`;

const NewProductWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  padding-left: 5px;
  margin-bottom: 3px;
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

  const [newProductName, setNewProductName] = useState("");

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

  const handleAddProduct = async () => {
    const values = {
      name: newProductName,
      store_id: storeId,
    };
    await fetch(`${url}/products/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    setIsAddingProduct(false);
  };

  return (
    <Wrapper>
      <ProductActionsWrapper>
        <p>Products</p>
        <ProductActions className="actions">
          <DotsThreeIcon size={20} weight="bold" />
          <PlusIcon
            onClick={() => {
              if (isAddingProduct) {
                setIsAddingProduct(false);
              } else {
                setIsAddingProduct(true);
              }
            }}
            size={15}
            weight="bold"
          />
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
          {isAddingProduct ? (
            <NewProductWrapper>
              <FolderSimplePlusIcon size={21} weight="duotone" />
              <form action={handleAddProduct}>
                <Input
                  onChange={(e) => {
                    e.preventDefault();
                    setNewProductName(e.target.value);
                  }}
                />
              </form>
            </NewProductWrapper>
          ) : (
            ""
          )}
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
