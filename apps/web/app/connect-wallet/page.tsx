"use client";

import { useState, useEffect } from "react";
import styled, { css, keyframes } from "styled-components";
import { DefaultBtn, IconBtn } from "@repo/ui/components/button";
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
} from "@repo/ui/components/modal";
import { PlugsConnected } from "@phosphor-icons/react/dist/icons/PlugsConnected";
import { ArrowRight } from "@phosphor-icons/react/dist/icons/ArrowRight";
import { Storefront } from "@phosphor-icons/react/dist/icons/Storefront";
import { ShoppingBag } from "@phosphor-icons/react/dist/icons/ShoppingBag";
import { CheckCircle } from "@phosphor-icons/react/dist/icons/CheckCircle";
import { WalletIcon } from "@web3icons/react";
import { SuccessBadge } from "@repo/ui/components/badge";
import { XIcon } from "@phosphor-icons/react/dist/icons/X";
import { useConnect, useConnectors, useAccount } from "wagmi";

const popIn = keyframes`
  0% { transform: scale(0.95); }
  50% { transform: scale(1.02); }
  100% { transform: scale(1); }
`;

export const SelectListWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SelectListItem = styled.div`
  padding: var(--padding);
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  border-radius: var(--radius);
  transition: all 0.2s ease-in-out;
  color: var(--text-dark);
  border-bottom: none;

  &:hover {
    background-color: var(--bg-highlight);
    animation: ${popIn} 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;

    & .select-list-icon {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

export const SelectListDetails = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const SelectListImage = styled.div`
  height: 40px;
  width: 40px;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--bg-border);
  overflow: hidden;
  background: var(--bg-page);

  & svg {
    color: var(--text-dark);
  }
`;

export const SelectListTitle = styled.div`
  font-weight: var(--text-bold);
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-dark);
`;

export const ActiveStatus = styled.span`
  font-size: 0.85rem;
  margin-left: 8px;
  color: var(--success-text);
`;

export const SelectListIcon = styled.div`
  opacity: 0;
  color: var(--text-icon);
  transform: translateX(-10px);
  transition: all 0.3s ease;
`;

const SelectionGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-top: 10px;
`;

const SelectionCard = styled.div<{ $isActive: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 24px;
  border-radius: var(--radius);
  cursor: pointer;
  transition:
    opacity 0.2s ease,
    background-color 0.2s ease,
    border-color 0.2s ease;
  position: relative;

  background-color: var(--bg-page);
  border: 1px solid var(--bg-border);
  color: var(--text-neutral);

  &:hover {
    opacity: 0.7;
  }

  ${(props) =>
    props.$isActive &&
    css`
      animation: ${popIn} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
      border-color: var(--success-border);
      background-color: var(--success-bg);
      color: var(--success-text);
      box-shadow: var(--sm-shadow);
      opacity: 1;

      &:hover {
        opacity: 0.8;
        background-color: var(--success-bg);
        border-color: var(--success-border);
      }
    `}
`;

const CardIconWrapper = styled.div<{ $isActive: boolean }>`
  font-size: 32px;
  margin-bottom: 4px;
  color: ${(props) =>
    props.$isActive ? "var(--success-text)" : "var(--text-icon)"};
`;

const CardTitle = styled.div`
  font-weight: var(--text-bold);
  font-size: 1.1rem;
`;

const CheckmarkOverlay = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  color: var(--success-text);
  animation: ${popIn} 0.3s ease forwards;
`;

export default function ConnectWallet() {
  const [modalState, setModalState] = useState(false);
  const { connect } = useConnect();
  const connectors = useConnectors();
  const { connector: activeConnector, isConnected, address } = useAccount();

  const [accountState, setAccountState] = useState<string>("");
  const [stepIndex, setStepIndex] = useState(0);

  const accountType = [{ name: "Buyer" }, { name: "Seller" }];

  const isBtnDisabled =
    (stepIndex === 0 && !isConnected) || (stepIndex === 1 && !accountState);

  const handleCompletion = () => {
    const finalData = {
      connector: activeConnector?.name || "Unknown",
      wallet_address: address,
      account_type: accountState,
    };

    console.log("Registration Data Submitted:", finalData);
    setModalState(false);
  };

  const Stages = [
    {
      title: "Connect wallet",
      description: "Get started by connecting your preferred wallet.",
      content: (
        <SelectListWrapper>
          {connectors.map((connector) => {
            const isWalletConnected =
              isConnected && activeConnector?.id === connector.id;

            return (
              <SelectListItem
                key={connector.id}
                onClick={() => {
                  connect({ connector });
                }}
              >
                <SelectListDetails>
                  <SelectListImage>
                    {connector.name === "MetaMask" ? (
                      <WalletIcon
                        name="metamask"
                        variant="background"
                        size={64}
                      />
                    ) : connector.name === "WalletConnect" ? (
                      <WalletIcon
                        name="wallet-connect"
                        variant="background"
                        size={64}
                      />
                    ) : connector.name === "Coinbase Wallet" ? (
                      <WalletIcon
                        name="coinbase wallet"
                        variant="background"
                        size={64}
                      />
                    ) : (
                      ""
                    )}
                  </SelectListImage>
                  <SelectListTitle>
                    {connector.name}
                    {isWalletConnected && (
                      <ActiveStatus>
                        <SuccessBadge>Active</SuccessBadge>
                      </ActiveStatus>
                    )}
                  </SelectListTitle>
                </SelectListDetails>

                <SelectListIcon className="select-list-icon">
                  {isWalletConnected ? (
                    <PlugsConnected size={20} weight="bold" />
                  ) : (
                    <ArrowRight size={20} weight="bold" />
                  )}
                </SelectListIcon>
              </SelectListItem>
            );
          })}
        </SelectListWrapper>
      ),
    },
    {
      title: "Choose your role",
      description: "Select the option that best describes your goals.",
      content: (
        <SelectionGrid>
          {accountType.map((account) => {
            const isActive = accountState === account.name;
            return (
              <SelectionCard
                key={account.name}
                $isActive={isActive}
                onClick={() => setAccountState(account.name)}
              >
                {isActive && (
                  <CheckmarkOverlay>
                    <CheckCircle weight="fill" size={20} />
                  </CheckmarkOverlay>
                )}

                <CardIconWrapper $isActive={isActive}>
                  {account.name === "Buyer" ? (
                    <ShoppingBag weight={isActive ? "fill" : "regular"} />
                  ) : (
                    <Storefront weight={isActive ? "fill" : "regular"} />
                  )}
                </CardIconWrapper>

                <CardTitle>{account.name}</CardTitle>
              </SelectionCard>
            );
          })}
        </SelectionGrid>
      ),
    },
  ];

  const currentStage = Stages[stepIndex];

  return (
    <div>
      <ModalTrigger
        onClick={() => {
          setModalState(true);
        }}
      >
        <DefaultBtn>
          {isConnected ? "Wallet Connected" : "Connect Wallet"}
        </DefaultBtn>
      </ModalTrigger>
      <ModalWrapper className={modalState ? "active" : ""}>
        <Modal>
          <ModalBody>
            <ModalHeader>
              {currentStage?.title}
              <IconBtn
                onClick={() => {
                  setModalState(false);
                  setStepIndex(0);
                }}
                style={{
                  backgroundColor: "var(--bg-highlight)",
                }}
              >
                <XIcon weight="bold" />
              </IconBtn>
            </ModalHeader>
            <ModalDescription>{currentStage?.description}</ModalDescription>
            <ModalContent>{currentStage?.content}</ModalContent>
          </ModalBody>
          <ModalFooter>
            <FooterButton>
              {stepIndex > 0 && (
                <DefaultBtn
                  onClick={() => {
                    setStepIndex((prev) => prev - 1);
                  }}
                  style={{ opacity: 0.7 }}
                >
                  Previous
                </DefaultBtn>
              )}
              <DefaultBtn
                disabled={isBtnDisabled}
                style={{
                  opacity: isBtnDisabled ? 0.5 : 1,
                  cursor: isBtnDisabled ? "not-allowed" : "pointer",
                }}
                onClick={() => {
                  if (isBtnDisabled) return;

                  const isLastStep = stepIndex === Stages.length - 1;

                  if (isLastStep) {
                    handleCompletion();
                  } else {
                    setStepIndex((prev) => prev + 1);
                  }
                }}
              >
                {stepIndex < Stages.length - 1 ? (
                  <span>Continue</span>
                ) : (
                  <span>Done</span>
                )}
              </DefaultBtn>
            </FooterButton>
          </ModalFooter>
        </Modal>
      </ModalWrapper>
    </div>
  );
}
