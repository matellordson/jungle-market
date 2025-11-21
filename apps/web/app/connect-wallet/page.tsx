"use client";

import { useState } from "react";
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
import {
  SelectListDetails,
  SelectListIcon,
  SelectListImage,
  SelectListItem,
  SelectListTitle,
} from "@repo/ui/components/select-list";
import { PlugsConnected } from "@phosphor-icons/react/dist/icons/PlugsConnected";
import { ArrowRight } from "@phosphor-icons/react/dist/icons/ArrowRight";
import { Storefront } from "@phosphor-icons/react/dist/icons/Storefront";
import { ShoppingBag } from "@phosphor-icons/react/dist/icons/ShoppingBag";
import { WalletIcon } from "@web3icons/react";
import { useConnect, useConnectors, useAccount } from "wagmi";
import { SuccessBadge } from "@repo/ui/components/badge";
import { XIcon } from "@phosphor-icons/react/dist/icons/X";

export default function ConnectWallet() {
  const [modalState, setModalState] = useState(false);
  const { connect } = useConnect();
  const connectors = useConnectors();

  const { connector: activeConnector, isConnected, address } = useAccount();

  const [accountState, setAccountState] = useState<string>("");
  const [stepIndex, setStepIndex] = useState(0);

  const accountType = [{ name: "Buyer" }, { name: "Seller" }];

  // Check if the button should be disabled based on current step
  const isBtnDisabled =
    (stepIndex === 0 && !isConnected) || (stepIndex === 1 && !accountState);

  const handleCompletion = () => {
    // Data aggregation
    const finalData = {
      connector: activeConnector?.name || "Unknown",
      wallet_address: address,
      account_type: accountState,
    };

    console.log("Registration Data Submitted:", finalData);

    // Close modal
    setModalState(false);
  };

  const Stages = [
    {
      title: "Connect wallet",
      description: "Get started by connecting your preferred wallet.",
      content: (
        <>
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
                      <span className="text-sm text-green-500 ml-2">
                        <SuccessBadge>Active</SuccessBadge>
                      </span>
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
        </>
      ),
    },
    {
      title: "Account Type",
      description: "What option suit your visit intentions?.",
      content: (
        <>
          {accountType.map((account) => (
            <SelectListItem
              key={account.name}
              onClick={() => {
                setAccountState(account.name);
              }}
            >
              <SelectListDetails>
                <SelectListImage>
                  {account.name == "Buyer" ? (
                    <ShoppingBag size={25} />
                  ) : account.name == "Seller" ? (
                    <Storefront size={25} />
                  ) : (
                    ""
                  )}
                </SelectListImage>
                <SelectListTitle>
                  {account.name}
                  {accountState === account.name && (
                    <span className="text-sm text-green-500 ml-2">
                      <SuccessBadge>Active</SuccessBadge>
                    </span>
                  )}
                </SelectListTitle>
              </SelectListDetails>

              <SelectListIcon className="select-list-icon"></SelectListIcon>
            </SelectListItem>
          ))}
        </>
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
