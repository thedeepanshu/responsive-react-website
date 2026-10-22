import { act, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";
import { properties } from "./data/PropertyData";

const renderAt = (path) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>
  );

test("renders the home page hero and featured listings", () => {
  renderAt("/");
  expect(
    screen.getByRole("heading", { level: 1, name: "The Palm Court Villa" })
  ).toBeInTheDocument();
  expect(screen.getByText("Homes we love right now")).toBeInTheDocument();
});

test("main navigation uses clear Buy and Rent labels", () => {
  renderAt("/");
  const nav = screen.getByRole("navigation", { name: "Main navigation" });
  expect(nav).toHaveTextContent("Buy");
  expect(nav).toHaveTextContent("Rent");
  expect(nav).not.toHaveTextContent("Homes");
});

test("buy page lists only properties for sale and filters by city", async () => {
  renderAt("/buy");
  const forSale = properties.filter((p) => p.status === "sale");
  expect(
    await screen.findByText(
      (_, el) =>
        el.tagName === "SPAN" &&
        el.textContent === `Showing ${forSale.length} of ${forSale.length} properties`
    )
  ).toBeInTheDocument();

  fireEvent.change(screen.getByLabelText("City"), { target: { value: "Goa" } });
  expect(screen.getByText("The Palm Court Villa")).toBeInTheDocument();
  expect(screen.queryByText("Onyx House")).not.toBeInTheDocument();
});

test("rent page reads the city from the query string", async () => {
  renderAt("/rent?city=Mumbai");
  expect(await screen.findByText("Skyline Heights Residence")).toBeInTheDocument();
  expect(screen.queryByText("Azure Terrace Villa")).not.toBeInTheDocument();
});

test("old /rentals links redirect and keep their filters", async () => {
  renderAt("/rentals?city=Mumbai");
  expect(
    await screen.findByRole("heading", { level: 1, name: "Luxury rentals" })
  ).toBeInTheDocument();
  expect(screen.getByText("Skyline Heights Residence")).toBeInTheDocument();
});

test("property detail page shows the property and its enquiry form", async () => {
  renderAt("/property/onyx-house");
  expect(
    await screen.findByRole("heading", { level: 1, name: "Onyx House" })
  ).toBeInTheDocument();
  expect(screen.getByText("Request a viewing")).toBeInTheDocument();
});

test("unknown property shows a not found message", async () => {
  renderAt("/property/does-not-exist");
  expect(await screen.findByText("Property not found")).toBeInTheDocument();
});

test("unknown routes show the 404 page", async () => {
  renderAt("/nowhere");
  expect(await screen.findByText("Page not found")).toBeInTheDocument();
});

test("contact form requires name, phone and interest, and focuses the first error", async () => {
  renderAt("/contact");
  fireEvent.click(await screen.findByRole("button", { name: /send message/i }));
  expect(screen.getByText("Please enter your name.")).toBeInTheDocument();
  expect(screen.getByText("Please enter your phone number.")).toBeInTheDocument();
  expect(screen.getByText("Please choose what you're interested in.")).toBeInTheDocument();
  // Email and message are optional.
  expect(screen.queryByText("Please enter a valid email address.")).not.toBeInTheDocument();
  expect(screen.getByLabelText("Full name *")).toHaveFocus();
});

test("contact form submits with only the required fields filled in", async () => {
  jest.useFakeTimers();
  renderAt("/contact");
  fireEvent.change(await screen.findByLabelText("Full name *"), {
    target: { value: "Asha Rao" },
  });
  fireEvent.change(screen.getByLabelText("Phone *"), {
    target: { value: "+91 12345 67890" },
  });
  fireEvent.change(screen.getByLabelText("I'm interested in *"), {
    target: { value: "renting" },
  });
  fireEvent.click(screen.getByRole("button", { name: /send message/i }));
  act(() => jest.runAllTimers());
  expect(screen.getByText("Thank you, Asha!")).toBeInTheDocument();
  jest.useRealTimers();
});

test("contact form rejects an invalid optional email", async () => {
  renderAt("/contact");
  fireEvent.change(await screen.findByLabelText("Email"), {
    target: { value: "not-an-email" },
  });
  fireEvent.click(screen.getByRole("button", { name: /send message/i }));
  expect(screen.getByText("Please enter a valid email address.")).toBeInTheDocument();
});
