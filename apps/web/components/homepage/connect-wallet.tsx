"use client";

import { useState } from "react";
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
import {
  ArrowRight,
  ArrowRightIcon,
} from "@phosphor-icons/react/dist/icons/ArrowRight";
import { ArrowLeftIcon } from "@phosphor-icons/react/dist/icons/ArrowLeft";
import { CheckIcon } from "@phosphor-icons/react/dist/icons/Check";
import { Storefront } from "@phosphor-icons/react/dist/icons/Storefront";
import { CircleNotchIcon } from "@phosphor-icons/react/dist/icons/CircleNotch";
import { ShoppingBag } from "@phosphor-icons/react/dist/icons/ShoppingBag";
import { CheckCircle } from "@phosphor-icons/react/dist/icons/CheckCircle";
import { WalletIcon } from "@web3icons/react";
import { SuccessBadge } from "@repo/ui/components/badge";
import { XIcon } from "@phosphor-icons/react/dist/icons/X";
import { useConnect, useConnectors, useAccount } from "wagmi";
import { url } from "../../utils/url";
import { redirect } from "next/navigation";
import { Button } from "../reusable/button";

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
    animation: ${popIn} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;

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

export function ConnectWallet() {
  const [modalState, setModalState] = useState(false);
  const { connect: originalConnect } = useConnect();
  const connectors = useConnectors();
  const { connector: activeConnector, isConnected, address } = useAccount();

  const [accountState, setAccountState] = useState<string>("");
  const [stepIndex, setStepIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isStageTransitioning, setIsStageTransitioning] = useState(false);
  const [connectingConnectorId, setConnectingConnectorId] = useState<
    string | null
  >(null);

  const accountType = [{ name: "Buyer" }, { name: "Seller" }];

  const isBtnDisabled =
    (stepIndex === 0 && !isConnected) ||
    (stepIndex === 1 && !accountState) ||
    isLoading ||
    isStageTransitioning;

  const handleCompletion = async () => {
    setIsLoading(true);

    const finalData = {
      wallet_address: address,
      connector: activeConnector?.name || "Unknown",
      role: accountState,
    };

    const res = await fetch(`${url}/connect-wallet`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(finalData),
    });

    redirect(`${address}`);
  };

  const connect = async ({
    connector,
  }: {
    connector: (typeof connectors)[number];
  }) => {
    setConnectingConnectorId(connector.id);

    try {
      await originalConnect({ connector });
    } catch (error) {
      console.error("Connection failed:", error);
    } finally {
      setConnectingConnectorId(null);
    }
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
            const isConnecting = connectingConnectorId === connector.id;

            return (
              <SelectListItem
                key={connector.id}
                onClick={() => {
                  if (!isWalletConnected && !isConnecting) {
                    connect({ connector });
                  }
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
                  {isConnecting ? (
                    <Loader>
                      <CircleNotchIcon
                        weight="bold"
                        className="loader"
                        size={20}
                      />
                    </Loader>
                  ) : isWalletConnected ? (
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
                onClick={() => {
                  if (!isLoading) {
                    setAccountState(account.name);
                  }
                }}
                style={{
                  cursor: isLoading ? "not-allowed" : "pointer",
                  opacity: isLoading ? 0.7 : 1,
                }}
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

  const isGlobalLoading = connectingConnectorId !== null;

  return (
    <div>
      <ModalTrigger
        onClick={() => {
          setModalState(true);
        }}
      >
        <Button disabled={isGlobalLoading}>
          {isGlobalLoading ? (
            <Loader>
              <CircleNotchIcon weight="bold" className="loader" />
            </Loader>
          ) : isConnected ? (
            "Wallet Connected"
          ) : (
            "Connect Wallet"
          )}
        </Button>
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
                  setIsLoading(false);
                  setConnectingConnectorId(null);
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
                <Button
                  onClick={() => {
                    setStepIndex((prev) => prev - 1);
                  }}
                  style={{ opacity: 0.7 }}
                  disabled={isLoading}
                >
                  Previous
                </Button>
              )}
              <Button
                disabled={isBtnDisabled}
                style={{
                  opacity: isBtnDisabled ? 0.5 : 1,
                  cursor: isBtnDisabled ? "not-allowed" : "pointer",
                }}
                onClick={async () => {
                  const res = await fetch(
                    `${url}/accounts/wallet_address/${address}`
                  );
                  const data = await res.json();
                  if (data === address) {
                    redirect(`${data}`);
                  } else {
                    if (isBtnDisabled) return;

                    const isLastStep = stepIndex === Stages.length - 1;

                    if (isLastStep) {
                      handleCompletion();
                    } else {
                      if (stepIndex === 0) {
                        setIsStageTransitioning(true);

                        await new Promise((resolve) =>
                          setTimeout(resolve, 1000)
                        );

                        setStepIndex((prev) => prev + 1);
                        setIsStageTransitioning(false);
                      } else {
                        setStepIndex((prev) => prev + 1);
                      }
                    }
                  }
                }}
              >
                {isLoading || isStageTransitioning ? (
                  <Loader>
                    <CircleNotchIcon weight="bold" className="loader" />
                  </Loader>
                ) : stepIndex < Stages.length - 1 ? (
                  <span>Continue</span>
                ) : (
                  <CheckIcon weight="bold" />
                )}
              </Button>
            </FooterButton>
          </ModalFooter>
        </Modal>
      </ModalWrapper>
    </div>
  );
}
