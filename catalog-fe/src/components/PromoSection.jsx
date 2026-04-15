import { useState, useEffect } from "react";
import Banner1Img from "../assets/banner1.png";
import Banner2Img from "../assets/banner2.png";
import Banner3Img from "../assets/banner3.png";
import Banner4Img from "../assets/banner4.png";

const banners = [
  { id: 1, img: Banner1Img },
  { id: 2, img: Banner2Img },
  { id: 3, img: Banner3Img },
  { id: 4, img: Banner4Img },
];

const INTERVAL = 3000;

export default function PromoSection() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % banners.length);
    }, INTERVAL);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      className="w-full px-4 py-6"
      style={{ backgroundColor: "#072B50", fontFamily: "'Inter', sans-serif" }}
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-4 items-start">

        {/* Main Big Banner Slider */}
        <div className="lg:w-1/2 w-full flex flex-col gap-3">
          <div className="w-full overflow-hidden rounded-2xl">
            <img
              src={banners[activeSlide].img}
              alt={`Slide ${activeSlide + 1}`}
              className="w-full object-cover aspect-video rounded-2xl"
              style={{ transition: "opacity 0.4s ease" }}
            />
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-1">
            {banners.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveSlide(i)}
                style={{
                  width: i === activeSlide ? "24px" : "10px",
                  height: "10px",
                  borderRadius: "9999px",
                  backgroundColor:
                    i === activeSlide ? "#ffffff" : "rgba(255,255,255,0.4)",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  transition: "all 0.3s ease",
                }}
              />
            ))}
          </div>
        </div>

        {/* 2x2 Small Banner Thumbnails */}
        <div className="lg:w-1/2 w-full grid grid-cols-2 gap-3">
          {banners.map((banner, i) => (
            <div
              key={banner.id}
              onClick={() => setActiveSlide(i)}
              className="overflow-hidden rounded-2xl cursor-pointer"
              style={{
                border: i === activeSlide
                  ? "1.5px solid rgba(255,255,255,0.85)"
                  : "1.5px solid transparent",
                opacity: i === activeSlide ? 1 : 0.6,
                transition: "opacity 0.3s ease, border-color 0.3s ease",
                boxSizing: "border-box",
              }}
            >
              <img
                src={banner.img}
                alt={`Promo ${i + 1}`}
                className="w-full h-full object-cover aspect-video block"
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}