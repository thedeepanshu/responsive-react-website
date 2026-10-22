import { keyframes } from "styled-components";

export const colors = {
  dark: "#000d1a",
  darkSoft: "#0c1b2c",
  accent: "#cd853f",
  accentDark: "#9a5f24",
  accentSoft: "#f7ede2",
  cream: "#faf7f2",
  white: "#ffffff",
  text: "#1f2933",
  muted: "#5f6b7a",
  border: "#e8e2d9",
  success: "#2f855a",
  error: "#c53030",
};

export const fonts = {
  heading: "'Playfair Display', Georgia, serif",
  body: "'Montserrat', system-ui, -apple-system, 'Segoe UI', sans-serif",
};

export const media = {
  laptop: "@media screen and (max-width: 1024px)",
  nav: "@media screen and (max-width: 900px)",
  tablet: "@media screen and (max-width: 768px)",
  mobile: "@media screen and (max-width: 480px)",
};

export const shadow = {
  soft: "0 10px 30px -12px rgba(0, 13, 26, 0.18)",
  strong: "0 30px 60px -25px rgba(0, 13, 26, 0.35)",
};

export const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: none; }
`;

export const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;
