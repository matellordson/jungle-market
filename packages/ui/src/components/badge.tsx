"use client";

import styled from "styled-components";

export const DefaultBadge = styled.div`
  width: fit-content;
  padding: 3px 8px;
  border: 1px solid var(--bg-border);
  border-radius: var(--radius);
  text-align: center;
  font-size: 10px;
  color: var(--text-neutral);
`;

export const SuccessBadge = styled(DefaultBadge)`
  border: 1px solid var(--success-border);
  background-color: var(--success-bg);
  color: var(--success-text);
`;
