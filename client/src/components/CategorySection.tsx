import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import keyboardImg from "/src/assets/keyboard.png";
import kabellanImg from "/src/assets/kabel.png";
import laptopImg from "/src/assets/laptop.png";
import soundImg from "/src/assets/sound.png";
import mouseImg from "/src/assets/mouse.png";
import pcImg from "/src/assets/monitor.png";
import handphoneImg from "/src/assets/handphone.png";

const swiperStyles = `
  .category-swiper .swiper-button-prev,
  .category-swiper .swiper-button-next {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    background: #ffffff;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
    border: 1px solid #e5e7eb;
    color: #374151;
    transition: all 0.25s ease;
    top: 40%;
  }

  .category-swiper .swiper-button-prev {
    left: 6px;
  }

  .category-swiper .swiper-button-next {
    right: 6px;
  }

  .category-swiper .swiper-button-prev::after,
  .category-swiper .swiper-button-next::after {
    font-size: 13px;
    font-weight: 700;
  }

  .category-swiper .swiper-button-prev:hover,
  .category-swiper .swiper-button-next:hover {
    background: #6366f1;
    color: #ffffff;
    border-color: #6366f1;
    box-shadow: 0 6px 16px rgba(99, 102, 241, 0.35);
    transform: scale(1.08);
  }

  .category-swiper .swiper-button-disabled {
    opacity: 0.3 !important;
    pointer-events: none;
  }

  .category-swiper .swiper-slide > div:hover .category-circle {
    background: #eef2ff !important;
    transform: translateY(-3px);
    box-shadow: 0 6px 16px rgba(99, 102, 241, 0.15);
    border-color: #c7d2fe !important;
  }

  .category-circle {
    transition: all 0.3s ease !important;
  }
`;

export default function CategorySection() {
  const categories = [
    { name: "Keyboard", image: keyboardImg },
    { name: "Kabel LAN", image: kabellanImg },
    { name: "Laptop", image: laptopImg },
    { name: "Speaker", image: soundImg },
    { name: "Mouse", image: mouseImg },
    { name: "Komputer", image: pcImg },
    { name: "Handphone", image: handphoneImg },
    { name: "Handphone", image: handphoneImg },
    { name: "Handphone", image: handphoneImg },
  ];

  return (
    <section style={{ padding: "60px 0", background: "#ffffff" }}>
      <style>{swiperStyles}</style>

      {/* TITLE */}
      <h2
        style={{
          textAlign: "center",
          marginBottom: "30px",
          fontSize: "26px",
          fontWeight: 600,
        }}
      >
        Product Category
      </h2>

      {/* FULL WIDTH tapi arrow dikasih padding dari tepi */}
      <div style={{ padding: "0 50px", position: "relative" }}>
        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={0}
          slidesPerView={7}
          className="category-swiper"
          style={{ overflow: "hidden" }}
          breakpoints={{
            320: { slidesPerView: 3, spaceBetween: 0 },
            640: { slidesPerView: 5, spaceBetween: 0 },
            1024: { slidesPerView: 7, spaceBetween: 0 },
          }}
        >
          {categories.map((item, index) => (
            <SwiperSlide key={index}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "8px",
                  cursor: "pointer",
                  padding: "10px 0",
                }}
              >
                {/* CIRCLE */}
                <div
                  className="category-circle"
                  style={{
                    width: "75px",
                    height: "75px",
                    borderRadius: "50%",
                    background: "#f3f4f6",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                    border: "2px solid transparent",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: "60%",
                      height: "60%",
                      objectFit: "contain",
                    }}
                  />
                </div>

                <span
                  style={{
                    fontSize: "13px",
                    fontWeight: 500,
                    textAlign: "center",
                    color: "#374151",
                  }}
                >
                  {item.name}
                </span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
