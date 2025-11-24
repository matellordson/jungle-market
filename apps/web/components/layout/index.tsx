"use client";

import styled from "styled-components";

const LayoutWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
`;

const SideBar = styled.div`
  height: 100%;
  width: 20%;
  background-color: var(--bg-foreground);
  border-right: 1px solid var(--bg-border);
  padding: var(--padding);
`;

const PageWrapper = styled.div`
  height: 100%;
  width: 80%;
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
      <SideBar></SideBar>
      <PageWrapper>
        <Tab></Tab>
        <Page>{page}</Page>
      </PageWrapper>{" "}
    </LayoutWrapper>
  );
}
