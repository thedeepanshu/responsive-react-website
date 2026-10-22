import React from "react";
import styled from "styled-components";
import { FaQuoteLeft, FaStar } from "react-icons/fa";
import { testimonials } from "../data/TestimonialData";
import { colors, media, shadow } from "../theme";
import { Container, Section } from "./Layout";
import SectionHeading from "./SectionHeading";

const BoxWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;

  ${media.laptop} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${media.tablet} {
    grid-template-columns: 1fr;
  }
`;

const Testimonial = styled.figure`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 2.5rem 2rem 2rem;
  background: ${colors.white};
  border-top: 3px solid transparent;
  box-shadow: ${shadow.soft};
  transition: transform 0.35s ease, border-color 0.35s ease;

  &:hover {
    transform: translateY(-6px);
    border-color: ${colors.accent};
  }

  blockquote {
    flex: 1;
    margin: 1rem 0 2rem;
    font-size: 0.98rem;
    line-height: 1.75;
    color: ${colors.muted};
  }
`;

const Quote = styled(FaQuoteLeft)`
  position: absolute;
  top: 2rem;
  right: 2rem;
  font-size: 2.4rem;
  color: ${colors.accentSoft};
`;

const Stars = styled.div`
  display: flex;
  gap: 0.2rem;
  color: ${colors.accent};
  font-size: 0.85rem;
`;

const Author = styled.figcaption`
  display: flex;
  align-items: center;
  gap: 1rem;

  img {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    object-fit: cover;
    object-position: ${({ $top }) => ($top ? "top" : "center")};
  }

  strong {
    display: block;
    font-size: 1rem;
    color: ${colors.text};
  }

  span {
    font-size: 0.82rem;
    color: ${colors.accentDark};
  }
`;

const Testimonials = () => (
  <Section $bg={colors.cream}>
    <Container>
      <SectionHeading
        center
        eyebrow="Testimonials"
        title="What our clients say"
        subtitle="Hundreds of families and investors have found their perfect property with us. Here are a few of their stories."
      />
      <BoxWrapper>
        {testimonials.map((client) => (
          <Testimonial key={client.name}>
            <Quote aria-hidden="true" />
            <Stars aria-label="5 out of 5 stars">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} />
              ))}
            </Stars>
            <blockquote>{client.para}</blockquote>
            <Author $top={client.top}>
              <img src={client.image} alt={client.name} loading="lazy" />
              <div>
                <strong>{client.name}</strong>
                <span>{client.role}</span>
              </div>
            </Author>
          </Testimonial>
        ))}
      </BoxWrapper>
    </Container>
  </Section>
);

export default Testimonials;
