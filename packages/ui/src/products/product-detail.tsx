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
  height: 70%;
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

  @media only screen and (min-width: 992px) {
    height: 30%;
  }
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

const InfoTable = styled.div`
  margin-top: 5px;
  width: 100%;
  border-radius: var(--sm-radius);
  border: 1px solid var(--bg-border);
  background-color: var(--bg-highlight);
  padding: var(--page-padding);

  @media only screen and (min-width: 992px) {
    height: 100px;
  }
`;

const Info = styled.div`
  height: 100%;
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

  @media only screen and (min-width: 992px) {
    & .title {
      font-size: 17px;
    }

    & .value {
      font-size: 20px;
      display: flex;
      align-items: center;
      gap: 7px;
    }

    & .value svg {
      scale: 1.4;
    }
  }
`;

const Rating = styled.div`
  padding: 0 10px;
`;

const Category = styled.div`
  border-left: 1px solid var(--border-divide);
  border-right: 1px solid var(--border-divide);
  padding: 0 40px;
`;

const Price = styled.div`
  padding: 0 10px;
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
          <ProducerBox>
            <ProducerImage></ProducerImage>
            <ProducerName>by Producer</ProducerName>
          </ProducerBox>
          <InfoTable>
            <Info>
              <Rating>
                <p className="title">Rating</p>
                <p className="value">
                  <StarIcon size={14} weight="fill" />
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
            </Info>
          </InfoTable>
        </ProductInfo>
      </ImageBox>
      <TabBox>
        <Tabs tabsData={productTab} />
      </TabBox>
    </DetailBox>
  );
}
