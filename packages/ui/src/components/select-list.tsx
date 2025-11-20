import { ArrowRightIcon } from "@phosphor-icons/react/dist/icons/ArrowRight";
import styled from "styled-components";

export const SelectListWrapper = styled.div``;

export const SelectListItem = styled.div`
  padding: var(--padding) 0;
  border-radius: var(--radius);
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;

  &:hover {
    transition: all 0.4s ease;
    background-color: var(--bg-highlight);
    padding: var(--padding);
    margin: 0 5px;

    & .select-list-icon {
      transition: all 0.4s ease;
      opacity: 1;
    }
  }
`;

export const SelectListDetails = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
`;

export const SelectListImage = styled.div`
  height: 40px;
  width: 40px;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--bg-border);
  overflow: hidden;
`;

export const SelectListTitle = styled.p`
  font-weight: var(--text-bold);
  display: flex;
  align-items: center;
  gap: 7px;
`;

export const SelectListIcon = styled.div`
  opacity: 0;
  color: var(--text-icon);
`;

export default function SelectList() {
  return (
    <SelectListWrapper>
      <SelectListItem>
        <SelectListDetails>
          <SelectListImage></SelectListImage>
          <SelectListTitle>Metamask</SelectListTitle>
        </SelectListDetails>
        <SelectListIcon className="select-list-icon">
          <ArrowRightIcon size={20} weight="bold" />
        </SelectListIcon>
      </SelectListItem>

      <SelectListItem>
        <SelectListDetails>
          <SelectListImage></SelectListImage>
          <SelectListTitle>Wallet Connect</SelectListTitle>
        </SelectListDetails>
        <SelectListIcon className="select-list-icon">
          <ArrowRightIcon size={20} weight="bold" />
        </SelectListIcon>
      </SelectListItem>

      <SelectListItem>
        <SelectListDetails>
          <SelectListImage></SelectListImage>
          <SelectListTitle>Coinbase</SelectListTitle>
        </SelectListDetails>
        <SelectListIcon className="select-list-icon">
          <ArrowRightIcon size={20} weight="bold" />
        </SelectListIcon>
      </SelectListItem>
    </SelectListWrapper>
  );
}
