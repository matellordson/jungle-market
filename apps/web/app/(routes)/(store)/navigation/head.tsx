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

  & svg {
    cursor: pointer;
  }

  & svg:hover {
    color: var(--text-dark);
  }
`;

const StoreImage = styled.div`
  height: 30px;
  width: 30px;
  background-color: var(--highlight);
  border-radius: 7px;
`;

const StoreName = styled.p`
  font-size: 17px;
  padding-left: 7px;
`;

const SearchInput = styled.input`
  margin-top: 15px;
  width: 100%;
  max-width: 300px;
  height: 35px;
  padding: 0px 10px;
  border: var(--border);
  font-family: inherit;
  font-size: 14px;
  border-radius: 10px;
  color: var(--text-dark);
  background-color: var(--highlight);
  opacity: 50%;

  &:focus {
    outline: none;
    opacity: 100%;
  }

  &:disabled {
    cursor: not-allowed;
  }

  &::placeholder {
    color: var(--text-dark);
    opacity: 70%;
  }
`;

export default function NavHead({ storeName }: { storeName: string }) {
  return (
    <Wrapper>
      <StoreInfo>
        <StoreProfile>
          <StoreImage></StoreImage>
          <StoreName>{storeName}</StoreName>
        </StoreProfile>
        <CaretCircleDownIcon size={25} weight="duotone" />
      </StoreInfo>
      <SearchInput placeholder="Search"></SearchInput>
    </Wrapper>
  );
}
