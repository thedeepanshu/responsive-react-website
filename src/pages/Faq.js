import React from "react";
import styled from "styled-components";
import Accordion from "../components/Accordion";
import CtaBanner from "../components/CtaBanner";
import { Container, Section } from "../components/Layout";
import PageHero from "../components/PageHero";
import { faqGroups } from "../data/FaqData";
import useDocumentTitle from "../hooks/useDocumentTitle";
import { images } from "../data/images";
import { colors, media } from "../theme";

const Group = styled.div`
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: 3rem;
  padding: 3rem 0;
  border-top: 1px solid ${colors.border};

  &:first-child {
    border-top: none;
    padding-top: 0;
  }

  h2 {
    font-size: 1.8rem;
  }

  ${media.tablet} {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const Faq = () => {
  useDocumentTitle("Help & FAQ");

  return (
    <>
      <PageHero
        image={images.kitchen}
        eyebrow="Help centre"
        title="Frequently asked questions"
        subtitle="Everything you need to know about buying, renting and selling with LUXYVILLA."
        crumbs={[{ label: "FAQ" }]}
      />
      <Section>
        <Container>
          {faqGroups.map((group) => (
            <Group key={group.title}>
              <h2>{group.title}</h2>
              <Accordion items={group.items} idPrefix={`faq-${group.title}`} />
            </Group>
          ))}
        </Container>
      </Section>
      <CtaBanner
        eyebrow="Still have questions?"
        title="Speak to a consultant"
        text="Our team is happy to help with anything not covered here. Get in touch and we'll reply within one business day."
      />
    </>
  );
};

export default Faq;
