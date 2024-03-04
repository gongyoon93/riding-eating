import FormContainer from "@/components/FormContainer";
import styled, { css, keyframes } from "styled-components";

interface StyledLabelProps {
  isError: boolean | null;
}

export const shake = keyframes`
  10%,
  90% {
    visibility: visible;
    transform: translate3d(-1px, 0, 0);
  }
  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }
  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }
  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
`;

export const errorAnimation = css`
  animation: ${shake} 0.65s linear 0.15s;
`;

//FormContainer를 콜백 함수 형태로 인자와 함께 전달 / 타입은 StyledLabelProps로 지정
export const ErrorLabel = styled(({ ...parentsProps }) => (
  <FormContainer.Label {...parentsProps} />
))<StyledLabelProps>`
  ${({ theme }) => theme.mixin.label(theme)};
  ${({ isError }) => {
    if (isError === null) {
      return css`
        visibility: hidden;
      `;
    }

    if (!isError) {
      return css`
        visibility: visible;
        color: #ff0000;
        ${errorAnimation}
      `;
    } else {
      return css`
        visibility: hidden;
        color: #ffffff;
      `;
    }
  }}
`;
