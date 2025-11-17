"use client";

import { styled } from "styled-components";
import Tabs from "../blocks/tabs";
import { ArticleNyTimesIcon } from "@phosphor-icons/react/dist/icons/ArticleNyTimes";
import { ListBulletsIcon } from "@phosphor-icons/react/dist/icons/ListBullets";
import { StarIcon } from "@phosphor-icons/react/dist/icons/Star";

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
  height: 70%;
  width: 100%;
  background-color: var(--bg-front);
  border-radius: var(--sm-radius);
`;

const ProductInfo = styled.div`
  height: 30%;
  width: 100%;
  background-color: var(--bg-front);
  border-radius: var(--sm-radius);
  padding: var(--page-padding);
`;

const ProductName = styled.p`
  font-weight: var(--text-bold);
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

const productTab = [
  {
    key: "overview",
    name: "Overview",
    icon: <ArticleNyTimesIcon size={15} />,
    content: <p>overview</p>,
  },
  {
    key: "details",
    name: "Details",
    icon: <ListBulletsIcon size={15} />,
    content: <p>details</p>,
  },
  {
    key: "rating",
    name: "Rating",
    icon: <StarIcon size={15} />,
    content: <p>rating</p>,
  },
];

interface DataType {
  name: string;
}

export function ProductDetail({ name }: DataType) {
  return (
    <DetailBox>
      <ImageBox>
        <Gallery></Gallery>
        <ProductInfo>
          <ProductName>{name}</ProductName>
        </ProductInfo>
      </ImageBox>
      <TabBox>
        <Tabs tabsData={productTab} />
      </TabBox>
    </DetailBox>
  );
}
