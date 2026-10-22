import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { getCities } from "../data/PropertyData";
import { colors, media, shadow } from "../theme";
import { ActionButton } from "./Button";
import { Container } from "./Layout";

const Wrapper = styled(Container)`
  position: relative;
  z-index: 20;
  margin-top: -70px;
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: auto 1fr 1fr auto;
  align-items: end;
  gap: 1.5rem;
  padding: 1.8rem 2rem;
  background: ${colors.white};
  box-shadow: ${shadow.strong};

  ${media.laptop} {
    grid-template-columns: 1fr 1fr;
  }

  ${media.mobile} {
    grid-template-columns: 1fr;
    padding: 1.5rem;
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

  input,
  select {
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
  }
`;

const Toggle = styled.div`
  display: flex;
  height: 48px;
  border: 1px solid ${colors.border};

  button {
    flex: 1;
    padding: 0 1.4rem;
    border: none;
    background: transparent;
    font-size: 0.85rem;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: none;
    color: ${colors.muted};
    transition: background 0.2s ease, color 0.2s ease;

    &[aria-pressed="true"] {
      background: ${colors.dark};
      color: ${colors.white};
    }
  }
`;

const SearchButton = styled(ActionButton)`
  height: 48px;
`;

const HeroSearch = () => {
  const history = useHistory();
  const [status, setStatus] = useState("sale");
  const [city, setCity] = useState("all");
  const [query, setQuery] = useState("");
  const cities = getCities(status);

  const changeStatus = (value) => {
    setStatus(value);
    setCity("all");
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (city !== "all") params.set("city", city);
    if (query.trim()) params.set("q", query.trim());
    const search = params.toString();
    history.push(`/${status === "rent" ? "rent" : "buy"}${search ? `?${search}` : ""}`);
  };

  return (
    <Wrapper>
      <Form onSubmit={onSubmit} role="search" aria-label="Find a property">
        <Field as="div" role="group" aria-label="Looking to buy or rent">
          Looking to
          <Toggle>
            <button
              type="button"
              aria-pressed={status === "sale"}
              onClick={() => changeStatus("sale")}
            >
              Buy
            </button>
            <button
              type="button"
              aria-pressed={status === "rent"}
              onClick={() => changeStatus("rent")}
            >
              Rent
            </button>
          </Toggle>
        </Field>
        <Field>
          City
          <select value={city} onChange={(e) => setCity(e.target.value)}>
            <option value="all">All cities</option>
            {cities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </Field>
        <Field>
          Keyword
          <input
            type="text"
            placeholder="Villa, penthouse, locality..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </Field>
        <SearchButton type="submit" $variant="primary">
          <FiSearch /> Search
        </SearchButton>
      </Form>
    </Wrapper>
  );
};

export default HeroSearch;
