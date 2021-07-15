import React from "react";
import styled, { css } from "styled-components/macro";
import { FooterData } from "../data/FooterData";
import { FaFacebookF, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { Button } from "./Button";

const FooterSection = styled.footer`
  width: 100%;
  height: 100%;
  padding: 4rem 0rem 3rem;
  background: #000d1a;

  @media screen and (max-width: 768px) {
    padding: 2rem 0rem 0rem;
  }
`;

const Container = styled.div`
  padding: 3rem calc((100vw - 1300px) / 2);
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 250px;

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    padding: 2rem calc((100vw - 1300px) / 2);
    grid-gap: 20px;
  }
`;

const LeftBox = styled.div`
  padding: 1rem 2rem;
  h1 {
    font-size: 45px;
    line-height: 1.6;
    margin-bottom: 2.5rem;
    color: #ffffff;
  }
`;

const RightBox = styled.div`
  padding: 1rem 2rem;
`;

const InfoBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const IconContainer = styled.div`
  min-width: 200px;
`;

const IconStyle = css`
  color: #fff;
  cursor: pointer;
  font-size: 20px;
  margin-right: 1rem;
  user-select: none;
  transition: 0.3s;

  &:hover {
    color: #cd853f;
    transform: scale(1.5);
  }
`;

const Facebook = styled(FaFacebookF)`
  ${IconStyle}
`;
const Instagram = styled(AiFillInstagram)`
  ${IconStyle}
`;
const Linkedin = styled(FaLinkedinIn)`
  ${IconStyle}
`;
const Youtube = styled(FaYoutube)`
  ${IconStyle}
`;

const ItemList = styled.ul`
  list-style-type: none;
  color: #ffffff;
`;
const Item = styled.li`
  margin: 1rem 0rem;
  color: #ffffff;
`;

const Footer = () => {
  return (
    <FooterSection>
      <Container>
        <LeftBox>
          <h1>
            {FooterData.title.first}
            <br />
            {FooterData.title.second}
          </h1>
          <IconContainer>
            <Facebook></Facebook>
            <Instagram></Instagram>
            <Linkedin></Linkedin>
            <Youtube></Youtube>
          </IconContainer>
        </LeftBox>
        <RightBox>
          <InfoBox>
            <ItemList>
              <h4>{FooterData.policy.title}</h4>
              <Item>{FooterData.policy.itemOne}</Item>
              <Item>{FooterData.policy.itemTwo}</Item>
              <Item>{FooterData.policy.itemThree}</Item>
            </ItemList>
            <ItemList>
              <h4>{FooterData.contact.title}</h4>
              <Item>{FooterData.contact.itemOne}</Item>
              <Item>{FooterData.contact.itemTwo}</Item>
              <Item>{FooterData.contact.itemThree}</Item>
            </ItemList>
          </InfoBox>
          <Button
            style={{ float: "right", margin: "2rem 0rem" }}
            to={FooterData.path}
          >
            {FooterData.btnLabel}
          </Button>
        </RightBox>
      </Container>
    </FooterSection>
  );
};

export default Footer;
