import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { IoArrowForward, IoArrowBack, IoPause, IoPlay } from "react-icons/io5";
import { FiArrowRight, FiMapPin } from "react-icons/fi";
import { responsive } from "../data/images";
import { colors, fadeUp, media } from "../theme";
import { Button } from "./Button";
import { Container, Eyebrow } from "./Layout";

export const HeroSection = styled.section`
  position: relative;
  height: 100vh;
  min-height: 620px;
  max-height: 1000px;
  overflow: hidden;
  background: ${colors.dark};
`;

const Slide = styled.div`
  position: absolute;
  inset: 0;
  opacity: ${({ $active }) => ($active ? 1 : 0)};
  transition: opacity 1.2s ease;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
        90deg,
        rgba(0, 13, 26, 0.8) 0%,
        rgba(0, 13, 26, 0.35) 55%,
        rgba(0, 13, 26, 0.15) 100%
      ),
      linear-gradient(0deg, rgba(0, 13, 26, 0.6) 0%, transparent 35%);
  }
`;

const HeroImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transform: ${({ $active }) => ($active ? "scale(1.08)" : "scale(1)")};
  transition: transform 7s ease-out;
`;

const HeroContent = styled(Container)`
  position: relative;
  z-index: 10;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 4rem;
  padding-bottom: 6rem;
  color: ${colors.white};
`;

const Content = styled.div`
  max-width: 640px;
  animation: ${fadeUp} 0.9s ease both;

  h1 {
    font-size: clamp(2.4rem, 6vw, 4.4rem);
    font-weight: 600;
    margin-bottom: 1rem;
    text-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
  }
`;

const Location = styled.p`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.05rem;
  color: rgba(255, 255, 255, 0.85);
  margin-bottom: 0.5rem;
`;

const Price = styled.p`
  font-size: 1.6rem;
  font-weight: 600;
  color: ${colors.accent};
  margin-bottom: 2rem;
`;

const Controls = styled.div`
  position: absolute;
  z-index: 10;
  right: 0;
  left: 0;
  bottom: 110px;

  ${media.tablet} {
    bottom: 140px;
  }
`;

const ControlsInner = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Dots = styled.div`
  display: flex;
  gap: 0.6rem;
`;

// The visible bar is small, but the button itself is a 44px-tall touch target.
const Dot = styled.button`
  display: flex;
  align-items: center;
  height: 44px;
  padding: 0 2px;
  border: none;
  background: none;

  &::before {
    content: "";
    width: ${({ $active }) => ($active ? "36px" : "12px")};
    height: 4px;
    border-radius: 4px;
    background: ${({ $active }) =>
      $active ? colors.accent : "rgba(255, 255, 255, 0.6)"};
    transition: width 0.4s ease, background 0.4s ease;
  }
`;

const Arrows = styled.div`
  display: flex;
  gap: 0.8rem;
`;

const ArrowButton = styled.button`
  display: grid;
  place-items: center;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.4);
  background: rgba(0, 13, 26, 0.4);
  color: ${colors.white};
  font-size: 1.3rem;
  backdrop-filter: blur(4px);
  transition: background 0.3s ease, border-color 0.3s ease, color 0.3s ease;

  &:hover {
    background: ${colors.accent};
    border-color: ${colors.accent};
    color: ${colors.dark};
  }

  ${media.mobile} {
    width: 44px;
    height: 44px;
  }
`;

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  typeof window.matchMedia === "function" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const Hero = ({ slides, interval = 6000 }) => {
  const [current, setCurrent] = useState(0);
  // `playing` is the single source of truth for autoplay, so the play/pause
  // button always matches what the slideshow is doing. It starts off for
  // people who ask for reduced motion.
  const [playing, setPlaying] = useState(() => !prefersReducedMotion());
  // Only download a slide's photo once it is shown (or about to be).
  const [loaded, setLoaded] = useState(() => new Set([0, 1]));
  const playButtonRef = useRef(null);
  const length = slides.length;

  const nextSlide = useCallback(
    () => setCurrent((c) => (c === length - 1 ? 0 : c + 1)),
    [length]
  );

  const goTo = (index) => setCurrent((index + length) % length);

  // Using the slider (arrows, dots, the slide's link) stops autoplay so the
  // slide doesn't change under the user; the play button resumes it.
  const onFocusEnter = (e) => {
    const cameFromOutside = !e.currentTarget.contains(e.relatedTarget);
    if (cameFromOutside && e.target !== playButtonRef.current) {
      setPlaying(false);
    }
  };

  useEffect(() => {
    setLoaded((prev) => {
      const next = (current + 1) % length;
      if (prev.has(current) && prev.has(next)) return prev;
      return new Set([...prev, current, next]);
    });
  }, [current, length]);

  // Restarts on every slide change, so the timer always runs a full interval.
  useEffect(() => {
    if (!playing || length < 2) return undefined;
    const timeout = setTimeout(nextSlide, interval);
    return () => clearTimeout(timeout);
  }, [current, playing, length, interval, nextSlide]);

  if (!Array.isArray(slides) || length === 0) {
    return null;
  }

  const slide = slides[current];

  return (
    <HeroSection
      onFocus={onFocusEnter}
      aria-roledescription="carousel"
      aria-label="Featured properties"
    >
      {slides.map((s, index) => (
        <Slide key={s.path} $active={index === current} aria-hidden="true">
          {loaded.has(index) && (
            <HeroImage
              {...responsive(s.image)}
              alt=""
              $active={index === current}
              fetchpriority={index === 0 ? "high" : undefined}
            />
          )}
        </Slide>
      ))}

      <HeroContent>
        <Content
          key={current}
          role="group"
          aria-roledescription="slide"
          aria-label={`${current + 1} of ${length}`}
          aria-live={playing ? "off" : "polite"}
        >
          <Eyebrow $onDark>{slide.tag}</Eyebrow>
          <h1>{slide.title}</h1>
          <Location>
            <FiMapPin aria-hidden="true" /> {slide.location}
          </Location>
          <Price>{slide.price}</Price>
          <Button $big to={slide.path}>
            {slide.label} <FiArrowRight />
          </Button>
        </Content>
      </HeroContent>

      <Controls>
        <ControlsInner>
          <Dots>
            {slides.map((s, index) => (
              <Dot
                key={s.path}
                $active={index === current}
                onClick={() => goTo(index)}
                aria-label={`Show slide ${index + 1}: ${s.title}`}
                aria-current={index === current ? "true" : undefined}
              />
            ))}
          </Dots>
          <Arrows>
            <ArrowButton
              ref={playButtonRef}
              onClick={() => setPlaying((p) => !p)}
              aria-label={playing ? "Pause slideshow" : "Play slideshow"}
            >
              {playing ? <IoPause /> : <IoPlay />}
            </ArrowButton>
            <ArrowButton onClick={() => goTo(current - 1)} aria-label="Previous slide">
              <IoArrowBack />
            </ArrowButton>
            <ArrowButton onClick={() => goTo(current + 1)} aria-label="Next slide">
              <IoArrowForward />
            </ArrowButton>
          </Arrows>
        </ControlsInner>
      </Controls>
    </HeroSection>
  );
};

export default Hero;
