import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { getCities, properties } from "../data/PropertyData";
import { colors, media, shadow } from "../theme";
import { ActionButton } from "./Button";
import { Container, Section } from "./Layout";
import PropertyCard, { PropertyGrid } from "./PropertyCard";

const sorters = {
  featured: (a, b) => Number(b.featured) - Number(a.featured),
  "price-asc": (a, b) => a.price - b.price,
  "price-desc": (a, b) => b.price - a.price,
  "area-desc": (a, b) => b.area - a.area,
};

const FilterBar = styled.form`
  display: grid;
  grid-template-columns: 2fr repeat(3, 1fr);
  gap: 1rem;
  margin-top: -8.5rem;
  margin-bottom: 2.5rem;
  padding: 1.6rem;
  position: relative;
  z-index: 5;
  background: ${colors.white};
  box-shadow: ${shadow.strong};

  ${media.laptop} {
    grid-template-columns: 1fr 1fr;
  }

  ${media.tablet} {
    margin-top: -6.5rem;
  }

  ${media.mobile} {
    grid-template-columns: 1fr;
  }
`;

const Field = styled.label`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${colors.muted};
`;

const InputWrap = styled.div`
  position: relative;

  svg {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: ${colors.muted};
  }

  input {
    padding-left: 2.6rem !important;
  }
`;

const controlStyles = `
  width: 100%;
  height: 48px;
  padding: 0 1rem;
  border: 1px solid ${colors.border};
  background: ${colors.cream};
  font-size: 0.95rem;
  letter-spacing: normal;
  text-transform: none;
  color: ${colors.text};
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${colors.accent};
  }
`;

const Input = styled.input`
  ${controlStyles}
`;

const Select = styled.select`
  ${controlStyles}
`;

const ResultsBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
  color: ${colors.muted};

  strong {
    color: ${colors.text};
  }
`;

const ResetLink = styled.button`
  border: none;
  background: none;
  font-size: 0.9rem;
  font-weight: 600;
  color: ${colors.accentDark};
  text-decoration: underline;
  text-underline-offset: 4px;
`;

const Empty = styled.div`
  padding: 4rem 2rem;
  text-align: center;
  background: ${colors.cream};

  h3 {
    font-size: 1.6rem;
    margin-bottom: 0.6rem;
  }

  p {
    margin-bottom: 1.6rem;
    color: ${colors.muted};
  }
`;

const Listings = ({ status }) => {
  const { search } = useLocation();
  const params = useMemo(() => new URLSearchParams(search), [search]);

  const [query, setQuery] = useState(params.get("q") || "");
  const [city, setCity] = useState(params.get("city") || "all");
  const [beds, setBeds] = useState("any");
  const [sort, setSort] = useState("featured");

  // Keep filters in sync when arriving from the home page search.
  useEffect(() => {
    setQuery(params.get("q") || "");
    setCity(params.get("city") || "all");
  }, [params]);

  const cities = getCities(status);
  const total = properties.filter((p) => p.status === status).length;

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return properties
      .filter((p) => p.status === status)
      .filter((p) => city === "all" || p.city === city)
      .filter((p) => beds === "any" || p.beds >= Number(beds))
      .filter(
        (p) =>
          !q ||
          [p.title, p.city, p.locality, p.type].some((field) =>
            field.toLowerCase().includes(q)
          )
      )
      .sort(sorters[sort]);
  }, [status, query, city, beds, sort]);

  const isFiltered = query || city !== "all" || beds !== "any";

  const reset = () => {
    setQuery("");
    setCity("all");
    setBeds("any");
    setSort("featured");
  };

  return (
    <Section>
      <Container>
        <FilterBar
          role="search"
          aria-label="Filter properties"
          onSubmit={(e) => e.preventDefault()}
        >
          <Field>
            Search
            <InputWrap>
              <FiSearch aria-hidden="true" />
              <Input
                type="search"
                placeholder="Name, locality or type..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </InputWrap>
          </Field>
          <Field>
            City
            <Select value={city} onChange={(e) => setCity(e.target.value)}>
              <option value="all">All cities</option>
              {cities.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </Select>
          </Field>
          <Field>
            Bedrooms
            <Select value={beds} onChange={(e) => setBeds(e.target.value)}>
              <option value="any">Any</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
              <option value="5">5+</option>
            </Select>
          </Field>
          <Field>
            Sort by
            <Select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="featured">Featured</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
              <option value="area-desc">Largest first</option>
            </Select>
          </Field>
        </FilterBar>

        <ResultsBar>
          <span aria-live="polite">
            Showing <strong>{results.length}</strong> of {total} properties
          </span>
          {isFiltered && (
            <ResetLink type="button" onClick={reset}>
              Clear filters
            </ResetLink>
          )}
        </ResultsBar>

        {results.length > 0 ? (
          <PropertyGrid>
            {results.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </PropertyGrid>
        ) : (
          <Empty>
            <h3>No properties match your search</h3>
            <p>Try a different city or fewer bedrooms, or clear all filters.</p>
            <ActionButton type="button" $variant="primary" onClick={reset}>
              Clear filters
            </ActionButton>
          </Empty>
        )}
      </Container>
    </Section>
  );
};

export default Listings;
