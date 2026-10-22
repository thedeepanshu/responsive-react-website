import { act, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Hero from "./Hero";
import { SliderData } from "../data/SliderData";

const INTERVAL = 6000;

const renderHero = () =>
  render(
    <MemoryRouter>
      <Hero slides={SliderData} interval={INTERVAL} />
    </MemoryRouter>
  );

const heading = () => screen.getByRole("heading", { level: 1 });
const advance = (ms = INTERVAL) => act(() => jest.advanceTimersByTime(ms));

beforeEach(() => jest.useFakeTimers());
afterEach(() => jest.useRealTimers());

test("autoplays to the next slide", () => {
  renderHero();
  expect(heading()).toHaveTextContent(SliderData[0].title);
  advance();
  expect(heading()).toHaveTextContent(SliderData[1].title);
});

test("pause stops the slideshow and play resumes it, even with focus and hover on the button", () => {
  renderHero();
  const button = screen.getByRole("button", { name: "Pause slideshow" });

  fireEvent.mouseEnter(button);
  button.focus();
  fireEvent.click(button);
  advance(INTERVAL * 2);
  expect(heading()).toHaveTextContent(SliderData[0].title);

  // The bug: with the pointer and focus still on the button, Play did nothing.
  fireEvent.click(screen.getByRole("button", { name: "Play slideshow" }));
  advance();
  expect(heading()).toHaveTextContent(SliderData[1].title);
  expect(screen.getByRole("button", { name: "Pause slideshow" })).toBeInTheDocument();
});

test("using the arrows stops autoplay and the button offers Play", () => {
  renderHero();
  const next = screen.getByRole("button", { name: "Next slide" });
  next.focus();
  fireEvent.click(next);
  expect(heading()).toHaveTextContent(SliderData[1].title);

  advance(INTERVAL * 2);
  expect(heading()).toHaveTextContent(SliderData[1].title);
  expect(screen.getByRole("button", { name: "Play slideshow" })).toBeInTheDocument();
});
