"use client";

import { StarIcon } from "@phosphor-icons/react/Star";
import { UsdcSVG } from "../usdc";
import Image from "next/image";
import styled from "styled-components";
import { DotsThreeIcon } from "@phosphor-icons/react/dist/icons/DotsThree";
import Link from "next/link";

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

const Dropdown = styled.button`
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
  id: string;
  image_url: string;
  name: string;
  rating: number;
  category: string;
  price: number;
}

export function ProductCard({
  id,
  image_url,
  name,
  rating,
  category,
  price,
}: DataType) {
  return (
    <Card key={id}>
      <Link href={`/products/${id}`}>
        <Product>
          <Image src={image_url!} alt={name!} fill />
        </Product>
      </Link>

      <TopContentBox>
        <Dropdown>
          <DotsThreeIcon size={30} weight="bold" />
        </Dropdown>
      </TopContentBox>

      <BottomContentBox>
        <BottomContent>
          <Name>{name}</Name>

          <DetailBox>
            <Rating>
              <p className="title">Rating</p>
              <p className="value">
                <StarIcon size={13} weight="fill" />
                {rating}
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
        </BottomContent>
      </BottomContentBox>
    </Card>
  );
}
