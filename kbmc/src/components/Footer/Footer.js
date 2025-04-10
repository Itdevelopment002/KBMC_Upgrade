import React, { useEffect, useState, useRef } from "react";
import Cookies from "js-cookie";
import "./Footer.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import api from "../api";

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  const [visitorCount, setVisitorCount] = useState(null);
  const [error, setError] = useState(null);
  const hasRunOnce = useRef(false);

  useEffect(() => {
    if (hasRunOnce.current) return;
    hasRunOnce.current = true;

    const fetchVisitorCount = async () => {
      try {
        const response = await api.get("/visitor-count");
        if (!response.status === 200) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        setVisitorCount(response.data.count);
      } catch (err) {
        console.error("Error fetching visitor count:", err);
        setError("Failed to load visitor count.");
      }
    };

    const incrementVisitorCountOnce = async () => {
      if (!sessionStorage.getItem("visitorCounted")) {
        try {
          const response = await api.post("/increment-visitor-count");
          if (response.status === 200) {
            sessionStorage.setItem("visitorCounted", "true");
            Cookies.set("visitorCounted", "true", { expires: 1 });
          }
        } catch (err) {
          console.error("Error incrementing visitor count:", err);
        }
      }
    };

    const removeCookieOnClose = () => {
      Cookies.remove("visitorCounted");
    };

    fetchVisitorCount();
    incrementVisitorCountOnce();

    window.addEventListener("beforeunload", removeCookieOnClose);

    return () => {
      window.removeEventListener("beforeunload", removeCookieOnClose);
    };
  }, []);

  return (
    <footer className="main-footer fixed-bottom" style={{ zIndex: 1 }}>
      <div className="footer-bottom centred">
        <div className="auto-container">
          <div className="bottom-inner">
            <div className="copyright">
              <p>
              {t("footer.copyright")} &copy; {currentYear} <Link to="/">{t("footer.kbmc")}</Link>. {t("footer.all_rights_reserved")}
                <span> | </span>
                <Link to="/privacy-policy">{t("footer.privacy")}</Link>
                <span> | </span>
                <Link to="/terms-and-conditions">{t("footer.terms")}</Link>
               
                <span> | </span>
                <Link to="/contact">{t("footer.contact")}</Link>
                <span> | </span>
                {t("footer.totalVisitors")}:{" "}
                {visitorCount !== null ? (
                  <strong>{visitorCount}</strong>
                ) : error ? (
                  <span className="error-text">{error}</span>
                ) : (
                  "Loading..."
                )}
                {/* Total Visitors:{" "}
                {visitorCount !== null ? (
                  <Link to="#.">{visitorCount}</Link>
                ) : error ? (
                  <span>{error}</span>
                ) : (
                  "Loading..."
                )} */}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
