import styled from "styled-components";
import { colors, media } from "../theme";

export const Container = styled.div`
  width: 100%;
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 2rem;

  ${media.mobile} {
    padding: 0 1.25rem;
  }
`;

export const Section = styled.section`
  padding: 6.5rem 0;
  background: ${({ $bg }) => $bg || "transparent"};

  ${media.tablet} {
    padding: 4.5rem 0;
  }
`;

export const Eyebrow = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: ${({ $onDark }) => ($onDark ? colors.accent : colors.accentDark)};

  &::before {
    content: "";
    width: 32px;
    height: 1px;
    background: currentColor;
  }
`;
