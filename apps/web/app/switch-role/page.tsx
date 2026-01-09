"use client";

import { useState } from "react";
import styled from "styled-components";

const CardWrapper = styled.div`
  position: absolute;
  width: 340px;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
  background-color: var(--foreground);
  border: var(--border);
  border-radius: 15px;
  padding: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 5px;

  @media only screen and (min-width: 992px) {
    width: 400px;
  }
`;

const RoleContent = styled.button<{ $active: boolean }>`
  width: 100%;
  background-color: var(--background);
  border-radius: 10px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  font-family: inherit;
  border: ${(props) =>
    props.$active ? "1px solid var(--accent)" : " var(--border)"};
  transition: all 0.3s ease;
`;

const RoleInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;

const RoleImage = styled.div`
  height: 40px;
  width: 40px;
  background-color: var(--foreground);
  overflow: hidden;
  border-radius: 10px;
`;

const RoleText = styled.div`
  display: flex;
  flex-direction: column;
  text-align: start;
`;

const RoleName = styled.p`
  font-size: 15px;
  font-weight: 500;
  color: var(--text-dark);
`;

const RoleMessage = styled.p`
  font-size: 12px;
  color: var(--text-light);
`;

const Button = styled.button`
  font-family: inherit;
  background-color: var(--accent);
  padding: 5px 15px;
  border: none;
  color: #ffffff;
  border-radius: 10px;
  font-size: 15px;
  cursor: pointer;
  font-weight: 500;
  border: var(--border);
  outline: none;
  transition: all 0.8 ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40px;
  margin: auto;
  margin-top: 10px;

  &:hover {
    filter: brightness(90%);
  }

  &:active {
    filter: brightness(100%);
    box-shadow: none;
  }
`;

export default function ConnectWalletPage() {
  const roles = [
    {
      name: "Buyer",
      message: "Purchase goods",
    },
    {
      name: "Seller",
      message: "Distribute goods",
    },
    {
      name: "Agent",
      message: "Control inventory",
    },
  ];

  const [selectedRole, setRole] = useState("");

  return (
    <CardWrapper>
      {roles.map((role) => (
        <RoleContent
          key={role.name}
          $active={selectedRole == role.name}
          onClick={() => {
            setRole(role.name);
          }}
        >
          <RoleInfo>
            <RoleImage></RoleImage>
            <RoleText>
              <RoleName>{role.name}</RoleName>
              <RoleMessage>{role.message}</RoleMessage>
            </RoleText>
          </RoleInfo>
        </RoleContent>
      ))}
      <Button>Switch role</Button>
    </CardWrapper>
  );
}
