import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import slider1 from "../images/slider1.png";
import slider2 from "../images/slider2.png";
import slider3 from "../images/slider3.png";

const images = [slider1, slider2, slider3];

const links = [
  "https://example.com/1",
  "https://example.com/2",
  "https://example.com/3",
];

export default function Slider() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((activeIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [activeIndex]);

  const handlePrevClick = () => {
    setActiveIndex((activeIndex - 1 + images.length) % images.length);
  };

  const handleNextClick = () => {
    setActiveIndex((activeIndex + 1) % images.length);
  };

  return (
    <div className="slider-wrapper">
      <div className="slider-container">
        <div className="slide-number">
          {activeIndex + 1} / {images.length}
        </div>
        <div className="dots">
          {images.map((_, index) => (
            <button
              key={index}
              className={`dot ${activeIndex === index ? "active" : ""}`}
              onClick={() => setActiveIndex(index)}
            ></button>
          ))}
        </div>
        <button className="prev-button" onClick={handlePrevClick}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <button className="next-button" onClick={handleNextClick}>
          <FontAwesomeIcon icon={faArrowRight} />
        </button>

        {images.map((src, index) => (
          <div
            key={index}
            className={`slide ${activeIndex === index ? "active" : ""}`}
          >
            <img src={src} alt={`Slide ${index + 1}`} />
            <div className="learn-more-button">
              <a href={links[index]} target="_blank" rel="noopener noreferrer">
                GO TO COLLECTION
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
