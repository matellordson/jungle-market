"use client";

import { JSX, useState } from "react";
import styled from "styled-components";
import { CaretRightIcon } from "@phosphor-icons/react/CaretRight";
import { CaretDownIcon } from "@phosphor-icons/react/CaretDown";
import Link from "next/link";

const Wrapper = styled.div``;

const Base = styled.div<{ $active: boolean }>`
  display: flex;
  align-items: end;
  gap: 5px;
  padding: 5px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 15px;
  background-color: ${(props) =>
    props.$active ? "var(--accent-mute)" : "transparent"};
  border: ${(props) =>
    props.$active ? "    var(--accent-border)" : "transparent"};

  &:hover {
    background-color: ${(props) => (props.$active ? "" : "var(--highlight)")};
    color: ${(props) => (props.$active ? "" : "var(--text-light)")};
  }

  & svg {
    color: ${(props) =>
      props.$active ? "var(--accent)" : "var(--text-light)"};
    vertical-align: middle;
  }

  & p {
    color: ${(props) =>
      props.$active ? "var(--accent)" : "var(--text-light)"};
    font-weight: 500;
  }

  & span {
    display: block;
  }

  &:hover span {
    display: none;
  }

  & .toggle {
    display: none;
  }

  &:hover .toggle {
    display: block;
  }
`;

const SubordinateWrapper = styled.div`
  margin-top: 5px;
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

  & svg {
    vertical-align: bottom;
  }
`;

const CollapseToggle = styled.div`
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  vertical-align: middle;

  & svg {
    padding: 3px;
  }
`;

export default function NavTree({
  icon,
  name,
  subordinate,
  active,
  href,
}: {
  icon: JSX.Element;
  name: string;
  subordinate?: {
    icon: JSX.Element;
    name: string;
    href: string;
  }[];
  active: boolean;
  href: string;
}) {
  const [open, setIsOpen] = useState(false);
  return (
    <Wrapper>
      <Base
        $active={active}
        onClick={() => {
          if (!open) {
            setIsOpen(true);
          } else {
            setIsOpen(false);
          }
        }}
      >
        <CollapseToggle className="toggle">
          {open ? (
            <CaretDownIcon size={21} weight="bold" />
          ) : (
            <CaretRightIcon size={21} weight="bold" />
          )}
        </CollapseToggle>

        <span>{icon}</span>

        <p>{name}</p>
      </Base>
      {open ? (
        <SubordinateWrapper>
          {subordinate?.map((item) => (
            <Link href={item.href} key={item.name}>
              <SubordinateItems>
                <span>{item.icon}</span>
                <p>{item.name}</p>
              </SubordinateItems>
            </Link>
          ))}
        </SubordinateWrapper>
      ) : (
        ""
      )}
    </Wrapper>
  );
}
