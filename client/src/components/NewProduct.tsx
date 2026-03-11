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
    badge: "New",
    image: produkImg,
  },
  {
    category: "Komputer (PC)",
    name: "PC Gaming Pro Ryzen Edition",
    spec: "Ryzen 7 • RTX 4060 • 16GB RAM • SSD 1TB",
    price: "Rp 17.499.000",
    rating: 4.8,
    badge: "New",
    image: produkImg,
  },
  {
    category: "Komputer (PC)",
    name: "PC Gaming Pro Ryzen Edition",
    spec: "Ryzen 7 • RTX 4060 • 16GB RAM • SSD 1TB",
    price: "Rp 17.499.000",
    rating: 4.8,
    badge: "New",
    image: produkImg,
  },
  {
    category: "Komputer (PC)",
    name: "PC Gaming Pro Ryzen Edition",
    spec: "Ryzen 7 • RTX 4060 • 16GB RAM • SSD 1TB",
    price: "Rp 17.499.000",
    rating: 4.8,
    badge: "New",
    image: produkImg,
  },
  {
    category: "Komputer (PC)",
    name: "PC Gaming Pro Ryzen Edition",
    spec: "Ryzen 7 • RTX 4060 • 16GB RAM • SSD 1TB",
    price: "Rp 17.499.000",
    rating: 4.8,
    badge: "New",
    image: produkImg,
  },
  {
    category: "Komputer (PC)",
    name: "PC Gaming Pro Ryzen Edition",
    spec: "Ryzen 7 • RTX 4060 • 16GB RAM • SSD 1TB",
    price: "Rp 17.499.000",
    rating: 4.8,
    badge: "New",
    image: produkImg,
  },
];

const arrowBtn: React.CSSProperties = {
  width: "28px",
  height: "28px",
  borderRadius: "50%",
  background: "#fff",
  border: "1px solid #e5e7eb",
  boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "14px",
  color: "#374151",
  transition: "all 0.2s ease",
  padding: 0,
};

export default function NewProduct() {
  const swiperRef = useRef<SwiperType | null>(null);
  const [saved, setSaved] = useState<boolean[]>(products.map(() => false));

  return (
    <section style={{ padding: "40px 0", background: "#fff" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 20px" }}>
        {/* HEADER */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          <h2
            style={{
              fontSize: "22px",
              fontWeight: 700,
              color: "#111827",
              margin: 0,
              borderLeft: "4px solid #072B50",
              paddingLeft: "12px",
            }}
          >
            Produk Terbaru
          </h2>
          <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
            <button
              style={arrowBtn}
              onClick={() => swiperRef.current?.slidePrev()}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  "#072B50";
                (e.currentTarget as HTMLButtonElement).style.color = "#fff";
                (e.currentTarget as HTMLButtonElement).style.borderColor =
                  "#072B50";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  "#fff";
                (e.currentTarget as HTMLButtonElement).style.color = "#374151";
                (e.currentTarget as HTMLButtonElement).style.borderColor =
                  "#e5e7eb";
              }}
            >
              ‹
            </button>
            <button
              style={arrowBtn}
              onClick={() => swiperRef.current?.slideNext()}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  "#072B50";
                (e.currentTarget as HTMLButtonElement).style.color = "#fff";
                (e.currentTarget as HTMLButtonElement).style.borderColor =
                  "#072B50";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  "#fff";
                (e.currentTarget as HTMLButtonElement).style.color = "#374151";
                (e.currentTarget as HTMLButtonElement).style.borderColor =
                  "#e5e7eb";
              }}
            >
              ›
            </button>
          </div>
        </div>

        {/* SWIPER */}
        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          spaceBetween={16}
          slidesPerView={5}
          breakpoints={{
            320: { slidesPerView: 1.5 },
            640: { slidesPerView: 2.5 },
            1024: { slidesPerView: 5 },
          }}
        >
          {products.map((product, index) => (
            <SwiperSlide key={index}>
              <div
                style={{
                  border: "1px solid #e5e7eb",
                  borderRadius: "12px",
                  overflow: "hidden",
                  background: "#fff",
                  cursor: "pointer",
                  transition: "box-shadow 0.3s ease, transform 0.3s ease", // ← tambah transform
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow =
                    "0 8px 24px rgba(0,0,0,0.1)";
                  (e.currentTarget as HTMLDivElement).style.transform =
                    "translateY(-4px)"; // ← naik sedikit
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                  (e.currentTarget as HTMLDivElement).style.transform =
                    "translateY(0)"; // ← balik
                }}
              >
                {/* INFO DI ATAS */}
                <div style={{ padding: "12px 12px 0 12px" }}>
                  <p
                    style={{
                      fontSize: "11px",
                      color: "#6b7280",
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
                      margin: "0 0 8px 0",
                      lineHeight: 1.4,
                    }}
                  >
                    {product.spec}
                  </p>
                </div>

                {/* IMAGE */}
                <div style={{ position: "relative", background: "#f9fafb" }}>
                  {product.badge && (
                    <span
                      style={{
                        position: "absolute",
                        top: "10px",
                        left: "10px",
                        background: "#ef4444",
                        color: "#fff",
                        fontSize: "11px",
                        fontWeight: 600,
                        padding: "2px 8px",
                        borderRadius: "4px",
                        zIndex: 1,
                      }}
                    >
                      {product.badge}
                    </span>
                  )}
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
                      right: "10px",
                      zIndex: 1,
                      cursor: "pointer",
                      background: "#fff",
                      borderRadius: "6px",
                      padding: "6px",
                      boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill={saved[index] ? "#072B50" : "none"}
                      stroke={saved[index] ? "#072B50" : "#374151"}
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
                      padding: "10px",
                    }}
                  />
                </div>

                {/* HARGA & RATING */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                    borderTop: "1px solid #f3f4f6",
                    padding: "10px 12px",
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
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
