import { DefaultTheme } from "styled-components";
import { Styles } from "react-modal";

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

export const customModalStyle: Styles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    width: "100%",
    height: "100vh",
    zIndex: 1032,
    position: "fixed",
    top: 0,
    left: 0,
  },
  content: {
    width: "75%",
    maxWidth: "800px",
    height: "70vh",
    maxHeight: "680px",
    zIndex: 1033,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    border: `2px solid #59CE8F`,
    borderRadius: "10px",
    boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.25)",
    backgroundColor: "white",
    justifyContent: "center",
    overflow: "auto",
  },
};
