import styled from "styled-components";
import { colors } from "../theme";

// Hidden until focused, so keyboard users can jump straight past the navbar.
const Link = styled.a`
  position: fixed;
  top: 1rem;
  left: 1rem;
  z-index: 1000;
  padding: 0.8rem 1.2rem;
  background: ${colors.accent};
  color: ${colors.dark};
  font-weight: 600;
  text-decoration: none;
  transform: translateY(-200%);
  transition: transform 0.2s ease;

  &:focus {
    transform: none;
  }
`;

const SkipLink = () => <Link href="#main-content">Skip to content</Link>;

export default SkipLink;
