"use client";

import { JSX, useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { CaretRightIcon } from "@phosphor-icons/react/CaretRight";
import { CaretDownIcon } from "@phosphor-icons/react/CaretDown";
import Link from "next/link";
import { DotsThreeIcon } from "@phosphor-icons/react/dist/icons/DotsThree";
import { FileIcon } from "@phosphor-icons/react/dist/icons/File";
import { PlusIcon } from "@phosphor-icons/react/dist/icons/Plus";
import { Drawer } from "vaul";
import { Popover } from "react-tiny-popover";
import { Modal } from "react-responsive-modal";
import { useMediaQuery } from "react-responsive";
import { ProductPlugins } from "./(product)/plugins";
import { url } from "../../../../../../utils/url";

const pulse = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
`;

const Base = styled.div<{ $active: boolean }>`
  display: flex;
  align-items: end;
  gap: 5px;
  padding: 5px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 15px;
  background-color: ${(props) =>
    props.$active ? "var(--highlight)" : "transparent"};

  &:hover {
    background-color: ${(props) => (props.$active ? "" : "var(--highlight)")};
    color: ${(props) => (props.$active ? "" : "var(--text-light)")};
  }

  & svg {
    color: ${(props) =>
      props.$active ? "var(--text-dark)" : "var(--text-light)"};
    vertical-align: middle;
  }

  & p {
    color: ${(props) =>
      props.$active ? "var(--text-dark)" : "var(--text-light)"};
    font-weight: 500;
  }

  & span {
    display: block;
  }

  &:hover span {
    display: none;
  }

  & .toggle {
    display: none;
  }

  &:hover .toggle {
    display: block;
  }

  &:hover .actions {
    visibility: visible;
  }
`;

const BaseContent = styled.div`
  width: 100%;
  display: flex;
  align-items: end;
  justify-content: space-between;
`;

const BaseName = styled.div`
  display: flex;
  align-items: end;
  gap: 5px;
`;

const BaseActions = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
  visibility: hidden;

  & svg {
    cursor: pointer;
  }

  & svg:hover {
    color: var(--text-dark);
  }
`;

const PluginWrapper = styled.div`
  margin-top: 3px;
  margin-left: 15px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  font-size: 15px;
  color: var(--text-light);

  & svg {
    color: var(--text-light);
  }
`;

const PluginItems = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 5px;
  text-transform: capitalize;
  border-left: var(--border);

  &:hover {
    background-color: var(--highlight);
    border-radius: 10px;
  }

  & svg {
    vertical-align: middle;
  }
`;

const Skeleton = styled.div`
  margin-bottom: 5px;
  height: 25px;
  width: 100%;
  border-radius: 10px;
  background-color: var(--highlight);
  animation: ${pulse} 1.4s ease-in-out infinite;
`;

const CollapseToggle = styled.div`
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  vertical-align: middle;

  & svg {
    padding: 3px;
  }
`;

const PopOverContent = styled.div`
  height: 200px;
  width: 200px;
  background-color: var(--foreground);
  border: var(--border);
  box-shadow: var(--shadow);
  border-radius: 10px;
  padding: 10px;
`;

const DrawerOverlay = styled(Drawer.Overlay)`
  position: fixed;
  inset: 0;
  background-color: var(--overlay-bg);
  z-index: 50;
`;

const DrawerContent = styled(Drawer.Content)`
  background-color: var(--foreground);
  height: fit-content;
  max-height: 90vh;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  outline: none;
  z-index: 100;
  display: flex;
  flex-direction: column;
  border-top: var(--border);
`;

const DrawerHandle = styled.div`
  width: 50px;
  height: 5px;
  background-color: var(--highlight);
  border-radius: 10px;
  margin: 12px auto;
`;

const DrawerBody = styled.div`
  padding: 10px;
`;

type pluginDataType = {
  all_plugins: string[];
};

export default function ProductTree({
  icon,
  name,
  id,
  active,
  storeId,
  isOpen,
  onToggle,
  dropDownContent,
}: {
  icon: JSX.Element;
  name: string;
  id: string;
  active: boolean;
  storeId: string;
  dropDownContent: JSX.Element;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isMobile = useMediaQuery({ query: "(max-width: 992px)" });
  const [pluginsLoading, setPluginsLoading] = useState(true);

  const arr = Array.from({ length: 4 }).map((_, i) => i);

  const [plugins, setPlugins] = useState<pluginDataType>({
    all_plugins: [],
  });

  useEffect(() => {
    if (isOpen) {
      const getPlugins = async () => {
        const api = await fetch(`${url}/plugins/all/${id}`);
        const apiData = await api.json();
        setPlugins(apiData);
        setPluginsLoading(false);
      };
      getPlugins();
    }
  }, [id, isOpen]);

  return (
    <>
      <Base
        $active={active}
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
      >
        <CollapseToggle className="toggle">
          {isOpen ? (
            <CaretDownIcon size={21} weight="bold" />
          ) : (
            <CaretRightIcon size={21} weight="bold" />
          )}
        </CollapseToggle>

        <BaseContent>
          <BaseName>
            <span>{icon}</span>
            <p>{name}</p>
          </BaseName>

          {isMobile ? (
            <BaseActions className="actions">
              <Drawer.Root>
                <Drawer.Trigger asChild>
                  <DotsThreeIcon
                    size={20}
                    weight="bold"
                    onClick={(e) => e.stopPropagation()}
                  />
                </Drawer.Trigger>

                <Drawer.Portal>
                  <DrawerOverlay />
                  <DrawerContent>
                    <DrawerHandle />

                    <DrawerBody>Hi! I'm popover content.</DrawerBody>
                  </DrawerContent>
                </Drawer.Portal>
              </Drawer.Root>

              <Drawer.Root>
                <Drawer.Trigger asChild>
                  <PlusIcon
                    size={15}
                    weight="bold"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  />
                </Drawer.Trigger>

                <Drawer.Portal>
                  <DrawerOverlay />
                  <DrawerContent>
                    <DrawerHandle />

                    <DrawerBody>
                      <ProductPlugins productId={id} />
                    </DrawerBody>
                  </DrawerContent>
                </Drawer.Portal>
              </Drawer.Root>
            </BaseActions>
          ) : (
            <Popover
              isOpen={isPopoverOpen}
              positions={["bottom"]}
              reposition={false}
              padding={10}
              onClickOutside={() => setIsPopoverOpen(false)}
              content={
                <PopOverContent>
                  <div>Hi! I'm popover content.</div>
                </PopOverContent>
              }
            >
              <BaseActions className="actions">
                <DotsThreeIcon
                  size={20}
                  weight="bold"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsPopoverOpen(!isPopoverOpen);
                  }}
                />

                <PlusIcon
                  size={15}
                  weight="bold"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsModalOpen(true);
                  }}
                />
              </BaseActions>
            </Popover>
          )}
        </BaseContent>
      </Base>

      {isOpen ? (
        <PluginWrapper>
          {pluginsLoading ? (
            <>
              {arr.map((_, index) => (
                <Skeleton key={index}></Skeleton>
              ))}
            </>
          ) : plugins.all_plugins && plugins.all_plugins.length > 0 ? (
            plugins.all_plugins.map((plugin) => (
              <Link href={`/${storeId}/${id}/${plugin}`} key={plugin}>
                <PluginItems>
                  <span>
                    <FileIcon size={20} weight="duotone" />
                  </span>
                  <p>{plugin} page</p>
                </PluginItems>
              </Link>
            ))
          ) : (
            <p style={{ padding: "5px" }}>No plugins</p>
          )}
        </PluginWrapper>
      ) : (
        ""
      )}

      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(!isModalOpen)}
        center
      >
        <ProductPlugins productId={id} />
      </Modal>
    </>
  );
}
