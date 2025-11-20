"use client";
import styled from "styled-components";

export const ModalTrigger = styled.div``;

export const ModalWrapper = styled.div`
  visibility: hidden;
  height: 100vh;
  width: 100vw;
  position: absolute;
  background-color: var(--bg-glass);
  backdrop-filter: var(--glass-blur);
  position: absolute;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.4s ease;

  &.active {
    visibility: visible;
  }
`;

export const Modal = styled.div`
  width: 90vw;
  background-color: var(--bg-front);
  border-radius: var(--radius);
  border: 1px solid var(--bg-border);
  padding: var(--padding);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  @media only screen and (min-width: 500px) {
    & {
      width: 400px;
      max-width: 500px;
    }
  }
`;

export const ModalBody = styled.div`
  height: 100%;
  width: 100%;
`;

export const ModalHeader = styled.h3``;

export const ModalDescription = styled.p`
  padding-top: 5px;
  color: var(--text-light);
  font-size: 14px;
`;

export const ModalContent = styled.div`
  height: 100%;
  width: 100%;
  padding: 20px 0;
  font-size: 14px;
  color: var(--text-neutral);
`;

export const ModalFooter = styled.div`
  min-height: 50px;
  max-height: 50px;
  width: 100%;
  background-color: var(--bg-highlight);
  border-radius: var(--radius);
  border: 1px solid var(--bg-border);
  display: flex;
  align-items: center;
  padding: 5px;
`;

export const FooterButton = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  gap: 5px;
`;
