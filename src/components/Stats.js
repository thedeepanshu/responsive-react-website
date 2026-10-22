import React from "react";
import styled from "styled-components";
import { stats } from "../data/SiteData";
import { colors, fonts, media } from "../theme";
import { Container } from "./Layout";

const Band = styled.section`
  padding: 4.5rem 0;
  background: ${colors.dark};
  color: ${colors.white};
`;

const Grid = styled.dl`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;

  ${media.tablet} {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Stat = styled.div`
  display: flex;
  flex-direction: column-reverse;
  gap: 0.4rem;
  text-align: center;
  padding: 0 1rem;
  border-left: 1px solid rgba(255, 255, 255, 0.12);

  &:first-child {
    border-left: none;
  }

  dt {
    font-size: 0.85rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.65);
  }

  dd {
    font-family: ${fonts.heading};
    font-size: clamp(2.4rem, 5vw, 3.4rem);
    font-weight: 600;
    line-height: 1.1;
    color: ${colors.accent};
  }

  ${media.tablet} {
    border-left: none;
  }
`;

const Stats = () => (
  <Band>
    <Container>
      <Grid>
        {stats.map((stat) => (
          <Stat key={stat.label}>
            <dt>{stat.label}</dt>
            <dd>{stat.value}</dd>
          </Stat>
        ))}
      </Grid>
    </Container>
  </Band>
);

export default Stats;
