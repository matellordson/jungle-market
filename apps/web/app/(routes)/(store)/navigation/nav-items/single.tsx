import Link from "next/link";
import { JSX } from "react";
import styled from "styled-components";

const Wrapper = styled.div<{ $active: boolean }>`
  display: flex;
  align-items: end;
  gap: 5px;
  padding: 5px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 15px;
  color: var(--text-light);
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
    font-weight: 500;
    color: ${(props) =>
      props.$active ? "var(--accent)" : "var(--text-light)"};
  }
`;

export default function SingleNavItem({
  icon,
  name,
  active,
  href,
}: {
  icon: JSX.Element;
  name: string;
  active: boolean;
  href: string;
}) {
  return (
    <Link href={href}>
      <Wrapper $active={active}>
        <span>{icon}</span>
        <p>{name}</p>
      </Wrapper>
    </Link>
  );
}
