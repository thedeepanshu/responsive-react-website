import styled from "styled-components";
import { Link } from "react-router-dom";
import { colors, fonts } from "../theme";

const Logo = styled(Link)`
  font-family: ${fonts.heading};
  font-size: 1.55rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: ${colors.white};
  text-decoration: none;

  span {
    color: ${colors.accent};
  }
`;

export default Logo;
