import styled from "styled-components";
import { ButtonElement } from "../../components/button";

const PromptWrapper = styled.div`
  width: 100%;
  background-color: var(--background);
  border-radius: 10px;
  padding: 10px;

  border: var(--border);
  transition: all 0.3s ease;
`;

const PromptTitle = styled.p`
  color: var(--text-dark);
  font-size: 17px;
  font-weight: 500;
`;

const PromptDesc = styled.p`
  font-size: 14px;
  padding-top: 5px;
`;

const PromptButtons = styled.div`
  margin-top: 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;

const PromptCancel = styled(ButtonElement)`
  padding: 10px 0px;
  width: 100%;
`;

const PromptConfirm = styled(ButtonElement)`
  padding: 10px 0px;
  width: 100%;
  background-color: var(--accent);
  color: #ffffff;
`;

export default function ConfirmPrompt() {
  return (
    <PromptWrapper>
      <PromptTitle>Confirm selected role</PromptTitle>
      <PromptDesc>
        By switching role you will loose all previous data from already existing
        role.
      </PromptDesc>
      <PromptButtons>
        <PromptCancel>Cancel</PromptCancel>
        <PromptConfirm>Confirm</PromptConfirm>
      </PromptButtons>
    </PromptWrapper>
  );
}
