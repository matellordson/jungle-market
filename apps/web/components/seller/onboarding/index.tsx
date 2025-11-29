"use client";

import styled from "styled-components";
import { Input, TextArea } from "../../reusable/input";
import Select from "react-select";
import { Button } from "../../reusable/button";
import { ImageIcon } from "@phosphor-icons/react/dist/icons/Image";
import { niche } from "./niche-options";
import { customStyles } from "../../reusable/react-select-styles";

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
  height: 120px;
  width: 100%;
  background-color: var(--bg-highlight);
  border-top-left-radius: var(--radius);
  border-top-right-radius: var(--radius);
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid var(--bg-border);

  svg {
    color: var(--text-icon);
  }
`;

const Logo = styled.div`
  height: 60px;
  width: 60px;
  border-radius: var(--radius);
  background-color: var(--bg-highlight);
  border: 1px solid var(--bg-border);
  margin: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Form = styled.div`
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
        <CoverPhoto>
          <ImageIcon size={32} />
          {/* <input type="file" accept="image/*" /> */}
        </CoverPhoto>
        <Logo>
          <ImageIcon size={20} />
        </Logo>
        <Form>
          <form action="">
            <FormField>
              <Input type="text" name="name" id="name" placeholder="Name" />
              <TextArea
                name="description"
                id="description"
                placeholder="Describe store"
              />
              <Select
                isMulti
                name="niche"
                options={niche}
                className="basic-multi-select"
                classNamePrefix="select"
                styles={customStyles}
                placeholder="Select niche"
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
