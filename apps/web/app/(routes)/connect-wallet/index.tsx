"use client";
import styled from "styled-components";
import { Connect } from "./cards/connect";
import { Role } from "./cards/role";

const CardWrapper = styled.div`
  position: absolute;
  height: 300px;
  width: 340px;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
  background-color: var(--foreground);
  border: var(--border);
  border-radius: 25px;
  padding: 5px;

  @media only screen and (min-width: 992px) {
    width: 400px;
  }
`;

export function ConnectWallet() {
  return (
    <CardWrapper>
      <Connect />
      <Role />
    </CardWrapper>
  );
}
