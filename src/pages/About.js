import React from "react";
import styled from "styled-components";
import {
  FiAward,
  FiHeart,
  FiKey,
  FiMap,
  FiMessageCircle,
  FiSearch,
  FiShield,
  FiHome,
} from "react-icons/fi";
import CtaBanner from "../components/CtaBanner";
import InfoSection from "../components/InfoSection";
import { Container, Section } from "../components/Layout";
import PageHero from "../components/PageHero";
import SectionHeading from "../components/SectionHeading";
import Stats from "../components/Stats";
import Testimonials from "../components/Testimonials";
import { AboutStory } from "../data/InfoSectionData";
import { images } from "../data/images";
import useDocumentTitle from "../hooks/useDocumentTitle";
import { colors, fonts, media, shadow } from "../theme";

const values = [
  {
    icon: FiShield,
    title: "Integrity first",
    text: "Honest advice, transparent fees and no pressure. We'd rather lose a sale than recommend the wrong home.",
  },
  {
    icon: FiMap,
    title: "Local expertise",
    text: "Our consultants live in the neighbourhoods they cover and know every street, school and building.",
  },
  {
    icon: FiAward,
    title: "Uncompromising quality",
    text: "Every listing is personally inspected. If it doesn't meet our standards, it doesn't make the cut.",
  },
  {
    icon: FiHeart,
    title: "White-glove service",
    text: "From legal checks to movers, we coordinate the details so you can focus on the exciting part.",
  },
];

const steps = [
  {
    icon: FiMessageCircle,
    title: "Tell us your brief",
    text: "Share your budget, preferred locations and must-haves in a short call with your consultant.",
  },
  {
    icon: FiSearch,
    title: "Get a curated shortlist",
    text: "We hand-pick homes that genuinely match, including off-market properties you won't find elsewhere.",
  },
  {
    icon: FiHome,
    title: "View in person or online",
    text: "Tour your favourites with us, or join a live video walkthrough from anywhere in the world.",
  },
  {
    icon: FiKey,
    title: "Move in with ease",
    text: "We negotiate, handle the paperwork and stay on hand until the keys are in your hands.",
  },
];

const ValuesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.8rem;

  ${media.laptop} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${media.mobile} {
    grid-template-columns: 1fr;
  }
`;

const ValueCard = styled.div`
  padding: 2.2rem 1.8rem;
  background: ${colors.white};
  box-shadow: ${shadow.soft};
  transition: transform 0.35s ease;

  &:hover {
    transform: translateY(-6px);
  }

  h3 {
    font-size: 1.3rem;
    margin: 1.2rem 0 0.6rem;
  }

  p {
    font-size: 0.93rem;
    color: ${colors.muted};
  }
`;

const IconCircle = styled.div`
  display: grid;
  place-items: center;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: ${colors.accentSoft};
  color: ${colors.accentDark};
  font-size: 1.4rem;
`;

const Steps = styled.ol`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  list-style: none;
  counter-reset: step;

  ${media.laptop} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${media.mobile} {
    grid-template-columns: 1fr;
  }
`;

const Step = styled.li`
  position: relative;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.15);
  counter-increment: step;
  color: rgba(255, 255, 255, 0.7);

  &::before {
    content: "0" counter(step);
    position: absolute;
    top: 1.2rem;
    right: 0;
    font-family: ${fonts.heading};
    font-size: 3rem;
    line-height: 1;
    color: rgba(255, 255, 255, 0.08);
  }

  svg {
    font-size: 1.6rem;
    color: ${colors.accent};
  }

  h3 {
    margin: 1rem 0 0.6rem;
    font-size: 1.25rem;
    color: ${colors.white};
  }

  p {
    font-size: 0.93rem;
  }
`;

const About = () => {
  useDocumentTitle("About us");

  return (
    <>
      <PageHero
        image={images.loft}
        title="Finding homes that feel like you"
        subtitle="For over a decade we've helped families, professionals and investors discover exceptional homes across India."
        crumbs={[{ label: "About" }]}
      />
      <InfoSection data={AboutStory} />
      <Stats />
      <Section $bg={colors.cream}>
        <Container>
          <SectionHeading
            center
            eyebrow="What we stand for"
            title="Our values"
            subtitle="The principles that guide every recommendation, viewing and negotiation."
          />
          <ValuesGrid>
            {values.map(({ icon: Icon, title, text }) => (
              <ValueCard key={title}>
                <IconCircle>
                  <Icon aria-hidden="true" />
                </IconCircle>
                <h3>{title}</h3>
                <p>{text}</p>
              </ValueCard>
            ))}
          </ValuesGrid>
        </Container>
      </Section>
      <Section $bg={colors.dark}>
        <Container>
          <SectionHeading
            light
            eyebrow="How it works"
            title="Your journey, made simple"
            subtitle="A clear, four-step process designed around you."
          />
          <Steps>
            {steps.map(({ icon: Icon, title, text }) => (
              <Step key={title}>
                <Icon aria-hidden="true" />
                <h3>{title}</h3>
                <p>{text}</p>
              </Step>
            ))}
          </Steps>
        </Container>
      </Section>
      <Testimonials />
      <CtaBanner />
    </>
  );
};

export default About;
