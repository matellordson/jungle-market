"use client";

import styled from "styled-components";
import { Button } from "../../../../components/button";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Container = styled.div`
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: end;
  position: relative;
  margin: 0 auto;
`;

const Image = styled.div`
  height: 100%;
  width: 500px;
  background-color: var(--foreground);
  border-radius: 10px;
  border: var(--border);
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 500px;
  gap: 10px;
  position: absolute;
  padding: 15px;
`;

const Heading = styled.p`
  font-size: 25px;
  color: var(--text-dark);
  font-weight: 500;
  z-index: 1;
`;

const Paragraph = styled.p`
  font-size: 15px;
`;

export default function NoStore() {
  return (
    <Wrapper>
      <Container>
        <Image></Image>
        <Content>
          <Heading>Get your store started!</Heading>
          <Paragraph>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt culpa
            aliquam nam est et consectetur?
          </Paragraph>
          <Button>Create store</Button>
        </Content>
      </Container>
    </Wrapper>
  );
}
