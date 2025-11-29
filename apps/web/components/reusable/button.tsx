import styled from "styled-components";

export const Button = styled.button<{
  $default?: boolean;
  $outline?: boolean;
  $ghost?: boolean;
}>`
  background-color: ${(props) =>
    props.$default
      ? "var(--bg-accent)"
      : props.$outline
        ? "inherit"
        : props.$ghost
          ? "inherit"
          : ""};
  border: ${(props) =>
    props.$default
      ? "none"
      : props.$outline
        ? "1px solid var(--bg-border)"
        : props.$ghost
          ? "none"
          : ""};
  padding: 8px 10px;
  width: fit-content;
  font-size: 12px;
  border-radius: 7px;
  color: ${(props) =>
    props.$default
      ? "var(--text-button)"
      : props.$outline
        ? "var(--text-accent)"
        : props.$ghost
          ? "var(--text-accent)"
          : ""};
  cursor: pointer;
  font-weight: var(--text-bold);
  font-family: inherit;
  box-shadow: ${(props) => (props.$default ? "var(--sm-shadow)" : "none")};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;

  svg {
    margin: 0;
    padding: 0;
    vertical-align: middle;
    scale: 1.2;
    stroke-width: 10px;
    color: ${(props) =>
      props.$default
        ? "var(--text-button)"
        : props.$outline
          ? "var(--text-accent)"
          : props.$ghost
            ? "var(--text-accent)"
            : ""};
  }

  &:hover {
    opacity: 90%;
  }

  &:disabled {
    opacity: 50%;
    cursor: not-allowed;
  }
`;

export const IconBtn = styled.button`
  height: 25px;
  width: 25px;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--text-icon);
  padding: 0;
  size: 30px;
  border: none;
  cursor: pointer;

  &:hover {
    opacity: 90%;
  }
`;
