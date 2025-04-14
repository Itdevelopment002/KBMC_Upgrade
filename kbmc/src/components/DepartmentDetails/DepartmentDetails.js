import React, { useEffect, useState } from "react";
import pdficon from "../../assets/images/icons/PDF-Icons.png";
import { Modal } from "react-bootstrap";
import GLightbox from "glightbox";
import "glightbox/dist/css/glightbox.min.css";
import api, { baseURL } from "../api";
import image from "../../assets/images/icons/new-icon1.gif";
import { Link } from "react-router-dom";
import "./DepartmentDetails.css"
import { useTranslation } from "react-i18next";
const DepartmentDetails = () => {

  const { i18n, t } = useTranslation();

  const [gallerys, setGallerys] = useState([]);
  const [tenders, setTenders] = useState([]);
  const [videos, setVideos] = useState([]);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [ceoDetails, setCeoDetails] = useState([]);

  const FetchImages = async () => {
    try {
      const response = await api.get("/gallerys");
      const allGallerys = response.data;
      const last12Gallerys = allGallerys.slice(-12).reverse();
      setGallerys(last12Gallerys);
    } catch (error) {
      console.error("Error fetching photo gallery images", error);
    }
  };

  const FetchTenders = async (language) => {
    try {
      const response = await api.get(`/tenders?lang=${i18n.language}`);
      setTenders(response.data);
    } catch (error) {
      console.error("Error fetching tenders data");
    }
  };
  const FetchVideos = async () => {
    try {
     
      const response = await api.get(`/home-videos?lang=${i18n.language}`);
      setVideos(response.data);
    } catch (error) {
      console.error("Error fetching videos data");
    }
  };
 

useEffect(() => {
  FetchVideos(i18n.language);
}, [i18n.language]);

useEffect(() => {
  FetchTenders(i18n.language);
}, [i18n.language]);

useEffect(() => {
  fetchCeoDetails(i18n.language);
}, [i18n.language]);


  const fetchCeoDetails = async () => {
    try {
      const response = await api.get(`/ceodetails?lang=${i18n.language}`);
      setCeoDetails(response.data);
    } catch (error) {
      console.error("Error fetching CEO details:", error);
    }
  };
  useEffect(() => {
    FetchImages();
    // FetchTenders();
    // FetchVideos();
    // fetchCeoDetails();
  }, [i18n.language]);

  useEffect(() => {
    const lightbox = GLightbox({
      selector: ".glightbox",
    });

    return () => {
      lightbox.destroy();
    };
  }, [gallerys]);

  const getYouTubeVideoId = (url) => {
    const regExp =
      //eslint-disable-next-line
      /^.*(youtu.be\/|v\/|\/u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const handleOpenVideoModal = (video) => {
    setSelectedVideo(
      `https://www.youtube.com/embed/${getYouTubeVideoId(video.video_url)}`
    );
    setShowVideoModal(true);
  };

  const handleCloseVideoModal = () => {
    setShowVideoModal(false);
    setSelectedVideo(null);
  };

  return (
    <>
      <section className="department-details">
        <div className="container-fluid">
          <div className="row clearfix">
            <div className="col-lg-9 col-md-12 col-sm-12 content-side">
              <div className="department-details-content">
                <div className="content-one">
                  <section className="youtube-sec">
                    <div className="">
                      <div className="row">
                        
                        <div className="col-md-6 col-12">
                          {ceoDetails.map((ceoDetail, index) => (
                            <div className="profile-card d-flex flex-column align-items-center" id="profile-card" key={index}>
                              <div className="profile-image-container mb-3">
                                <img
                                  className="profile-image"
                                  src={`${baseURL}${ceoDetail.image_path}`}
                                  alt={`ceoDetail ${index + 1}`}
                                />
                              </div>
                              <div className="profile-content text-center">
                                <div className="blue-line mx-auto"></div>
                                <h5 className="custom-name mb-2">{ceoDetail.ceo_name}</h5>

                                <p className="description">
                                  {ceoDetail.description}
                                </p>

                              </div>
                            </div>
                          ))}
                        </div>

                        <div
                          className="col-md-6"
                          style={{
                            maxHeight: "300px",
                            overflowY: "auto",
                            marginTop: "10px"
                          }}
                        >
                          {videos.map((video, index) => (
                            <React.Fragment key={index}>
                              <div className="row" id="video-01">
                                <div className="col-4 col-md-3">
                                  <Link
                                    onClick={() => handleOpenVideoModal(video)}
                                    className="lightbox"
                                    style={{ cursor: "pointer" }}
                                  >
                                    <img
                                      src={`https://img.youtube.com/vi/${getYouTubeVideoId(
                                        video.video_url
                                      )}/0.jpg`}
                                      alt={video.description}
                                      style={{
                                        width: "100px",
                                        height: "56px",
                                        cursor: "pointer",
                                        objectFit: "cover",
                                      }}
                                    />
                                  </Link>
                                </div>
                                <div className="col-8 col-md-9 px-0">
                                  <p className="h6 video-title">
                                    {video.description}
                                  </p>
                                  <p className="video-desc">
                                    Date:{" "}
                                    {new Date(
                                      video.publish_date
                                    ).toLocaleDateString("en-US", {
                                      day: "2-digit",
                                      month: "long",
                                      year: "numeric",
                                    })}
                                  </p>
                                </div>
                              </div>
                              <hr />
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                    </div>
                  </section>

                  <div className="col-lg-12 col-md-12 col-sm-12 content-side">
                    <div className="department-details-content">
                      <div className="content-three">
                        <div className="tabs-box lightbox-tab">
                          <div className="tab-btn-box">
                            <ul className="tab-btns tab-buttons clearfix">
                              <li
                                className="tab-btn active-btn"
                                data-tab="#tab-1"
                              >
                                 {t("serviceBlock.photo_gallery")}
                              </li>
                            </ul>
                          </div>
                          <div className="tabs-content">
                            <div className="tab active-tab" id="tab-1">
                              <div className="content-box department-section">
                                <div className="row " style={{ margin: "0 -10px" }}>
                                  {gallerys.map((image, index) => (
                                    <div key={index} className="col-sm-2 col-4 p-2  gallery-item">
                                      <Link
                                        to={`${baseURL}${image.file_path}`}
                                        className="glightbox gallery-link"
                                        data-gallery="slider-images"
                                      >
                                        <img
                                          src={`${baseURL}${image.file_path}`}
                                          alt={`slider${index + 1}`}
                                          className="gallery-img"
                                        />
                                      </Link>
                                    </div>
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
            </div>

            <div className="col-lg-3 col-md-12 col-sm-12 content-side">
              <div className="sidebar-side department-sidebar">
                <div className="department-sidebar">
                  <div className="content-two category-widget right-side-sec">
                    <h3>
                      <i className="ri-article-line"></i> Achievements
                    </h3>
                    <div className="widget-content">
                      <div className="text-box">
                        <div className="marquee-wrapper">
                          <div className="marquee-block">
                            <div className="marquee-inner tender-sidebar to-left">
                              <ul className="text-start">
                                {tenders.map((tender, index) => (
                                  <li key={index}>
                                    <img src={pdficon} alt="pdficon" />
                                    <Link
                                      to={`${baseURL}/${tender.pdf}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      {tender.description}
                                    </Link>
                                    {tender.status === "New" && (
                                      <img
                                        src={image}
                                        className="newgif"
                                        alt="newgif"
                                      />
                                    )}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="service-block-three">
                  <div className="inner-box">
                    <h6>{t("serviceBlock.service_for")}</h6>
                    <h3>
                      <Link to="#.">{t("serviceBlock.our_city_residents")}</Link>
                    </h3>
                    <ul className="list-item clearfix">
                      <li>
                        <Link to="tel:0251-2690271">
                        {t("serviceBlock.helpline")}
                        </Link>
                      </li>
                      <li>
                        <Link to="#.">{t("serviceBlock.emergency")} </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Modal
        show={showVideoModal}
        onHide={handleCloseVideoModal}
        centered
        size="lg"
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          {selectedVideo && (
            <iframe
              width="100%"
              height="400"
              objectFit="cover"
              src={selectedVideo}
              frameBorder="0"
              allowFullScreen
              title="YouTube video"
            ></iframe>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default DepartmentDetails;
