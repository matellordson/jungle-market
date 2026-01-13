import { HouseIcon } from "@phosphor-icons/react/dist/icons/House";
import { ShoppingBagIcon } from "@phosphor-icons/react/dist/icons/ShoppingBag";
import { ReceiptIcon } from "@phosphor-icons/react/dist/icons/Receipt";
import { PresentationChartIcon } from "@phosphor-icons/react/dist/icons/PresentationChart";

import styled from "styled-components";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const Content = styled.div<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 3px;
  border-radius: 5px;
  padding: 5px;
  background-color: ${(props) => (props.$active ? "var(--highlight)" : "")};
  color: ${(props) => (props.$active ? "var(--text-dark)" : "")};

  & svg {
    color: ${(props) => (props.$active ? "var(--text-dark)" : "")};
  }

  & p {
    font-size: 15px;
    font-weight: 500;
  }

  &:hover {
    background-color: var(--highlight);
  }
`;

export default function NavItems() {
  const path = usePathname();

  const generalNavList = [
    {
      name: "Home",
      icon: <HouseIcon size={20} weight="duotone" />,
      href: "/",
    },
  ];

  const authenticatedNavList = [
    {
      name: "Product",
      icon: <ShoppingBagIcon size={20} weight="duotone" />,
      href: "/products",
    },
    {
      name: "Sale",
      icon: <ReceiptIcon size={20} weight="duotone" />,
      href: "/sales",
    },
    {
      name: "Analysis",
      icon: <PresentationChartIcon size={20} weight="duotone" />,
      href: "/analysis",
    },
  ];
  return (
    <Wrapper>
      <List>
        {generalNavList.map((list) => (
          <Link href={list.href} key={list.name}>
            <Content $active={path.endsWith(list.href)}>
              {list.icon}
              <p>{list.name}</p>
            </Content>
          </Link>
        ))}
      </List>

      <List>
        {authenticatedNavList.map((list) => (
          <Link href={list.href} key={list.name}>
            <Content $active={path.endsWith(list.href)}>
              {list.icon}
              <p>{list.name}</p>
            </Content>
          </Link>
        ))}
      </List>
    </Wrapper>
  );
}
