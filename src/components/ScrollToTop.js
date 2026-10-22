import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const firstRender = useRef(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    // On navigation (not the first load) move focus to the new page content,
    // so screen readers announce it instead of staying on the clicked link.
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const main = document.getElementById("main-content");
    if (main) main.focus({ preventScroll: true });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
