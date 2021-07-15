import React from "react";
import { HeroSection } from "../components/Hero";
import { SliderData } from "../data/SliderData";
import { Image } from "./Contact";

const Rentals = () => {
  return (
    <>
      <HeroSection>
        <Image src={SliderData[2].image} alt={SliderData[2].alt} />
      </HeroSection>
    </>
  );
};

export default Rentals;
