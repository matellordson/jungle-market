"use client";

import styled from "styled-components";
import NavItems from "./nav-items";

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
`;

const SidebarWrapper = styled.div`
  height: 100vh;
  width: 20%;
  border-right: var(--border);
  background-color: var(--foreground);
  padding: 10px;
`;

const PageWrapper = styled.div`
  height: 100vh;
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const HeaderWrapper = styled.div`
  height: 35px;
  width: 100%;
  background-color: var(--foreground);
  border-bottom: var(--border);
`;

const MainPageWrapper = styled.div`
  height: 100%;
  width: 100%;
  background-color: var(--background);
  padding: 10px;
  max-width: 1200px;
  margin: auto;
`;

const FooterWrapper = styled.div`
  height: 35px;
  width: 100%;
  background-color: var(--foreground);
  border-top: var(--border);
`;

export function StoreLayoutComp({ children }: { children: React.ReactNode }) {
  return (
    <Wrapper>
      <SidebarWrapper>
        <NavItems></NavItems>
      </SidebarWrapper>
      <PageWrapper>
        <HeaderWrapper></HeaderWrapper>
        <MainPageWrapper>{children}</MainPageWrapper>
        <FooterWrapper></FooterWrapper>
      </PageWrapper>
    </Wrapper>
  );
}
