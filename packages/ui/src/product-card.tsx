"use client";

import { StarIcon } from "@phosphor-icons/react/Star";
import { UsdcSVG } from "../usdc";
import Image from "next/image";
import styled from "styled-components";
import { BookmarkSimpleIcon } from "@phosphor-icons/react/dist/icons/BookmarkSimple";
import { ShoppingBagIcon } from "@phosphor-icons/react/dist/icons/ShoppingBag";

const Card = styled.div`
  height: 400px;
  border: 1px solid var(--bg-front);
  border-radius: var(--sm-radius);
  position: relative;
  overflow: hidden;
`;

const Product = styled.div`
  & img {
    object-fit: cover;
    object-position: center;
    height: 70%;
  }
`;

const TopContentBox = styled.div`
  width: 100%;
  position: absolute;
  top: 0;
  display: flex;
  align-items: end;
  justify-content: right;
  padding: 5px;
  gap: 5px;
`;

const SaveProduct = styled.button`
  height: 30px;
  width: 30px;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-blur: var(--glass-blur);
  border: 1px solid var(--glass-border);
  opacity: 80%;
  color: var(--text-neutral);
  cursor: pointer;
`;

const CartProduct = styled.button`
  height: 30px;
  width: 30px;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border: 1px solid var(--glass-border);
  opacity: 80%;
  color: var(--text-neutral);
  cursor: pointer;
`;

const BottomContentBox = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
  display: flex;
  align-items: end;
  padding: 5px;
`;

const BottomContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  background-color: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border: 1px solid var(--glass-border);
  border-radius: 5px;
  padding: 10px;
`;

const Name = styled.p`
  font-size: 18px;
  font-weight: bolder;
  text-transform: capitalize;
`;

const ProducerBox = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const ProducerImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 25px;
  width: 25px;
  border-radius: 100%;
  border: 1px solid var(--bg-border);

  & img {
    object-fit: cover;
    border-radius: 100%;
  }
`;

const ProducerName = styled.div`
  font-size: 14px;
  color: var(--text-neutral);

  & span {
    text-transform: capitalize;
  }
`;

const DetailBox = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  text-align: center;

  & .title {
    color: var(--text-neutral);
    font-size: 13px;
    font-weight: bold;
  }

  & .value {
    text-transform: capitalize;
    padding-top: 3px;
    font-size: 13px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2px;
    font-weight: bold;
  }
`;

const Rating = styled.div`
  padding: 0 10px;
`;

const Category = styled.div`
  border-left: 1px solid var(--border-divide);
  border-right: 1px solid var(--border-divide);
  padding: 0 20px;
`;

const Price = styled.div`
  padding: 0 10px;
`;

interface DataType {
  id?: string;
  brand?: string;
  image_url?: string;
  brand_image_url?: string;
  name?: string;
  category?: string;
  price?: number;
}

export function ProductCard({
  id,
  brand,
  image_url,
  brand_image_url,
  name,
  category,
  price,
}: DataType) {
  return (
    <Card key={id}>
      <Product>
        <Image src={image_url!} alt={name!} fill />
      </Product>

      <TopContentBox>
        <SaveProduct>
          <BookmarkSimpleIcon size={20} weight="bold" />
        </SaveProduct>
        <CartProduct>
          <ShoppingBagIcon size={20} weight="bold" />
        </CartProduct>
      </TopContentBox>

      <BottomContentBox>
        <BottomContent>
          <Name>{name}</Name>

          <DetailBox>
            <Rating>
              <p className="title">Rating</p>
              <p className="value">
                <StarIcon size={13} weight="fill" />
                4.5
              </p>
            </Rating>
            <Category>
              <p className="title">Category</p>
              <p className="value">{category}</p>
            </Category>
            <Price>
              <p className="title">Price</p>
              <p className="value">
                <UsdcSVG height="17px" />
                {price}
              </p>
            </Price>
          </DetailBox>

          {/* <ProducerBox>
            <ProducerImage>
              <Image
                src={brand_image_url!}
                alt={brand!}
                height={25}
                width={25}
              />
            </ProducerImage>
            <ProducerName>
              by <span>{brand}</span>
            </ProducerName>
          </ProducerBox> */}
        </BottomContent>
      </BottomContentBox>
    </Card>
  );
}
