import React from "react";
import styled from "styled-components";
import { FiArrowRight } from "react-icons/fi";
import { ContainerData } from "../data/FullContainerData";
import { responsive } from "../data/images";
import { colors, media, shadow } from "../theme";
import { Button } from "./Button";
import { Eyebrow } from "./Layout";

const BigContainer = styled.section`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1.3fr;
  align-items: center;
  min-height: 600px;
  padding: 5rem 0;
  background: ${colors.dark};

  ${media.tablet} {
    grid-template-columns: 1fr;
    padding: 0;
  }
`;

const Leftbox = styled.div`
  position: relative;
  z-index: 2;
  margin-right: -8rem;
  margin-left: max(2rem, calc((100vw - 1240px) / 2 + 2rem));
  padding: 4rem;
  background: ${colors.white};
  box-shadow: ${shadow.strong};

  h2 {
    font-size: clamp(2rem, 4vw, 2.8rem);
  }

  p {
    margin: 1.3rem 0;
    color: ${colors.muted};
  }

  ${media.tablet} {
    order: 2;
    margin: -4rem 1.25rem 4rem;
    padding: 2.5rem 1.8rem;
  }
`;

const Rightbox = styled.div`
  height: 100%;

  img {
    width: 100%;
    height: 100%;
    min-height: 520px;
    object-fit: cover;
    object-position: center;
  }

  ${media.tablet} {
    order: 1;

    img {
      min-height: 360px;
    }
  }
`;

const FullContainer = () => (
  <BigContainer>
    <Leftbox>
      <Eyebrow>{ContainerData.eyebrow}</Eyebrow>
      <h2>{ContainerData.title}</h2>
      <p>{ContainerData.paraOne}</p>
      <p>{ContainerData.paraTwo}</p>
      <Button to={ContainerData.path}>
        {ContainerData.btnLabel} <FiArrowRight />
      </Button>
    </Leftbox>
    <Rightbox>
      <img
        {...responsive(ContainerData.image, "(max-width: 768px) 100vw, 60vw")}
        alt={ContainerData.alt}
        loading="lazy"
        decoding="async"
      />
    </Rightbox>
  </BigContainer>
);

export default FullContainer;
