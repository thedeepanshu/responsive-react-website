import React from "react";
import styled from "styled-components";
import { Container, Section } from "../components/Layout";
import PageHero from "../components/PageHero";
import useDocumentTitle from "../hooks/useDocumentTitle";
import { images } from "../data/images";
import { colors } from "../theme";

const Article = styled.article`
  max-width: 780px;

  > p {
    margin-bottom: 2.5rem;
    font-size: 0.9rem;
    color: ${colors.muted};
  }

  h2 {
    font-size: 1.5rem;
    margin: 2.2rem 0 0.8rem;
  }

  section p {
    color: ${colors.muted};
  }
`;

const LegalPage = ({ doc }) => {
  useDocumentTitle(doc.title);

  return (
    <>
      <PageHero
        compact
        image={images.mapleLane}
        eyebrow="Legal"
        title={doc.title}
        crumbs={[{ label: doc.title }]}
      />
      <Section>
        <Container>
          <Article>
            <p>Last updated: {doc.updated}</p>
            {doc.sections.map((section) => (
              <section key={section.heading}>
                <h2>{section.heading}</h2>
                <p>{section.body}</p>
              </section>
            ))}
          </Article>
        </Container>
      </Section>
    </>
  );
};

export default LegalPage;
