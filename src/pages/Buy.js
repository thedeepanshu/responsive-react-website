import React from "react";
import CtaBanner from "../components/CtaBanner";
import Listings from "../components/Listings";
import PageHero from "../components/PageHero";
import useDocumentTitle from "../hooks/useDocumentTitle";
import { images } from "../data/images";

const Buy = () => {
  useDocumentTitle("Homes for sale");

  return (
    <>
      <PageHero
        image={images.evergreen}
        eyebrow="Buy"
        title="Homes for sale"
        subtitle="Architect-designed villas, penthouses and family homes, each one personally reviewed by our team."
        crumbs={[{ label: "Buy" }]}
      />
      <Listings status="sale" />
      <CtaBanner
        title="Can't find the right home?"
        text="Many of our best properties are sold before they're ever listed. Tell us what you need and we'll search off-market for you."
      />
    </>
  );
};

export default Buy;
