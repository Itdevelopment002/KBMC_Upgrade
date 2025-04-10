import React, { useEffect, useState } from "react";
import innerBanner from "../../assets/images/banner/inner-banner.jpg";
import api, { baseURL } from "../api";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Health = () => {
  const { i18n, t} = useTranslation();
  const [data, setData] = useState([]);
  const [inspectors, setInspectors] = useState([]);
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [litigations, setLitigations] = useState([]);
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    api
      .get(`/health_dep_sec?lang=${i18n.language}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [i18n.language]);

  useEffect(() => {
    api
      .get(`/sanitation_inspectors?lang=${i18n.language}`)
      .then((response) => {
        setInspectors(response.data);
      })
      .catch((error) => {
        console.error("Error fetching inspectors:", error);
      });
  }, [i18n.language]);

  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        const response = await api.get(`/treatment_facility?lang=${i18n.language}`);
        setFacilities(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching treatment facilities:", error);
        setLoading(false);
      }
    };

    fetchFacilities(i18n.language);
  }, [i18n.language]);

  useEffect(() => {
    const fetchLitigations = async () => {
      try {
        const response = await api.get(`/litigations?lang=${i18n.language}`);
        setLitigations(response.data);
      } catch (error) {
        console.error("Error fetching litigations:", error);
      }
    };

    fetchLitigations(i18n.language);
  }, [i18n.language]);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await api.get(`/health_photo_gallery?lang=${i18n.language}`);
        setPhotos(response.data);
      } catch (error) {
        console.error("Error fetching photos:", error);
      }
    };

    fetchPhotos(i18n.language);
  }, [i18n.language]);

  return (
    <div>
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
            <h1>{t("health-contents.health")}</h1>
            <ul className="bread-crumb clearfix">
              <li>
                <Link to="#.">{t("cityProfile")}</Link>
              </li>
              <li>
                <span>{t("health-contents.health")}</span>
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
          <h5 className="mb-3">{t("health-contents.worksUnderHealthDepartment")} </h5>

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
                </tr>
              </thead>
              <tbody>
                {data.length > 0 ? (
                  data.map((item, index) => (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>{item.description}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="2" className="text-center">
                    {t("noDataAvailable")}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <h5 className="mb-4 mt-4">
          {t("health-contents.zoneWiseNamesOfSanitationInspectors")} 
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
                    width="10%"
                  >
                    {t("health-contents.zoneNo")}
                  </th>
                  <th
                    style={{
                      backgroundColor: "#29aae1",
                      color: "#fff",
                    }}
                  >
                    {t("health-contents.namesOfSanitaryInspectors")}
                  </th>
                  <th
                    style={{
                      backgroundColor: "#29aae1",
                      color: "#fff",
                    }}
                  >
                    {t("health-contents.wardNo")} 
                  </th>
                </tr>
              </thead>
              <tbody>
                {inspectors.map((inspector, index) => {
                  const wards = inspector.ward_no
                    ? inspector.ward_no.split(" ")
                    : [];

                  return (
                    <React.Fragment key={index}>
                      <tr>
                        <td rowSpan={wards.length || 1}>{inspector.zone_no}</td>
                        <td rowSpan={wards.length || 1}>
                          {inspector.names} ({inspector.mob_no})
                        </td>
                        <td>{wards[0] || "N/A"}</td>
                      </tr>
                      {wards.slice(1).map((ward, idx) => (
                        <tr key={idx}>
                          <td>{ward}</td>
                        </tr>
                      ))}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
          <h5 className="mb-4 mt-4">{t("health-contents.treatmentFacility")}</h5>
          <div className="table-responsive mt-4">
            {loading ? (
              <p>{t("loading")}</p>
            ) : (
              <table className="table table-bordered">
                <thead className="text-center">
                  <tr>
                    <th style={{ backgroundColor: "#29aae1", color: "#fff" }}>
                    {t("srNo")}
                    </th>
                    <th style={{ backgroundColor: "#29aae1", color: "#fff" }}>
                    {t("health-contents.nameOfThePlant")}
                    </th>
                    <th style={{ backgroundColor: "#29aae1", color: "#fff" }}>
                    {t("health-contents.locationOfThePlant")}
                    </th>
                    <th style={{ backgroundColor: "#29aae1", color: "#fff" }}>
                    {t("health-contents.designedPlantCapacityMtd")}
                    </th>
                    <th style={{ backgroundColor: "#29aae1", color: "#fff" }}>
                    {t("health-contents.presentWasteIntakeMtd")} Present waste Intake (MTD)
                    </th>
                    <th style={{ backgroundColor: "#29aae1", color: "#fff" }}>
                    {t("health-contents.outputOfPlant")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {facilities.length > 0 ? (
                    facilities.map((facility, index) => (
                      <tr key={facility.id}>
                        <td>{index + 1}</td>
                        <td>{facility.name}</td>
                        <td>{facility.loc}</td>
                        <td>{facility.capacity}</td>
                        <td>{facility.intake}</td>
                        <td>{facility.output}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center">
                      {t("noDataAvailable")}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
          <h5 className="mb-4 mt-4">{t("health-contents.nameOfWardWiseLitigations")}</h5>
          <div className="table-responsive mt-4">
            <table className="table table-bordered">
              <thead className="text-center">
                <tr>
                  <th
                    style={{
                      backgroundColor: "#29aae1",
                      color: "#fff",
                    }}
                  >
                   {t("health-contents.wardNo")} 
                  </th>
                  <th
                    style={{
                      backgroundColor: "#29aae1",
                      color: "#fff",
                    }}
                  >
                   {t("health-contents.nameOfTheLawsuit")}
                  </th>
                  <th
                    style={{
                      backgroundColor: "#29aae1",
                      color: "#fff",
                    }}
                  >
                    {t("mobileNo")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {litigations.map((litigation) => (
                  <tr key={litigation.id}>
                    <td>{litigation.ward_no}</td>
                    <td>{litigation.name_lawsuit}</td>
                    <td>{litigation.mob_no}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="row mt-3 pmay_img">
            {photos.map((photo) => (
              <div className="col-md-3" key={photo.id}>
                <img
                  src={`${baseURL}${photo.img_path}`}
                  alt={photo.heading}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "path/to/placeholder/image.png";
                    console.error("Image load error:", e.target.src);
                  }}
                />
                <h6 className="text-center">{photo.heading}</h6>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Health;
