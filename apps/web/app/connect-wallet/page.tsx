"use client";

import styled, { keyframes } from "styled-components";
import { PlugsIcon } from "@phosphor-icons/react/Plugs";
import { PlugsConnectedIcon } from "@phosphor-icons/react/PlugsConnected";
import { CircleNotchIcon } from "@phosphor-icons/react/CircleNotch";
import { WalletWalletConnect } from "@web3icons/react";
import { useAccount, useConnect, useConnectors, useDisconnect } from "wagmi";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";

const bounce = keyframes`
0% {
    transform: scale(1);
} 50% {
    transform: scale(0.95);

} 100% {
    transform: scale(1);
}`;

const spin = keyframes`
0% {
  transform: rotate(0deg);
}
 100% {
    transform: rotate(360deg) ;
  }
`;

const CardWrapper = styled.div`
  position: absolute;
  width: 340px;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
  background-color: var(--foreground);
  border: var(--border);
  border-radius: 25px;
  padding: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media only screen and (min-width: 992px) {
    width: 400px;
  }
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  &.close {
    display: none;
  }
`;

const ConnectContent = styled.button`
  width: 100%;
  background-color: var(--background);
  border-radius: 20px;
  border: var(--border);
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  font-family: inherit;

  &:focus {
    animation: 0.25s forwards ease ${bounce};
  }
`;

const ConnectInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;

const WalletConnectBox = styled.div`
  height: 40px;
  width: 40px;
  overflow: hidden;
  border-radius: 10px;
`;

const ConnectContentText = styled.div`
  display: flex;
  flex-direction: column;
  text-align: start;
`;

const ConnectorName = styled.p`
  font-size: 15px;
  font-weight: 500;
  color: var(--text-dark);
`;

const PrivacyMessage = styled.p`
  font-size: 12px;
  color: var(--text-light);
`;

const Icon = styled.div`
  svg {
    color: var(--icon);
  }
`;

const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3px;
  svg {
    transform-origin: center;
    animation: ${spin} 1s linear infinite;
  }
`;

export default function ConnectWalletPage() {
  const connectors = useConnectors();
  const { connect } = useConnect();
  const { isConnected, isConnecting, address } = useAccount();
  const { disconnect } = useDisconnect();

  useEffect(() => {
    if (address) {
      redirect("/hompage");
    }
  }, [address]);

  return (
    <CardWrapper>
      {/* Connect Wallet Components */}
      {connectors
        .filter((c) => c.id === "walletConnect")
        .map((connector) => (
          <ConnectContent
            key={connector.uid}
            onClick={() => {
              if (isConnected) {
                disconnect();
              } else {
                connect({ connector });
              }
            }}
          >
            <ConnectInfo>
              <WalletConnectBox>
                <WalletWalletConnect variant="background" size={40} />
              </WalletConnectBox>
              <ConnectContentText>
                <ConnectorName>{connector.name}</ConnectorName>
                <PrivacyMessage>
                  By connecting you agree to our terms.
                </PrivacyMessage>
              </ConnectContentText>
            </ConnectInfo>
            <Icon>
              {isConnecting ? (
                <Loader>
                  <CircleNotchIcon
                    size={20}
                    weight="duotone"
                    color="var(--accent)"
                  />
                </Loader>
              ) : (
                <>
                  {isConnected ? (
                    <PlugsConnectedIcon
                      size={20}
                      weight="duotone"
                      color="var(--accent)"
                    />
                  ) : (
                    <PlugsIcon
                      size={20}
                      weight="duotone"
                      color="var(--accent)"
                    />
                  )}
                </>
              )}
            </Icon>
          </ConnectContent>
        ))}
    </CardWrapper>
  );
}
