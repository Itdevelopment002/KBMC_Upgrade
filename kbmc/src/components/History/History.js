import React, { useEffect, useState } from "react";
import banner from "../../assets/images/banner/inner-banner.jpg";
import "./History.css";
import api, { baseURL } from "../api";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const History = () => {
  const { i18n, t } = useTranslation();
  const [historyData, setHistoryData] = useState([]);
  const [ceoData, setCeoData] = useState([]);

  const fetchHistoryData = async () => {
    try {
      const response = await api.get(`/history?lang=${i18n.language}`);
      setHistoryData(response.data);
    } catch (error) {
      console.error("Error fetching history data:", error);
    }
  };

  const fetchCeoData = async () => {
    try {
      const response1 = await api.get(`/ceos?lang=${i18n.language}`);
      setCeoData(response1.data);
    } catch (error) {
      console.error("Error fetching CEO data:", error);
    }
  };

  useEffect(() => {
    fetchHistoryData(i18n.language);
    fetchCeoData(i18n.language);
  }, [i18n.language]);

  return (
    <>
      <section className="page-title">
        <div
          className="bg-layer"
          style={{ backgroundImage: `url(${banner})` }}
        ></div>
        <div className="line-box">
          <div className="line-1"></div>
          <div className="line-2"></div>
        </div>
        <div className="auto-container">
  <div className="content-box">
    <h1>{t("history.title")}</h1>
    <ul className="bread-crumb clearfix">
      <li>
        <Link to="/">{t("home")}</Link>
      </li>
      <li>
        <span>{t("history.title")}</span>
      </li>
    </ul>
  </div>
</div>

      </section>
      <br />

      <section className="about-style-three history-content white-bg mt-5">
        {historyData.length > 0 && (
          <div className="auto-container">
            <div className="row clearfix">
              <div className="col-lg-12 col-md-12 col-sm-12 content-column">
                <div className="content-box">
                  <div className="text-box">
                    <h3 className="pb-3">
                    {t("history.welcomeMessage")}
                    </h3>
                    <p>{historyData[0].description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      <section className="team-section sec-pad member-section">
        <div className="auto-container">
          <div className="row clearfix">
            {ceoData.map((ceo, index) => (
              <div className="col-lg-3 col-md-6 col-sm-12 team-block">
                <div
                  className="team-block-one wow fadeInUp animated"
                  data-wow-delay="00ms"
                  data-wow-duration="1500ms"
                  style={{
                    visibility: "visible",
                    animationDuration: "1500ms",
                    animationDelay: "0ms",
                    animationName: "fadeInUp",
                  }}
                >
                  <div className="inner-box">
                    <figure className="image-box">
                      <img
                        src={`${baseURL}${ceo.image_path}`}
                        alt={`ceo-img-${index + 1}`}
                      />
                    </figure>
                    {/* <div className="share-box">
                      <span className="share-text">
                        <i className="flaticon-sharing"></i>Share
                      </span>
                      <ul className="share-links">
                        <li>
                          <Link to="#.">
                            <span className="fab fa-facebook-square"></span>
                          </Link>
                        </li>
                        <li>
                          <Link to="#.">
                            <span className="fab fa-twitter-square"></span>
                          </Link>
                        </li>
                        <li>
                          <Link to="#.">
                            <span className="fab fa-instagram-square"></span>
                          </Link>
                        </li>
                      </ul>
                    </div> */}
                    <h3>
                      <Link to="#.">{ceo.coName}</Link>
                    </h3>
                    <span className="designation">{ceo.designation}</span>
                    <p>
                      <Link to="mailto:support@kbmc.gov.in">{ceo.email}</Link>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default History;
