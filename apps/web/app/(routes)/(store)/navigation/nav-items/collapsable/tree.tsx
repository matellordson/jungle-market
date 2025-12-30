"use client";

import { JSX, useState } from "react";
import styled from "styled-components";
import { CaretRightIcon } from "@phosphor-icons/react/CaretRight";
import { CaretDownIcon } from "@phosphor-icons/react/CaretDown";
import Link from "next/link";
import { DotsThreeIcon } from "@phosphor-icons/react/dist/icons/DotsThree";
import { PlusIcon } from "@phosphor-icons/react/dist/icons/Plus";
import { Drawer } from "vaul";
import { Popover } from "react-tiny-popover";
import { Modal } from "react-responsive-modal";
import { useMediaQuery } from "react-responsive";
import { ProductPlugins } from "./(product)/plugins";

const Base = styled.div<{ $active: boolean }>`
  display: flex;
  align-items: end;
  gap: 5px;
  padding: 5px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 15px;
  background-color: ${(props) =>
    props.$active ? "var(--accent-mute)" : "transparent"};
  border: ${(props) =>
    props.$active ? "    var(--accent-border)" : "transparent"};

  &:hover {
    background-color: ${(props) => (props.$active ? "" : "var(--highlight)")};
    color: ${(props) => (props.$active ? "" : "var(--text-light)")};
  }

  & svg {
    color: ${(props) =>
      props.$active ? "var(--accent)" : "var(--text-light)"};
    vertical-align: middle;
  }

  & p {
    color: ${(props) =>
      props.$active ? "var(--accent)" : "var(--text-light)"};
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

const SubordinateWrapper = styled.div`
  margin-top: 5px;
  margin-left: 30px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  font-size: 15px;
  color: var(--text-light);

  & svg {
    color: var(--text-light);
  }
`;

const SubordinateItems = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  border-radius: 10px;
  padding: 5px;

  &:hover {
    background-color: var(--highlight);
  }

  & svg {
    vertical-align: bottom;
  }
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

export default function NavTree({
  icon,
  name,
  subordinate,
  active,
  href,
  dropDownContent,
}: {
  icon: JSX.Element;
  name: string;
  subordinate?: {
    icon: JSX.Element;
    name: string;
    href: string;
  }[];
  active: boolean;
  href: string;
  dropDownContent: JSX.Element;
}) {
  const [open, setIsOpen] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isMobile = useMediaQuery({ query: "(max-width: 992px)" });

  return (
    <>
      <Base
        $active={active}
        onClick={() => {
          if (!open) {
            setIsOpen(true);
          } else {
            setIsOpen(false);
          }
        }}
      >
        <CollapseToggle className="toggle">
          {open ? (
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
                      <ProductPlugins />
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

      {open ? (
        <SubordinateWrapper>
          {subordinate?.map((item) => (
            <Link href={item.href} key={item.name}>
              <SubordinateItems>
                <span>{item.icon}</span>
                <p>{item.name}</p>
              </SubordinateItems>
            </Link>
          ))}
        </SubordinateWrapper>
      ) : (
        ""
      )}

      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(!isModalOpen)}
        center
      >
        <ProductPlugins />
      </Modal>
    </>
  );
}
