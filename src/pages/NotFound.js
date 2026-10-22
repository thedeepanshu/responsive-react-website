import React from "react";
import styled from "styled-components";
import { FiArrowLeft } from "react-icons/fi";
import { Button } from "../components/Button";
import { Container } from "../components/Layout";
import useDocumentTitle from "../hooks/useDocumentTitle";
import { images, responsive } from "../data/images";
import { colors, fadeUp, fonts } from "../theme";

const Wrapper = styled.section`
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 8rem 0 5rem;
  text-align: center;
  color: ${colors.white};
  background: ${colors.dark};

  img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.18;
  }
`;

const Content = styled(Container)`
  position: relative;
  animation: ${fadeUp} 0.8s ease both;

  strong {
    display: block;
    font-family: ${fonts.heading};
    font-size: clamp(6rem, 20vw, 11rem);
    line-height: 1;
    color: ${colors.accent};
  }

  h1 {
    font-size: clamp(1.8rem, 4vw, 2.6rem);
    margin: 1rem 0;
  }

  p {
    max-width: 480px;
    margin: 0 auto 2.2rem;
    color: rgba(255, 255, 255, 0.75);
  }
`;

const Actions = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
`;

const NotFound = ({
  title = "Page not found",
  text = "The page you're looking for may have moved or no longer exists. Let's get you back home.",
}) => {
  useDocumentTitle(title);

  return (
    <Wrapper>
      <img {...responsive(images.onyx)} alt="" />
      <Content>
        <strong aria-hidden="true">404</strong>
        <h1>{title}</h1>
        <p>{text}</p>
        <Actions>
          <Button $big to="/">
            <FiArrowLeft /> Back to home
          </Button>
          <Button $big $variant="outline" to="/buy">
            Browse homes
          </Button>
        </Actions>
      </Content>
    </Wrapper>
  );
};

export default NotFound;
