import React, { useEffect, useState } from "react";
import api from "../api";
import innerBanner from "../../assets/images/banner/inner-banner.jpg";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Electric = () => {
  const { i18n, t} = useTranslation();
  const [electricData, setElectricData] = useState([]);

  useEffect(() => {
    api
      .get(`/electric?lang=${i18n.language}`)
      .then((response) => {
        setElectricData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching electric data:", error);
      });
  }, [i18n.language]);

  return (
    <>
      <section className="page-title">
        <div
          className="bg-layer"
          style={{
            backgroundImage: `url(${innerBanner})`,
          }}
        ></div>
        <div className="line-box">
          <div className="line-1"></div>
          <div className="line-2"></div>
        </div>
        <div className="auto-container">
          <div className="content-box">
            <h1>{t("electric-contents.electric")}</h1>
            <ul className="bread-crumb clearfix">
              <li>
                <Link to="#.">{t("cityProfile")}</Link>
              </li>
              <li>
                <span>{t("electric-contents.electric")}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <br /> <br />
      <section className="service-style-four">
        <div className="auto-container">
          <h5 className="pb-4 fs-5 fw-none heading-margin">
          {t("electric-contents.electricStatement")}
          </h5>
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead className="text-center">
                <tr>
                  <th
                    style={{
                      backgroundColor: "#29aae1",
                      color: "#fff",
                    }}
                  >
                   {t("srNo")}
                  </th>
                  <th
                    style={{
                      backgroundColor: "#29aae1",
                      color: "#fff",
                    }}
                  >
                    {t("description")}
                  </th>
                  <th
                    style={{
                      backgroundColor: "#29aae1",
                      color: "#fff",
                    }}
                  >
                    {t("mobileNo")}
                  </th>
                  <th
                    style={{
                      backgroundColor: "#29aae1",
                      color: "#fff",
                    }}
                  >
                    {t("electric-contents.vendorName")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {electricData.length > 0 ? (
                  electricData.map((item, index) => (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>{item.description}</td>
                      <td>{item.mobileNo}</td>
                      <td>{item.vendorName}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center">
                    {t("noDataAvailable")}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
};

export default Electric;
