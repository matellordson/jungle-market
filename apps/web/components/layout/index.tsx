"use client";

import styled from "styled-components";
import SidebarLayout from "./sidebar";

const LayoutWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
`;

const SideBar = styled.div`
  display: none;
  height: 100%;
  width: 20%;
  background-color: var(--bg-foreground);
  border-right: 1px solid var(--bg-border);
  padding: var(--padding);

  @media only screen and (min-width: 992px) {
    display: block;
  }
`;

const PageWrapper = styled.div`
  height: 100%;
  width: 100%;

  @media only screen and (min-width: 992px) {
    width: 80%;
  }
`;

const Tab = styled.div`
  height: 5%;
  width: 100%;
  background-color: var(--bg-foreground);
  border-bottom: 1px solid var(--bg-border);
  padding: var(--padding);
`;

const Page = styled.div`
  padding: var(--padding);
  height: 95%;
`;

export function Layout({ page }: { page: React.ReactNode }) {
  return (
    <LayoutWrapper>
      <SideBar>
        <SidebarLayout />
      </SideBar>
      <PageWrapper>
        <Tab></Tab>
        <Page>{page}</Page>
      </PageWrapper>{" "}
    </LayoutWrapper>
  );
}
