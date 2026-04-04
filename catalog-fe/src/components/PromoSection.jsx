import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import Banner1Img from "../assets/banner1.jpg";
import Banner2Img from "../assets/banner2.jpg";
import Banner3Img from "../assets/banner3.jpg";
import Banner4Img from "../assets/banner4.jpg";

const banners = [
  { image: Banner1Img, alt: "Banner 1" },
  { image: Banner2Img, alt: "Banner 2" },
  { image: Banner3Img, alt: "Banner 3" },
  { image: Banner4Img, alt: "Banner 4" },
];

export default function PromoSection() {
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [activeIndex, setActiveIndex]       = useState(0);

  return (
    <section style={{ background: "#072B50", padding: "40px 0" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 20px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 12, height: 380 }}>

          {/* LEFT BIG BANNER */}
          <div style={{ borderRadius: 14, overflow: "hidden", height: "100%", border: "1px solid rgba(255,255,255,0.15)" }}>
            <Swiper
              modules={[Autoplay, Pagination]}
              pagination={{ clickable: true }}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              loop={false}
              onSwiper={(swiper) => setSwiperInstance(swiper)}
              onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
              style={{ width: "100%", height: "100%" }}
            >
              {banners.map((banner, index) => (
                <SwiperSlide
                  key={index}
                  style={{ display: "flex", alignItems: "center", justifyContent: "center", background: "transparent" }}
                >
                  <img
                    src={banner.image}
                    alt={banner.alt}
                    style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* RIGHT 2x2 THUMBNAIL */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr 1fr", gap: 10, height: "100%" }}>
            {banners.map((card, index) => (
              <div
                key={index}
                onClick={() => { swiperInstance?.slideTo(index); setActiveIndex(index); }}
                style={{ borderRadius: 10, overflow: "hidden", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", outline: activeIndex === index ? "3px solid #60a5fa" : "3px solid transparent", transition: "outline 0.2s ease" }}
              >
                <img
                  src={card.image}
                  alt={card.alt}
                  style={{ width: "100%", height: "100%", objectFit: "contain", display: "block", opacity: activeIndex === index ? 1 : 0.6, transition: "transform 0.3s ease, opacity 0.3s ease" }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.05)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}
                />
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
