"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";
import { url } from "../../utils/url";
import { useAccount } from "wagmi";
import Modal from "react-responsive-modal";
import ConfirmModal from "./confirm-modal";
import {
  PromptButtons,
  PromptCancel,
  PromptConfirm,
  PromptDesc,
  PromptTitle,
  PromptWrapper,
} from "../../components/prompt";
import { CircleNotchIcon } from "@phosphor-icons/react/dist/icons/CircleNotch";
import { redirect } from "next/navigation";

const CardWrapper = styled.div`
  position: absolute;
  width: 340px;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
  background-color: var(--foreground);
  border: var(--border);
  border-radius: 15px;
  padding: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2px;

  @media only screen and (min-width: 992px) {
    width: 400px;
  }
`;

const RoleContent = styled.button`
  width: 100%;
  background-color: var(--background);
  border-radius: 10px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  font-family: inherit;
  border: var(--border);
  transition: all 0.3s ease;

  &:hover {
    filter: brightness(95%);
  }

  @media (prefers-color-scheme: dark) {
    &:hover {
      filter: brightness(80%);
    }
  }
`;

const RoleInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;

const RoleImage = styled.div`
  height: 40px;
  width: 40px;
  background-color: var(--foreground);
  overflow: hidden;
  border-radius: 10px;
`;

const RoleText = styled.div`
  display: flex;
  flex-direction: column;
  text-align: start;
`;

const RoleName = styled.p`
  font-size: 15px;
  font-weight: 500;
  color: var(--text-dark);
`;

const RoleMessage = styled.p`
  font-size: 12px;
  color: var(--text-light);
`;

export default function ConnectWalletPage() {
  const roles = [
    { name: "Buyer", message: "Purchase goods" },
    { name: "Seller", message: "Distribute goods" },
    { name: "Agent", message: "Control inventory" },
  ];

  const [selectedRole, setRole] = useState("");
  const { address } = useAccount();
  const [modalOpen, setModalOpen] = useState(false);
  const [switchingLoading, setLoading] = useState(false);

  if (!address) {
    redirect("/connect-wallet");
  }

  const handleSwitchRole = async () => {
    setLoading(true);
    try {
      await fetch(`${url}/switch-role/${address}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: selectedRole }),
      });
      setModalOpen(false);
    } catch (error) {
      console.error("Failed to switch role", error);
    } finally {
      setLoading(false);
      redirect("/");
    }
  };

  return (
    <CardWrapper>
      {roles.map((role) => (
        <RoleContent
          key={role.name}
          onClick={() => {
            setRole(role.name);
            setModalOpen(true);
          }}
        >
          <RoleInfo>
            <RoleImage />
            <RoleText>
              <RoleName>{role.name}</RoleName>
              <RoleMessage>{role.message}</RoleMessage>
            </RoleText>
          </RoleInfo>
        </RoleContent>
      ))}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} center>
        <PromptWrapper>
          <PromptTitle>Confirm {selectedRole} role</PromptTitle>
          <PromptDesc>
            By switching to the {selectedRole} role, you will lose all previous
            data from your existing role.
          </PromptDesc>
          <PromptButtons>
            <PromptCancel onClick={() => setModalOpen(false)}>
              Cancel
            </PromptCancel>

            <PromptConfirm
              onClick={handleSwitchRole}
              disabled={switchingLoading}
              style={
                switchingLoading
                  ? { opacity: "50%", cursor: "not-allowed" }
                  : {}
              }
            >
              {switchingLoading && (
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
    </CardWrapper>
  );
}
