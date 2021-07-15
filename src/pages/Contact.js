import React from "react";
import { HeroSection } from "../components/Hero";
import styled from "styled-components";
import { SliderData } from "../data/SliderData";

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

const Contact = () => {
  return (
    <>
      <HeroSection>
        <Image src={SliderData[3].image} alt={SliderData[3].alt} />
      </HeroSection>
    </>
  );
};

export default Contact;
