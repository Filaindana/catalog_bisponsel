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

const arrowBtn: React.CSSProperties = {
  width: "36px",
  height: "36px",
  borderRadius: "50%",
  background: "#fff",
  border: "none",
  boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "20px",
  color: "#374151",
  transition: "all 0.2s ease",
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  zIndex: 10,
};

export default function TopProduct() {
  const swiperRef = useRef<SwiperType | null>(null);
  const [saved, setSaved] = useState<boolean[]>(products.map(() => false));

  return (
    <section style={{ background: "#072B50", padding: "60px 0" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "220px 1fr",
            gap: "40px",
            alignItems: "center",
          }}
        >
          {/* KIRI - TEKS */}
          <div>
            <h2
              style={{
                fontSize: "28px",
                fontWeight: 800,
                color: "#ffffff",
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

          {/* KANAN - SLIDER */}
          <div style={{ position: "relative", overflow: "hidden" }}>
            {/* ARROW PREV */}
            <button
              style={{ ...arrowBtn, left: "-18px" }}
              onClick={() => swiperRef.current?.slidePrev()}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  "#1e3a5f";
                (e.currentTarget as HTMLButtonElement).style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  "#fff";
                (e.currentTarget as HTMLButtonElement).style.color = "#374151";
              }}
            >
              ‹
            </button>

            <Swiper
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              spaceBetween={16}
              slidesPerView={4}
              breakpoints={{
                320: { slidesPerView: 1.2 },
                640: { slidesPerView: 2.2 },
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
                      transition: "box-shadow 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLDivElement).style.boxShadow =
                        "0 8px 24px rgba(0,0,0,0.3)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLDivElement).style.boxShadow =
                        "none";
                    }}
                  >
                    {/* IMAGE DI ATAS */}
                    <div
                      style={{ position: "relative", background: "#f9fafb" }}
                    >
                      {/* SAVE ICON - bulat merah */}
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
                          top: "12px",
                          left: "12px",
                          zIndex: 1,
                          cursor: "pointer",
                          background: saved[index] ? "#072B50" : "#e11d48",
                          borderRadius: "50%",
                          width: "32px",
                          height: "32px",
                          boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          transition: "all 0.2s ease",
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
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
                          height: "200px",
                          objectFit: "contain",
                          display: "block",
                          padding: "16px",
                        }}
                      />
                    </div>

                    {/* INFO DI BAWAH */}
                    <div style={{ padding: "14px" }}>
                      <p
                        style={{
                          fontSize: "12px",
                          color: "#9ca3af",
                          margin: "0 0 6px 0",
                        }}
                      >
                        {product.category}
                      </p>
                      <p
                        style={{
                          fontSize: "15px",
                          fontWeight: 700,
                          color: "#111827",
                          margin: "0 0 6px 0",
                          lineHeight: 1.3,
                        }}
                      >
                        {product.name}
                      </p>
                      <p
                        style={{
                          fontSize: "12px",
                          color: "#9ca3af",
                          margin: "0 0 14px 0",
                          lineHeight: 1.5,
                        }}
                      >
                        {product.spec}
                      </p>

                      {/* HARGA & RATING */}
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-end",
                          borderTop: "1px solid #f3f4f6",
                          paddingTop: "12px",
                        }}
                      >
                        <div>
                          <p
                            style={{
                              fontSize: "11px",
                              color: "#9ca3af",
                              margin: "0 0 2px 0",
                            }}
                          >
                            Harga
                          </p>
                          <p
                            style={{
                              fontSize: "14px",
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
                              fontSize: "11px",
                              color: "#9ca3af",
                              margin: "0 0 2px 0",
                            }}
                          >
                            Review
                          </p>
                          <p
                            style={{
                              fontSize: "14px",
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

            {/* ARROW NEXT */}
            <button
              style={{ ...arrowBtn, right: "0px" }}
              onClick={() => swiperRef.current?.slideNext()}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  "#1e3a5f";
                (e.currentTarget as HTMLButtonElement).style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  "#fff";
                (e.currentTarget as HTMLButtonElement).style.color = "#374151";
              }}
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
