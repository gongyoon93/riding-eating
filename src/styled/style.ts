import { DefaultTheme } from "styled-components";

export const style: DefaultTheme = {
  color: {
    main: "#FF1E00",
    second: "#59CE8F",
    gray: "#d2d2d2",
    fontMain: "#000000",
    fontSecond: "#ffffff",
  },
  mixin: {
    form: () => {
      return `
        display: flex;
        flex-direction: column;
      `;
    },
    label: (theme: DefaultTheme) => {
      return `
        font-size: 1.5rem;
        font-weight: bolder;
        color: ${theme.color.fontMain};
        margin-top: 1rem;
      `;
    },
    input: () => {
      return `
        border: 0;
        font-size: 1.5rem;
        padding: 0;
        margin: 0;
        outline: unset;
      `;
    },
    textarea: () => {
      return `
        border: 0;
        font-size: 1.5rem;
        padding: 0;
        margin: 0;
        resize: none;
        height: 15rem;
        outline: unset;
        &::placeholder {
          font-size: 1.5rem;
        }
      `;
    },
    button: (theme: DefaultTheme) => {
      return `
      cursor: pointer;
      padding: 1rem 1.5rem;
      border: 1px solid ${theme.color.gray};
      border-radius: 0.5rem;
      background-color: unset;
      font-size: 1.5rem;
      color: ${theme.color.fontMain};
      align-self: flex-end;
      &:hover {
        color: ${theme.color.fontSecond};
        background-color: ${theme.color.gray};
      }
      `;
    },
  },
};
