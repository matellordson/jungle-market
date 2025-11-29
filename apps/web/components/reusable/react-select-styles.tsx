import { StylesConfig, CSSObjectWithLabel } from "react-select";

interface SelectOption {
  value: string;
  label: string;
  [key: string]: any;
}

export const customStyles: StylesConfig<SelectOption, true> = {
  control: (
    provided: CSSObjectWithLabel,
    state: { isFocused: boolean }
  ): CSSObjectWithLabel => ({
    ...provided,
    backgroundColor: "inherit",
    border: state.isFocused
      ? `1px solid var(--bg-border)`
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
    color: "var(--text-dark)",
    fontSize: "12px",
  }),

  option: (
    provided: CSSObjectWithLabel,
    state: { isSelected: boolean; isFocused: boolean }
  ): CSSObjectWithLabel => ({
    ...provided,
    fontSize: "12px",
    fontWeight: "bold",
    color: state.isSelected ? "var(--text-light)" : "var(--text-light)",
    backgroundColor: state.isSelected
      ? "var(--bg-highlight)"
      : state.isFocused
        ? "var(--bg-highlight)"
        : "none",
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
    padding: "2px 5px ",
    fontSize: "12px",
    fontWeight: "bold",
    margin: "2px",
    boxShadow: "var(--sm-shadow)",
    border: "1px solid var(--bg-border)",
  }),

  multiValueLabel: (provided: CSSObjectWithLabel): CSSObjectWithLabel => ({
    ...provided,
    color: "var(--text-light)",
    fontSize: "12px",
    padding: "5px 0px",
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
    color: "transparent",
    padding: "0 8px",
    "&:hover": {
      color: "var(--destructive-text)",
    },
  }),

  indicatorSeparator: (provided: CSSObjectWithLabel): CSSObjectWithLabel => ({
    ...provided,
    backgroundColor: "transparent",
    width: "1px",
  }),
};
