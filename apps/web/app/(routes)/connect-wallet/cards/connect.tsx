"use client";
import styled from "styled-components";

const Background = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  height: 480px;
  opacity: 0.6;
  background: linear-gradient(to bottom, var(--accent), transparent);
`;

const CardWrapper = styled.div`
  position: absolute;
  height: 300px;
  width: 340px;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
  background-color: var(--foreground);
  border: var(--border);
  border-radius: 40px;
  padding: 5px;
  box-shadow: var(--shadow-bottom), var(--shadow-top);

  @media only screen and (min-width: 992px) {
    width: 400px;
  }
`;

const Content = styled.div`
  height: 80%;
  width: 100%;
  background-color: var(--background);
  border-radius: 35px;
  box-shadow: var(--shadow-bottom), var(--shadow-top);
`;

export function Connect() {
  return (
    <div>
      <Background />
      <CardWrapper>
        <Content></Content>
      </CardWrapper>
    </div>
  );
}
