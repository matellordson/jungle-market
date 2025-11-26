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
    border: none;
    transition: all 0.4s ease;
    box-shadow: 0 0 0 1px var(--bg-accent);
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

  &::placeholder {
    color: var(--text-mute);
  }

  &:focus {
    background-color: var(--bg-highlight);
    outline: none;
    border: none;
    transition: all 0.4s ease;
    box-shadow: 0 0 0 1px var(--bg-accent);
  }
`;
