"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import styled, { css } from "styled-components";
import { SidebarSimpleIcon } from "@phosphor-icons/react/SidebarSimple";
import { HouseIcon } from "@phosphor-icons/react/House";
import NavHead from "./head";
import Essentials from "./nav-items/collapsable/essentials";
import { url } from "../../../../utils/url";
import SingleNavItem from "./nav-items/single";
import { usePathname } from "next/navigation";

const MOBILE_BREAKPOINT = 992;
const MIN_DESKTOP_WIDTH = 250;
const MAX_DESKTOP_WIDTH = 400;
const INITIAL_DESKTOP_WIDTH = 300;
const MOBILE_SIDEBAR_WIDTH = 80;

const isDesktop = () =>
  typeof window !== "undefined" && window.innerWidth >= MOBILE_BREAKPOINT;

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  position: fixed;
  overflow: hidden;
`;

const NavItemsWrapper = styled.div<{ $isMobileOpen: boolean }>`
  height: 100vh;
  background-color: var(--foreground);
  flex-shrink: 0;
  border-right: var(--border);
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  transform: translateX(-100%);
  transition:
    transform 0.3s ease-in-out,
    width 0.3s ease-in-out;
  width: ${MOBILE_SIDEBAR_WIDTH}vw;

  ${(props) =>
    props.$isMobileOpen &&
    css`
      transform: translateX(0);
    `}

  @media only screen and (min-width: ${MOBILE_BREAKPOINT}px) {
    position: static;
    transform: translateX(0);
    transition: none;
  }
`;

const DragHandler = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: 5px;
  cursor: ew-resize;
  background-color: transparent;
  z-index: 101;

  display: none;
  @media only screen and (min-width: ${MOBILE_BREAKPOINT}px) {
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
  flex-shrink: 0;
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
  display: flex;
  flex-direction: column;
  position: relative;
`;

const PageContent = styled.div<{ $sidebarOpen: boolean }>`
  padding: 20px;
  flex-grow: 1;
  overflow-y: auto;

  ${(props) =>
    props.$sidebarOpen &&
    css`
      @media only screen and (max-width: ${MOBILE_BREAKPOINT - 1}px) {
        opacity: 0.5;
        pointer-events: none;
      }
    `}
`;

export default function Navigation({
  children,
  storeId,
}: {
  children: React.ReactNode;
  storeId: string;
}) {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [sidebarWidth, setSidebarWidth] = useState(INITIAL_DESKTOP_WIDTH);
  const [sideBarOpen, setSideBarOpen] = useState(() => isDesktop());
  const isResizingRef = useRef(false);
  const [storeName, setStoreName] = useState();
  const pathName = usePathname();

  useEffect(() => {
    if (storeId) {
      const getStoreName = async () => {
        const storeApi = await fetch(`${url}/stores/${storeId}`);
        const storeData = await storeApi.json();
        setStoreName(storeData.name);
      };
      getStoreName();
    }
  });

  const onMouseMove = useCallback((e: MouseEvent) => {
    if (!isResizingRef.current || !isDesktop()) return;

    const newWidth = e.clientX;
    if (newWidth >= MIN_DESKTOP_WIDTH && newWidth <= MAX_DESKTOP_WIDTH) {
      setSidebarWidth(newWidth);
    }
  }, []);

  const stopResize = useCallback(() => {
    if (!isResizingRef.current) return;

    isResizingRef.current = false;
    document.body.style.cursor = "default";

    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", stopResize);
  }, [onMouseMove]);

  const onMouseDown = () => {
    if (!isDesktop() || !sideBarOpen) return;

    isResizingRef.current = true;
    document.body.style.cursor = "ew-resize";

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", stopResize);
  };

  useEffect(() => {
    const handleResize = () => {
      if (!isDesktop()) setSideBarOpen(false);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setSideBarOpen((prev) => !prev);
  };

  /*
    MOBILE SIDEBAR AUTO-CLOSE:
    - We store a ref (sidebarRef) that always points to the sidebar DOM element.
    - When the user taps anywhere on the page, we check:
        1. Sidebar is open
        2. Screen is in mobile mode
        3. The click target is NOT inside the sidebar
        4. The click target is NOT the toggle button
    - If all conditions pass → sidebar closes.
    - Using useRef avoids stale references and ensures accurate detection of clicks
      even when the sidebar re-renders or animates.
  */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!isDesktop() && sideBarOpen) {
        if (
          sidebarRef.current &&
          !sidebarRef.current.contains(event.target as Node)
        ) {
          const toggleButton = document.getElementById("sidebar-toggle-btn");

          if (
            toggleButton &&
            (toggleButton.contains(event.target as Node) ||
              event.target === toggleButton)
          ) {
            return;
          }

          setSideBarOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [sideBarOpen]);

  // routes for Nav Tree
  const essentialsHref = `/${storeId}/essentials`;
  const isEssentialsActive = pathName.startsWith(essentialsHref);

  return (
    <Wrapper>
      {sideBarOpen && (
        <NavItemsWrapper
          ref={sidebarRef}
          style={
            isDesktop()
              ? { width: `${sidebarWidth}px` }
              : { width: `${MOBILE_SIDEBAR_WIDTH}vw` }
          }
          $isMobileOpen={sideBarOpen}
        >
          <NavHead storeName={storeName!} />
          <SingleNavItem
            name="Home"
            icon={<HouseIcon size={21} weight="duotone" />}
            active={`/${storeId}` === `${pathName}`}
            href={`/${storeId}/`}
          />
          <Essentials
            active={isEssentialsActive}
            href={`/${storeId}/essentials`}
          />
          {isDesktop() && <DragHandler onMouseDown={onMouseDown} />}
        </NavItemsWrapper>
      )}

      <PageWrapper>
        <TabWrapper>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 537.799 623.019"
          >
            <path
              d="M606.968,292.418a267.892,267.892,0,0,1-7.329,62.517H380.721V646.371h-85.3V354.935H76.5a268.284,268.284,0,0,1-7.329-62.517q0-11.483.974-22.782H235.16L112.11,146.494A269.318,269.318,0,0,1,169.259,83L295.423,209.267V26.728a271.05,271.05,0,0,1,85.3,0V209.267L506.884,83a269.285,269.285,0,0,1,57.143,63.49L440.977,269.637H606Q606.971,280.928,606.968,292.418Z"
              transform="translate(-69.169 -23.352)"
              fill="var(--icon)"
            />
          </svg>

          <SidebarToggle id="sidebar-toggle-btn">
            <SidebarSimpleIcon
              onClick={toggleSidebar}
              size={25}
              weight="duotone"
            />
          </SidebarToggle>
        </TabWrapper>

        <PageContent $sidebarOpen={sideBarOpen}>{children}</PageContent>
      </PageWrapper>
    </Wrapper>
  );
}
