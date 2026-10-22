import React from "react";
import styled from "styled-components";
import { FiArrowRight } from "react-icons/fi";
import { responsive } from "../data/images";
import { colors, media } from "../theme";
import { Button } from "./Button";
import { Container, Eyebrow, Section } from "./Layout";

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 5rem;

  ${media.laptop} {
    gap: 3rem;
  }

  ${media.tablet} {
    grid-template-columns: 1fr;
  }
`;

const Text = styled.div`
  order: ${({ $reverse }) => ($reverse ? 2 : 1)};

  h2 {
    font-size: clamp(2rem, 4vw, 2.8rem);
    margin-bottom: 1.5rem;
  }

  p {
    margin-bottom: 1.2rem;
    color: ${colors.muted};
  }

  a {
    margin-top: 1rem;
  }

  ${media.tablet} {
    order: 2;
  }
`;

const ImageWrap = styled.div`
  position: relative;
  z-index: 0;
  order: ${({ $reverse }) => ($reverse ? 1 : 2)};

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    border: 2px solid ${colors.accent};
    transform: ${({ $reverse }) =>
      $reverse ? "translate(-24px, 24px)" : "translate(24px, 24px)"};
    z-index: -1;
  }

  img {
    width: 100%;
    height: 560px;
    object-fit: cover;
    object-position: center;
  }

  ${media.tablet} {
    order: 1;
    margin-right: 24px;

    img {
      height: 380px;
    }
  }
`;

const InfoSection = ({ data, background }) => (
  <Section $bg={background}>
    <Container>
      <Grid>
        <Text $reverse={data.reverse}>
          {data.eyebrow && <Eyebrow>{data.eyebrow}</Eyebrow>}
          <h2>{data.heading}</h2>
          {data.paragraphs.map((para) => (
            <p key={para.slice(0, 24)}>{para}</p>
          ))}
          <Button $variant="primary" to={data.path}>
            {data.btnLabel} <FiArrowRight />
          </Button>
        </Text>
        <ImageWrap $reverse={data.reverse}>
          <img
            {...responsive(data.image, "(max-width: 768px) 100vw, 600px")}
            alt={data.alt}
            loading="lazy"
            decoding="async"
          />
        </ImageWrap>
      </Grid>
    </Container>
  </Section>
);

export default InfoSection;
