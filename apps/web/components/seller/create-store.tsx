"use client";

import { useState } from "react";
import {
  FooterButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTrigger,
  ModalWrapper,
} from "../reusable/modal";
import { Button } from "../reusable/button";
import { IconBtn } from "../reusable/button";
import { XIcon } from "@phosphor-icons/react/dist/icons/X";
import { PlusIcon } from "@phosphor-icons/react/dist/icons/Plus";
import { Input } from "../reusable/input";
import { url } from "../../utils/url";
import { CircleNotchIcon } from "@phosphor-icons/react/dist/icons/CircleNotch";
import styled, { keyframes } from "styled-components";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/icons/ArrowRight";
import { useAccount } from "wagmi";

const rotate = keyframes`
from {
transform: rotate(0deg);
}
to {
transform: rotate(360deg);
}
`;

const Loader = styled.div`
  & .loader {
    animation: ${rotate} 1s linear infinite;
  }
`;

export function CreateStore() {
  const [modalState, setModalState] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [name, setName] = useState("");

  const { address } = useAccount();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetch(`${url}/stores/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: name, owner: address }),
    });
    setSubmitting(false);
  };

  return (
    <>
      <ModalTrigger>
        <Button
          $ghost
          onClick={() => {
            setModalState(true);
          }}
        >
          <PlusIcon weight="bold" />
          New store
        </Button>
      </ModalTrigger>
      <ModalWrapper className={modalState ? "active" : ""}>
        <form onSubmit={handleSubmit}>
          <Modal>
            <ModalBody>
              <ModalHeader>
                Build a store
                <IconBtn
                  onClick={() => {
                    setModalState(false);
                    setName("");
                  }}
                  style={{
                    backgroundColor: "var(--bg-highlight)",
                  }}
                >
                  <XIcon weight="bold" />
                </IconBtn>
              </ModalHeader>
              <ModalDescription>
                Just the essential to get your store live.
              </ModalDescription>
              <ModalContent>
                <Input
                  name="store-name"
                  placeholder="Name"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  onKeyDown={handleKeyDown}
                />
              </ModalContent>
            </ModalBody>
            <ModalFooter>
              <FooterButton>
                <Button
                  $default
                  type="submit"
                  disabled={name.length === 0 ? true : false}
                  onClick={() => {
                    setSubmitting(true);
                  }}
                >
                  {submitting ? (
                    <Loader>
                      <CircleNotchIcon weight="bold" className="loader" />
                    </Loader>
                  ) : (
                    <ArrowRightIcon weight="bold" />
                  )}
                </Button>
              </FooterButton>
            </ModalFooter>
          </Modal>
        </form>
      </ModalWrapper>
    </>
  );
}
