import React from "react";
import styled from "styled-components";
import { CardDataOne, CardDataTwo } from "../data/CardData";
import { Button } from "./Button";
import { Section } from "./InfoSection";

const CardContainer = styled.div`
  padding: 3rem calc((100vw - 1300px) / 2);
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 600px;

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(2, 600px);
    padding: 2rem calc((100vw - 1300px) / 2);
  }
`;
const LeftCard = styled.div`
  padding: 1rem 2rem;
  img {
    width: 100%;
    height: 60%;
    object-fit: cover;
    object-position: center;
  }
  p {
    margin: 20px 0;
    line-height: 1.6;
  }
`;
const RightCard = styled.div`
  padding: 1rem 2rem;
  img {
    width: 100%;
    height: 60%;
    object-fit: cover;
    object-position: center;
  }
  p {
    margin: 20px 0;
    line-height: 1.6;
  }
`;

const Card = () => {
  return (
    <Section>
      <CardContainer>
        <LeftCard>
          <img src={CardDataOne.image} alt={CardDataOne.alt} />
          <p>{CardDataOne.para}</p>
          <Button to={CardDataOne.path} primary="true">
            {CardDataOne.btnLabel}
          </Button>
        </LeftCard>
        <RightCard>
          <img src={CardDataTwo.image} alt={CardDataTwo.alt} />
          <p>{CardDataTwo.para}</p>
          <Button to={CardDataTwo.path} primary="true">
            {CardDataTwo.btnLabel}
          </Button>
        </RightCard>
      </CardContainer>
    </Section>
  );
};

export default Card;
