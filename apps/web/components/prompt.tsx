import styled from "styled-components";
import { ButtonElement } from "./button";
import { spin } from "../app/connect-wallet/page";

export const PromptWrapper = styled.div`
  width: 100%;
  background-color: var(--background);
  border-radius: 10px;
  padding: 10px;

  border: var(--border);
  transition: all 0.3s ease;
`;

export const PromptTitle = styled.p`
  color: var(--text-dark);
  font-size: 17px;
  font-weight: 500;
`;

export const PromptDesc = styled.p`
  font-size: 14px;
  padding-top: 5px;
`;

export const PromptButtons = styled.div`
  margin-top: 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;

export const PromptCancel = styled(ButtonElement)`
  padding: 10px 0px;
  width: 100%;
`;

export const PromptConfirm = styled(ButtonElement)`
  padding: 10px 0px;
  width: 100%;
  background-color: var(--accent);
  color: #ffffff;
  display: flex;
  gap: 3px;

  svg {
    color: #ffffff;
    transform-origin: center;
    animation: ${spin} 1s linear infinite;
  }
`;
