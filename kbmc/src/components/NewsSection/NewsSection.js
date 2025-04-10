import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next"; // ✅ import i18n hook
import "./NewsSection.css";
import api from "../api";

const NewsSection = () => {
  const [newsData, setNewsData] = useState([]);
  const [animationState, setAnimationState] = useState({});
  const { i18n } = useTranslation(); // ✅ get language

  const fetchNews = async (language) => {
    try {
      const response = await api.get(`/newsupdate?language=${language}`);
      const reversedNewsData = response.data.reverse();
      setNewsData(reversedNewsData);
    } catch (error) {
      console.error("Error fetching news", error);
    }
  };

  const handleMouseEnter = () => {
    const marquee = document.querySelector(".marquee-content");
    const computedStyle = window.getComputedStyle(marquee);
    const currentTransform = computedStyle.transform;
    const translateX =
      currentTransform.match(/matrix.*\((.+), (.+), (.+), (.+), (.+), (.+)\)/)?.[5] || 0;

    setAnimationState({
      paused: true,
      translateX: parseFloat(translateX),
    });
  };

  const handleMouseLeave = () => {
    setAnimationState((prevState) => ({
      ...prevState,
      paused: false,
    }));
  };

  useEffect(() => {
    fetchNews(i18n.language); // ✅ fetch based on selected language
  }, [i18n.language]); // 🔁 refetch when language changes

  return (
    <section className="news-section">
      <div className="container-fluid">
        <div
          className="marquee"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div
            className="marquee-content"
            style={{
              animationPlayState: animationState.paused ? "paused" : "running",
              transform: animationState.paused
                ? `translateX(${animationState.translateX}px)`
                : "",
            }}
          >
            {newsData.concat(newsData).map((item, index) => (
              <div className="marquee-item" key={index}>
                <span style={{ color: "#3EA4ED" }}>
                  {(index % newsData.length) + 1}.{" "}
                </span>
                {item.description}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
