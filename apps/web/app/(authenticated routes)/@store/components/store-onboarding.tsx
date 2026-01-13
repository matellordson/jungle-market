"use client";

import { useState } from "react";
import Modal from "react-responsive-modal";
import styled from "styled-components";
import { Button } from "../../../../components/button";
import {
  PromptButtons,
  PromptCancel,
  PromptConfirm,
  PromptContent,
  PromptDesc,
  PromptTitle,
  PromptWrapper,
} from "../../../../components/prompt";
import { Label } from "../../../../components/label";
import { Input } from "../../../../components/input";
import { useAccount } from "wagmi";
import { url } from "../../../../utils/url";
import { CircleNotchIcon } from "@phosphor-icons/react/dist/icons/CircleNotch";

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 5px;
`;

export function StoreOnboarding() {
  const [modalOpen, setOpen] = useState(false);
  const [name, setName] = useState("");
  const { address } = useAccount();
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    await fetch(`${url}/stores/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json,",
      },
      body: JSON.stringify({ name: name, owners: address }),
    });
    setLoading(false);
    setOpen(false);
  };

  return (
    <Wrapper>
      {/* <Image></Image> */}
      <Button onClick={() => setOpen(true)}>create store</Button>
      <Modal open={modalOpen} onClose={() => setOpen(false)} center>
        <PromptWrapper>
          <PromptTitle>Create a store</PromptTitle>
          <PromptDesc>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sed,
            consequatur?
          </PromptDesc>
          <PromptContent>
            <Input
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />
          </PromptContent>
          <PromptButtons>
            <PromptCancel onClick={() => setOpen(false)}>Cancel</PromptCancel>
            <PromptConfirm
              onClick={handleSubmit}
              disabled={name === "" ? true : false}
            >
              {isLoading && (
                <CircleNotchIcon
                  size={18}
                  weight="duotone"
                  className="spinner"
                />
              )}
              Confirm
            </PromptConfirm>
          </PromptButtons>
        </PromptWrapper>
      </Modal>
    </Wrapper>
  );
}
