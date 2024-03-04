import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    color: {
      main: string;
      second: string;
      gray: string;
      fontMain: string;
      fontSecond: string;
    };

    mixin: {
      form: () => string;
      label: (theme: DefaultTheme) => string;
      input: (theme: DefaultTheme) => string;
      button: (theme: DefaultTheme) => string;
      textarea: () => string;
    };
  }
}
