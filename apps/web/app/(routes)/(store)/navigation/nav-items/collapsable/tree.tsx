"use client";

import { JSX, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div``;

const Base = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 5px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 15px;
  color: var(--text-light);

  &:hover {
    background-color: var(--highlight);
  }

  & svg {
    color: var(--text-light);
  }
`;

const SubordinateWrapper = styled.div`
  margin-left: 30px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  font-size: 15px;
  color: var(--text-light);

  & svg {
    color: var(--text-light);
  }
`;

const SubordinateItems = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  border-radius: 10px;
  padding: 5px;

  &:hover {
    background-color: var(--highlight);
  }
`;

export default function NavTree({
  icon,
  name,
  subordinate,
}: {
  icon: JSX.Element;
  name: string;
  subordinate: {
    icon: JSX.Element;
    name: string;
  }[];
}) {
  const [open, setIsOpen] = useState(false);
  return (
    <Wrapper>
      <Base
        onClick={() => {
          if (!open) {
            setIsOpen(true);
          } else {
            setIsOpen(false);
          }
        }}
      >
        <span>{icon}</span>
        <p>{name}</p>
      </Base>
      {open ? (
        <SubordinateWrapper>
          {subordinate.map((item) => (
            <SubordinateItems key={item.name}>
              <span>{item.icon}</span>
              <p>{item.name}</p>
            </SubordinateItems>
          ))}
        </SubordinateWrapper>
      ) : (
        ""
      )}
    </Wrapper>
  );
}
