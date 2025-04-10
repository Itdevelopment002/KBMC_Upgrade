import React, { useState, useEffect } from "react";
import bannerImage from "../../assets/images/banner/inner-banner.jpg";
import api, { baseURL } from "../api";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const FireStation = () => {
  const { i18n, t } = useTranslation();
  const [fireStations, setFireStations] = useState([]);

  const fetchFireStations = async () => {
    try {
      const response = await api.get(`/fire-stations?lang=${i18n.language}`);
      setFireStations(response.data);
    } catch (error) {
      console.error("Error fetching school data");
    }
  };

  useEffect(() => {
    fetchFireStations(i18n.language);
  }, [i18n.language]);

  return (
    <>
      <section className="page-title">
        <div
          className="bg-layer"
          style={{ backgroundImage: `url(${bannerImage})` }}
        ></div>
        <div className="line-box">
          <div className="line-1"></div>
          <div className="line-2"></div>
        </div>
        <div className="auto-container">
          <div className="content-box">
            <h1>{t("fire-contents.fireStation")}</h1>
            <ul className="bread-crumb clearfix">
              <li>
                <Link to="/">{t("fire-contents.home")}</Link>
              </li>
              <li>
                <span>{t("fire-contents.fireStation")}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <br /> <br />
      <section
        className="sidebar-page-container event-page-section mt-5"
        id="fire-station"
      >
        <div className="auto-container">
          <div className="row clearfix">
            {fireStations.map((fireStation, index) => (
              <div className="col-lg-6 col-md-12 col-sm-12 content-side">
                <div className="event-list-content">
                  <div className="event-block-two">
                    <div className="inner-box">
                      <div className="image-box">
                        <figure className="image">
                          <Link to="#.">
                            <img
                              src={`${baseURL}${fireStation.image_path}`}
                              alt={t("fire-contents.fireStationEast")}
                            />
                          </Link>
                        </figure>
                      </div>
                      <div className="content-inner">
                        <h5>{fireStation.heading}</h5>
                        <br />
                        <ul className="info-list clearfix">
                          <li>
                            <p>
                              <i
                                className="fa-solid fa-location-dot"
                                style={{ color: "#3ea4ed" }}
                              ></i>
                              <b>{t("fire-contents.fireStation")}</b>, {fireStation.address}
                            </p>
                          </li>
                          <li>
                            <p>
                              <i
                                className="fa-solid fa-phone"
                                style={{ color: "#3ea4ed" }}
                              ></i>{" "}
                              {fireStation.phoneNo}
                            </p>
                          </li>
                        </ul>
                      </div>
                    </div>
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

export default FireStation;
