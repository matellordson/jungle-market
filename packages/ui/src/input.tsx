import styled from "styled-components";

export const Input = styled.input`
  outline: none;
  padding: 3px 5px;
  color: var(--text-light);
  border-radius: 5px;
  border: var(--border);
  background-color: var(--input-bg);
  font-size: 15px;
  font-family: inherit;
  background-color: inherit;

  &:focus {
    background-color: var(--input-bg);
    color: var(--input-color);
    outline: var(--input-outline);
  }
`;

// export const Input = styled.input`
//   outline: none;
//   padding: 5px 10px;
//   color: var(--text-light);
//   border-radius: 5px;
//   border: var(--border);
//   background-color: var(--input-bg);
//   width: 100%;
// `;
