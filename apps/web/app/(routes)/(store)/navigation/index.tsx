"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import { SidebarSimpleIcon } from "@phosphor-icons/react/SidebarSimple";
import NavHead from "./head";
import Image from "next/image";

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  position: fixed;
`;

const NavItemsWrapper = styled.div`
  height: 100vh;
  background-color: var(--foreground);
  flex-shrink: 0;
  border-right: var(--border);
  padding: 10px;

  @media only screen and (min-width: 992px) {
    width: 0;
  }
`;

const DragHandler = styled.div`
  display: none;
  height: 100vh;
  width: 3px;
  cursor: ew-resize;

  &:hover {
    background-color: var(--highlight);
  }

  @media only screen and (min-width: 992px) {
    display: block;
  }
`;

const TabWrapper = styled.div`
  height: 40px;
  width: 100%;
  background-color: var(--foreground);
  border-bottom: var(--border);
  display: flex;
  align-items: center;
  padding: 0 10px;
`;

const SidebarToggle = styled.div`
  margin-left: 3px;
  height: 30px;
  width: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  cursor: pointer;

  & svg:hover {
    color: var(--text-dark);
  }
`;

const PageWrapper = styled.div`
  height: 100vh;
  width: 100%;
  background-color: var(--background);
`;

const PageContent = styled.div`
  padding: 20px;

  &.dim {
    opacity: 50%;
  }

  @media only screen and (min-width: 992px) {
    &.dim {
      opacity: 100%;
    }
  }
`;

const isDesktop = () =>
  typeof window !== "undefined" && window.innerWidth >= 992;

export default function Navigation({
  children,
}: {
  children: React.ReactNode;
}) {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [isResizing, setIsResizing] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(300);

  const [sideBarOpen, setSideBarOPen] = useState(() => {
    return isDesktop();
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 992) {
        setSideBarOPen(true);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const onMouseDown = () => {
    setIsResizing(true);
  };

  const onMouseUp = useCallback(() => {
    if (isResizing) {
      setIsResizing(false);
    }
  }, [isResizing]);

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isResizing || !sidebarRef.current) return;

      const newWidth = e.clientX;

      const MIN_WIDTH = 250;
      const MAX_WIDTH = 400;

      if (newWidth >= MIN_WIDTH && newWidth <= MAX_WIDTH) {
        setSidebarWidth(newWidth);
      }
    },
    [isResizing]
  );

  const toggleSidebar = () => {
    setSideBarOPen((prev) => !prev);
  };

  return (
    <Wrapper onMouseMove={onMouseMove} onMouseUp={onMouseUp}>
      {sideBarOpen && (
        <NavItemsWrapper
          ref={sidebarRef}
          style={{ width: `${sidebarWidth}px` }}
        >
          <NavHead storeName={"Dolce & Gabanna"} />
        </NavItemsWrapper>
      )}

      {sideBarOpen && <DragHandler onMouseDown={onMouseDown} />}

      <PageWrapper>
        <TabWrapper>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 537.799 623.019"
          >
            <path
              id="Path_1"
              data-name="Path 1"
              d="M606.968,292.418a267.892,267.892,0,0,1-7.329,62.517H380.721V646.371h-85.3V354.935H76.5a268.284,268.284,0,0,1-7.329-62.517q0-11.483.974-22.782H235.16L112.11,146.494A269.318,269.318,0,0,1,169.259,83L295.423,209.267V26.728a271.05,271.05,0,0,1,85.3,0V209.267L506.884,83a269.285,269.285,0,0,1,57.143,63.49L440.977,269.637H606Q606.971,280.928,606.968,292.418Z"
              transform="translate(-69.169 -23.352)"
              fill="var(--icon)"
            />
          </svg>

          <SidebarToggle>
            <SidebarSimpleIcon
              onClick={toggleSidebar}
              size={25}
              weight="duotone"
            />
          </SidebarToggle>
        </TabWrapper>

        <PageContent className={sideBarOpen ? "dim" : ""}>
          {children}
        </PageContent>
      </PageWrapper>
    </Wrapper>
  );
}
