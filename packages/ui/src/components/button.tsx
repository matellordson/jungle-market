"use client";

import styled from "styled-components";

export const DefaultBtn = styled.button`
  padding: 8px 15px;
  background-color: var(--bg-front);
  border: 1px solid var(--bg-border);
  border-radius: var(--radius);
  cursor: pointer;

  &:hover {
    opacity: 80%;
  }
`;

export const GhostBtn = styled(DefaultBtn)`
  background-color: transparent;
  border: none;

  &:hover {
    background-color: var(--bg-front);
    opacity: 100%;
  }
`;

export const OutlineBtn = styled(DefaultBtn)`
  background-color: transparent;
`;

export const DestructiveGhostBtn = styled(DefaultBtn)`
  background-color: transparent;
  border: none;

  &:hover {
    background-color: var(--destructive-bg);
    color: var(--destructive-text);
    opacity: 100%;
  }
`;

export const IconBtn = styled(DefaultBtn)`
  height: 25px;
  width: 25px;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--text-icon);
  padding: 0;
  size: 30px;
`;
