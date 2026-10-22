import React from "react";
import styled from "styled-components";
import { FiArrowRight } from "react-icons/fi";
import { images, responsive } from "../data/images";
import { colors } from "../theme";
import { Button } from "./Button";
import { Container, Eyebrow } from "./Layout";

const Banner = styled.section`
  position: relative;
  padding: 7rem 0;
  overflow: hidden;
  color: ${colors.white};
  text-align: center;

  img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: rgba(0, 13, 26, 0.78);
  }
`;

const Content = styled(Container)`
  position: relative;
  z-index: 2;
  max-width: 760px;

  h2 {
    font-size: clamp(2rem, 4.5vw, 3rem);
    margin-bottom: 1rem;
  }

  p {
    margin-bottom: 2.2rem;
    font-size: 1.05rem;
    color: rgba(255, 255, 255, 0.8);
  }
`;

const Actions = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
`;

const CtaBanner = ({
  eyebrow = "Let's talk",
  title = "Ready to find your next home?",
  text = "Tell us what you're looking for and one of our consultants will put together a personal shortlist, free of charge.",
}) => (
  <Banner>
    <img {...responsive(images.onyx)} alt="" loading="lazy" decoding="async" />
    <Content>
      <Eyebrow $onDark>{eyebrow}</Eyebrow>
      <h2>{title}</h2>
      <p>{text}</p>
      <Actions>
        <Button $big to="/contact">
          Contact us <FiArrowRight />
        </Button>
        <Button $big $variant="outline" to="/buy">
          Browse homes
        </Button>
      </Actions>
    </Content>
  </Banner>
);

export default CtaBanner;
