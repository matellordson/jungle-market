"use client";

import { styled } from "styled-components";
import Tabs from "../blocks/tabs";
import { ArticleNyTimesIcon } from "@phosphor-icons/react/dist/icons/ArticleNyTimes";
import { ListBulletsIcon } from "@phosphor-icons/react/dist/icons/ListBullets";
import { StarIcon } from "@phosphor-icons/react/dist/icons/Star";
import { UsdcSVG } from "../../usdc";

const DetailBox = styled.div`
  height: 100vh;
  width: 100%;
  padding: var(--page-padding);
  display: flex;
  flex-direction: column;
  gap: 5px;

  @media only screen and (min-width: 992px) {
    & {
      flex-direction: row;
    }
  }
`;

const ImageBox = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;

  @media only screen and (min-width: 992px) {
    & {
      width: 50%;
    }
  }
`;

const Gallery = styled.div`
  height: 80%; //could change for dynamism
  width: 100%;
  background-color: var(--bg-front);
  border-radius: var(--sm-radius);
  border: 1px solid var(--bg-border);
`;

const ProductInfo = styled.div`
  width: 100%;
  background-color: var(--bg-front);
  border-radius: var(--sm-radius);
  border: 1px solid var(--bg-border);
  padding: var(--page-padding);
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const ProductName = styled.p`
  font-weight: var(--text-bold);
  font-size: 20px;
`;

const TabBox = styled.div`
  height: 100%;
  width: 100%;

  @media only screen and (min-width: 992px) {
    & {
      flex-direction: row;
      width: 50%;
    }
  }
`;

const ProducerBox = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const ProducerImage = styled.div`
  height: 30px;
  width: 30px;
  background-color: var(--bg-highlight);
  border: 1px solid var(--bg-border);
  border-radius: 100%;
`;

const ProducerName = styled.p`
  color: var(--text-light);
  font-size: 15px;
`;

const Category = styled.div`
  color: var(--text-light);
  margin-bottom: 5px;
  font-size: 14px;
`;

const Price = styled.div`
  font-weight: var(--text-bold);
  margin-top: 15px;
  font-size: 25px;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const productTab = [
  {
    key: "overview",
    name: "Overview",
    content: <p>overview</p>,
  },
  {
    key: "details",
    name: "Details",
    content: <p>details</p>,
  },
  {
    key: "rating",
    name: "Rating",
    content: <p>rating</p>,
  },
];

interface DataType {
  name: string;
  rating: string;
  category: string;
  price: number;
}

export function ProductDetail({ name, rating, category, price }: DataType) {
  return (
    <DetailBox>
      <ImageBox>
        <Gallery></Gallery>
        <ProductInfo>
          <ProductName>{name}</ProductName>
          <Category>{category}</Category>
          <ProducerBox>
            <ProducerImage></ProducerImage>
            <ProducerName>by Producer</ProducerName>
          </ProducerBox>
          <Price>
            <UsdcSVG height="35px" />
            {price}
          </Price>
        </ProductInfo>
      </ImageBox>
      <TabBox>
        <Tabs tabsData={productTab} />
      </TabBox>
    </DetailBox>
  );
}
