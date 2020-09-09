import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    background: string;

    buttons: {
      primary: {
       text: string;
       background: string;
      };
      secondary: {
        text: string;
        background: string;
       };
    };

    footer: {
      background: string;
      text: string;
    };

    header: {
      background: string;
      text: string;
    };

    links: {
      primary: string;
      secondary: string;
    };

  }
}
