import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { menuData } from "../data/MenuData";
import { SiteData } from "../data/SiteData";
import { colors, fonts } from "../theme";
import { Button } from "./Button";

const DropdownContainer = styled.div`
  position: fixed;
  inset: 0;
  z-index: 999;
  display: grid;
  place-items: center;
  padding: 2rem;
  background: ${colors.dark};
  opacity: ${({ $isOpen }) => ($isOpen ? "1" : "0")};
  visibility: ${({ $isOpen }) => ($isOpen ? "visible" : "hidden")};
  transform: ${({ $isOpen }) => ($isOpen ? "none" : "translateY(-24px)")};
  transition: opacity 0.35s ease, transform 0.35s ease, visibility 0.35s;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1.6rem;
  right: 1.6rem;
  background: transparent;
  border: none;
  color: ${colors.white};
  font-size: 1.8rem;
  line-height: 0;
  padding: 0.5rem;
  transition: color 0.2s ease, transform 0.3s ease;

  &:hover {
    color: ${colors.accent};
    transform: rotate(90deg);
  }
`;

const DropdownWrapper = styled.div`
  text-align: center;
`;

const DropdownMenu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  margin-bottom: 3rem;
`;

const DropdownLink = styled(NavLink)`
  font-family: ${fonts.heading};
  font-size: clamp(1.8rem, 7vw, 2.4rem);
  color: ${colors.white};
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover,
  &.active {
    color: ${colors.accent};
  }
`;

const Contact = styled.div`
  margin-top: 2.5rem;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);

  a {
    color: inherit;
    text-decoration: none;
  }
`;

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

const Dropdown = ({ isOpen, toggle }) => {
  const containerRef = useRef(null);
  const closeRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;

    const opener = document.activeElement;
    closeRef.current.focus();

    // Esc closes the menu; Tab cycles focus inside it.
    const onKey = (e) => {
      if (e.key === "Escape") {
        toggle();
        return;
      }
      if (e.key !== "Tab") return;
      const items = containerRef.current.querySelectorAll(FOCUSABLE);
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.body.classList.add("no-scroll");
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("no-scroll");
      window.removeEventListener("keydown", onKey);
      if (opener && document.contains(opener)) opener.focus();
    };
  }, [isOpen, toggle]);

  return (
    <DropdownContainer
      ref={containerRef}
      id="mobile-menu"
      $isOpen={isOpen}
      aria-hidden={!isOpen}
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
    >
      <CloseButton ref={closeRef} onClick={toggle} aria-label="Close menu">
        <FaTimes />
      </CloseButton>
      <DropdownWrapper>
        <DropdownMenu>
          {menuData.map((item) => (
            <DropdownLink
              to={item.link}
              exact={item.exact}
              activeClassName="active"
              key={item.link}
              onClick={toggle}
            >
              {item.title}
            </DropdownLink>
          ))}
        </DropdownMenu>
        <Button $big to="/contact" onClick={toggle}>
          Contact Us
        </Button>
        <Contact>
          <a href={SiteData.phoneHref}>{SiteData.phone}</a>
          <br />
          <a href={`mailto:${SiteData.email}`}>{SiteData.email}</a>
        </Contact>
      </DropdownWrapper>
    </DropdownContainer>
  );
};

export default Dropdown;
