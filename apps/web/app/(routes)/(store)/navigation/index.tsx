"use client";

import { useRef, useState, useCallback, useEffect, useMemo } from "react";
import styled, { css } from "styled-components";
import { SidebarSimpleIcon } from "@phosphor-icons/react/SidebarSimple";
import { HouseIcon } from "@phosphor-icons/react/House";
import NavHead from "./head";
import Product from "./nav-items/collapsable/product";
import { url } from "../../../../utils/url";
import SingleNavItem from "./nav-items/single";
import { usePathname } from "next/navigation";

const MOBILE_BREAKPOINT = 992;
const MIN_DESKTOP_WIDTH = 250;
const MAX_DESKTOP_WIDTH = 400;
const INITIAL_DESKTOP_WIDTH = 300;
const MOBILE_SIDEBAR_WIDTH = 80;
const MOBILE_MAX_WIDTH = 320;

const isDesktop = () =>
  typeof window !== "undefined" && window.innerWidth >= MOBILE_BREAKPOINT;

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  position: fixed;
  overflow: hidden;
  --sb-width: ${INITIAL_DESKTOP_WIDTH}px;

  &[data-sidebar-open="false"] .sidebar-container {
    margin-left: calc(var(--sb-width) * -1);
    opacity: 0;
    pointer-events: none;
  }

  @media only screen and (max-width: ${MOBILE_BREAKPOINT - 1}px) {
    &[data-sidebar-open="false"] .sidebar-container {
      margin-left: 0;
      transform: translateX(-100%);
      opacity: 1;
    }
    &[data-sidebar-open="true"] .sidebar-container {
      transform: translateX(0);
    }
  }
`;

const NavItemsWrapper = styled.div`
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
  transition:
    margin-left 0.3s ease-in-out,
    transform 0.3s ease-in-out,
    opacity 0.2s;
  width: ${MOBILE_SIDEBAR_WIDTH}vw;
  max-width: ${MOBILE_MAX_WIDTH}px;

  @media only screen and (min-width: ${MOBILE_BREAKPOINT}px) {
    position: static;
    width: var(--sb-width);
    max-width: none;
    transform: none !important;
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

const PageContent = styled.div`
  padding: 10px;
  flex-grow: 1;
  overflow-y: auto;
`;

export default function Navigation({
  children,
  storeId,
}: {
  children: React.ReactNode;
  storeId: string;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [storeName, setStoreName] = useState("");
  const pathName = usePathname();

  useEffect(() => {
    if (wrapperRef.current) {
      wrapperRef.current.setAttribute(
        "data-sidebar-open",
        isDesktop() ? "true" : "false"
      );
    }
  }, []);

  useEffect(() => {
    if (storeId) {
      fetch(`${url}/stores/${storeId}`)
        .then((res) => res.json())
        .then((data) => setStoreName(data.name))
        .catch(console.error);
    }
  }, [storeId]);

  const toggleSidebar = useCallback(() => {
    if (!wrapperRef.current) return;
    const current = wrapperRef.current.getAttribute("data-sidebar-open");
    wrapperRef.current.setAttribute(
      "data-sidebar-open",
      current === "true" ? "false" : "true"
    );
  }, []);

  const onMouseMove = useCallback((e: MouseEvent) => {
    if (wrapperRef.current) {
      const newWidth = e.clientX;
      if (newWidth >= MIN_DESKTOP_WIDTH && newWidth <= MAX_DESKTOP_WIDTH) {
        wrapperRef.current.style.setProperty("--sb-width", `${newWidth}px`);
      }
    }
  }, []);

  const stopResize = useCallback(() => {
    document.body.style.cursor = "default";
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", stopResize);
  }, [onMouseMove]);

  const onMouseDown = () => {
    document.body.style.cursor = "ew-resize";
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", stopResize);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        !isDesktop() &&
        wrapperRef.current?.getAttribute("data-sidebar-open") === "true"
      ) {
        if (
          sidebarRef.current &&
          !sidebarRef.current.contains(event.target as Node)
        ) {
          const toggleButton = document.getElementById("sidebar-toggle-btn");
          if (toggleButton?.contains(event.target as Node)) return;
          wrapperRef.current.setAttribute("data-sidebar-open", "false");
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Update active states by specifically checking the pathname
  const sidebarContent = useMemo(() => {
    const homeHref = `/${storeId}`;
    const productHref = `/${storeId}/product`;

    return (
      <>
        <NavHead storeName={storeName} />
        <SingleNavItem
          name="Home"
          icon={<HouseIcon size={21} weight="duotone" />}
          // Ensures /storeId matches exactly or /storeId/
          active={pathName === homeHref || pathName === `${homeHref}/`}
          href={`${homeHref}/`}
        />
        <Product
          active={pathName.startsWith(productHref)}
          href={productHref}
          storeId={storeId}
        />
      </>
    );
  }, [storeName, storeId, pathName]);

  return (
    <Wrapper ref={wrapperRef} data-sidebar-open="true">
      <NavItemsWrapper ref={sidebarRef} className="sidebar-container">
        {sidebarContent}
        <DragHandler onMouseDown={onMouseDown} />
      </NavItemsWrapper>

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
        <PageContent>{children}</PageContent>
      </PageWrapper>
    </Wrapper>
  );
}
