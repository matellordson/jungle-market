"use client";

import styled from "styled-components";
import { StarIcon } from "@phosphor-icons/react/Star";
import { UsdcSVG } from "../usdc";
import Image from "next/image";

const Card = styled.div`
  height: 300px;
  width: 100%;
  border-radius: var(--sm-radius);
  background-color: var(--bg-front);
  position: relative;
  overflow: hidden;
  border: 1px solid var(--bg-border);
`;

const Brand = styled.div`
  height: 30px;
  width: 30px;
  border-radius: 100%;
  border: 3px solid var(--foreground);
  box-shadow: var(--sm-shadow);
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 5px;
  right: 8px;

  & > img {
    border-radius: 100%;
    object-fit: cover;
    object-position: center;
  }
`;

const Images = styled.div`
  height: 300px;
  width: 100%;
  /* background-color: var(--foreground); */

  & img {
    height: 300%;
    width: 100%;
    @media (prefers-color-scheme: dark) {
      filter: brightness(90%);
    }
  }
`;

const ContentBlur = styled.div`
  position: absolute;
  bottom: 0;
  height: 90px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  filter: blur(20px);
  -webkit-filter: blur(20px);
`;

const ContentWrapper = styled.div`
  position: absolute;
  bottom: 0;
  height: fit-content;
  width: 100%;
  background-color: transparent;
  padding: 5px 10px;
`;

const Name = styled.p`
  color: #ffffff;
  font-size: 17px;
  font-weight: bold;
  text-shadow: var(--xl-shadow);
  text-transform: capitalize;
`;

const Category = styled.p`
  font-size: 12px;
  color: #ece7e7;
  text-shadow: var(--xl-shadow);
  text-transform: capitalize;
`;

const RateAndPriceWrapper = styled.div`
  margin-top: 13px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Rating = styled.div`
  width: fit-content;
  padding: 2px 5px;
  background-color: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border: var(--glass-border);
  font-size: 15px;
  border-radius: var(--lg-radius);
  box-shadow: 0 4px 6px hsla(0, 0%, 0%, 0.2);
  color: #ffffff;
  font-weight: var(--text-bold);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
`;

const Price = styled.div`
  width: fit-content;
  padding: 2px 5px;
  background-color: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border: var(--glass-border);
  box-shadow: 0 4px 6px hsla(0, 0%, 0%, 0.2);
  font-size: 20px;
  font-weight: var(--text-bold);
  border-radius: var(--lg-radius);
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3px;
`;

interface DataType {
  id?: string;
  brand: string;
  image_url: string;
  brand_image_url: string;
  name: string;
  category: string;
  price: number;
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
      <Images>
        <Image src={image_url} alt={name} fill style={{ objectFit: "cover" }} />
      </Images>
      <Brand>
        <Image src={brand_image_url} alt={brand} fill />
      </Brand>
      <ContentBlur />
      <ContentWrapper>
        <Name>{name}</Name>
        <Category>{category}</Category>
        <RateAndPriceWrapper>
          <Rating>
            <StarIcon size={15} weight="fill" />
            4.2
          </Rating>
          <Price>
            <UsdcSVG height="21px" />
            {price}
          </Price>
        </RateAndPriceWrapper>
      </ContentWrapper>
    </Card>
  );
}
