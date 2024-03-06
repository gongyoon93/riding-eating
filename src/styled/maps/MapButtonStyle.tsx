import styled from "styled-components";
import FormContainer from "@/components/FormContainer";

export const MapMarkerLabel = styled(FormContainer.Label)`
  ${({ theme }) => theme.mixin.label(theme)};
`;

interface StyledMakerProps {
  isValidate?: boolean;
}

//FormContainer를 콜백 함수 형태로 인자와 함께 전달 / 타입은 StyledInputProps로 지정
export const MapMarker = styled(({ ...parentsProps }) => (
  <FormContainer.Input {...parentsProps} />
))<StyledMakerProps>`
  ${({ theme }) => theme.mixin.input(theme)};
`;
