import React from "react";
import FullContainer from "../components/FullContainer";
import Hero from "../components/Hero";
import InfoSection from "../components/InfoSection";
import { InfoDataOne, InfoDataTwo } from "../data/InfoSectionData";
import { SliderData } from "../data/SliderData";

const Home = () => {
  return (
    <>
      <Hero slides={SliderData} />
      <InfoSection infoDataOne={InfoDataOne} infoDataTwo={InfoDataTwo} />
      <FullContainer />
    </>
  );
};

export default Home;
