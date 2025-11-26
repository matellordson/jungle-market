"use client";
import styled from "styled-components";
import { Input, TextArea } from "../../reusable/input";
import { Button } from "../../reusable/button";

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const OnboardingCard = styled.div`
  width: 90vw;
  background-color: var(--bg-foreground);
  border: 1px solid var(--bg-border);
  border-radius: var(--radius);
  position: relative;

  @media only screen and (min-width: 500px) {
    & {
      width: 450px;
      max-width: 500px;
    }
  }
`;

const CoverPhoto = styled.div`
  height: 100px;
  width: 100%;
  background-color: var(--bg-background);
  border-top-left-radius: var(--radius);
  border-top-right-radius: var(--radius);
`;

const Logo = styled.div`
  height: 50px;
  width: 50px;
  border-radius: var(--radius);
  background-color: var(--bg-highlight);
  border: 1px solid var(--bg-border);
  position: absolute;
  top: 90px;
  left: 10px;
`;

const Form = styled.div`
  margin-top: 50px;
  padding: var(--padding);
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const FormFooter = styled.div`
  min-height: 50px;
  max-height: 50px;
  width: 100%;
  background-color: var(--bg-highlight);
  border-radius: var(--radius);
  border: 1px solid var(--bg-border);
  display: flex;
  align-items: center;
  justify-content: end;
  padding: var(--padding);
`;

export default function SellerOnboarding() {
  return (
    <Wrapper>
      <OnboardingCard>
        <CoverPhoto></CoverPhoto>
        <Logo></Logo>
        <Form>
          <form action="">
            <FormField>
              <Input type="text" name="name" id="name" placeholder="Name" />
              <TextArea
                name="description"
                id="description"
                placeholder="Describe store..."
              />
              <FormFooter>
                <Button type="submit">Create store</Button>
              </FormFooter>
            </FormField>
          </form>
        </Form>
      </OnboardingCard>
    </Wrapper>
  );
}
