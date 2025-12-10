import { JSX } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
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

export default function SingleNavItem({
  icon,
  name,
}: {
  icon: JSX.Element;
  name: string;
}) {
  return (
    <Wrapper>
      <span>{icon}</span>
      <p>{name}</p>
    </Wrapper>
  );
}
