import { css } from "styled-components";

export const buttonDisabled = css`
  cursor: unset;
  color: ${({ theme }) => theme.color.gray};
  background-color: unset;
  &:not(:hover) {
    transition:
      color 0.8s,
      font-weight 0.8s,
      border 0.8s;
  }
  &:hover {
    color: ${({ theme }) => theme.color.gray};
    border: 1px solid ${({ theme }) => theme.color.gray};
    background-color: unset;
  }
`;

export const buttonAbled = css`
  color: ${({ theme }) => theme.color.main};
  font-weight: 900;
  border: 1px solid ${({ theme }) => theme.color.main};
  &:not(:hover) {
    transition:
      color 0.8s,
      font-weight 0.8s,
      border 0.8s;
  }
  &:hover {
    color: ${({ theme }) => theme.color.fontSecond};
    border: 1px solid ${({ theme }) => theme.color.main};
    background-color: ${({ theme }) => theme.color.main};
  }
  &:active {
    color: ${({ theme }) => theme.color.main};
    border: 1px solid ${({ theme }) => theme.color.main};
    background-color: unset;
  }
`;
