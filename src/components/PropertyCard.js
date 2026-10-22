import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaBath, FaBed, FaRulerCombined } from "react-icons/fa";
import { FiMapPin } from "react-icons/fi";
import { responsive } from "../data/images";
import { colors, fonts, shadow } from "../theme";
import {
  formatArea,
  formatPrice,
  priceSuffix,
  statusLabel,
} from "../utils/format";

const CardLink = styled(Link)`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: ${colors.white};
  box-shadow: ${shadow.soft};
  text-decoration: none;
  color: inherit;
  transition: transform 0.4s ease, box-shadow 0.4s ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow: ${shadow.strong};
  }
`;

const Media = styled.div`
  position: relative;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  background: ${colors.border};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.8s ease;
  }

  ${CardLink}:hover & img {
    transform: scale(1.07);
  }
`;

const Badges = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  display: flex;
  gap: 0.5rem;
`;

const Badge = styled.span`
  padding: 0.3rem 0.75rem;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  background: ${({ $accent }) => ($accent ? colors.accent : "rgba(0,13,26,0.8)")};
  color: ${({ $accent }) => ($accent ? colors.dark : colors.white)};
`;

const Body = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 1.5rem 1.6rem 1.3rem;

  h3 {
    font-size: 1.35rem;
    margin-bottom: 0.35rem;
    transition: color 0.2s ease;
  }

  ${CardLink}:hover & h3 {
    color: ${colors.accentDark};
  }
`;

const Location = styled.p`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.88rem;
  color: ${colors.muted};
`;

const Price = styled.p`
  margin: 1rem 0 1.2rem;
  font-family: ${fonts.heading};
  font-size: 1.5rem;
  font-weight: 600;
  color: ${colors.dark};

  small {
    font-family: ${fonts.body};
    font-size: 0.8rem;
    font-weight: 500;
    color: ${colors.muted};
  }
`;

const Facts = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 1.2rem;
  margin-top: auto;
  padding-top: 1.1rem;
  border-top: 1px solid ${colors.border};
  list-style: none;
  font-size: 0.85rem;
  color: ${colors.muted};

  li {
    display: flex;
    align-items: center;
    gap: 0.45rem;
  }

  svg {
    color: ${colors.accent};
  }
`;

const PropertyCard = ({ property }) => (
  <CardLink to={`/property/${property.id}`}>
    <Media>
      <img
        {...responsive(property.image, "(max-width: 768px) 100vw, 400px")}
        alt={property.title}
        loading="lazy"
        decoding="async"
      />
      <Badges>
        <Badge $accent>{statusLabel(property.status)}</Badge>
        <Badge>{property.type}</Badge>
      </Badges>
    </Media>
    <Body>
      <h3>{property.title}</h3>
      <Location>
        <FiMapPin aria-hidden="true" />
        {property.locality}, {property.city}
      </Location>
      <Price>
        {formatPrice(property)} <small>{priceSuffix(property)}</small>
      </Price>
      <Facts>
        <li>
          <FaBed aria-hidden="true" /> {property.beds} Beds
        </li>
        <li>
          <FaBath aria-hidden="true" /> {property.baths} Baths
        </li>
        <li>
          <FaRulerCombined aria-hidden="true" /> {formatArea(property.area)}
        </li>
      </Facts>
    </Body>
  </CardLink>
);

export const PropertyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 320px), 1fr));
  gap: 2rem;
`;

export default PropertyCard;
