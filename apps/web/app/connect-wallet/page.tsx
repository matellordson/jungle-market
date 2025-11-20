"use client";

import { useState, useEffect } from "react";
import { DefaultBtn, DestructiveGhostBtn } from "@repo/ui/components/button";
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
import SelectList, {
  SelectListDetails,
  SelectListIcon,
  SelectListImage,
  SelectListItem,
  SelectListTitle,
} from "@repo/ui/components/select-list";
import { PlugsConnected } from "@phosphor-icons/react/dist/icons/PlugsConnected";
import { Plugs } from "@phosphor-icons/react/dist/icons/Plugs";
import { WalletMetamask } from "@web3icons/react";
import { WalletWalletConnect } from "@web3icons/react";
import { WalletCoinbase } from "@web3icons/react";
import { useConnect, useConnectors, useAccount } from "wagmi";
import { SuccessBadge } from "@repo/ui/components/badge";

export default function ConnectWallet() {
  const Stages = [
    {
      title: "Choose wallet",
      description: "Get started by connecting your preferred wallet.",
    },
    {
      title: "Account Type",
      description: "What option suit your visit intentions?.",
    },
  ];

  const [modalState, setModalState] = useState(false);
  const [currentStage, setCurrentStage] = useState(Stages[0]);

  const { connect } = useConnect();
  const connectors = useConnectors();

  const { connector: activeConnector, isConnected } = useAccount();

  useEffect(() => {
    if (isConnected && modalState) {
      // Uncomment the line below if you want to auto-move to "Account Type"
      // setCurrentStage(Stages[1]);
    }
  }, [isConnected, modalState]);

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
            <ModalHeader>{currentStage?.title}</ModalHeader>
            <ModalDescription>{currentStage?.description}</ModalDescription>
            <ModalContent>
              {connectors.map((connector) => {
                const isWalletConnected =
                  isConnected && activeConnector?.id === connector.id;

                return (
                  <SelectListItem
                    key={connector.id}
                    onClick={() => connect({ connector })}
                  >
                    <SelectListDetails>
                      <SelectListImage>
                        {connector.name === "MetaMask" ? (
                          <WalletMetamask variant="background" size={64} />
                        ) : connector.name === "WalletConnect" ? (
                          <WalletWalletConnect variant="background" size={64} />
                        ) : connector.name === "Coinbase Wallet" ? (
                          <WalletCoinbase variant="background" size={64} />
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
                        <Plugs size={20} weight="bold" />
                      )}
                    </SelectListIcon>
                  </SelectListItem>
                );
              })}
            </ModalContent>
          </ModalBody>
          <ModalFooter>
            <FooterButton>
              <DestructiveGhostBtn
                onClick={() => {
                  setModalState(false);
                }}
              >
                Cancel
              </DestructiveGhostBtn>
              <DefaultBtn
                onClick={() => {
                  // Fixed array index issue: Stages[+1] might be undefined or coercion dependent.
                  // Usually you want the next index.
                  setCurrentStage(Stages[1]);
                }}
              >
                Continue
              </DefaultBtn>
            </FooterButton>
          </ModalFooter>
        </Modal>
      </ModalWrapper>
    </div>
  );
}
