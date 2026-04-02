import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Mousewheel, FreeMode } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import keyboardImg   from "/src/assets/keyboard.png";
import kabellanImg   from "/src/assets/kabel.png";
import laptopImg     from "/src/assets/laptop.png";
import soundImg      from "/src/assets/sound.png";
import mouseImg      from "/src/assets/mouse.png";
import pcImg         from "/src/assets/monitor.png";
import handphoneImg  from "/src/assets/handphone.png";

function CategoryItem({ item }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, cursor: "pointer", padding: "14px 0" }}>
      <div
        className="category-circle"
        style={{
          width: 100, height: 100, borderRadius: "50%",
          background: "#f3f4f6",
          display: "flex", alignItems: "center", justifyContent: "center",
          overflow: "hidden",
          border: "2px solid transparent",
          boxShadow: "0 2px 4px rgba(0,0,0,0.05), 0 4px 12px rgba(0,0,0,0.1), 0 8px 24px rgba(0,0,0,0.08)",
        }}
      >
        <img src={item.image} alt={item.name} style={{ width: "65%", height: "65%", objectFit: "contain" }} />
      </div>
      <span style={{ fontSize: 15, fontWeight: 600, textAlign: "center", color: "#374151" }}>{item.name}</span>
    </div>
  );
}

export default function CategorySection() {
  const categories = [
    { name: "Keyboard",  image: keyboardImg },
    { name: "Kabel LAN", image: kabellanImg },
    { name: "Laptop",    image: laptopImg },
    { name: "Speaker",   image: soundImg },
    { name: "Mouse",     image: mouseImg },
    { name: "Komputer",  image: pcImg },
    { name: "Handphone", image: handphoneImg },
    { name: "Handphone", image: handphoneImg },
    { name: "Handphone", image: handphoneImg },
  ];

  return (
    <section style={{ padding: "60px 0", background: "#ffffff" }}>
      <h2 className="section-title" style={{ textAlign: "center", marginBottom: 36 }}>Product Category</h2>

      {/* wrapper dengan padding untuk memberi ruang tombol nav */}
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 72px", position: "relative" }}>
        <Swiper
          modules={[Navigation, Mousewheel, FreeMode]}
          navigation
          mousewheel={{ forceToAxis: true }}
          freeMode
          spaceBetween={0}
          slidesPerView={7}
          className="category-swiper"
          breakpoints={{
            320:  { slidesPerView: 3, spaceBetween: 0 },
            640:  { slidesPerView: 5, spaceBetween: 0 },
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
