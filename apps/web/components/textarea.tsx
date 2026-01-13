import styled from "styled-components";

export const TextArea = styled.textarea`
  background-color: inherit;
  border: var(--border);
  padding: 5px 10px;
  color: inherit;
  font-size: 17px;
  border-radius: 5px;
  font-family: inherit;
  max-width: 400px;
  min-height: 100px;
  max-height: 200px;

  &:focus {
    outline: 2px solid var(--accent);
  }

  &::placeholder {
    opacity: 50%;
  }
`;
