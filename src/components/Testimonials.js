import React from "react";
import styled from "styled-components";
import {
  ClientFour,
  ClientOne,
  ClientFive,
  ClientThree,
  ClientTwo,
  ClientSix,
} from "../data/TestimonialData";
import { Section } from "./InfoSection";

const Container = styled.div`
  padding: 3rem calc((100vw - 1300px) / 2);
`;

const BoxWrapper = styled.div`
  padding: 1rem 2rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 300px);
  grid-gap: 40px;

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(6, 300px);
  }
`;

const Testimonial = styled.div`
  padding: 2.5rem 1.5rem 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  box-shadow: 4px 3px 20px 3px rgba(0, 0, 0, 0.07);
  text-align: center;
  img {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    object-fit: cover;
    object-position: center;
  }
  .top {
    object-position: top;
  }
  p {
    font-size: 15px;
    font-style: italic;
    line-height: 1.5;
  }
  h3 {
    color: #cd853f;
  }
`;

const Testimonials = () => {
  return (
    <Section>
      <Container>
        <BoxWrapper>
          <Testimonial>
            <img src={ClientOne.image} alt={ClientOne.alt} />
            <p>"{ClientOne.para}"</p>
            <h3>{ClientOne.name}</h3>
          </Testimonial>
          <Testimonial>
            <img src={ClientTwo.image} alt={ClientTwo.alt} />
            <p>"{ClientTwo.para}"</p>
            <h3>{ClientTwo.name}</h3>
          </Testimonial>
          <Testimonial>
            <img src={ClientThree.image} alt={ClientThree.alt} />
            <p>"{ClientThree.para}"</p>
            <h3>{ClientThree.name}</h3>
          </Testimonial>
          <Testimonial>
            <img className="top" src={ClientFour.image} alt={ClientFour.alt} />
            <p>"{ClientFour.para}"</p>
            <h3>{ClientFour.name}</h3>
          </Testimonial>
          <Testimonial>
            <img src={ClientFive.image} alt={ClientFive.alt} />
            <p>"{ClientFive.para}"</p>
            <h3>{ClientFive.name}</h3>
          </Testimonial>
          <Testimonial>
            <img className="top" src={ClientSix.image} alt={ClientSix.alt} />
            <p>"{ClientSix.para}"</p>
            <h3>{ClientSix.name}</h3>
          </Testimonial>
        </BoxWrapper>
      </Container>
    </Section>
  );
};

export default Testimonials;
