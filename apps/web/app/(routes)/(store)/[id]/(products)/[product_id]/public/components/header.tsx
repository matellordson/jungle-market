"use client";

import { useState } from "react";
import styled, { keyframes } from "styled-components";
import { ImageIcon } from "@phosphor-icons/react/dist/icons/Image";
import { InfoIcon } from "@phosphor-icons/react/dist/icons/Info";

const pulse = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const CoverPhotoWrapper = styled.div`
  padding: 10px;
`;

const CoverPhotoPlaceholder = styled.div`
  height: fit-content;
  width: fit-content;
  display: flex;
  align-items: end;
  padding: 3px 5px;
  border-radius: 5px;
  font-size: 15px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;

  &:hover {
    background-color: var(--highlight);
  }
`;

const CoverPhoto = styled.div`
  height: 150px;
  width: 100%;
  background-color: var(--highlight);

  @media only screen and (min-width: 992px) {
    height: 250px;
  }
`;

const ProductName = styled.p`
  color: var(--text-dark);
  font-size: 20px;
  font-weight: bold;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 20px;

  @media only screen and (min-width: 992px) {
    font-size: 30px;
  }
`;

const Description = styled.div`
  font-size: 15px;
  line-height: 1.6;
  max-width: 70ch;
`;

const DescriptionWrapper = styled.div`
  padding: 0px 10px;
`;

const DescriptionPlaceholder = styled.div`
  height: fit-content;
  width: fit-content;
  display: flex;
  align-items: end;
  padding: 3px 5px;
  border-radius: 5px;
  font-size: 15px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;

  &:hover {
    background-color: var(--highlight);
  }
`;

const ProductNameSkeleton = styled.div`
  margin-bottom: 5px;
  height: 35px;
  width: 250px;
  border-radius: 5px;
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 10px;
  margin-bottom: 0;
  background-color: var(--highlight);
  animation: ${pulse} 1.4s ease-in-out infinite;

  @media only screen and (min-width: 992px) {
    height: 45px;
  }
`;

export function Header({
  productName,
  isLoading,
}: {
  productName: string | undefined;
  isLoading: boolean;
}) {
  const [coverPhoto, setCoverPhoto] = useState(false);
  const [description, setDescription] = useState(false);

  return (
    <Wrapper>
      <CoverPhotoWrapper>
        {coverPhoto ? (
          <CoverPhoto></CoverPhoto>
        ) : (
          <CoverPhotoPlaceholder>
            <ImageIcon size={18} weight="duotone" />
            Add cover
          </CoverPhotoPlaceholder>
        )}
      </CoverPhotoWrapper>

      {isLoading ? (
        <ProductNameSkeleton />
      ) : (
        <ProductName>{productName}</ProductName>
      )}

      <DescriptionWrapper>
        {description ? (
          <Description>{description}</Description>
        ) : (
          <DescriptionPlaceholder>
            <InfoIcon size={18} weight="duotone" />
            Add description
          </DescriptionPlaceholder>
        )}
      </DescriptionWrapper>
    </Wrapper>
  );
}
