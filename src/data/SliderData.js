import { getProperty } from "./PropertyData";
import { formatPrice, priceSuffix, statusLabel } from "../utils/format";

const slideIds = [
  "palm-court-villa",
  "onyx-house",
  "evergreen-pavilion",
  "azure-terrace-villa",
];

export const SliderData = slideIds.map(getProperty).map((property) => ({
  title: property.title,
  location: `${property.locality}, ${property.city}`,
  tag: statusLabel(property.status),
  price: `${formatPrice(property)} ${priceSuffix(property)}`.trim(),
  path: `/property/${property.id}`,
  label: "View Property",
  image: property.image,
  alt: property.title,
}));
