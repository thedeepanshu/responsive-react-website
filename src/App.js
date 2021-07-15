import React, { useState } from "react";
import { Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import Dropdown from "./components/Dropdown";
import Footer from "./components/Footer";
import Testimonials from "./components/Testimonials";
import Navbar from "./components/Navbar";
import GlobalStyle from "./globalstyles";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Homes from "./pages/Homes";
import Rentals from "./pages/Rentals";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <GlobalStyle />
      <Navbar toggle={toggle} />
      <Dropdown isOpen={isOpen} toggle={toggle} />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/homes">
          <Homes />
        </Route>
        <Route path="/rentals">
          <Rentals />
        </Route>
        <Route path="/contact">
          <Contact />
        </Route>
      </Switch>
      <Testimonials />
      <Footer />
    </>
  );
}

export default App;
