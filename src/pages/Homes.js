import React from "react";
import { HeroSection } from "../components/Hero";
import { SliderData } from "../data/SliderData";
import { Image } from "./Contact";

const Homes = () => {
  return (
    <>
      <HeroSection>
        <Image src={SliderData[1].image} alt={SliderData[1].alt} />
      </HeroSection>
    </>
  );
};

export default Homes;
