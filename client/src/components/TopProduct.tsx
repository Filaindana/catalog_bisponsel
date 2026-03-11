import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import produkImg from "../assets/monitor.png";

const products = [
  {
    category: "Komputer (PC)",
    name: "PC Gaming Pro Ryzen Edition",
    spec: "Ryzen 7 • RTX 4060 • 16GB RAM • SSD 1TB",
    price: "Rp 17.499.000",
    rating: 4.8,
    image: produkImg,
  },
  {
    category: "Komputer (PC)",
    name: "PC Gaming Pro Ryzen Edition",
    spec: "Ryzen 7 • RTX 4060 • 16GB RAM • SSD 1TB",
    price: "Rp 17.499.000",
    rating: 4.8,
    image: produkImg,
  },
  {
    category: "Komputer (PC)",
    name: "PC Gaming Pro Ryzen Edition",
    spec: "Ryzen 7 • RTX 4060 • 16GB RAM • SSD 1TB",
    price: "Rp 17.499.000",
    rating: 4.8,
    image: produkImg,
  },
  {
    category: "Komputer (PC)",
    name: "PC Gaming Pro Ryzen Edition",
    spec: "Ryzen 7 • RTX 4060 • 16GB RAM • SSD 1TB",
    price: "Rp 17.499.000",
    rating: 4.8,
    image: produkImg,
  },
  {
    category: "Komputer (PC)",
    name: "PC Gaming Pro Ryzen Edition",
    spec: "Ryzen 7 • RTX 4060 • 16GB RAM • SSD 1TB",
    price: "Rp 17.499.000",
    rating: 4.8,
    image: produkImg,
  },
];

const btnStyle: React.CSSProperties = {
  width: "36px",
  height: "36px",
  minWidth: "36px",
  flexShrink: 0,
  borderRadius: "50%",
  background: "#fff",
  border: "none",
  boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "16px",
  padding: "0",
  color: "#374151",
  transition: "all 0.2s ease",
};

export default function TopProduct() {
  const swiperRef = useRef<SwiperType | null>(null);
  const [saved, setSaved] = useState<boolean[]>(products.map(() => false));

  return (
    <section style={{ background: "#072B50", padding: "60px 20px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* LAYOUT UTAMA - FLEXBOX */}
        <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
          {/* KIRI - TEKS */}
          <div style={{ minWidth: "180px", maxWidth: "180px" }}>
            <h2
              style={{
                fontSize: "28px",
                fontWeight: 800,
                color: "#fff",
                margin: "0 0 16px 0",
                lineHeight: 1.2,
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              Top Product
            </h2>
            <p
              style={{
                fontSize: "14px",
                color: "#93c5fd",
                margin: 0,
                lineHeight: 1.7,
              }}
            >
              Pilihan produk terbaik dengan kualitas terjamin
            </p>
          </div>

          {/* BUTTON PREV */}
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            style={btnStyle}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "#1e40af";
              (e.currentTarget as HTMLButtonElement).style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "#fff";
              (e.currentTarget as HTMLButtonElement).style.color = "#374151";
            }}
          >
            ❮
          </button>

          {/* SWIPER */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <Swiper
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              spaceBetween={14}
              slidesPerView={4}
              breakpoints={{
                320: { slidesPerView: 2 },
                640: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
              }}
            >
              {products.map((product, index) => (
                <SwiperSlide key={index}>
                  <div
                    style={{
                      background: "#fff",
                      borderRadius: "12px",
                      overflow: "hidden",
                      cursor: "pointer",
                      transition: "box-shadow 0.3s ease, transform 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLDivElement).style.boxShadow =
                        "0 8px 24px rgba(0,0,0,0.3)";
                      (e.currentTarget as HTMLDivElement).style.transform =
                        "translateY(-4px)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLDivElement).style.boxShadow =
                        "none";
                      (e.currentTarget as HTMLDivElement).style.transform =
                        "translateY(0)";
                    }}
                  >
                    {/* IMAGE */}
                    <div
                      style={{ position: "relative", background: "#f9fafb" }}
                    >
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                          setSaved((prev) => {
                            const updated = [...prev];
                            updated[index] = !updated[index];
                            return updated;
                          });
                        }}
                        style={{
                          position: "absolute",
                          top: "10px",
                          left: "10px",
                          zIndex: 1,
                          cursor: "pointer",
                          background: saved[index] ? "#072B50" : "#e11d48",
                          borderRadius: "50%",
                          width: "30px",
                          height: "30px",
                          boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          transition: "all 0.2s ease",
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill={saved[index] ? "#fff" : "none"}
                          stroke="#fff"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                        </svg>
                      </span>
                      <img
                        src={product.image}
                        alt={product.name}
                        style={{
                          width: "100%",
                          height: "180px",
                          objectFit: "contain",
                          display: "block",
                          padding: "14px",
                        }}
                      />
                    </div>

                    {/* INFO */}
                    <div style={{ padding: "12px" }}>
                      <p
                        style={{
                          fontSize: "11px",
                          color: "#9ca3af",
                          margin: "0 0 4px 0",
                        }}
                      >
                        {product.category}
                      </p>
                      <p
                        style={{
                          fontSize: "13px",
                          fontWeight: 700,
                          color: "#111827",
                          margin: "0 0 4px 0",
                          lineHeight: 1.3,
                        }}
                      >
                        {product.name}
                      </p>
                      <p
                        style={{
                          fontSize: "11px",
                          color: "#9ca3af",
                          margin: "0 0 12px 0",
                          lineHeight: 1.5,
                        }}
                      >
                        {product.spec}
                      </p>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-end",
                          borderTop: "1px solid #f3f4f6",
                          paddingTop: "10px",
                        }}
                      >
                        <div>
                          <p
                            style={{
                              fontSize: "10px",
                              color: "#9ca3af",
                              margin: "0 0 2px 0",
                            }}
                          >
                            Harga
                          </p>
                          <p
                            style={{
                              fontSize: "13px",
                              fontWeight: 700,
                              color: "#ef4444",
                              margin: 0,
                            }}
                          >
                            {product.price}
                          </p>
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <p
                            style={{
                              fontSize: "10px",
                              color: "#9ca3af",
                              margin: "0 0 2px 0",
                            }}
                          >
                            Review
                          </p>
                          <p
                            style={{
                              fontSize: "13px",
                              fontWeight: 600,
                              color: "#111827",
                              margin: 0,
                            }}
                          >
                            ⭐ {product.rating}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* BUTTON NEXT */}
          <button
            onClick={() => swiperRef.current?.slideNext()}
            style={btnStyle}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "#1e40af";
              (e.currentTarget as HTMLButtonElement).style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "#fff";
              (e.currentTarget as HTMLButtonElement).style.color = "#374151";
            }}
          >
            ❯
          </button>
        </div>
      </div>
    </section>
  );
}
