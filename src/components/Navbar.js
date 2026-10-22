import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { menuData } from "../data/MenuData";
import { colors, media } from "../theme";
import { Button } from "./Button";
import { Container } from "./Layout";
import Logo from "./Logo";

const Nav = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  height: ${({ $solid }) => ($solid ? "72px" : "92px")};
  background: ${({ $solid }) =>
    $solid ? "rgba(0, 13, 26, 0.94)" : "transparent"};
  box-shadow: ${({ $solid }) =>
    $solid ? "0 10px 30px -15px rgba(0, 0, 0, 0.5)" : "none"};
  backdrop-filter: ${({ $solid }) => ($solid ? "blur(10px)" : "none")};
  transition: height 0.35s ease, background 0.35s ease, box-shadow 0.35s ease;
`;

const NavInner = styled(Container)`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const NavMenu = styled.div`
  display: flex;
  align-items: center;
  gap: 2.2rem;

  ${media.nav} {
    display: none;
  }
`;

const NavMenuLink = styled(NavLink)`
  position: relative;
  padding: 0.4rem 0;
  font-size: 0.9rem;
  font-weight: 500;
  letter-spacing: 0.04em;
  color: rgba(255, 255, 255, 0.85);
  text-decoration: none;
  transition: color 0.25s ease;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 2px;
    background: ${colors.accent};
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.3s ease;
  }

  &:hover,
  &.active {
    color: ${colors.white};
  }

  &:hover::after,
  &.active::after {
    transform: scaleX(1);
    transform-origin: left;
  }
`;

const NavBtn = styled.div`
  ${media.nav} {
    display: none;
  }
`;

const MenuButton = styled.button`
  display: none;
  background: transparent;
  border: none;
  color: ${colors.white};
  font-size: 1.6rem;
  line-height: 0;
  padding: 0.5rem;

  ${media.nav} {
    display: block;
  }
`;

const Navbar = ({ toggle, isOpen }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY >= 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Nav $solid={scrolled}>
      <NavInner>
        <Logo to="/">
          LUXY<span>VILLA</span>
        </Logo>
        <NavMenu as="nav" aria-label="Main navigation">
          {menuData.map((item) => (
            <NavMenuLink
              to={item.link}
              exact={item.exact}
              activeClassName="active"
              key={item.link}
            >
              {item.title}
            </NavMenuLink>
          ))}
        </NavMenu>
        <NavBtn>
          <Button to="/contact">Contact Us</Button>
        </NavBtn>
        <MenuButton
          onClick={toggle}
          aria-label="Open menu"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          <FaBars />
        </MenuButton>
      </NavInner>
    </Nav>
  );
};

export default Navbar;
