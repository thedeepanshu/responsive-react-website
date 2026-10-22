import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { FaBath, FaBed, FaRulerCombined } from "react-icons/fa";
import { FiCalendar, FiCheck, FiHome, FiMapPin, FiPhone } from "react-icons/fi";
import EnquiryForm from "../components/EnquiryForm";
import { Container, Section } from "../components/Layout";
import PageHero from "../components/PageHero";
import PropertyCard, { PropertyGrid } from "../components/PropertyCard";
import SectionHeading from "../components/SectionHeading";
import { responsive } from "../data/images";
import { getProperty, properties } from "../data/PropertyData";
import { SiteData } from "../data/SiteData";
import useDocumentTitle from "../hooks/useDocumentTitle";
import { colors, fonts, media, shadow } from "../theme";
import {
  formatArea,
  formatPrice,
  priceSuffix,
  statusLabel,
} from "../utils/format";
import NotFound from "./NotFound";

const Layout = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 380px;
  gap: 3.5rem;
  align-items: start;

  ${media.laptop} {
    grid-template-columns: 1fr;
  }
`;

const MainImage = styled.div`
  aspect-ratio: 16 / 10;
  overflow: hidden;
  background: ${colors.border};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Thumbs = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.8rem;
  margin-top: 0.8rem;
`;

const Thumb = styled.button`
  aspect-ratio: 4 / 3;
  padding: 0;
  overflow: hidden;
  border: 2px solid ${({ $active }) => ($active ? colors.accent : "transparent")};
  background: ${colors.border};
  opacity: ${({ $active }) => ($active ? 1 : 0.65)};
  transition: opacity 0.25s ease, border-color 0.25s ease;

  &:hover {
    opacity: 1;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Facts = styled.ul`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
  margin: 2.5rem 0;
  padding: 1.6rem;
  list-style: none;
  background: ${colors.cream};

  ${media.tablet} {
    grid-template-columns: repeat(2, 1fr);
  }

  li {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  span {
    display: flex;
    align-items: center;
    gap: 0.45rem;
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: ${colors.muted};

    svg {
      color: ${colors.accent};
    }
  }

  strong {
    font-family: ${fonts.heading};
    font-size: 1.15rem;
  }
`;

const Block = styled.div`
  margin-bottom: 2.8rem;

  h2 {
    font-size: 1.8rem;
    margin-bottom: 1.2rem;
  }

  p {
    margin-bottom: 1rem;
    color: ${colors.muted};
  }
`;

const Amenities = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.9rem 2rem;
  list-style: none;

  ${media.mobile} {
    grid-template-columns: 1fr;
  }

  li {
    display: flex;
    align-items: center;
    gap: 0.7rem;
  }

  svg {
    flex-shrink: 0;
    padding: 4px;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: ${colors.accentSoft};
    color: ${colors.accentDark};
  }
`;

const Sidebar = styled.aside`
  position: sticky;
  top: 100px;
  padding: 2rem;
  background: ${colors.white};
  box-shadow: ${shadow.strong};
  border-top: 3px solid ${colors.accent};

  ${media.laptop} {
    position: static;
  }
`;

const Status = styled.span`
  display: inline-block;
  padding: 0.3rem 0.75rem;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  background: ${colors.accent};
  color: ${colors.dark};
`;

const Price = styled.p`
  margin: 0.9rem 0 1.4rem;
  font-family: ${fonts.heading};
  font-size: 2.2rem;
  font-weight: 600;
  line-height: 1.1;

  small {
    font-family: ${fonts.body};
    font-size: 0.9rem;
    font-weight: 500;
    color: ${colors.muted};
  }
`;

const Agent = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.2rem 0;
  margin-bottom: 1.4rem;
  border-top: 1px solid ${colors.border};
  border-bottom: 1px solid ${colors.border};

  strong {
    display: block;
  }

  span,
  a {
    font-size: 0.85rem;
    color: ${colors.muted};
  }

  a {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    text-decoration: none;

    &:hover {
      color: ${colors.accentDark};
    }
  }
`;

const Avatar = styled.div`
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 54px;
  height: 54px;
  border-radius: 50%;
  background: ${colors.dark};
  color: ${colors.accent};
  font-family: ${fonts.heading};
  font-size: 1.2rem;
  font-weight: 600;
`;

const FormTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 1.2rem;
`;

const PropertyDetail = () => {
  const { id } = useParams();
  const property = getProperty(id);
  const [active, setActive] = useState(0);

  useEffect(() => setActive(0), [id]);
  useDocumentTitle(property ? property.title : null);

  if (!property) {
    return (
      <NotFound
        title="Property not found"
        text="This listing may have been sold, let, or removed. Browse our latest homes instead."
      />
    );
  }

  const listPath = property.status === "rent" ? "/rent" : "/buy";
  const similar = properties
    .filter((p) => p.status === property.status && p.id !== property.id)
    .slice(0, 3);

  const facts = [
    { icon: FaBed, label: "Bedrooms", value: property.beds },
    { icon: FaBath, label: "Bathrooms", value: property.baths },
    { icon: FaRulerCombined, label: "Area", value: formatArea(property.area) },
    { icon: FiHome, label: "Type", value: property.type },
    { icon: FiCalendar, label: "Built", value: property.yearBuilt },
  ];

  return (
    <>
      <PageHero
        compact
        image={property.image}
        alt={property.title}
        eyebrow={statusLabel(property.status)}
        title={property.title}
        subtitle={`${property.locality}, ${property.city}`}
        crumbs={[
          {
            label: property.status === "rent" ? "Rent" : "Buy",
            path: listPath,
          },
          { label: property.title },
        ]}
      />

      <Section>
        <Container>
          <Layout>
            <div>
              <MainImage>
                <img
                  {...responsive(
                    property.gallery[active],
                    "(max-width: 1024px) 100vw, 800px"
                  )}
                  alt={`${property.title} (${active + 1} of ${property.gallery.length})`}
                />
              </MainImage>
              <Thumbs>
                {property.gallery.map((image, index) => (
                  <Thumb
                    key={image.src + index}
                    $active={index === active}
                    onClick={() => setActive(index)}
                    aria-label={`Show image ${index + 1} of ${property.gallery.length}`}
                    aria-pressed={index === active}
                  >
                    <img src={image.thumb} alt="" loading="lazy" decoding="async" />
                  </Thumb>
                ))}
              </Thumbs>

              <Facts>
                {facts.map(({ icon: Icon, label, value }) => (
                  <li key={label}>
                    <span>
                      <Icon aria-hidden="true" /> {label}
                    </span>
                    <strong>{value}</strong>
                  </li>
                ))}
              </Facts>

              <Block>
                <h2>About this property</h2>
                <p>
                  <strong>{property.summary}</strong>
                </p>
                {property.description.map((para) => (
                  <p key={para.slice(0, 24)}>{para}</p>
                ))}
              </Block>

              <Block>
                <h2>Amenities & features</h2>
                <Amenities>
                  {property.amenities.map((item) => (
                    <li key={item}>
                      <FiCheck aria-hidden="true" /> {item}
                    </li>
                  ))}
                </Amenities>
              </Block>

              <Block>
                <h2>Location</h2>
                <p>
                  <FiMapPin aria-hidden="true" /> {property.locality},{" "}
                  {property.city}. Exact address shared on enquiry.
                </p>
              </Block>
            </div>

            <Sidebar>
              <Status>{statusLabel(property.status)}</Status>
              <Price>
                {formatPrice(property)} <small>{priceSuffix(property)}</small>
              </Price>
              <Agent>
                <Avatar aria-hidden="true">AK</Avatar>
                <div>
                  <strong>Ananya Kapoor</strong>
                  <span>Senior Property Consultant</span>
                  <br />
                  <a href={SiteData.phoneHref}>
                    <FiPhone aria-hidden="true" /> {SiteData.phone}
                  </a>
                </div>
              </Agent>
              <FormTitle>Request a viewing</FormTitle>
              <EnquiryForm
                key={property.id}
                compact
                idPrefix="property-enquiry"
                defaultInterest={property.status === "rent" ? "renting" : "buying"}
                defaultMessage={`Hi, I'm interested in ${property.title} in ${property.city}. Please share more details and available viewing times.`}
                submitLabel="Send enquiry"
              />
            </Sidebar>
          </Layout>
        </Container>
      </Section>

      {similar.length > 0 && (
        <Section $bg={colors.cream}>
          <Container>
            <SectionHeading
              eyebrow="You may also like"
              title="Similar properties"
            />
            <PropertyGrid>
              {similar.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </PropertyGrid>
          </Container>
        </Section>
      )}
    </>
  );
};

export default PropertyDetail;
