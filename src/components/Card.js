import React from "react";
import styled from "styled-components";
import { FiArrowRight } from "react-icons/fi";
import { CardData } from "../data/CardData";
import { responsive } from "../data/images";
import { colors, media, shadow } from "../theme";
import { Button } from "./Button";
import { Container, Eyebrow, Section } from "./Layout";

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2.5rem;

  ${media.tablet} {
    grid-template-columns: 1fr;
  }
`;

const CardItem = styled.article`
  display: flex;
  flex-direction: column;
  background: ${colors.white};
  box-shadow: ${shadow.soft};
  transition: transform 0.4s ease, box-shadow 0.4s ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow: ${shadow.strong};
  }
`;

const ImageWrap = styled.div`
  overflow: hidden;

  img {
    width: 100%;
    height: 320px;
    object-fit: cover;
    transition: transform 0.8s ease;
  }

  ${CardItem}:hover & img {
    transform: scale(1.06);
  }
`;

const Body = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 2.2rem;

  h3 {
    font-size: 1.7rem;
    margin-bottom: 0.8rem;
  }

  p {
    flex: 1;
    margin-bottom: 1.8rem;
    color: ${colors.muted};
  }
`;

const Card = () => (
  <Section $bg={colors.cream}>
    <Container>
      <CardContainer>
        {CardData.map((card) => (
          <CardItem key={card.title}>
            <ImageWrap>
              <img
                {...responsive(card.image, "(max-width: 768px) 100vw, 600px")}
                alt={card.alt}
                loading="lazy"
                decoding="async"
              />
            </ImageWrap>
            <Body>
              <Eyebrow>{card.eyebrow}</Eyebrow>
              <h3>{card.title}</h3>
              <p>{card.para}</p>
              <Button $variant="primary" to={card.path}>
                {card.btnLabel} <FiArrowRight />
              </Button>
            </Body>
          </CardItem>
        ))}
      </CardContainer>
    </Container>
  </Section>
);

export default Card;
