import styled from "styled-components";
import { CaretCircleDownIcon } from "@phosphor-icons/react/CaretCircleDown";

const Wrapper = styled.div`
  width: 100%;
`;

const StoreProfile = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StoreInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 5px;
  padding: 5px;
  border-radius: 10px;
  cursor: pointer;

  & svg {
    cursor: pointer;
  }

  &:hover {
    background-color: var(--highlight);
  }
`;

const StoreImage = styled.div`
  height: 25px;
  width: 25px;
  border-radius: 7px;
  border: var(--border);
`;

const StoreName = styled.p`
  font-size: 16px;
  padding-left: 7px;
  font-weight: 500;
  color: var(--text-light);
`;

export default function NavHead({ storeName }: { storeName: string }) {
  return (
    <Wrapper>
      <StoreInfo>
        <StoreProfile>
          <StoreImage></StoreImage>
          <StoreName>{storeName}</StoreName>
        </StoreProfile>
      </StoreInfo>
    </Wrapper>
  );
}
