import React, { useState, useEffect } from "react";
import innerBanner from "../../assets/images/banner/inner-banner.jpg";
import { Link } from "react-router-dom";
import api from "../api";
import { useTranslation } from "react-i18next";

const PrivacyPolicy = () => {
  const { i18n, t } = useTranslation();
  const [policy, setPolicy] = useState([]);

  useEffect(() => {
    fetchPolicy();
  }, [i18n.language]);

  const fetchPolicy = async () => {
    try {
      const response = await api.get(`/privacy-policy?language_code=${i18n.language}`);
      setPolicy(response.data);
    } catch (error) {
      console.error("Error fetching privacy policy:", error);
    }
  };

  return (
    <div>
      <section className="page-title">
        <div
          className="bg-layer"
          style={{ backgroundImage: `url(${innerBanner})` }}
        ></div>
        <div className="line-box">
          <div className="line-1"></div>
          <div className="line-2"></div>
        </div>
        <div className="auto-container">
          <div className="content-box">
            <h1>{t("privacyPolicy")}</h1>
            <ul className="bread-crumb clearfix">
              <li>
                <Link to="/">{t("home")}</Link>
              </li>
              <li>
                <span>{t("privacyPolicy")}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <br />
      <br />
      <section className="event-details">
        <div className="auto-container">
          <div className="content-side">
            <div className="event-details-content">
              <div className="content-one">
                {policy.map((item) => (
                  <React.Fragment key={item.id}>
                    <h3>{item.heading}</h3>
                    <p>{item.description}</p>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
