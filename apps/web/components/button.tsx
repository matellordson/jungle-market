import Link from "next/link";
import React from "react";
import styled from "styled-components";

const Element = styled.button`
  font-family: inherit;
  background-color: var(--foreground);
  padding: 5px 15px;
  border: none;
  color: var(--text-dark);
  border-radius: 5px;
  font-size: 15px;
  cursor: pointer;
  font-weight: 500;
  border: var(--border);
  outline: none;
  transition: all 0.8 ease-in-out;
  box-shadow: var(--shadow);
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;

  &:hover {
    filter: brightness(90%);
  }

  &:active {
    filter: brightness(100%);
    box-shadow: none;
  }
`;

export function Button({
  children,
  href,
  onClick,
}: {
  children: string;
  href?: string;
  onClick?: React.MouseEventHandler;
}) {
  if (href) {
    return (
      <Link href={href} passHref legacyBehavior>
        <Element as="a">{children}</Element>
      </Link>
    );
  }
  return <Element onClick={onClick}>{children}</Element>;
}
