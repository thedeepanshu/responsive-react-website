import React from "react";
import styled from "styled-components";
import { Button } from "./Button";
import Card from "./Card";

export const Section = styled.section`
  width: 100%;
  height: 100%;
  padding: 4rem 0rem 3rem;

  @media screen and (max-width: 768px) {
    padding: 2rem 0rem 0rem;
  }
`;

const Container = styled.div`
  padding: 3rem calc((100vw - 1300px) / 2);
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 700px;

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: 600px;
    padding: 2rem calc((100vw - 1300px) / 2);
  }
`;

const ContainerLeft = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  line-height: 1.4;
  padding: 1rem 2rem;
  order: ${({ reverse }) => (reverse ? "2" : "1")};

  h1 {
    margin-bottom: 1rem;
    font-size: clamp(1rem, 8vw, 2rem);
  }

  p {
    margin-bottom: 2rem;
    line-height: 1.6;
  }

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
  }
`;

const ContainerRight = styled.div`
  padding: 1rem 2rem;
  order: ${({ reverse }) => (reverse ? "1" : "2")};
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    @media screen and (max-width: 768px) {
      width: 100%%;
      height: 100%;
    }
  }

  @media screen and (max-width: 768px) {
    order: ${({ reverse }) => (reverse ? "2" : "1")};
    .unique {
      height: 90%;
    }
  }
`;

const InfoSection = ({ infoDataOne, infoDataTwo }) => {
  return (
    <>
      <Section>
        <Container>
          <ContainerLeft>
            <h1>{infoDataOne.heading}</h1>
            <p>{infoDataOne.paraOne}</p>
            <p>{infoDataOne.paraOne}</p>
            <Button primary="true" to="/homes">
              {infoDataOne.btnLabel}
            </Button>
          </ContainerLeft>
          <ContainerRight reverse={infoDataOne.reverse}>
            <img className="unique" src={infoDataOne.image} alt="home" />
          </ContainerRight>
        </Container>
      </Section>
      <Card />
      <Section>
        <Container>
          <ContainerRight reverse={infoDataTwo.reverse}>
            <img src={infoDataTwo.image} alt="home" />
          </ContainerRight>
          <ContainerLeft>
            <h1>{infoDataTwo.heading}</h1>
            <p>{infoDataTwo.paraOne}</p>
            <p>{infoDataTwo.paraOne}</p>
            <Button primary="true" to="/homes">
              {infoDataTwo.btnLabel}
            </Button>
          </ContainerLeft>
        </Container>
      </Section>
    </>
  );
};

export default InfoSection;
