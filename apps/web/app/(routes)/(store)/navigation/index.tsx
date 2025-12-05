"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import { SidebarIcon } from "@phosphor-icons/react/Sidebar";

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
  background-color: var(--foreground);
  border-bottom: var(--border);
  display: flex;
  align-items: center;
  padding: 0 10px;
`;

const SidebarToggle = styled.div`
  height: 30px;
  width: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  cursor: pointer;
  color: var(--text-light);

  &:hover {
    background-color: var(--highlight);
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
        ></NavItemsWrapper>
      )}

      {sideBarOpen && <DragHandler onMouseDown={onMouseDown} />}

      <PageWrapper>
        <TabWrapper>
          <SidebarToggle>
            <SidebarIcon onClick={toggleSidebar} size={25} weight="duotone" />
          </SidebarToggle>
        </TabWrapper>

        <PageContent className={sideBarOpen ? "dim" : ""}>
          {children}
        </PageContent>
      </PageWrapper>
    </Wrapper>
  );
}
