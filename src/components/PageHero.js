import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FiChevronRight } from "react-icons/fi";
import { responsive } from "../data/images";
import { colors, fadeUp } from "../theme";
import { Container, Eyebrow } from "./Layout";

const Banner = styled.section`
  position: relative;
  height: ${({ $compact }) => ($compact ? "52vh" : "62vh")};
  min-height: 420px;
  max-height: 640px;
  display: flex;
  align-items: flex-end;
  overflow: hidden;
  background: ${colors.dark};
  color: ${colors.white};

  img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: ${({ $position }) => $position || "center"};
  }

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      0deg,
      rgba(0, 13, 26, 0.9) 0%,
      rgba(0, 13, 26, 0.45) 55%,
      rgba(0, 13, 26, 0.55) 100%
    );
  }
`;

const Content = styled(Container)`
  position: relative;
  z-index: 2;
  padding-bottom: 4rem;
  animation: ${fadeUp} 0.8s ease both;

  h1 {
    font-size: clamp(2.3rem, 6vw, 4rem);
    max-width: 800px;
  }

  p {
    margin-top: 1rem;
    max-width: 580px;
    font-size: 1.08rem;
    color: rgba(255, 255, 255, 0.8);
  }
`;

const Crumbs = styled.nav`
  ol {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.4rem;
    list-style: none;
    margin-bottom: 1.2rem;
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.7);
  }

  li {
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }

  a {
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
      color: ${colors.accent};
    }
  }
`;

const PageHero = ({
  image,
  alt = "",
  eyebrow,
  title,
  subtitle,
  crumbs = [],
  compact,
  position,
}) => (
  <Banner $compact={compact} $position={position}>
    <img {...responsive(image)} alt={alt} fetchpriority="high" />
    <Content>
      {crumbs.length > 0 && (
        <Crumbs aria-label="Breadcrumb">
          <ol>
            <li>
              <Link to="/">Home</Link>
            </li>
            {crumbs.map((crumb) => (
              <li key={crumb.label}>
                <FiChevronRight aria-hidden="true" />
                {crumb.path ? (
                  <Link to={crumb.path}>{crumb.label}</Link>
                ) : (
                  <span aria-current="page">{crumb.label}</span>
                )}
              </li>
            ))}
          </ol>
        </Crumbs>
      )}
      {eyebrow && <Eyebrow $onDark>{eyebrow}</Eyebrow>}
      <h1>{title}</h1>
      {subtitle && <p>{subtitle}</p>}
    </Content>
  </Banner>
);

export default PageHero;
