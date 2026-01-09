import Link from "next/link";
import React from "react";
import styled from "styled-components";

export const ButtonElement = styled.button`
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
  transition: all 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;

  &:hover {
    filter: brightness(95%);
  }

  @media (prefers-color-scheme: dark) {
    &:hover {
      filter: brightness(80%);
    }
  }
`;

export function Button({
  children,
  href,
  onClick,
  loading,
}: {
  children: string;
  href?: string;
  onClick?: React.MouseEventHandler;
  loading?: boolean;
}) {
  if (href) {
    return (
      <Link href={href} passHref legacyBehavior>
        <ButtonElement as="a">{children}</ButtonElement>
      </Link>
    );
  }
  return <ButtonElement onClick={onClick}>{children}</ButtonElement>;
}
