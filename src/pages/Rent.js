import React from "react";
import CtaBanner from "../components/CtaBanner";
import Listings from "../components/Listings";
import PageHero from "../components/PageHero";
import useDocumentTitle from "../hooks/useDocumentTitle";
import { images } from "../data/images";

const Rent = () => {
  useDocumentTitle("Rent a home");

  return (
    <>
      <PageHero
        image={images.azure}
        eyebrow="Rent"
        title="Luxury rentals"
        subtitle="Furnished apartments, seaside villas and city townhouses available for long-term lease."
        crumbs={[{ label: "Rent" }]}
      />
      <Listings status="rent" />
      <CtaBanner
        title="Relocating for work?"
        text="We arrange corporate leases, remote viewings and move-in support so your new home is ready when you are."
      />
    </>
  );
};

export default Rent;
