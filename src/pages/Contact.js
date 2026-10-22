import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FiClock, FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import EnquiryForm from "../components/EnquiryForm";
import { Container, Section } from "../components/Layout";
import PageHero from "../components/PageHero";
import SectionHeading from "../components/SectionHeading";
import { SiteData } from "../data/SiteData";
import useDocumentTitle from "../hooks/useDocumentTitle";
import { images } from "../data/images";
import { colors, media, shadow } from "../theme";

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 4rem;
  align-items: start;

  ${media.laptop} {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const InfoList = styled.ul`
  display: grid;
  gap: 1.2rem;
  list-style: none;
`;

const InfoItem = styled.li`
  display: flex;
  gap: 1.2rem;
  padding: 1.4rem;
  background: ${colors.cream};

  h3 {
    font-size: 1.1rem;
    margin-bottom: 0.2rem;
  }

  p,
  a {
    font-size: 0.93rem;
    color: ${colors.muted};
    text-decoration: none;
  }

  a:hover {
    color: ${colors.accentDark};
  }
`;

const Icon = styled.div`
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${colors.dark};
  color: ${colors.accent};
  font-size: 1.15rem;
`;

const FormCard = styled.div`
  padding: 3rem;
  background: ${colors.white};
  box-shadow: ${shadow.strong};
  border-top: 3px solid ${colors.accent};

  h2 {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }

  > p {
    margin-bottom: 2rem;
    color: ${colors.muted};
  }

  ${media.mobile} {
    padding: 2rem 1.4rem;
  }
`;

const FaqNote = styled.p`
  margin-top: 1.5rem;
  font-size: 0.93rem;
  color: ${colors.muted};

  a {
    color: ${colors.accentDark};
    font-weight: 600;
  }
`;

const Map = styled.div`
  height: 420px;
  filter: grayscale(0.4);

  iframe {
    width: 100%;
    height: 100%;
    border: 0;
  }
`;

const Contact = () => {
  useDocumentTitle("Contact us");

  const details = [
    {
      icon: FiMapPin,
      title: "Visit our office",
      content: <p>{SiteData.address}</p>,
    },
    {
      icon: FiPhone,
      title: "Call us",
      content: <a href={SiteData.phoneHref}>{SiteData.phone}</a>,
    },
    {
      icon: FiMail,
      title: "Email us",
      content: <a href={`mailto:${SiteData.email}`}>{SiteData.email}</a>,
    },
    {
      icon: FiClock,
      title: "Office hours",
      content: <p>{SiteData.hours}</p>,
    },
  ];

  return (
    <>
      <PageHero
        image={images.palmCourt}
        eyebrow="Get in touch"
        title="Let's talk about your next home"
        subtitle="Whether you're buying, renting or selling, our consultants are here to help."
        crumbs={[{ label: "Contact" }]}
      />
      <Section>
        <Container>
          <Grid>
            <div>
              <SectionHeading
                eyebrow="Contact details"
                title="We'd love to hear from you"
                subtitle="Drop by our Gurugram office, give us a call, or send a message and we'll respond within one business day."
              />
              <InfoList>
                {details.map(({ icon: ItemIcon, title, content }) => (
                  <InfoItem key={title}>
                    <Icon>
                      <ItemIcon aria-hidden="true" />
                    </Icon>
                    <div>
                      <h3>{title}</h3>
                      {content}
                    </div>
                  </InfoItem>
                ))}
              </InfoList>
              <FaqNote>
                Have a quick question? Check our <Link to="/faq">FAQ</Link>.
              </FaqNote>
            </div>
            <FormCard>
              <h2>Send us a message</h2>
              <p>Tell us a little about what you're looking for.</p>
              <EnquiryForm idPrefix="contact" />
            </FormCard>
          </Grid>
        </Container>
      </Section>
      <Map>
        <iframe
          title="Office location map"
          src={`https://maps.google.com/maps?q=${encodeURIComponent(
            SiteData.mapQuery
          )}&z=15&output=embed`}
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
        />
      </Map>
    </>
  );
};

export default Contact;
