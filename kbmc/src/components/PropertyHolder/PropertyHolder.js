import React, { useState, useEffect } from "react";
import img1 from "../../assets/images/banner/inner-banner.jpg";
import api from "../api";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const PropertyHolder = () => {
  const { i18n, t} = useTranslation();
  const [property, setProperty] = useState([]);

  useEffect(() => {
    fetchProperty(i18n.language);
  }, [i18n.language]);

  const fetchProperty = async () => {
    try {
      const response = await api.get(`/property_holder?lang=${i18n.language}`);
      setProperty(response.data);
    } catch (error) {
      console.error("Error fetching property data");
    }
  };

  return (
    <>
      <section className="page-title">
        <div
          className="bg-layer"
          style={{ backgroundImage: `url(${img1})` }}
        ></div>
        <div className="line-box">
          <div className="line-1"></div>
          <div className="line-2"></div>
        </div>
        <div className="auto-container">
          <div className="content-box">
            <h1>{t("property-contents.propertyHolder")}</h1>
            <ul className="bread-crumb clearfix">
              <li>
                <Link to="#.">{t("cityProfile")}</Link>
              </li>
              <li>
                <span>{t("property-contents.propertyHolder")}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <br />
      <br />
      <br />

      <section className="service-style-four">
        <div className="auto-container">
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead
                className="text-center"
                style={{ backgroundColor: "#29aae1" }}
              >
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
                    {t("property-contents.description")}
                  </th>
                  <th
                    style={{
                      backgroundColor: "#29aae1",
                      color: "#fff",
                    }}
                  >
                    {t("property-contents.property")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {property.map((property, index) => (
                  <tr key={property.id}>
                    <td>{index + 1}</td>
                    <td>{property.description}</td>
                    <td>{property.property}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
};

export default PropertyHolder;
