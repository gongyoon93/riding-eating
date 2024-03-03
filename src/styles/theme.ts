import { Theme } from "@emotion/react";

const color = {
  main: "#FF1E00",
  second: "#59CE8F",
  gray: "#d2d2d2",
  fontMain: "#000000",
  fontSecond: "#ffffff",
};

const fontSize = {
  small: "14px",
  medium: "16px",
  title: "42px",
  subtitle: "20px",
};
const border = {
  primary: "#e5e7eb",
};

export type ColorsTypes = typeof color;
export type FontSizeTypes = typeof fontSize;
export type BordersTypes = typeof border;

const theme: Theme = {
  color,
  fontSize,
  border,
};

export default theme;
