import React, { useEffect, useState } from "react";
import api, { baseURL } from "../api";
import GLightbox from "glightbox";
import "glightbox/dist/css/glightbox.min.css";
import { Link } from "react-router-dom";
import bannerImage from "../../assets/images/banner/inner-banner.jpg";
import { useTranslation } from "react-i18next";

const PondsTalao = () => {
  const {i18n, t} = useTranslation();
  const [ponds, setPonds] = useState([]);
  const [pondImages, setPondImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPonds = async () => {
      try {
        const response = await api.get(`/ponds-talao?lang=${i18n.language}`);
        setPonds(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchPondImages = async () => {
      try {
        const response = await api.get(`/pond-images?lang=${i18n.language}`);
        setPondImages(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPonds();
    fetchPondImages();
  }, [i18n.language]);

  useEffect(() => {
    const lightbox = GLightbox({
      selector: ".glightbox",
    });

    return () => {
      lightbox.destroy();
    };
  }, [pondImages]);

  if (loading) return <div>{t("loading")}</div>;
  if (error) return <div>{t("error")} {error}</div>;

  return (
    <div>
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
            <h1>{t("ponds-contents.pondsTalao")}</h1>
            <ul className="bread-crumb clearfix">
              <li>
                <Link to="#.">{t("cityProfile")}</Link>
              </li>
              <li>
                <span>{t("ponds-contents.pondsTalao")}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <br />
      <br />
      <br />

      <section className="service-style-four pb-2">
        <div className="auto-container">
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
                  {t("ponds-contents.talaoName")}
                </th>
              </tr>
            </thead>
            <tbody>
              {ponds.length > 0 ? (
                ponds.map((pond, index) => (
                  <tr key={pond.id}>
                    <td>{index + 1}</td>
                    <td>{pond.name}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="text-center">
                  {t("ponds-contents.noPondsAvailable")}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <div className="auto-container mb-5">
        <div className="col-lg-12 col-md-12 col-sm-12 content-side">
          <div className="department-details-content">
            <div className="content-three">
              <div className="tabs-box lightbox-tab">
                <div className="tab-btn-box">
                  <ul className="tab-btns tab-buttons clearfix">
                    <li className="tab-btn active-btn" data-tab="#tab-1">
                    {t("ponds-contents.talaoPhotoGallery")}
                    </li>
                  </ul>
                </div>
                <div className="tabs-content">
                  <div className="tab active-tab" id="tab-1">
                    <div className="content-box department-section">
                      <div className="row">
                        {pondImages.map((image, index) => (
                          <Link
                            to={`${baseURL}${image.image_path}`}
                            className="glightbox col-sm-2"
                            data-gallery="slider-images"
                          >
                            <img
                              src={`${baseURL}${image.image_path}`}
                              alt={`img${index + 1}`}
                              className="img-fluid"
                            />
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PondsTalao;
