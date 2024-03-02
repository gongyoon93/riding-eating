import { PaletteOptions } from "@mui/material";
const Palette = (): PaletteOptions => {
  return {
    primary: {
      main: "#FF6415",
      dark: "",
    },
    secondary: {
      main: "#E3BA8A",
      dark: "",
    },
    background: {
      default: "#FFFFFFF",
      paper: "",
    },
    error: {
      main: "#FF4545",
      dark: "",
    },
    info: {
      main: "#1A1A1A",
      dark: "",
    },
    grey: {
      50: "#FCFCFC",
      100: "#EFEFEF",
      200: "#DFDFDF",
      300: "#B7B7B7",
      400: "#949494",
      500: "#777777",
      600: "#555555",
      700: "#3F3F3F",
      800: "#2A2A2A",
      900: "#1A1A1A",
    },
  };
};
export default Palette;
