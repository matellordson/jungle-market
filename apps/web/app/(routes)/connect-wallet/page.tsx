"use client";

import styled, { keyframes } from "styled-components";
import { PlugsIcon } from "@phosphor-icons/react/Plugs";
import { PlugsConnectedIcon } from "@phosphor-icons/react/PlugsConnected";
import { CircleNotchIcon } from "@phosphor-icons/react/CircleNotch";
import { RadioButtonIcon } from "@phosphor-icons/react/RadioButton";
import { StorefrontIcon } from "@phosphor-icons/react/Storefront";
import { WalletWalletConnect } from "@web3icons/react";
import { useAccount, useConnect, useConnectors, useDisconnect } from "wagmi";
import { useState } from "react";
import { url } from "../../../utils/url";
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

const wrapperHeight = keyframes`
    0% {
        height: 300px ;
    } 50% {
        height: 295px;

    } 100% {
        height: 300px;
    }
`;

const storeHeight = keyframes`
    0% {
        height: 350px ;
    } 50% {
        height: 345px;

    } 100% {
        height: 350px;
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

  &.active {
    animation: ${wrapperHeight} ease-in forwards 0.25s;
  }

  /* animation specific for store section */
  &#store {
    animation: ${storeHeight} ease-in forwards 0.25s;
  }

  @media only screen and (min-width: 992px) {
    width: 400px;
  }
`;

// Main holds all content except button
const Main = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  &.close {
    display: none;
  }
`;

// Styles for Connect Wallet
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

// Styles for Role
const RoleWrapper = styled.div`
  width: 100%;
  background-color: var(--background);
  border-radius: 20px;
  border: var(--border);
  padding: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;

  &.active {
    animation: 0.25s forwards ease ${bounce};
  }
`;

const RoleContent = styled.div`
  width: 100%;
  padding: 10px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  border: none;

  &:hover {
    background-color: var(--foreground);
    transition: all 0.5s ease-in-out;
  }

  &.active {
    animation: 0.25s forwards ease ${bounce};
  }
`;

const RoleImage = styled.div`
  height: 40px;
  width: 40px;
  border-radius: 10px;
  background-color: var(--foreground);
  border: var(--border);
`;

const RoleInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;

const RoleContentText = styled.div`
  display: flex;
  flex-direction: column;
`;

const RoleName = styled.p`
  font-size: 15px;
  font-weight: 500;
  color: var(--text-dark);
`;

const RoleDescription = styled.p`
  font-size: 12px;
  color: var(--text-light);
`;

const RoleIcon = styled.div`
  opacity: 0;
  transform: scale(0.5);
  transition: all 0.25s ease;

  &.active {
    opacity: 1;
    transform: scale(1);
  }
`;

const Button = styled.button`
  height: 40px;
  width: 100%;
  background-color: var(--button-bg);
  color: var(--button-text);
  font-family: inherit;
  font-size: 15px;
  border-radius: 17px;
  border: none;
  font-weight: 500;
  cursor: pointer;
  display: none;
  transition: all 0.4s ease;
  animation: ${bounce} 0.25s ease forwards;
  box-shadow: var(--button-shadow);

  &:hover {
    opacity: 95%;
  }

  &.active {
    display: block;
    animation: 0.25s forwards ease ${bounce};
  }

  &:disabled {
    opacity: 50%;
    cursor: not-allowed;
  }

  &:focus {
    outline: none;
  }
`;

// Styles for Store
const StoreWrapper = styled.div`
  width: 100%;
  background-color: var(--background);
  border-radius: 20px;
  border: var(--border);
  padding: 10px;
  display: none;

  &.active {
    display: block;
    animation: 0.25s forwards ease ${bounce};
  }
`;

const StoreBanner = styled.div`
  height: 100px;
  width: 100%;
  background-color: var(--foreground);
  border: var(--border);
  border-radius: 15px;
`;

const StoreForm = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StoreProfile = styled.div`
  height: 45px;
  width: 45px;
  border-radius: 10px;
  background-color: var(--foreground);
  border: var(--border);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 25px;
  color: var(--text-light);
  text-transform: uppercase;
  font-weight: 400;
`;

const Input = styled.input`
  width: 100%;
  height: 35px;
  padding: 0px 10px;
  border: var(--border);
  font-family: inherit;
  font-size: 14px;
  border-radius: 15px;
  color: var(--text-dark);
  background-color: var(--foreground);

  &:focus {
    outline: none;
  }

  &:disabled {
    cursor: not-allowed;
  }

  &::placeholder {
    color: var(--text-light);
    opacity: 70%;
  }
`;

const StoreButton = styled(Button)``;

export default function ConnectWalletPage() {
  // Handle buttons to render
  const [stage, setStage] = useState(1);

  // Handle Loading states
  const [firstStageLoading, setFirstStageLoading] = useState(false);
  const [secondStageLoading, setSecondStageLoading] = useState(false);

  // Hooks for Connect Wallet
  const connectors = useConnectors();
  const { connect } = useConnect();
  const { isConnected, isConnecting, address } = useAccount();
  const { disconnect } = useDisconnect();

  //   Hook for Role
  const [activeRole, SetActiveRole] = useState("");

  const roles = [
    {
      name: "Buyer",
      desc: "I want to find and purchase items.",
    },
    {
      name: "Seller",
      desc: "I want to offer and sell my items.",
    },
  ];

  //   Hook for Store
  const [storeState, setStoreState] = useState(false);
  const [storeName, setStoreName] = useState("");
  const storeFirstLetter = storeName.charAt(0);

  const handleBuyerSubmit = async () => {
    const account = {
      address: address,
      role: activeRole,
    };
    await fetch(`${url}/connect-wallet`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(account),
    });

    setFirstStageLoading(false);
  };

  const handleSellerSubmit = async () => {
    // handle account
    const account = {
      address: address,
      role: activeRole,
    };
    await fetch(`${url}/connect-wallet`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(account),
    });

    // handle store
    const store = {
      name: storeName,
      owner: address,
    };
    await fetch(`${url}/stores/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(store),
    });

    setSecondStageLoading(false);

    // Get id from created store to redirect to the store page
    const res = await fetch(`${url}/stores/name/${storeName}`);
    const data = await res.json();
    redirect(`/${data.id}`);
  };

  return (
    <CardWrapper
      className={isConnected ? "active" : ""}
      id={storeState ? "store" : ""}
    >
      <Main className={storeState ? "close" : ""}>
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
              disabled={firstStageLoading}
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
                      color="var(--text-accent)"
                    />
                  </Loader>
                ) : (
                  <>
                    {isConnected ? (
                      <PlugsConnectedIcon
                        size={20}
                        weight="duotone"
                        color="var(--text-accent)"
                      />
                    ) : (
                      <PlugsIcon
                        size={20}
                        weight="duotone"
                        color="var(--text-accent)"
                      />
                    )}
                  </>
                )}
              </Icon>
            </ConnectContent>
          ))}

        {/* Role Components */}
        {isConnected ? (
          <RoleWrapper className={isConnected ? "active" : ""}>
            {roles.map((role) => (
              <RoleContent
                onClick={() => {
                  if (!firstStageLoading) {
                    SetActiveRole(role.name);
                  }
                }}
                className={role.name === activeRole ? "active" : ""}
                key={role.name}
              >
                <RoleInfo>
                  <RoleImage></RoleImage>
                  <RoleContentText>
                    <RoleName>{role.name}</RoleName>
                    <RoleDescription>{role.desc}</RoleDescription>
                  </RoleContentText>
                </RoleInfo>
                <RoleIcon className={role.name === activeRole ? "active" : ""}>
                  <RadioButtonIcon
                    size={20}
                    weight="duotone"
                    color="var(--text-accent)"
                  />
                </RoleIcon>
              </RoleContent>
            ))}
          </RoleWrapper>
        ) : (
          ""
        )}
      </Main>
      {/* Store Components */}
      <StoreWrapper className={storeState ? "active" : ""}>
        <StoreBanner />
        <StoreForm>
          <StoreProfile>
            {storeName === "" ? (
              <StorefrontIcon size={32} weight="duotone" />
            ) : (
              <span>{storeFirstLetter}</span>
            )}
          </StoreProfile>
          <Input
            type="text"
            name=""
            id=""
            placeholder="Store name"
            onChange={(e) => {
              setStoreName(e.target.value);
            }}
            disabled={secondStageLoading}
          />
        </StoreForm>
      </StoreWrapper>
      {stage === 1 ? (
        <Button
          className={isConnected ? "active" : ""}
          disabled={activeRole === "" || firstStageLoading}
          onClick={() => {
            setFirstStageLoading(true);
            if (activeRole === "Buyer") {
              handleBuyerSubmit();
            } else {
              setStoreState(true);
              setStage(2);
            }
          }}
        >
          {firstStageLoading ? (
            <Loader>
              <CircleNotchIcon size={14} weight="bold" />
              Continue
            </Loader>
          ) : (
            "Continue"
          )}
        </Button>
      ) : (
        <StoreButton
          className={isConnected ? "active" : ""}
          disabled={storeName === "" || secondStageLoading}
          onClick={() => {
            setSecondStageLoading(true);
            handleSellerSubmit();
          }}
        >
          {secondStageLoading ? (
            <Loader>
              <CircleNotchIcon size={14} weight="bold" />
              Get started
            </Loader>
          ) : (
            "Get started"
          )}
        </StoreButton>
      )}
    </CardWrapper>
  );
}
