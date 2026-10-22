import { createGlobalStyle } from "styled-components";
import { colors, fonts } from "./theme";

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
    -webkit-text-size-adjust: 100%;
  }

  body {
    font-family: ${fonts.body};
    font-size: 16px;
    line-height: 1.7;
    color: ${colors.text};
    background: ${colors.white};
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body.no-scroll {
    overflow: hidden;
  }

  h1, h2, h3, h4, h5 {
    font-family: ${fonts.heading};
    font-weight: 600;
    line-height: 1.2;
    letter-spacing: -0.01em;
  }

  img {
    display: block;
    max-width: 100%;
  }

  a {
    color: inherit;
  }

  button, input, select, textarea {
    font: inherit;
    color: inherit;
  }

  button {
    cursor: pointer;
  }

  main:focus {
    outline: none;
  }

  :focus-visible {
    outline: 2px solid ${colors.accent};
    outline-offset: 3px;
  }

  ::selection {
    background: ${colors.accent};
    color: ${colors.dark};
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
`;

export default GlobalStyle;
