"use client";

import styled from "styled-components";
import { CaretDownIcon } from "@phosphor-icons/react/dist/icons/CaretDown";
import { CaretUpIcon } from "@phosphor-icons/react/dist/icons/CaretUp";
import { useState } from "react";
import { CreateStore } from "../../seller/create-store";

const StoreWrapper = styled.div`
  padding: var(--padding);
  border-radius: var(--radius);
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    transition: all 0.4s ease;
    background-color: var(--bg-highlight);
  }
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const ProfilePhoto = styled.div`
  height: 20px;
  width: 20px;
  border-radius: 5px;
  background-color: red;
  /* border: 1px solid var(--bg-border); */
`;

const Name = styled.p`
  font-size: 13px;
  font-weight: var(--text-bold);
`;

const Icons = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  svg {
    color: var(--text-icon);
  }
`;

const DropdownWrapper = styled.div`
  display: none;
  width: 220px;
  background-color: var(--bg-highlight);
  border: 1px solid var(--bg-border);
  border-radius: var(--radius);
  box-shadow: var(--sm-shadow);
  padding: var(--padding);

  &.open {
    display: block;
  }
`;

const OtherStores = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const OtherStoresProfile = styled(Profile)`
  cursor: pointer;
  transition: all 0.4s ease;
  padding: 10px;
  border-radius: 7px;

  &:hover {
    background-color: var(--bg-foreground);
  }
`;

const OtherStoreName = styled(Name)`
  font-size: 12px;
`;

const NewStore = styled(OtherStoresProfile)`
  font-size: 11px;
  display: flex;
  align-items: center;
  padding: 5px;

  &:hover {
    background-color: transparent;
    opacity: 80%;
  }
`;

export default function Stores() {
  const [open, setState] = useState(false);
  return (
    <>
      <StoreWrapper
        onClick={() => {
          if (open) {
            setState(false);
          } else {
            setState(true);
          }
        }}
      >
        <Profile>
          <ProfilePhoto></ProfilePhoto>
          <Name>Adidas</Name>
        </Profile>
        <Icons>
          {open ? (
            <CaretUpIcon size={15} weight="bold" />
          ) : (
            <CaretDownIcon size={15} weight="bold" />
          )}
        </Icons>
      </StoreWrapper>
      <DropdownWrapper className={open ? "open" : ""}>
        <OtherStores>
          <OtherStoresProfile>
            <ProfilePhoto></ProfilePhoto>
            <OtherStoreName>Nike</OtherStoreName>
          </OtherStoresProfile>
          <OtherStoresProfile>
            <ProfilePhoto></ProfilePhoto>
            <OtherStoreName>Dolce & Cabana</OtherStoreName>
          </OtherStoresProfile>
        </OtherStores>
        <NewStore>
          <CreateStore />
        </NewStore>
      </DropdownWrapper>
    </>
  );
}
