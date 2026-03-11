import { useNavigate } from "react-router-dom";
import laptopImg from "../assets/laptop.png";
import mouseImg from "../assets/mouse.png";
import keyboardImg from "../assets/keyboard.png";
import monitorImg from "../assets/monitor.png";
import soundImg from "../assets/sound.png";
import kabelImg from "../assets/kabel.png";

const promoSatuan = [
  {
    id: 1,
    badge: "FLASH SALE",
    badgeColor: "#ef4444",
    name: "PC Gaming Pro Ryzen Edition",
    category: "Komputer (PC)",
    originalPrice: 20000000,
    promoPrice: 17499000,
    discount: "12%",
    validUntil: "31 Maret 2026",
    image: monitorImg,
    description: "Dapatkan PC Gaming terbaik dengan harga spesial!",
  },
  {
    id: 2,
    badge: "DISKON",
    badgeColor: "#f59e0b",
    name: "Laptop Asus ROG Zephyrus",
    category: "Laptop",
    originalPrice: 18000000,
    promoPrice: 15500000,
    discount: "14%",
    validUntil: "28 Maret 2026",
    image: laptopImg,
    description: "Laptop gaming performa tinggi dengan harga terjangkau.",
  },
  {
    id: 3,
    badge: "SPECIAL",
    badgeColor: "#8b5cf6",
    name: "Mechanical Keyboard RGB",
    category: "Keyboard",
    originalPrice: 1500000,
    promoPrice: 1199000,
    discount: "20%",
    validUntil: "15 April 2026",
    image: keyboardImg,
    description: "Keyboard mekanikal premium dengan backlight RGB.",
  },
];

const promoBundling = [
  {
    id: 1,
    badge: "BUNDLING HEMAT",
    title: "Paket Gaming Setup Lengkap",
    description:
      "Dapatkan paket lengkap gaming setup dengan harga spesial. Sudah termasuk PC, monitor, keyboard, dan mouse gaming terbaik pilihan kami.",
    items: [
      "PC Gaming Pro Ryzen",
      'Monitor 27" 144Hz',
      "Mechanical Keyboard",
      "Gaming Mouse",
    ],
    originalPrice: 25000000,
    promoPrice: 21500000,
    discount: "14%",
    validUntil: "30 April 2026",
    images: [monitorImg, keyboardImg, mouseImg, laptopImg],
  },
  {
    id: 2,
    badge: "PAKET KANTOR",
    title: "Paket Produktivitas Kerja",
    description:
      "Tingkatkan produktivitas kerja Anda dengan paket komputer dan aksesoris terlengkap. Cocok untuk kebutuhan kantor dan WFH.",
    items: [
      "Laptop Lenovo ThinkPad",
      "Kabel LAN Cat6",
      "Speaker Bluetooth",
      "Mouse Wireless",
    ],
    originalPrice: 15000000,
    promoPrice: 12800000,
    discount: "15%",
    validUntil: "25 April 2026",
    images: [laptopImg, kabelImg, soundImg, mouseImg],
  },
];

const formatPrice = (price: number) =>
  "Rp " + price.toLocaleString("id-ID").replace(/,/g, ".");

export default function Promo() {
  const navigate = useNavigate();

  return (
    <div style={{ background: "#f9fafb", minHeight: "100vh" }}>
      {/* HERO */}
      <div
        style={{
          background: "linear-gradient(135deg, #072B50 0%, #0e3d6e 100%)",
          padding: "60px 20px",
          textAlign: "center",
        }}
      >
        <span
          style={{
            display: "inline-block",
            background: "rgba(255,255,255,0.15)",
            color: "#93c5fd",
            fontSize: "12px",
            fontWeight: 600,
            padding: "6px 16px",
            borderRadius: "20px",
            marginBottom: "16px",
            letterSpacing: "1px",
          }}
        >
          🔥 PENAWARAN TERBATAS
        </span>
        <h1
          style={{
            fontSize: "36px",
            fontWeight: 800,
            color: "#fff",
            margin: "0 0 12px 0",
          }}
        >
          Penawaran Spesial
        </h1>
        <p
          style={{
            fontSize: "15px",
            color: "#93c5fd",
            margin: "0 auto",
            maxWidth: "480px",
            lineHeight: 1.7,
          }}
        >
          Temukan promo terbaik untuk produk elektronik pilihan kami dengan
          harga yang tidak akan Anda temukan di tempat lain.
        </p>
      </div>

      <div
        style={{ maxWidth: "1100px", margin: "0 auto", padding: "50px 20px" }}
      >
        {/* PROMO SATUAN */}
        <div style={{ marginBottom: "50px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "24px",
            }}
          >
            <div
              style={{
                width: "4px",
                height: "24px",
                background: "#072B50",
                borderRadius: "2px",
              }}
            />
            <h2
              style={{
                fontSize: "20px",
                fontWeight: 700,
                color: "#111827",
                margin: 0,
              }}
            >
              Promo Produk
            </h2>
            <span
              style={{
                fontSize: "12px",
                color: "#6b7280",
                background: "#e5e7eb",
                padding: "2px 10px",
                borderRadius: "20px",
              }}
            >
              {promoSatuan.length} Penawaran
            </span>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "20px",
            }}
          >
            {promoSatuan.map((promo) => (
              <div
                key={promo.id}
                style={{
                  background: "#fff",
                  borderRadius: "16px",
                  overflow: "hidden",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                  transition: "box-shadow 0.2s ease, transform 0.2s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow =
                    "0 12px 32px rgba(0,0,0,0.12)";
                  (e.currentTarget as HTMLDivElement).style.transform =
                    "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow =
                    "0 2px 8px rgba(0,0,0,0.06)";
                  (e.currentTarget as HTMLDivElement).style.transform =
                    "translateY(0)";
                }}
              >
                {/* IMAGE */}
                <div
                  style={{
                    position: "relative",
                    background: "#f9fafb",
                    padding: "20px",
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      top: "12px",
                      left: "12px",
                      background: promo.badgeColor,
                      color: "#fff",
                      fontSize: "10px",
                      fontWeight: 700,
                      padding: "4px 10px",
                      borderRadius: "6px",
                      letterSpacing: "0.5px",
                    }}
                  >
                    {promo.badge}
                  </span>
                  <span
                    style={{
                      position: "absolute",
                      top: "12px",
                      right: "12px",
                      background: "#072B50",
                      color: "#fff",
                      fontSize: "12px",
                      fontWeight: 700,
                      padding: "4px 10px",
                      borderRadius: "6px",
                    }}
                  >
                    -{promo.discount}
                  </span>
                  <img
                    src={promo.image}
                    alt={promo.name}
                    style={{
                      width: "100%",
                      height: "180px",
                      objectFit: "contain",
                      display: "block",
                    }}
                  />
                </div>

                {/* INFO */}
                <div style={{ padding: "16px" }}>
                  <p
                    style={{
                      fontSize: "11px",
                      color: "#6b7280",
                      margin: "0 0 6px 0",
                    }}
                  >
                    {promo.category}
                  </p>
                  <p
                    style={{
                      fontSize: "15px",
                      fontWeight: 700,
                      color: "#111827",
                      margin: "0 0 8px 0",
                      lineHeight: 1.3,
                    }}
                  >
                    {promo.name}
                  </p>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#6b7280",
                      margin: "0 0 12px 0",
                      lineHeight: 1.5,
                    }}
                  >
                    {promo.description}
                  </p>

                  {/* HARGA */}
                  <div style={{ marginBottom: "12px" }}>
                    <p
                      style={{
                        fontSize: "12px",
                        color: "#9ca3af",
                        textDecoration: "line-through",
                        margin: "0 0 2px 0",
                      }}
                    >
                      {formatPrice(promo.originalPrice)}
                    </p>
                    <p
                      style={{
                        fontSize: "20px",
                        fontWeight: 800,
                        color: "#ef4444",
                        margin: 0,
                      }}
                    >
                      {formatPrice(promo.promoPrice)}
                    </p>
                  </div>

                  {/* VALID */}
                  <p
                    style={{
                      fontSize: "11px",
                      color: "#9ca3af",
                      margin: "0 0 14px 0",
                    }}
                  >
                    🗓 Berlaku hingga {promo.validUntil}
                  </p>

                  {/* BUTTON */}
                  <button
                    onClick={() => navigate(`/product/${promo.id}`)}
                    style={{
                      width: "100%",
                      padding: "10px",
                      borderRadius: "8px",
                      background: "#072B50",
                      color: "#fff",
                      fontSize: "13px",
                      fontWeight: 700,
                      border: "none",
                      cursor: "pointer",
                      transition: "background 0.2s ease",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "#0e3d6e")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "#072B50")
                    }
                  >
                    Lihat Detail
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PROMO BUNDLING */}
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "24px",
            }}
          >
            <div
              style={{
                width: "4px",
                height: "24px",
                background: "#072B50",
                borderRadius: "2px",
              }}
            />
            <h2
              style={{
                fontSize: "20px",
                fontWeight: 700,
                color: "#111827",
                margin: 0,
              }}
            >
              Promo Bundling
            </h2>
            <span
              style={{
                fontSize: "12px",
                color: "#6b7280",
                background: "#e5e7eb",
                padding: "2px 10px",
                borderRadius: "20px",
              }}
            >
              {promoBundling.length} Paket
            </span>
          </div>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            {promoBundling.map((promo) => (
              <div
                key={promo.id}
                style={{
                  background: "#fff",
                  borderRadius: "16px",
                  overflow: "hidden",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                  transition: "box-shadow 0.2s ease",
                  display: "grid",
                  gridTemplateColumns: "1fr 1.5fr",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.boxShadow =
                    "0 12px 32px rgba(0,0,0,0.12)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.boxShadow =
                    "0 2px 8px rgba(0,0,0,0.06)")
                }
              >
                {/* KIRI - GAMBAR PRODUK */}
                <div
                  style={{
                    background: "#f9fafb",
                    padding: "20px",
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "8px",
                    position: "relative",
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      top: "12px",
                      left: "12px",
                      background: "#072B50",
                      color: "#fff",
                      fontSize: "10px",
                      fontWeight: 700,
                      padding: "4px 10px",
                      borderRadius: "6px",
                      zIndex: 1,
                      letterSpacing: "0.5px",
                    }}
                  >
                    {promo.badge}
                  </span>
                  {promo.images.map((img, i) => (
                    <div
                      key={i}
                      style={{
                        background: "#fff",
                        borderRadius: "8px",
                        padding: "8px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        src={img}
                        alt=""
                        style={{
                          width: "100%",
                          height: "70px",
                          objectFit: "contain",
                        }}
                      />
                    </div>
                  ))}
                </div>

                {/* KANAN - INFO */}
                <div
                  style={{
                    padding: "24px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <h3
                      style={{
                        fontSize: "18px",
                        fontWeight: 700,
                        color: "#111827",
                        margin: "0 0 8px 0",
                      }}
                    >
                      {promo.title}
                    </h3>
                    <p
                      style={{
                        fontSize: "13px",
                        color: "#6b7280",
                        margin: "0 0 14px 0",
                        lineHeight: 1.6,
                      }}
                    >
                      {promo.description}
                    </p>

                    {/* ITEM LIST */}
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "6px",
                        marginBottom: "16px",
                      }}
                    >
                      {promo.items.map((item, i) => (
                        <span
                          key={i}
                          style={{
                            background: "#eff6ff",
                            color: "#1d4ed8",
                            fontSize: "11px",
                            fontWeight: 500,
                            padding: "4px 10px",
                            borderRadius: "20px",
                            border: "1px solid #bfdbfe",
                          }}
                        >
                          ✓ {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <p
                        style={{
                          fontSize: "12px",
                          color: "#9ca3af",
                          textDecoration: "line-through",
                          margin: "0 0 2px 0",
                        }}
                      >
                        {formatPrice(promo.originalPrice)}
                      </p>
                      <p
                        style={{
                          fontSize: "22px",
                          fontWeight: 800,
                          color: "#ef4444",
                          margin: "0 0 4px 0",
                        }}
                      >
                        {formatPrice(promo.promoPrice)}
                      </p>
                      <p
                        style={{
                          fontSize: "11px",
                          color: "#9ca3af",
                          margin: 0,
                        }}
                      >
                        🗓 Berlaku hingga {promo.validUntil}
                      </p>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px",
                        alignItems: "flex-end",
                      }}
                    >
                      <span
                        style={{
                          background: "#fef2f2",
                          color: "#ef4444",
                          fontSize: "14px",
                          fontWeight: 700,
                          padding: "6px 14px",
                          borderRadius: "8px",
                        }}
                      >
                        Hemat {promo.discount}
                      </span>
                      <button
                        onClick={() => navigate("/product")}
                        style={{
                          padding: "10px 24px",
                          borderRadius: "8px",
                          background: "#072B50",
                          color: "#fff",
                          fontSize: "13px",
                          fontWeight: 700,
                          border: "none",
                          cursor: "pointer",
                          transition: "background 0.2s ease",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.background = "#0e3d6e")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.background = "#072B50")
                        }
                      >
                        Lihat Produk
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
