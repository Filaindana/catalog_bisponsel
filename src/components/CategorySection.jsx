import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Mousewheel, FreeMode } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";
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
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: #ffffff;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
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
    font-size: 16px;
    font-weight: 700;
  }

  .category-swiper .swiper-button-prev:hover,
  .category-swiper .swiper-button-next:hover {
    background: #072B50;
    color: #ffffff;
    border-color: #072B50;
    box-shadow: 0 6px 16px rgba(7, 43, 80, 0.35);
    transform: scale(1.08);
  }

  .category-swiper .swiper-button-disabled {
    opacity: 0.3 !important;
    pointer-events: none;
  }

  .category-swiper .swiper-slide > div:hover .category-circle {
    background: #f2f3f4 !important;
    transform: translateY(-4px);
    box-shadow: 0 8px 20px rgba(7, 43, 80, 0.2);
    border-color: #072B50 !important;
  }

  .category-circle {
    transition: all 0.3s ease !important;
  }
`;

function CategoryItem({ item }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "12px",
        cursor: "pointer",
        padding: "14px 0",
      }}
    >
      <div
        className="category-circle"
        style={{
          width: "100px",
          height: "100px",
          borderRadius: "50%",
          background: "#f3f4f6",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          border: "2px solid transparent",
          boxShadow: "0 2px 4px rgba(0,0,0,0.05), 0 4px 12px rgba(0,0,0,0.1), 0 8px 24px rgba(0,0,0,0.08)",
        }}
      >
        <img
          src={item.image}
          alt={item.name}
          style={{ width: "65%", height: "65%", objectFit: "contain" }}
        />
      </div>
      <span
        style={{
          fontSize: "15px",
          fontWeight: 600,
          textAlign: "center",
          color: "#374151",
        }}
      >
        {item.name}
      </span>
    </div>
  );
}

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

      <h2 className="section-title" style={{ textAlign: "center", marginBottom: "36px" }}>
        Product Category
      </h2>

      <div style={{ padding: "0 60px", position: "relative" }}>
        <Swiper
          modules={[Navigation, Mousewheel, FreeMode]}
          navigation
          mousewheel={{ forceToAxis: true }}
          freeMode={true}
          spaceBetween={0}
          slidesPerView={7}
          className="category-swiper"
          breakpoints={{
            320: { slidesPerView: 3, spaceBetween: 0 },
            640: { slidesPerView: 5, spaceBetween: 0 },
            1024: { slidesPerView: 7, spaceBetween: 0 },
          }}
        >
          {categories.map((item, index) => (
            <SwiperSlide key={index}>
              <CategoryItem item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}