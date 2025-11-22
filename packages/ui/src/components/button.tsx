"use client";

import styled from "styled-components";

export const DefaultBtn = styled.button`
  padding: 8px 15px;
  background-color: var(--bg-foreground);
  border: 1px solid var(--bg-border);
  border-radius: var(--radius);
  cursor: pointer;
  font-size: 15px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    opacity: 80%;
  }

  & svg {
    margin: 0;
    padding: 0;
    vertical-align: middle;
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
