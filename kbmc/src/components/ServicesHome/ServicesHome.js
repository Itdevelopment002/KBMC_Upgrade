
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next"; // ✅ Import useTranslation
import "./ServiceHome.css";
import api, { baseURL } from "../api";

const ServicesHome = () => {
  const { i18n } = useTranslation(); // ✅ Language hook
  const [services, setServices] = useState([]);

  const fetchServices = async (language) => {
    try {
      const response = await api.get(`/services?lang=${language}`); // 👈 optional: backend language param
      setServices(response.data);
    } catch (error) {
      console.error("Error fetching services data");
    }
  };

  useEffect(() => {
    fetchServices(i18n.language); 
  }, [i18n.language]); 

  return (
    <div className="container-fluid container-fluid1">
      <section className="service-section-new">
        <section className="council-section service-home">
          <div className="service-sec">
            <div className="row align-items-center">
              <div className="col-lg-9 col-md-12 col-sm-12 links-column">
                <div className="links-inner">
                  <div className="row clearfix mb-2">
                    {services.map((service, index) => (
                      <div
                        className="col-lg-4 col-md-6 col-sm-12 single-column mb-3"
                        key={index}
                      >
                        <Link to={service.service_link}>
                          <div className="single-links theme-btn btn-one">
                            <div className="figure">
                              <img
                                className="Sirv image-main sirv-image-loaded"
                                src={`${baseURL}/${service.main_icon_path}`}
                                alt=""
                                loading="lazy"
                              />
                              <img
                                className="Sirv image-hover sirv-image-loaded"
                                src={`${baseURL}/${service.hover_icon_path}`}
                                alt=""
                                loading="lazy"
                              />
                            </div>
                            <h5>
                              <span>{service.service_heading}</span>
                            </h5>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="map-style">
                  <iframe
                    title="Badlapur, Maharashtra Map"
                    src="https://www.google.com/maps/embed?pb=..."
                    width="100%"
                    height="240"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
};

export default ServicesHome;

