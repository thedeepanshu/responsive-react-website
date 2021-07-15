import React from "react";
import { HeroSection } from "../components/Hero";
import { InfoDataTwo } from "../data/InfoSectionData";
import { Image } from "./Contact";

const About = () => {
  return (
    <>
      <HeroSection>
        <Image src={InfoDataTwo.image} alt={InfoDataTwo.alt} />
      </HeroSection>
    </>
  );
};

export default About;
