import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import { colors } from "../theme";

const variants = {
  accent: css`
    background: ${colors.accent};
    color: ${colors.dark};

    &:hover {
      background: ${colors.dark};
      color: ${colors.white};
    }
  `,
  primary: css`
    background: ${colors.dark};
    color: ${colors.white};

    &:hover {
      background: ${colors.accent};
      color: ${colors.dark};
    }
  `,
  outline: css`
    background: transparent;
    color: inherit;
    border-color: currentColor;

    &:hover {
      background: ${colors.accent};
      border-color: ${colors.accent};
      color: ${colors.dark};
    }
  `,
};

// Shared by link buttons and real <button>s. Props are transient ($) so they
// never leak onto the DOM.
export const buttonStyles = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  padding: ${({ $big }) => ($big ? "1rem 2.4rem" : "0.8rem 1.7rem")};
  font-size: ${({ $big }) => ($big ? "0.95rem" : "0.82rem")};
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-decoration: none;
  white-space: nowrap;
  border: 2px solid transparent;
  border-radius: 2px;
  cursor: pointer;
  transition: background 0.3s ease, color 0.3s ease, border-color 0.3s ease,
    transform 0.3s ease, box-shadow 0.3s ease;

  ${({ $variant }) => variants[$variant] || variants.accent}

  ${({ $block }) =>
    $block &&
    css`
      width: 100%;
    `}

  svg {
    transition: transform 0.3s ease;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 24px -12px rgba(0, 13, 26, 0.45);
  }

  &:hover svg {
    transform: translateX(4px);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.65;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

export const Button = styled(Link)`
  ${buttonStyles}
`;

export const ActionButton = styled.button`
  ${buttonStyles}
`;
