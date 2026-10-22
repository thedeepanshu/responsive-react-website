import React from "react";
import styled from "styled-components";
import { colors } from "../theme";
import { Eyebrow } from "./Layout";

const Wrapper = styled.div`
  max-width: 660px;
  margin: ${({ $center }) => ($center ? "0 auto 3.5rem" : "0 0 3.5rem")};
  text-align: ${({ $center }) => ($center ? "center" : "left")};
  color: ${({ $light }) => ($light ? colors.white : colors.text)};

  h2 {
    font-size: clamp(2rem, 4vw, 2.8rem);
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.05rem;
    color: ${({ $light }) => ($light ? "rgba(255,255,255,0.75)" : colors.muted)};
  }
`;

const SectionHeading = ({ eyebrow, title, subtitle, center, light }) => (
  <Wrapper $center={center} $light={light}>
    {eyebrow && <Eyebrow $onDark={light}>{eyebrow}</Eyebrow>}
    <h2>{title}</h2>
    {subtitle && <p>{subtitle}</p>}
  </Wrapper>
);

export default SectionHeading;
