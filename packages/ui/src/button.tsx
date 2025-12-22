import styled, { keyframes } from "styled-components";

const bounce = keyframes`
 0% { transform: scale(1.08); }
  100% { transform: scale(1); }`;

const Wrapper = styled.button<{ $accent?: boolean; $foreground?: boolean }>`
  padding: 5px 10px;
  font-size: 15px;
  background-color: ${(props) =>
    props.$accent
      ? "var(--accent-mute)"
      : props.$foreground
        ? "var(--foreground)"
        : ""};
  color: ${(props) =>
    props.$accent
      ? "var(--accent)"
      : props.$foreground
        ? "var(--text-light)"
        : ""};
  border: ${(props) =>
    props.$accent
      ? "var(--accent-border)"
      : props.$foreground
        ? "var(--border)"
        : ""};
  border-radius: 8px;
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 3px;
  transition: 0.4s ease;

  &:hover {
    opacity: 90%;
  }

  &:active {
    animation: ${bounce} 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    opacity: 80%;

    box-shadow: ${(props) =>
      props.$foreground ? " 0 0 0 1px var(--accent)" : ""};
  }

  & svg {
    color: ${(props) =>
      props.$accent
        ? "var(--accent)"
        : props.$foreground
          ? "var(--text-light)"
          : ""};
    vertical-align: middle;
  }
`;

export function Button({
  children,
  accent,
  foreground,
}: {
  children: React.ReactNode;
  accent?: boolean;
  foreground?: boolean;
}) {
  return (
    <Wrapper $accent={accent} $foreground={foreground}>
      {children}
    </Wrapper>
  );
}
