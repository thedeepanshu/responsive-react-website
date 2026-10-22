import styled, { keyframes } from "styled-components";
import { colors } from "../theme";

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

// Shown for the moment it takes to download a page's code.
const Wrapper = styled.div`
  min-height: 100vh;
  display: grid;
  place-items: center;
  background: ${colors.dark};

  span {
    width: 44px;
    height: 44px;
    border: 3px solid rgba(255, 255, 255, 0.15);
    border-top-color: ${colors.accent};
    border-radius: 50%;
    animation: ${spin} 0.8s linear infinite;
  }
`;

const PageLoader = () => (
  <Wrapper role="status" aria-label="Loading page">
    <span />
  </Wrapper>
);

export default PageLoader;
