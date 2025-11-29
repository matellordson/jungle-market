"use client";

import styled, { keyframes } from "styled-components";
import { RadioButtonIcon } from "@phosphor-icons/react/RadioButton";
import { useState } from "react";

const roles = [
  {
    name: "Buyer",
    desc: "I want to find and purchase items.",
  },
  {
    name: "Seller",
    desc: "I want to offer and sell my items.",
  },
];

const bounce = keyframes`
0% {
    transform: scale(1);
} 50% {
    transform: scale(0.95);

} 100% {
    transform: scale(1);
}`;

const Wrapper = styled.div`
  width: 100%;
  background-color: var(--background);
  border-radius: 20px;
  border: var(--border);
  padding: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`;

const Content = styled.div`
  width: 100%;
  padding: 10px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  border: none;

  &:hover {
    background-color: var(--foreground);
    transition: all 0.5s ease-in-out;
  }

  &.active {
    animation: 0.25s forwards ease ${bounce};
  }
`;

const RoleImage = styled.div`
  height: 40px;
  width: 40px;
  border-radius: 10px;
  background-color: var(--foreground);
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;

const ContentText = styled.div`
  display: flex;
  flex-direction: column;
`;

const RoleName = styled.p`
  font-size: 15px;
  font-weight: 500;
  color: var(--text-dark);
`;

const RoleDescription = styled.p`
  font-size: 12px;
  color: var(--text-light);
`;

const Icon = styled.div`
  opacity: 0;
  transform: scale(0.5);
  transition: all 0.25s ease;

  &.active {
    opacity: 1;
    transform: scale(1);
  }
`;

export function Role() {
  const [activeRole, SetActiveRole] = useState("");

  return (
    <Wrapper>
      {roles.map((role) => (
        <Content
          onClick={() => SetActiveRole(role.name)}
          className={role.name === activeRole ? "active" : ""}
        >
          <Info>
            <RoleImage></RoleImage>
            <ContentText>
              <RoleName>{role.name}</RoleName>
              <RoleDescription>{role.desc}</RoleDescription>
            </ContentText>
          </Info>
          <Icon className={role.name === activeRole ? "active" : ""}>
            <RadioButtonIcon
              size={20}
              weight="duotone"
              color="var(--success-text)"
            />
          </Icon>
        </Content>
      ))}
    </Wrapper>
  );
}
