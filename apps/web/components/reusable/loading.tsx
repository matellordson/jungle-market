"use client";

import { CircleNotchIcon } from "@phosphor-icons/react/dist/icons/CircleNotch";
import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  & svg {
    animation: ${spin} 1s linear infinite;
  }
`;

export function Loading() {
  return (
    <Wrapper>
      <CircleNotchIcon size={32} weight="fill" />
    </Wrapper>
  );
}
