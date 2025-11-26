"use client";
import styled from "styled-components";
import { Input, TextArea } from "../../reusable/input";
import Select, { StylesConfig, CSSObjectWithLabel } from "react-select";
import { Button } from "../../reusable/button";
import { ImageIcon } from "@phosphor-icons/react/dist/icons/Image";

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
  background-color: var(--bg-foreground);
  border-top-left-radius: var(--radius);
  border-top-right-radius: var(--radius);
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    color: var(--text-icon);
  }
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
  display: flex;
  justify-content: center;
  align-items: center;
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
  const niche = [
    {
      value: "beauty",
      label: "Beauty ",
    },
    { value: "furniture", label: "Furniture" },
    { value: "pet_products", label: "Pet Products" },
    { value: "home", label: "Home" },
    { value: "gadgets", label: "Gadgets" },
    {
      value: "apparel",
      label: "Apparel",
    },
  ];

  interface SelectOption {
    value: string;
    label: string;
    [key: string]: any; // Allow for other properties on the option object
  }

  // Define the type for the entire customStyles object
  const customStyles: StylesConfig<SelectOption, true> = {
    control: (
      provided: CSSObjectWithLabel,
      state: { isFocused: boolean }
    ): CSSObjectWithLabel => ({
      ...provided,
      backgroundColor: "inherit",
      border: state.isFocused
        ? `1px solid var(--bg-highlight)`
        : `1px solid var(--bg-border)`,
      borderRadius: "var(--radius)",
      minHeight: "40px",
      boxShadow: "none",
      "&:hover": {
        borderColor: `var(--bg-border)`,
      },
    }),

    menu: (provided: CSSObjectWithLabel): CSSObjectWithLabel => ({
      ...provided,
      backgroundColor: "var(--bg-foreground)",
      borderRadius: "var(--radius)",
      border: "1px solid var(--bg-border)",
      zIndex: 100,
      padding: "5px 0",
    }),

    placeholder: (provided: CSSObjectWithLabel): CSSObjectWithLabel => ({
      ...provided,
      color: "var(--text-mute)",
      fontSize: "12px",
    }),

    singleValue: (provided: CSSObjectWithLabel): CSSObjectWithLabel => ({
      ...provided,
      color: "var(--text-neutral)",
      fontSize: "12px",
    }),

    option: (
      provided: CSSObjectWithLabel,
      state: { isSelected: boolean; isFocused: boolean }
    ): CSSObjectWithLabel => ({
      ...provided,
      fontSize: "12px",
      color: state.isSelected ? "var(--text-contrast)" : "var(--text-neutral)",
      backgroundColor: state.isSelected
        ? "var(--bg-highlight)"
        : state.isFocused
          ? "var(--bg-highlight)"
          : "var(--bg-default)",
      padding: "10px",
      borderRadius: "5px",
      cursor: "pointer",
      margin: "2px 5px",
      width: "calc(100% - 10px)",
      ":active": {
        ...provided[":active"],
        backgroundColor: "var(--bg-highlight)",
      },
    }),

    multiValue: (provided: CSSObjectWithLabel): CSSObjectWithLabel => ({
      ...provided,
      backgroundColor: "var(--bg-highlight)",
      borderRadius: "var(--radius)",
      padding: "2px 5px 2px 10px",
      fontSize: "12px",
      fontWeight: "bold",
      margin: "2px",
    }),

    multiValueLabel: (provided: CSSObjectWithLabel): CSSObjectWithLabel => ({
      ...provided,
      color: "var(--text-neutral)",
      fontSize: "12px",
      padding: "4px 8px",
    }),

    multiValueRemove: (
      provided: CSSObjectWithLabel,
      state: any
    ): CSSObjectWithLabel => ({
      ...provided,
      color: "var(--text-mute)",
      padding: "0 5px",
      "&:hover": {
        backgroundColor: "transparent",
        color: "var(--destructive-text)",
        cursor: "pointer",
      },
    }),

    dropdownIndicator: (
      provided: CSSObjectWithLabel,
      state: any
    ): CSSObjectWithLabel => ({
      ...provided,
      color: "var(--text-mute)",
      padding: "0 8px",
      "&:hover": {
        color: "var(--text-dark)",
      },
      "& > svg": {
        width: "16px",
        height: "16px",
      },
    }),

    clearIndicator: (
      provided: CSSObjectWithLabel,
      state: any
    ): CSSObjectWithLabel => ({
      ...provided,
      color: "var(--text-mute)",
      padding: "0 8px",
      "&:hover": {
        color: "var(--destructive-text)",
      },
    }),

    indicatorSeparator: (provided: CSSObjectWithLabel): CSSObjectWithLabel => ({
      ...provided,
      backgroundColor: "var(--bg-border)",
      width: "1px",
    }),
  };
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
                placeholder="Describe store..."
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
