"use client";

import { XIcon } from "@phosphor-icons/react/dist/icons/X";
import { useRouter } from "next/navigation";
import { styled } from "styled-components";

const ModalBlur = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalBox = styled.div`
  height: 90vh;
  width: 90vw;
  background-color: var(--bg-page);
  border-radius: var(--sm-radius);
  border: 1px solid var(--bg-border);
`;

const ModalAction = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  padding: 10px;
`;

const CloseModal = styled.button`
  height: 30px;
  width: 30px;
  border-radius: 100%;
  background-color: var(--bg-highlight);
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  cursor: pointer;

  & svg {
    color: var(--text-light);
  }

  &:hover {
    transition: all 0.4s ease;
    opacity: 80%;
  }
`;

export default function InterceptingModal({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  return (
    <ModalBlur>
      <ModalBox>
        <ModalAction>
          <CloseModal onClick={() => router.back()}>
            <XIcon size={18} weight="bold" />
          </CloseModal>
        </ModalAction>
        {children}
      </ModalBox>
    </ModalBlur>
  );
}
