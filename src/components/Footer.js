import React from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import { FaFacebookF, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import {
  FiArrowRight,
  FiMail,
  FiMapPin,
  FiPhone,
} from "react-icons/fi";
import { FooterData } from "../data/FooterData";
import { SiteData } from "../data/SiteData";
import { colors, media } from "../theme";
import { Button } from "./Button";
import { Container } from "./Layout";
import Logo from "./Logo";

const socialIcons = {
  Facebook: FaFacebookF,
  Instagram: AiFillInstagram,
  LinkedIn: FaLinkedinIn,
  YouTube: FaYoutube,
};

const FooterSection = styled.footer`
  background: ${colors.dark};
  color: rgba(255, 255, 255, 0.7);
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 2rem;
  padding: 5rem 0 3.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  h2 {
    font-size: clamp(2.2rem, 5vw, 3.4rem);
    color: ${colors.white};

    em {
      font-style: italic;
      color: ${colors.accent};
    }
  }
`;

const TopButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  color: ${colors.white};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr 1.3fr;
  gap: 3rem;
  padding: 3.5rem 0;

  ${media.laptop} {
    grid-template-columns: 1fr 1fr;
  }

  ${media.mobile} {
    grid-template-columns: 1fr;
    gap: 2.2rem;
  }
`;

const Brand = styled.div`
  p {
    margin: 1rem 0 1.5rem;
    max-width: 280px;
    font-size: 0.92rem;
  }
`;

const Socials = styled.div`
  display: flex;
  gap: 0.75rem;
`;

const iconLink = css`
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: ${colors.white};
  transition: background 0.3s ease, border-color 0.3s ease, color 0.3s ease,
    transform 0.3s ease;

  &:hover {
    background: ${colors.accent};
    border-color: ${colors.accent};
    color: ${colors.dark};
    transform: translateY(-3px);
  }
`;

const SocialLink = styled.a`
  ${iconLink}
`;

const Column = styled.div`
  h3 {
    margin-bottom: 1.2rem;
    font-size: 1.1rem;
    color: ${colors.white};
  }

  ul {
    list-style: none;
    display: grid;
    gap: 0.75rem;
  }
`;

const FooterLink = styled(Link)`
  font-size: 0.92rem;
  text-decoration: none;
  transition: color 0.2s ease, padding 0.2s ease;

  &:hover {
    color: ${colors.accent};
    padding-left: 4px;
  }
`;

const ContactItem = styled.li`
  display: flex;
  gap: 0.75rem;
  font-size: 0.92rem;

  svg {
    flex-shrink: 0;
    margin-top: 0.3rem;
    color: ${colors.accent};
  }

  a {
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
      color: ${colors.accent};
    }
  }
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 1.6rem 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 0.82rem;

  nav {
    display: flex;
    gap: 1.5rem;
  }
`;

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <FooterSection>
      <Container>
        <Top>
          <h2>
            {FooterData.title.first} <em>{FooterData.title.second}</em>
          </h2>
          <TopButtons>
            <Button $big to={FooterData.path}>
              {FooterData.btnLabel} <FiArrowRight />
            </Button>
            <Button $big $variant="outline" to="/contact">
              Talk to us
            </Button>
          </TopButtons>
        </Top>

        <Grid>
          <Brand>
            <Logo to="/">
              LUXY<span>VILLA</span>
            </Logo>
            <p>{SiteData.tagline} Personal service from first viewing to final keys.</p>
            <Socials>
              {SiteData.socials.map(({ name, url }) => {
                const Icon = socialIcons[name];
                return (
                  <SocialLink
                    key={name}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={name}
                  >
                    <Icon />
                  </SocialLink>
                );
              })}
            </Socials>
          </Brand>

          {FooterData.columns.map((column) => (
            <Column key={column.title}>
              <h3>{column.title}</h3>
              <ul>
                {column.links.map((link) => (
                  <li key={link.path}>
                    <FooterLink to={link.path}>{link.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </Column>
          ))}

          <Column>
            <h3>Get in touch</h3>
            <ul>
              <ContactItem>
                <FiMapPin />
                <span>{SiteData.address}</span>
              </ContactItem>
              <ContactItem>
                <FiPhone />
                <a href={SiteData.phoneHref}>{SiteData.phone}</a>
              </ContactItem>
              <ContactItem>
                <FiMail />
                <a href={`mailto:${SiteData.email}`}>{SiteData.email}</a>
              </ContactItem>
            </ul>
          </Column>
        </Grid>

        <Bottom>
          <span>
            © {year} {SiteData.name}. All rights reserved.
          </span>
          <nav aria-label="Legal">
            <FooterLink to="/terms">Terms</FooterLink>
            <FooterLink to="/privacy">Privacy</FooterLink>
          </nav>
        </Bottom>
      </Container>
    </FooterSection>
  );
};

export default Footer;
