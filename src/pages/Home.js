import React from "react";
import styled from "styled-components";
import { FiArrowRight } from "react-icons/fi";
import { Button } from "../components/Button";
import Card from "../components/Card";
import FullContainer from "../components/FullContainer";
import Hero from "../components/Hero";
import HeroSearch from "../components/HeroSearch";
import InfoSection from "../components/InfoSection";
import { Container, Section } from "../components/Layout";
import PropertyCard, { PropertyGrid } from "../components/PropertyCard";
import SectionHeading from "../components/SectionHeading";
import Stats from "../components/Stats";
import Testimonials from "../components/Testimonials";
import { InfoDataOne, InfoDataTwo } from "../data/InfoSectionData";
import { properties } from "../data/PropertyData";
import { SliderData } from "../data/SliderData";
import useDocumentTitle from "../hooks/useDocumentTitle";
import { media } from "../theme";

const HeadingRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 2rem;
  margin-bottom: 3.5rem;

  > div {
    margin-bottom: 0;
  }

  ${media.tablet} {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const featured = properties
  .filter((p) => p.status === "sale")
  .sort((a, b) => Number(b.featured) - Number(a.featured))
  .slice(0, 3);

const Home = () => {
  useDocumentTitle();

  return (
    <>
      <Hero slides={SliderData} />
      <HeroSearch />
      <InfoSection data={InfoDataOne} />
      <Stats />
      <Section>
        <Container>
          <HeadingRow>
            <SectionHeading
              eyebrow="Featured listings"
              title="Homes we love right now"
              subtitle="A selection of exceptional properties, personally reviewed by our team."
            />
            <Button $variant="outline" to="/buy">
              View all homes <FiArrowRight />
            </Button>
          </HeadingRow>
          <PropertyGrid>
            {featured.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </PropertyGrid>
        </Container>
      </Section>
      <Card />
      <InfoSection data={InfoDataTwo} />
      <FullContainer />
      <Testimonials />
    </>
  );
};

export default Home;
