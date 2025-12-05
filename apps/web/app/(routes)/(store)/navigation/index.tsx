"use client";

import { useRef, useState, useCallback } from "react";
import styled from "styled-components";
import { SidebarSimpleIcon } from "@phosphor-icons/react/SidebarSimple";

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
`;

const NavItemsWrapper = styled.div`
  height: 100vh;
  background-color: var(--foreground);
  flex-shrink: 0;
  border-right: var(--border);

  @media only screen and (min-width: 992px) {
    width: 0;
  }
`;

const DragHandler = styled.div`
  display: none;
  height: 100vh;
  width: 3px;
  cursor: ew-resize;

  @media only screen and (min-width: 992px) {
    display: block;
  }
`;

const TabWrapper = styled.div`
  height: 40px;
  width: 100%;
  background-color: blue;
  background-color: var(--foreground);
  border-bottom: var(--border);
  display: flex;
  align-items: center;
  padding: 0 10px;
  cursor: pointer;
`;

const SidebarToggle = styled.div`
  height: 30px;
  width: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;

  &:hover {
    background-color: var(--highlight);
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

export default function Navigation({
  children,
}: {
  children: React.ReactNode;
}) {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [isResizing, setIsResizing] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(300);
  const [sideBarOpen, setSideBarOPen] = useState(true);

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

  return (
    <Wrapper onMouseMove={onMouseMove} onMouseUp={onMouseUp}>
      {sideBarOpen ? (
        <NavItemsWrapper
          ref={sidebarRef}
          style={{ width: `${sidebarWidth}px` }}
        ></NavItemsWrapper>
      ) : (
        ""
      )}

      <DragHandler onMouseDown={onMouseDown} />

      <PageWrapper>
        <TabWrapper>
          <SidebarToggle>
            <SidebarSimpleIcon
              size={25}
              weight="duotone"
              onClick={() => {
                if (sideBarOpen) {
                  setSideBarOPen(false);
                } else {
                  setSideBarOPen(true);
                }
              }}
            />
          </SidebarToggle>
        </TabWrapper>
        {/* PageContent will dim in mobile view if sidebar is open */}
        <PageContent className={sideBarOpen ? "dim" : ""}>
          {children}
        </PageContent>
      </PageWrapper>
    </Wrapper>
  );
}
