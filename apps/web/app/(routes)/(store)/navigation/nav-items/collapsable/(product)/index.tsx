"use client";

import { FolderSimpleIcon } from "@phosphor-icons/react/FolderSimple";
import { PlusIcon } from "@phosphor-icons/react/Plus";
import { DotsThreeIcon } from "@phosphor-icons/react/DotsThree";
import { useEffect, useState, useRef } from "react";
import { url } from "../../../../../../../utils/url";
import styled, { keyframes } from "styled-components";
import { Input } from "@repo/ui/input";
import ProductTree from "../tree";
import { usePathname } from "next/navigation";

const pulse = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5px;
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
  margin-top: 5px;
`;

const ProductTreeWrapper = styled.div``;

export default function Product({ storeId }: { storeId: string }) {
  interface productNameType {
    name: string;
    id: string;
  }

  const inputRef = useRef<HTMLInputElement>(null);

  const [productNames, setProductNames] = useState<productNameType[] | null>(
    []
  );
  const [loading, setLoading] = useState(true);

  const arr = Array.from({ length: 8 }).map((_, i) => i);

  const [isAddingProduct, setIsAddingProduct] = useState(false);

  const [newProductName, setNewProductName] = useState("");

  const [openProductId, setOpenProductId] = useState<string | null>(null);

  const pathname = usePathname();

  const handleToggle = (id: string) => {
    setOpenProductId((prevId) => (prevId === id ? null : id));
  };

  useEffect(() => {
    const getProductName = async () => {
      const api = await fetch(`${url}/products/name/${storeId}`);

      const apiData = await api.json();
      setProductNames(apiData);

      setLoading(false);
    };

    getProductName();
  }, [storeId]);

  useEffect(() => {
    if (inputRef.current && isAddingProduct) {
      inputRef.current.focus();
    }
  }, [isAddingProduct]);

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
              <FolderSimpleIcon size={21} weight="duotone" />
              <form action={handleAddProduct}>
                <Input
                  onChange={(e) => {
                    e.preventDefault();
                    setNewProductName(e.target.value);
                  }}
                  ref={inputRef}
                />
              </form>
            </NewProductWrapper>
          ) : (
            ""
          )}
          {productNames?.map((product) => {
            const isThisProductActive = pathname.includes(
              `/${storeId}/${product.id}`
            );
            console.log(isThisProductActive);

            return (
              <ProductTreeWrapper key={product.id}>
                <ProductTree
                  active={isThisProductActive}
                  name={product.name}
                  icon={<FolderSimpleIcon size={21} weight="duotone" />}
                  id={product.id}
                  storeId={storeId}
                  dropDownContent={<p>{product.name}</p>}
                  isOpen={openProductId === product.id}
                  onToggle={() => handleToggle(product.id)}
                />
              </ProductTreeWrapper>
            );
          })}
        </>
      )}
    </Wrapper>
  );
}
