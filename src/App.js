import React, { lazy, Suspense, useCallback, useEffect, useState } from "react";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import Dropdown from "./components/Dropdown";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import PageLoader from "./components/PageLoader";
import ScrollToTop from "./components/ScrollToTop";
import SkipLink from "./components/SkipLink";
import { privacy, terms } from "./data/LegalData";
import GlobalStyle from "./globalstyles";
import Home from "./pages/Home";

// The home page ships in the main bundle; every other page is loaded on demand.
const About = lazy(() => import("./pages/About"));
const Buy = lazy(() => import("./pages/Buy"));
const Contact = lazy(() => import("./pages/Contact"));
const Faq = lazy(() => import("./pages/Faq"));
const LegalPage = lazy(() => import("./pages/LegalPage"));
const NotFound = lazy(() => import("./pages/NotFound"));
const PropertyDetail = lazy(() => import("./pages/PropertyDetail"));
const Rent = lazy(() => import("./pages/Rent"));

// Old URLs keep working (and keep their filters).
const redirectTo = (pathname) => ({ location }) => (
  <Redirect to={{ pathname, search: location.search }} />
);

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();

  const toggle = useCallback(() => setIsOpen((open) => !open), []);

  // Close the mobile menu whenever the route changes.
  useEffect(() => setIsOpen(false), [pathname]);

  return (
    <>
      <GlobalStyle />
      <ScrollToTop />
      <SkipLink />
      <Navbar toggle={toggle} isOpen={isOpen} />
      <Dropdown isOpen={isOpen} toggle={toggle} />
      <main id="main-content" tabIndex={-1}>
        <Suspense fallback={<PageLoader />}>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/buy">
              <Buy />
            </Route>
            <Route path="/rent">
              <Rent />
            </Route>
            <Route path="/homes" render={redirectTo("/buy")} />
            <Route path="/rentals" render={redirectTo("/rent")} />
            <Route path="/property/:id">
              <PropertyDetail />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/contact">
              <Contact />
            </Route>
            <Route path="/faq">
              <Faq />
            </Route>
            <Route path="/terms">
              <LegalPage doc={terms} />
            </Route>
            <Route path="/privacy">
              <LegalPage doc={privacy} />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

export default App;
