"use client";

import styled from "styled-components";
import React, { JSX, useState } from "react";
import { FileIcon } from "@phosphor-icons/react/File";
import { TextAlignLeftIcon } from "@phosphor-icons/react/TextAlignLeft";
import { CaretCircleDownIcon } from "@phosphor-icons/react/CaretCircleDown";
import { UserListIcon } from "@phosphor-icons/react/UserList";
import { PenNibIcon } from "@phosphor-icons/react/PenNib";
import { PlayIcon } from "@phosphor-icons/react/Play";

const Wrapper = styled.div`
  max-width: 700px;
  margin: auto;
  margin-top: 40px;
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const NameWrapper = styled.div`
  display: flex;
  align-items: end;
  gap: 5px;
  padding: 0;

  & svg {
    margin: 0 -5px;
  }

  & input {
    margin-left: 5px;
  }
`;

const NameInput = styled.input`
  height: 40px;
  width: 100%;
  background-color: inherit;
  border: none;
  color: var(--text-dark);
  font-size: 30px;
  font-weight: bold;
  padding: 0;

  &::placeholder {
    font-size: 30px;
    font-weight: bold;
  }

  &:focus {
    outline: none;
  }
`;

const SummaryWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
`;

const SummaryInput = styled.input`
  width: 100%;
  background-color: inherit;
  border: none;
  color: var(--text-dark);
  font-size: 15px;
  padding: 5px 8px;
  border-radius: 5px;
  color: var(--text-light);
  max-width: 500px;
  cursor: auto;

  &:focus {
    outline: none;
    background-color: var(--accent-mute);
  }

  /* &:hover {
    background-color: var(--accent-mute);
  } */
`;

const OtherInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const OtherInput = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const OtherInputData = styled.div`
  display: flex;
  align-items: end;
  color: var(--text-light);
  font-size: 15px;
  gap: 5px;
`;

const OtherInputForm = styled(SummaryInput)`
  max-width: 300px;
`;

const MarkdownEditorWrapper = styled.div`
  margin-top: 40px;
  height: 400px;
  width: 100%;
  border: var(--border);
  border-radius: 10px;
`;

const MarkDownEditorPanel = styled.div`
  background-color: var(--foreground);
  height: 40px;
  width: 100%;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  padding: 0 5px;
`;

const MarkDownEditorTabWrapper = styled.div`
  height: 100%;
  width: fit-content;
  display: flex;
  align-items: center;
  border-radius: 5px;
  gap: 3px;
`;

const MarkDownEditorTabs = styled.div`
  display: flex;
  align-items: center;
  padding: 4px;
  cursor: pointer;
  border-radius: 5px;

  &.active {
    background-color: var(--accent-mute);
  }

  &.active svg {
    color: var(--accent);
  }

  &:hover {
    background-color: var(--highlight);
  }
`;

const MarkDownEditorContentWrapper = styled.div`
  padding: 10px;
`;

interface otherInputsType {
  icon: JSX.Element;
  name: string;
}

interface markdownTabsType {
  icon: JSX.Element;
  name: string;
}

const otherInputs: otherInputsType[] = [
  {
    icon: <CaretCircleDownIcon size={19} weight="duotone" />,
    name: "Priority",
  },
  {
    icon: <UserListIcon size={19} weight="duotone" />,
    name: "Owners",
  },
];

const markDownTabs: markdownTabsType[] = [
  {
    icon: <PenNibIcon size={20} weight="duotone" />,
    name: "Editor",
  },
  {
    icon: <PlayIcon size={20} weight="duotone" />,
    name: "Preview",
  },
];

export default function NewEssential() {
  const [editorTab, setEditorTab] = useState("Editor");

  return (
    <Wrapper>
      <form action="">
        <FormWrapper>
          <NameWrapper>
            <FileIcon size={40} weight="duotone" />
            <NameInput placeholder="New essential" />
          </NameWrapper>

          <SummaryWrapper>
            <TextAlignLeftIcon size={20} weight="duotone" />
            <SummaryInput placeholder="Describe essential" />
          </SummaryWrapper>
          <OtherInputWrapper>
            {otherInputs.map((input) => (
              <OtherInput key={input.name}>
                <OtherInputData>
                  {input.icon}
                  {input.name}
                </OtherInputData>
                <OtherInputForm />
              </OtherInput>
            ))}
          </OtherInputWrapper>
        </FormWrapper>

        <MarkdownEditorWrapper>
          <MarkDownEditorPanel>
            <MarkDownEditorTabWrapper>
              {markDownTabs.map((tab) => (
                <MarkDownEditorTabs
                  key={tab.name}
                  onClick={() => setEditorTab(tab.name)}
                  className={editorTab == tab.name ? "active" : ""}
                >
                  {tab.icon}
                </MarkDownEditorTabs>
              ))}
            </MarkDownEditorTabWrapper>
          </MarkDownEditorPanel>

          <MarkDownEditorContentWrapper>
            {editorTab == "Editor" ? <p>Editor Tab</p> : <p>Preview Tab</p>}
          </MarkDownEditorContentWrapper>
        </MarkdownEditorWrapper>
      </form>
    </Wrapper>
  );
}
