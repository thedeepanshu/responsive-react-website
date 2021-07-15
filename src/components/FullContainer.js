import React from "react";
import styled from "styled-components";
import { ContainerData } from "../data/FullContainerData";
import { Button } from "./Button";
import { Section } from "./InfoSection";

const BigContainer = styled.div`
  padding: 5rem 0rem;
  background: #000d1a;
  display: grid;
  grid-template-columns: 1.6fr 1fr;
  grid-template-rows: 550px;

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(2, 400px);
    background: none;
  }
`;
const Leftbox = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  div {
    background: #ffffff;
    padding: 4rem;
    padding-left: 10rem;
    width: 100%;
    @media screen and (max-width: 768px) {
      padding: 2rem 2rem;
    }
    p {
      margin: 1.3rem 0rem 1.5rem;
      line-height: 1.6;
      max-width: 400px;
    }
  }
`;
const Rightbox = styled.div`
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    @media screen and (max-width: 768px) {
      padding: 2rem 2rem;
    }
  }
`;

const FullContainer = () => {
  return (
    <Section style={{ paddingRight: "0", paddingLeft: "0" }}>
      <BigContainer>
        <Leftbox>
          <div>
            <h2>{ContainerData.title}</h2>
            <p>{ContainerData.paraOne}</p>
            <p>{ContainerData.paraTwo}</p>
            <Button to={ContainerData.path}>{ContainerData.btnLabel}</Button>
          </div>
        </Leftbox>
        <Rightbox>
          <img src={ContainerData.image} alt={ContainerData.alt} />
        </Rightbox>
      </BigContainer>
    </Section>
  );
};

export default FullContainer;
