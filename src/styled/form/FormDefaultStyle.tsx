import styled from "styled-components";
import FormContainer from "@/components/FormContainer";
import { buttonAbled, buttonDisabled } from "./FormButtonStyle";

export const AuthTitleLabel = styled(FormContainer.Label)`
  ${({ theme }) => theme.mixin.label(theme)};
`;

interface StyledInputProps {
  isValidate?: boolean;
}

//FormContainer를 콜백 함수 형태로 인자와 함께 전달 / 타입은 StyledInputProps로 지정
export const AuthInput = styled(({ ...parentsProps }) => (
  <FormContainer.Input {...parentsProps} />
))<StyledInputProps>`
  ${({ theme }) => theme.mixin.input(theme)};
`;

export const AuthButton = styled(FormContainer.Button)`
  ${({ theme }) => theme.mixin.button(theme)};
  width: 100%;
  margin: 1rem auto;
  ${({ disabled }) => (disabled ? buttonDisabled : buttonAbled)}
`;
