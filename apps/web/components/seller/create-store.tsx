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
import { IconBtn } from "@repo/ui/components/button";
import { XIcon } from "@phosphor-icons/react/dist/icons/X";
import { PlusIcon } from "@phosphor-icons/react/dist/icons/Plus";
import { Input } from "../reusable/input";

export function CreateStore() {
  const [modalState, setModalState] = useState(false);

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
        <form action="">
          <Modal>
            <ModalBody>
              <ModalHeader>
                Build a store
                <IconBtn
                  onClick={() => {
                    setModalState(false);
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
                <Input name="store-name" id="store-name" placeholder="Name" />
              </ModalContent>
            </ModalBody>
            <ModalFooter>
              <FooterButton>
                <Button $default type="submit">
                  Submit
                </Button>
              </FooterButton>
            </ModalFooter>
          </Modal>
        </form>
      </ModalWrapper>
    </>
  );
}
