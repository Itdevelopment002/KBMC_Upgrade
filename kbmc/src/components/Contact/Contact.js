import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import innerBanner from "../../assets/images/banner/inner-banner.jpg";
import Location from "../../assets/images/icons/Location Icon.png";
import Quick from "../../assets/images/icons/Quick Contact Icon.png";
import Off from "../../assets/images/icons/Off hours Icon.png";
import api from "../api";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await api.post("/contact-us", data);
      reset();
      toast.success(t("contact.success"));
      const notificationData = {
        heading: "Feedback Submitted",
        description: `A new feedback was submitted by ${data.name}`,
        role: "Admin",
        readed: 0,
      };
      await api.post("/notification", notificationData);
    } catch (error) {
      console.error("Error sending feedback:", error);
      toast.error(t("contact.error"));
    }
  };

  return (
    <>
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
            <h1>{t("contact.pageTitle")}</h1>
            <ul className="bread-crumb clearfix">
              <li>
                <Link to="/">{t("contact.breadcrumbHome")}</Link>
              </li>
              <li>
                <span>{t("contact.breadcrumbContact")}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <br /> <br /> <br />
      <section className="contact-info-section centred">
        <div className="auto-container">
          <div className="tabs-box">
            <div className="tabs-content pt-5">
              <div className="tab active-tab" id="tab-1">
                <div className="row clearfix">
                  <div className="col-lg-4 col-md-6 col-sm-12 info-column">
                    <div className="info-block-one">
                      <div className="inner-box">
                        <div className="icon-box">
                          <img src={Location} alt="Location Icon" />
                        </div>
                        <h3>{t("contact.location")}</h3>
                        <div className="text-box">
                          <p>{t("contact.address")}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-12 info-column">
                    <div className="info-block-one">
                      <div className="inner-box">
                        <div className="icon-box">
                          <img src={Quick} alt="Quick Contact Icon" />
                        </div>
                        <h3>{t("contact.quickContact")}</h3>
                        <div className="text-box">
                          <p>
                            <Link to="tel:02512690271">0251 269 0271</Link>
                            <br />
                            <Link to="mailto:support@kbmc.gov.in">
                              support@kbmc.gov.in
                            </Link>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-12 info-column">
                    <div className="info-block-one">
                      <div className="inner-box">
                        <div className="icon-box">
                          <img src={Off} alt="Off hours Icon" />
                        </div>
                        <h3>{t("contact.offHours")}</h3>
                        <div className="text-box">
                          <p>{t("contact.hoursText")}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-style-two mb-5">
        <div className="auto-container">
          <div className="row clearfix">
            <div
              className="col-lg-6 col-md-12 col-sm-12 map-column"
              style={{ overflowX: "hidden" }}
            >
              <div className="map-inner">
                <iframe
                  title="Kulgoan Badlapur Municipal Council Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3768.6714464400943!2d73.23056668507914!3d19.165853902897943!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be792d35920ed4d%3A0x17d29709cf64ec88!2sKulgoan%20Badlapur%20Municipal%20Council!5e0!3m2!1sen!2sin!4v1717412383057!5m2!1sen!2sin"
                  width="600"
                  height="525"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>

            <div className="col-lg-6 col-md-12 col-sm-12 content-column">
              <div className="content-box">
                <div className="sec-title">
                  <h2>{t("contact.sendFeedback")}</h2>
                  <p>{t("contact.feedbackDescription")}</p>
                </div>
                <div className="form-inner">
                  <form onSubmit={handleSubmit(onSubmit)} id="contact-form">
                    <div className="row clearfix">
                      <div className="col-lg-12 form-group">
                        <input
                          type="text"
                          placeholder={t("contact.name")}
                          {...register("name", { required: true })}
                        />
                        {errors.name && (
                          <p style={{ color: "red" }}>{t("contact.nameRequired")}</p>
                        )}
                      </div>
                      <div className="col-lg-6 form-group">
                        <input
                          type="text"
                          placeholder={t("contact.mobile")}
                          {...register("mobile", { required: true })}
                        />
                        {errors.mobile && (
                          <p style={{ color: "red" }}>{t("contact.mobileRequired")}</p>
                        )}
                      </div>
                      <div className="col-lg-6 form-group">
                        <input
                          type="text"
                          placeholder={t("contact.subject")}
                          {...register("subject", { required: true })}
                        />
                        {errors.subject && (
                          <p style={{ color: "red" }}>{t("contact.subjectRequired")}</p>
                        )}
                      </div>
                      <div className="col-lg-12 form-group">
                        <input
                          type="email"
                          placeholder={t("contact.email")}
                          {...register("email", {
                            required: true,
                            pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                          })}
                        />
                        {errors.email && (
                          <p style={{ color: "red" }}>
                            {errors.email.type === "required"
                              ? t("contact.emailRequired")
                              : t("contact.emailInvalid")}
                          </p>
                        )}
                      </div>
                      <div className="col-lg-12 form-group">
                        <textarea
                          placeholder={t("contact.feedbackPlaceholder")}
                          {...register("feedback", { required: true })}
                        ></textarea>
                        {errors.feedback && (
                          <p style={{ color: "red" }}>{t("contact.feedbackRequired")}</p>
                        )}
                      </div>
                      <div className="col-lg-12 form-group message-btn">
                        <button
                          className="theme-btn btn-one"
                          style={{ backgroundColor: "#29aae1" }}
                          type="submit"
                        >
                          {t("contact.sendMessage")}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </section>
    </>
  );
};

export default Contact;
