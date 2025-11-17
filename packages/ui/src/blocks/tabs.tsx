import { JSX, useState } from "react";
import { styled } from "styled-components";

interface TabItem {
  key: string;
  name: string;
  icon: JSX.Element;
  content: JSX.Element;
}

interface TabsProps {
  tabsData: TabItem[];
}

const TabWrapper = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  padding: 5px;
  box-sizing: border-box;
`;

const Tab = styled.div`
  height: 30px;
  width: fit-content;
  margin: 0 auto;
  background-color: var(--bg-back);
  border-radius: var(--sm-radius);
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 11px;
  font-weight: var(--text-bold);
  padding: 2px;
  gap: 5px;
  border: 1px solid var(--bg-border);

  & div {
    width: 80px;
    height: 100%;
    border-radius: 7px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: all 0.4s ease;
    gap: 3px;
    color: var(--text-neutral);
  }

  & div:hover {
    opacity: 90%;
  }

  & .active {
    background-color: var(--bg-front);
    box-shadow: var(--sm-shadow);
    color: var(--text-dark);
  }
`;

const TabContent = styled.div`
  min-height: 300px;
  margin-top: 10px;
  border-radius: var(--sm-radius);
  background-color: var(--bg-front);
  border: 1px solid var(--bg-border);
  padding: var(--page-padding);
  position: relative;

  & main {
    display: none;
  }

  & main.active {
    display: block;
    position: relative;
  }
`;

export default function Tabs({ tabsData }: TabsProps) {
  const [tab, setTabState] = useState<string>(tabsData[0]?.key || "");

  if (!tabsData || tabsData.length === 0) {
    return <TabWrapper>No tabs data provided.</TabWrapper>;
  }

  return (
    <TabWrapper>
      <Tab>
        {tabsData.map((tabItem) => (
          <div
            key={tabItem.key}
            className={tab === tabItem.key ? "active" : ""}
            onClick={() => setTabState(tabItem.key)}
          >
            {tabItem.icon}
            {tabItem.name}
          </div>
        ))}
      </Tab>

      <TabContent>
        {tabsData.map((tabItem) => (
          <main
            key={tabItem.key}
            className={tab === tabItem.key ? "active" : ""}
          >
            {tabItem.content}
          </main>
        ))}
      </TabContent>
    </TabWrapper>
  );
}
