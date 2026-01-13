import styled from "styled-components";

export const Input = styled.input`
  background-color: inherit;
  border: var(--border);
  padding: 5px 10px;
  color: inherit;
  font-size: 17px;
  border-radius: 5px;
  font-family: inherit;
  width: 100%;

  &:focus {
    outline: 2px solid var(--accent);
  }

  &::placeholder {
    opacity: 50%;
  }
`;
