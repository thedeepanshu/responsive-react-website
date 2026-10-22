import React, { useState } from "react";
import styled from "styled-components";
import { FiPlus } from "react-icons/fi";
import { colors, fonts } from "../theme";

const Item = styled.div`
  border-bottom: 1px solid ${colors.border};
`;

const Trigger = styled.button`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;
  padding: 1.4rem 0;
  border: none;
  background: none;
  text-align: left;
  font-family: ${fonts.heading};
  font-size: 1.15rem;
  font-weight: 600;
  color: ${colors.text};
  transition: color 0.2s ease;

  &:hover {
    color: ${colors.accentDark};
  }

  svg {
    flex-shrink: 0;
    font-size: 1.2rem;
    color: ${colors.accent};
    transform: rotate(${({ "aria-expanded": open }) => (open ? "45deg" : "0")});
    transition: transform 0.3s ease;
  }
`;

const Panel = styled.div`
  display: grid;
  grid-template-rows: ${({ $open }) => ($open ? "1fr" : "0fr")};
  visibility: ${({ $open }) => ($open ? "visible" : "hidden")};
  transition: grid-template-rows 0.35s ease, visibility 0.35s;

  > div {
    overflow: hidden;
  }

  p {
    padding-bottom: 1.4rem;
    color: ${colors.muted};
  }
`;

const Accordion = ({ items, idPrefix }) => {
  const [open, setOpen] = useState(0);

  return (
    <div>
      {items.map((item, index) => {
        const isOpen = open === index;
        const id = `${idPrefix}-${index}`;
        return (
          <Item key={item.q}>
            <Trigger
              type="button"
              aria-expanded={isOpen}
              aria-controls={`${id}-panel`}
              id={`${id}-trigger`}
              onClick={() => setOpen(isOpen ? null : index)}
            >
              {item.q}
              <FiPlus aria-hidden="true" />
            </Trigger>
            <Panel
              $open={isOpen}
              id={`${id}-panel`}
              role="region"
              aria-labelledby={`${id}-trigger`}
            >
              <div>
                <p>{item.a}</p>
              </div>
            </Panel>
          </Item>
        );
      })}
    </div>
  );
};

export default Accordion;
