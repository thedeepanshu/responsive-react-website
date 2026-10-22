const trimZeros = (value) => value.replace(/\.?0+$/, "");

// Indian-style pricing: crores / lakhs for sale, monthly rupees for rent.
export const formatPrice = (property) => {
  const { price, status } = property;

  if (status === "rent") {
    return `₹${price.toLocaleString("en-IN")}`;
  }
  if (price >= 10000000) {
    return `₹${trimZeros((price / 10000000).toFixed(2))} Cr`;
  }
  return `₹${trimZeros((price / 100000).toFixed(1))} L`;
};

export const priceSuffix = (property) =>
  property.status === "rent" ? "/ month" : "";

export const formatArea = (sqft) => `${sqft.toLocaleString("en-IN")} sq.ft`;

export const statusLabel = (status) =>
  status === "rent" ? "For Rent" : "For Sale";
