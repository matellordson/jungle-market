"use client";

import styled from "styled-components";
import { StarIcon } from "@phosphor-icons/react/Star";
import { UsdcSVG } from "../usdc";

const CardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 3px;

  @media only screen and (min-width: 992px) {
    & {
      grid-template-columns: repeat(4, 1fr);
    }
  }
`;

const Card = styled.div`
  height: 300px;
  width: 100%;
  border-radius: var(--sm-radius);
  background-color: var(--bg-front);
  position: relative;
  overflow: hidden;
  box-shadow: var(--sm-shadow);
  border: 1px solid var(--bg-border);
`;

const Brand = styled.div`
  height: 20px;
  width: 20px;
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
    height: 20px;
    width: 20px;
    border-radius: 100%;
    object-fit: cover;
    object-position: center;
  }
`;

const Image = styled.div`
  height: 100%;
  width: 100%;
  background-color: var(--foreground);

  & img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    object-position: center;
    filter: brightness(90%);
  }
`;

const ContentBlur = styled.div`
  position: absolute;
  bottom: 0;
  height: 80px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  filter: blur(30px);
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
  font-size: 13px;
  font-weight: var(--text-bold);
  text-shadow: var(--xl-shadow);
  text-transform: capitalize;
`;

const Category = styled.p`
  font-size: 9px;
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
  font-size: 9px;
  border-radius: var(--lg-radius);
  box-shadow: 0 5px 15px hsla(0, 0%, 0%, 0.2);
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
  box-shadow: 0 5px 15px hsla(0, 0%, 0%, 0.2);
  font-size: 15px;
  font-weight: var(--text-bold);
  border-radius: var(--lg-radius);
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3px;

  & span {
    font-size: 8px;
  }
`;

interface DataType {
  id?: string;
  brand: string;
  image_url: string;
  name: string;
  category: string;
  price: number;
}

export function ProductCard({
  id,
  brand,
  image_url,
  name,
  category,
  price,
}: DataType) {
  return (
    <CardWrapper>
      <Card key={id}>
        <Brand>
          <img src="../img/addidas-logo.png" alt={brand} />
        </Brand>
        <Image>
          <img src={image_url} alt={name} />
        </Image>
        <ContentBlur />
        <ContentWrapper>
          <Name>{name}</Name>
          <Category>{category}</Category>
          <RateAndPriceWrapper>
            <Rating>
              <StarIcon size={10} weight="fill" />
              4.2
            </Rating>
            <Price>
              <UsdcSVG height="16px" />
              {price}
            </Price>
          </RateAndPriceWrapper>
        </ContentWrapper>
      </Card>
    </CardWrapper>
  );
}
