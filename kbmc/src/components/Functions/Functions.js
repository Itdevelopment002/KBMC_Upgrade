import React, { useState, useEffect } from "react";
import innerBanner from "../../assets/images/banner/inner-banner.jpg";
import api from "../api";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Functions = () => {
  const [functions, setFunctions] = useState([]);
  const { i18n, t } = useTranslation();

  const fetchFunctions = async () => {
    try {
      const response = await api.get(`/functions?lang=${i18n.language}`);
      setFunctions(response.data);
    } catch (error) {
      console.error("Error fetching function data:", error);
    }
  };

  useEffect(() => {
    fetchFunctions();
  }, [i18n.language]);

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
            <h1>{t("functions.pageTitle")}</h1>
            <ul className="bread-crumb clearfix">
              <li>
                <Link to="/">{t("functions.breadcrumb.home")}</Link>
              </li>
              <li>
                <span>{t("functions.breadcrumb.functions")}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <br />

      <section className="departments-style-two alternat-2">
        <div className="auto-container">
          <div className="content-two">
            <h3>{t("functions.heading")}</h3>
            <br />
            <ul className="list-item clearfix">
              <li>{t("functions.mainClause1")}</li>
              <li>
                {t("functions.mainClause2")}
                <ul>
                  {functions.map((func, index) => (
                    <li key={index}>
                      <b>{String.fromCharCode(97 + index)}.</b>{" "}
                      {func.description}
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Functions;
