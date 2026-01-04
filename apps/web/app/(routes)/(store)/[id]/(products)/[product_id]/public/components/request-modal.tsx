import { Modal } from "react-responsive-modal";
import { Button } from "../../../../../../../../components/button";
import { useRef, useState } from "react";
import styled from "styled-components";
import { VideoIcon } from "@phosphor-icons/react/dist/icons/Video";
import { ImageIcon } from "@phosphor-icons/react/dist/icons/Image";
import { ArrowUpIcon } from "@phosphor-icons/react/dist/icons/ArrowUp";

const Wrapper = styled.div`
  height: 300px;
  width: 600px;
`;

const Main = styled.div`
  height: 70%;
  width: 100%;
`;

const Footer = styled.div`
  height: 30%;
  width: 100%;
  background-color: var(--background);
  border-radius: 15px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  border: var(--border);
`;

const TitleInput = styled.input`
  height: 100%;
  border-radius: 5px;
  background-color: inherit;
  color: var(--text-dark);
  border: none;
  outline: none;
  padding: 3px 5px;
  font-size: 15px;
  font-weight: 500;
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MediaOptions = styled.div`
  width: fit-content;
  height: 100%;
  display: flex;
  gap: 10px;
  align-items: center;
`;

const MediaOption = styled.div`
  border: var(--border);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 7px;
  padding: 5px 10px;
  font-size: 15px;
  gap: 5px;
  cursor: pointer;

  & p {
    font-weight: 500;
  }

  &:hover {
    background-color: var(--foreground);
  }
`;

export default function RequestModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const titleRef = useRef<HTMLInputElement>(null);
  const mediaOptions = [
    {
      name: "Image",
      icon: <ImageIcon size={20} weight="duotone" />,
    },
    {
      name: "Video",
      icon: <VideoIcon size={20} weight="duotone" />,
    },
  ];
  return (
    <div>
      <Button onClick={() => setIsModalOpen(true)}>Public request</Button>
      <Modal
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          titleRef.current?.focus;
        }}
        center
      >
        <Wrapper>
          <Main></Main>
          <Footer>
            <TitleInput placeholder="Add Title" ref={titleRef} />
            <Actions>
              <MediaOptions>
                {mediaOptions.map((option) => (
                  <MediaOption>
                    {option.icon}
                    <p>{option.name}</p>
                  </MediaOption>
                ))}
              </MediaOptions>
              <Button>Publish</Button>
            </Actions>
          </Footer>
        </Wrapper>
      </Modal>
    </div>
  );
}
