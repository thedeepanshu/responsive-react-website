import { useEffect } from "react";

const SITE_NAME = "LUXYVILLA";

const useDocumentTitle = (title) => {
  useEffect(() => {
    document.title = title
      ? `${title} | ${SITE_NAME}`
      : `${SITE_NAME} | Luxury Homes & Rentals`;
  }, [title]);
};

export default useDocumentTitle;
