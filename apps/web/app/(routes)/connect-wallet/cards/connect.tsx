"use client";

import styled, { keyframes } from "styled-components";
import { PlugsIcon } from "@phosphor-icons/react/Plugs";
import { PlugsConnectedIcon } from "@phosphor-icons/react/PlugsConnected";
import { CircleNotchIcon } from "@phosphor-icons/react/CircleNotch";
import { WalletWalletConnect } from "@web3icons/react";
import { useAccount, useConnect, useConnectors, useDisconnect } from "wagmi";

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

const Content = styled.button`
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

const Info = styled.div`
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

const ContentText = styled.div`
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
  svg {
    transform-origin: center;
    animation: ${spin} 1s linear infinite;
  }
`;

export function Connect() {
  const connectors = useConnectors();
  const { connect } = useConnect();
  const { isConnected, isConnecting } = useAccount();
  const { disconnect } = useDisconnect();

  return (
    <>
      {connectors
        .filter((c) => c.id === "walletConnect")
        .map((connector) => (
          <Content
            key={connector.uid}
            onClick={() => {
              if (isConnected) {
                disconnect();
              } else {
                connect({ connector });
              }
            }}
          >
            <Info>
              <WalletConnectBox>
                <WalletWalletConnect variant="background" size={40} />
              </WalletConnectBox>
              <ContentText>
                <ConnectorName>{connector.name}</ConnectorName>
                <PrivacyMessage>
                  By connecting you agree to our policies.
                </PrivacyMessage>
              </ContentText>
            </Info>
            <Icon>
              {isConnecting ? (
                <Loader>
                  <CircleNotchIcon size={20} weight="duotone" />
                </Loader>
              ) : (
                <>
                  {isConnected ? (
                    <PlugsConnectedIcon
                      size={20}
                      weight="duotone"
                      color="var(--success-text)"
                    />
                  ) : (
                    <PlugsIcon size={20} weight="duotone" />
                  )}
                </>
              )}
            </Icon>
          </Content>
        ))}
    </>
  );
}
