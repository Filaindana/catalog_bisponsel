import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { ArrowLeft, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "swiper/css";

import laptopImg from "../assets/laptop.png";
import mouseImg from "../assets/mouse.png";
import keyboardImg from "../assets/keyboard.png";
import soundImg from "../assets/sound.png";
import monitorImg from "../assets/monitor.png";

const product = {
  name: "PC Gaming Pro Ryzen Edition",
  category: "Komputer (PC)",
  price: 17499000,
  rating: 4.8,
  reviews: 120,
  stock: 15,
  colors: ["#1e1e1e", "#1a3a5c", "#5c1a1a", "#2d5c1a"],
  images: [monitorImg, laptopImg, mouseImg, keyboardImg, soundImg],
  description:
    "PC Gaming Pro Ryzen Edition adalah komputer gaming performa tinggi yang dirancang untuk memberikan pengalaman gaming terbaik. Dilengkapi dengan prosesor AMD Ryzen 7 terbaru dan GPU RTX 4060 yang powerful.",
  specs: [
    { attribute: "Prosesor", detail: "AMD Ryzen 7 7700X" },
    { attribute: "GPU", detail: "NVIDIA RTX 4060 8GB" },
    { attribute: "RAM", detail: "16GB DDR5 5600MHz" },
    { attribute: "Storage", detail: "SSD NVMe 1TB" },
    { attribute: "Motherboard", detail: "B650 ATX" },
    { attribute: "PSU", detail: "650W 80+ Gold" },
    { attribute: "Case", detail: "ATX Mid Tower RGB" },
    { attribute: "OS", detail: "Windows 11 Home" },
  ],
};

const relatedProducts = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
  name: "PC Gaming Pro Ryzen Edition",
  category: "Komputer (PC)",
  price: 17499000,
  rating: 4.8,
  image: [monitorImg, laptopImg, mouseImg, keyboardImg, soundImg][i % 5],
}));

export default function DetailProduct() {
  const navigate = useNavigate();
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState<"deskripsi" | "spesifikasi">(
    "spesifikasi",
  );
  const [selectedColor, setSelectedColor] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [saved, setSaved] = useState<boolean[]>(
    relatedProducts.map(() => false),
  );

  const formatPrice = (price: number) =>
    "Rp " + price.toLocaleString("id-ID").replace(/,/g, ".");

  return (
    <div style={{ background: "#f9fafb", minHeight: "100vh" }}>
      <div
        style={{ maxWidth: "1100px", margin: "0 auto", padding: "24px 20px" }}
      >
        {/* BACK BUTTON */}
        <button
          onClick={() => navigate(-1)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "14px",
            color: "#374151",
            marginBottom: "24px",
            padding: "6px 12px",
            borderRadius: "8px",
            transition: "background 0.2s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#e5e7eb")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
        >
          <ArrowLeft size={16} /> Kembali
        </button>

        {/* TOP SECTION */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "80px 1fr 1fr",
            gap: "20px",
            background: "#fff",
            borderRadius: "16px",
            padding: "24px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            marginBottom: "24px",
          }}
        >
          {/* THUMBNAIL */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            {product.images.map((img, i) => (
              <div
                key={i}
                onClick={() => setActiveImage(i)}
                style={{
                  width: "70px",
                  height: "70px",
                  borderRadius: "8px",
                  overflow: "hidden",
                  border:
                    activeImage === i
                      ? "2px solid #072B50"
                      : "2px solid #e5e7eb",
                  cursor: "pointer",
                  background: "#f9fafb",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "border 0.2s ease",
                }}
              >
                <img
                  src={img}
                  alt=""
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    padding: "4px",
                  }}
                />
              </div>
            ))}
          </div>

          {/* GAMBAR BESAR */}
          <div
            style={{
              background: "#f9fafb",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px",
              position: "relative",
            }}
          >
            <button
              onClick={() => setActiveImage((prev) => Math.max(0, prev - 1))}
              style={{
                position: "absolute",
                left: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                background: "#fff",
                border: "1px solid #e5e7eb",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "16px",
                zIndex: 1,
              }}
            >
              ‹
            </button>
            <img
              src={product.images[activeImage]}
              alt={product.name}
              style={{
                width: "100%",
                maxHeight: "340px",
                objectFit: "contain",
              }}
            />
            <button
              onClick={() =>
                setActiveImage((prev) =>
                  Math.min(product.images.length - 1, prev + 1),
                )
              }
              style={{
                position: "absolute",
                right: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                background: "#fff",
                border: "1px solid #e5e7eb",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "16px",
                zIndex: 1,
              }}
            >
              ›
            </button>
          </div>

          {/* INFO PRODUK */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "14px" }}
          >
            <p style={{ fontSize: "12px", color: "#6b7280", margin: 0 }}>
              {product.category}
            </p>
            <h1
              style={{
                fontSize: "22px",
                fontWeight: 700,
                color: "#111827",
                margin: 0,
                lineHeight: 1.3,
              }}
            >
              {product.name}
            </h1>

            {/* RATING */}
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              {Array.from({ length: 5 }, (_, i) => (
                <Star
                  key={i}
                  size={16}
                  fill={i < Math.floor(product.rating) ? "#f59e0b" : "none"}
                  stroke="#f59e0b"
                />
              ))}
              <span style={{ fontSize: "13px", color: "#6b7280" }}>
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            {/* HARGA */}
            <p
              style={{
                fontSize: "26px",
                fontWeight: 800,
                color: "#ef4444",
                margin: 0,
              }}
            >
              {formatPrice(product.price)}
            </p>

            {/* STOK */}
            <p
              style={{
                fontSize: "13px",
                color: "#10b981",
                margin: 0,
                fontWeight: 500,
              }}
            >
              ✓ Stok tersedia ({product.stock} unit)
            </p>

            {/* WARNA */}
            <div>
              <p
                style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#374151",
                  margin: "0 0 8px 0",
                }}
              >
                Colour
              </p>
              <div style={{ display: "flex", gap: "8px" }}>
                {product.colors.map((color, i) => (
                  <div
                    key={i}
                    onClick={() => setSelectedColor(i)}
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "50%",
                      background: color,
                      cursor: "pointer",
                      border:
                        selectedColor === i
                          ? "3px solid #072B50"
                          : "3px solid transparent",
                      outline:
                        selectedColor === i ? "2px solid #93c5fd" : "none",
                      transition: "all 0.2s ease",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* QUANTITY */}
            <div>
              <p
                style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#374151",
                  margin: "0 0 8px 0",
                }}
              >
                Jumlah
              </p>
              <div style={{ display: "flex", alignItems: "center" }}>
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  style={{
                    width: "36px",
                    height: "36px",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px 0 0 8px",
                    background: "#f9fafb",
                    cursor: "pointer",
                    fontSize: "18px",
                    color: "#374151",
                  }}
                >
                  −
                </button>
                <div
                  style={{
                    width: "48px",
                    height: "36px",
                    border: "1px solid #e5e7eb",
                    borderLeft: "none",
                    borderRight: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "14px",
                    fontWeight: 600,
                  }}
                >
                  {quantity}
                </div>
                <button
                  onClick={() =>
                    setQuantity((q) => Math.min(product.stock, q + 1))
                  }
                  style={{
                    width: "36px",
                    height: "36px",
                    border: "1px solid #e5e7eb",
                    borderRadius: "0 8px 8px 0",
                    background: "#f9fafb",
                    cursor: "pointer",
                    fontSize: "18px",
                    color: "#374151",
                  }}
                >
                  +
                </button>
              </div>
            </div>

            {/* TOMBOL WA */}
            <div style={{ marginTop: "4px" }}>
              <a
                href={`https://wa.me/6281359271816?text=Halo,%20saya%20ingin%20menanyakan%20produk%20*${encodeURIComponent(product.name)}*%20seharga%20${encodeURIComponent(formatPrice(product.price))}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  padding: "12px",
                  borderRadius: "10px",
                  background: "#25d366",
                  color: "#fff",
                  fontSize: "14px",
                  fontWeight: 700,
                  textDecoration: "none",
                  transition: "background 0.2s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#1ebe5d")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "#25d366")
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="white"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Tanya via WhatsApp
              </a>
            </div>
          </div>
        </div>
        {/* tutup TOP SECTION */}

        {/* TAB DESKRIPSI / SPESIFIKASI */}
        <div
          style={{
            background: "#fff",
            borderRadius: "16px",
            padding: "24px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              display: "flex",
              borderBottom: "2px solid #f3f4f6",
              marginBottom: "24px",
            }}
          >
            {(["deskripsi", "spesifikasi"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: "10px 24px",
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: activeTab === tab ? 700 : 500,
                  color: activeTab === tab ? "#072B50" : "#6b7280",
                  borderBottom:
                    activeTab === tab
                      ? "3px solid #072B50"
                      : "3px solid transparent",
                  marginBottom: "-2px",
                  textTransform: "capitalize",
                  transition: "all 0.2s ease",
                }}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {activeTab === "deskripsi" ? (
            <p
              style={{
                fontSize: "14px",
                color: "#374151",
                lineHeight: 1.8,
                margin: 0,
              }}
            >
              {product.description}
            </p>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#072B50" }}>
                  <th
                    style={{
                      padding: "12px 16px",
                      textAlign: "left",
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "#fff",
                      width: "40%",
                    }}
                  >
                    Attribute
                  </th>
                  <th
                    style={{
                      padding: "12px 16px",
                      textAlign: "left",
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "#fff",
                    }}
                  >
                    Details
                  </th>
                </tr>
              </thead>
              <tbody>
                {product.specs.map((spec, i) => (
                  <tr
                    key={i}
                    style={{ background: i % 2 === 0 ? "#f9fafb" : "#fff" }}
                  >
                    <td
                      style={{
                        padding: "12px 16px",
                        fontSize: "13px",
                        color: "#374151",
                        fontWeight: 500,
                        borderBottom: "1px solid #f3f4f6",
                      }}
                    >
                      {spec.attribute}
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        fontSize: "13px",
                        color: "#6b7280",
                        borderBottom: "1px solid #f3f4f6",
                      }}
                    >
                      {spec.detail}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* RELATED PRODUCTS */}
        <div
          style={{
            background: "#fff",
            borderRadius: "16px",
            padding: "24px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          }}
        >
          <h2
            style={{
              fontSize: "18px",
              fontWeight: 700,
              color: "#111827",
              margin: "0 0 20px 0",
              textAlign: "center",
            }}
          >
            Related Products
          </h2>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              style={{
                width: "36px",
                height: "36px",
                minWidth: "36px",
                borderRadius: "50%",
                background: "#fff",
                border: "1px solid #e5e7eb",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "18px",
                color: "#374151",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  "#072B50";
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

            <div style={{ flex: 1, minWidth: 0 }}>
              <Swiper
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                spaceBetween={16}
                slidesPerView={5}
                breakpoints={{
                  320: { slidesPerView: 1.5 },
                  640: { slidesPerView: 3 },
                  1024: { slidesPerView: 5 },
                }}
              >
                {relatedProducts.map((item, index) => (
                  <SwiperSlide key={item.id}>
                    <div
                      style={{
                        background: "#fff",
                        borderRadius: "12px",
                        overflow: "hidden",
                        border: "1px solid #e5e7eb",
                        cursor: "pointer",
                        transition: "box-shadow 0.2s ease",
                      }}
                      onMouseEnter={(e) =>
                        ((e.currentTarget as HTMLDivElement).style.boxShadow =
                          "0 8px 24px rgba(0,0,0,0.1)")
                      }
                      onMouseLeave={(e) =>
                        ((e.currentTarget as HTMLDivElement).style.boxShadow =
                          "none")
                      }
                    >
                      <div
                        style={{ position: "relative", background: "#f9fafb" }}
                      >
                        <span
                          onClick={(e) => {
                            e.stopPropagation();
                            setSaved((prev) => {
                              const u = [...prev];
                              u[index] = !u[index];
                              return u;
                            });
                          }}
                          style={{
                            position: "absolute",
                            top: "8px",
                            left: "8px",
                            zIndex: 1,
                            cursor: "pointer",
                            background: saved[index] ? "#e11d48" : "#fff",
                            borderRadius: "50%",
                            width: "26px",
                            height: "26px",
                            boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            transition: "all 0.2s ease",
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="13"
                            height="13"
                            viewBox="0 0 24 24"
                            fill={saved[index] ? "#fff" : "none"}
                            stroke={saved[index] ? "#fff" : "#374151"}
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                          </svg>
                        </span>
                        <img
                          src={item.image}
                          alt={item.name}
                          style={{
                            width: "100%",
                            height: "130px",
                            objectFit: "contain",
                            display: "block",
                            padding: "10px",
                          }}
                        />
                      </div>
                      <div style={{ padding: "10px" }}>
                        <p
                          style={{
                            fontSize: "10px",
                            color: "#6b7280",
                            margin: "0 0 4px 0",
                          }}
                        >
                          {item.category}
                        </p>
                        <p
                          style={{
                            fontSize: "12px",
                            fontWeight: 700,
                            color: "#111827",
                            margin: "0 0 8px 0",
                            lineHeight: 1.3,
                          }}
                        >
                          {item.name}
                        </p>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            borderTop: "1px solid #f3f4f6",
                            paddingTop: "8px",
                          }}
                        >
                          <div>
                            <p
                              style={{
                                fontSize: "9px",
                                color: "#9ca3af",
                                margin: "0 0 2px 0",
                              }}
                            >
                              Harga
                            </p>
                            <p
                              style={{
                                fontSize: "11px",
                                fontWeight: 700,
                                color: "#ef4444",
                                margin: 0,
                              }}
                            >
                              {formatPrice(item.price)}
                            </p>
                          </div>
                          <div style={{ textAlign: "right" }}>
                            <p
                              style={{
                                fontSize: "9px",
                                color: "#9ca3af",
                                margin: "0 0 2px 0",
                              }}
                            >
                              Review
                            </p>
                            <p
                              style={{
                                fontSize: "11px",
                                fontWeight: 600,
                                color: "#111827",
                                margin: 0,
                              }}
                            >
                              ⭐ {item.rating}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <button
              onClick={() => swiperRef.current?.slideNext()}
              style={{
                width: "36px",
                height: "36px",
                minWidth: "36px",
                borderRadius: "50%",
                background: "#fff",
                border: "1px solid #e5e7eb",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "18px",
                color: "#374151",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  "#072B50";
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
    </div>
  );
}
