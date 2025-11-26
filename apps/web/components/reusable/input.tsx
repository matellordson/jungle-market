import styled from "styled-components";

export const Input = styled.input`
  background-color: inherit;
  border: 1px solid var(--bg-border);
  padding: 10px;
  border-radius: var(--radius);
  font-size: 12px;
  color: var(--text-neutral);
  font-family: inherit;

  &::placeholder {
    color: var(--text-mute);
  }

  &:focus {
    background-color: var(--bg-highlight);
    outline: none;
  }
`;

export const TextArea = styled.textarea`
  background-color: inherit;
  border: 1px solid var(--bg-border);
  padding: 10px;
  border-radius: var(--radius);
  font-size: 12px;
  color: var(--text-neutral);
  resize: vertical;
  max-height: 100px;
  font-family: inherit;
  line-height: 1.6;
  min-height: 100px;

  &::placeholder {
    color: var(--text-mute);
  }

  &:focus {
    background-color: var(--bg-highlight);
    outline: none;
  }
`;
