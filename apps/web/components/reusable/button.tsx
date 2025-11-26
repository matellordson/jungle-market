import styled from "styled-components";

export const Button = styled.button`
  background-color: var(--bg-accent);
  border: none;
  padding: 8px 10px;
  width: fit-content;
  font-size: 12px;
  border-radius: 7px;
  color: var(--text-button);
  cursor: pointer;
  font-weight: var(--text-bold);
  font-family: inherit;
  box-shadow: var(--sm-shadow);

  &:hover {
    transition: all 0.4s ease;
    opacity: 90%;
  }
`;
