import { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Instagram,
  Music2,
  MessageCircle,
} from "lucide-react";
import cabangImg from "../assets/cabang.jpg";
import ceoImg from "../assets/ceo.jpg";

const branches = [
  {
    name: "Cabang Surabaya Pusat",
    address: "Jl. Contoh No. 123, Surabaya Pusat",
    phone: "+62 812-3456-7890",
    hours: "Senin - Sabtu, 08.00 - 17.00",
    email: "surabayapusat@bismarcatalog.com",
    maps: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.4!2d112.7!3d-7.25!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1",
  },
  {
    name: "Cabang Surabaya Timur",
    address: "Jl. Contoh No. 456, Surabaya Timur",
    phone: "+62 812-3456-7891",
    hours: "Senin - Sabtu, 08.00 - 17.00",
    email: "surabayatimur@bismarcatalog.com",
    maps: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.4!2d112.7!3d-7.25!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1",
  },
  {
    name: "Cabang Surabaya Barat",
    address: "Jl. Contoh No. 789, Surabaya Barat",
    phone: "+62 812-3456-7892",
    hours: "Senin - Sabtu, 08.00 - 17.00",
    email: "surabayabarat@bismarcatalog.com",
    maps: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.4!2d112.7!3d-7.25!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1",
  },
  {
    name: "Cabang Sidoarjo",
    address: "Jl. Contoh No. 321, Sidoarjo",
    phone: "+62 812-3456-7893",
    hours: "Senin - Sabtu, 08.00 - 17.00",
    email: "sidoarjo@bismarcatalog.com",
    maps: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.4!2d112.7!3d-7.25!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1",
  },
  {
    name: "Cabang Gresik",
    address: "Jl. Contoh No. 654, Gresik",
    phone: "+62 812-3456-7894",
    hours: "Senin - Sabtu, 08.00 - 17.00",
    email: "gresik@bismarcatalog.com",
    maps: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.4!2d112.7!3d-7.25!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1",
  },
  {
    name: "Cabang Malang",
    address: "Jl. Contoh No. 987, Malang",
    phone: "+62 812-3456-7895",
    hours: "Senin - Sabtu, 08.00 - 17.00",
    email: "malang@bismarcatalog.com",
    maps: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.4!2d112.7!3d-7.25!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1",
  },
];

export default function Contact() {
  const [selectedBranch, setSelectedBranch] = useState<
    (typeof branches)[0] | null
  >(null);

  return (
    <div style={{ background: "#f9fafb", minHeight: "100vh" }}>
      {/* HERO */}
      <div
        style={{
          background: "#fff",
          padding: "60px 20px",
          textAlign: "center",
          borderBottom: "1px solid #f3f4f6",
        }}
      >
        <h1
          style={{
            fontSize: "32px",
            fontWeight: 700,
            color: "#111827",
            margin: "0 0 16px 0",
          }}
        >
          Contact us
        </h1>
        <p
          style={{
            fontSize: "15px",
            color: "#6b7280",
            margin: "0 auto",
            maxWidth: "480px",
            lineHeight: 1.7,
          }}
        >
          Ada pertanyaan atau butuh bantuan? Kami siap membantu Anda.
        </p>
      </div>

      <div
        style={{ maxWidth: "1100px", margin: "0 auto", padding: "50px 20px" }}
      >
        {/* BAGIAN 1 - INFO KONTAK + CEO */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "32px",
            marginBottom: "40px",
          }}
        >
          {/* KIRI - INFO KONTAK */}
          <div
            style={{
              background: "#fff",
              borderRadius: "16px",
              padding: "32px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            }}
          >
            <h2
              style={{
                fontSize: "20px",
                fontWeight: 700,
                color: "#111827",
                margin: "0 0 8px 0",
              }}
            >
              Informasi Kontak
            </h2>
            <p
              style={{
                fontSize: "14px",
                color: "#6b7280",
                margin: "0 0 28px 0",
                lineHeight: 1.7,
              }}
            >
              Jangan ragu untuk menghubungi kami kapan saja.
            </p>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
              {[
                {
                  icon: <MapPin size={20} />,
                  label: "Alamat",
                  value:
                    "Jl. Raya Rungkut Kidul No. 32, Rungkut Kidul, Kec. Rungkut, Surabaya, Jawa Timur 60293.",
                },
                {
                  icon: <Phone size={20} />,
                  label: "Telepon",
                  value: "+6281130775195",
                },
                {
                  icon: <Mail size={20} />,
                  label: "Email",
                  value: "info@bizponselcatalog.com",
                },
                {
                  icon: <Clock size={20} />,
                  label: "Jam Operasional",
                  value: "Senin - Minggu, 08.00 - 22.00 WIB",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: "16px",
                    alignItems: "flex-start",
                  }}
                >
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "10px",
                      background: "#072B50",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      flexShrink: 0,
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <p
                      style={{
                        fontSize: "12px",
                        color: "#9ca3af",
                        margin: "0 0 4px 0",
                        fontWeight: 500,
                      }}
                    >
                      {item.label}
                    </p>
                    <p
                      style={{
                        fontSize: "14px",
                        color: "#111827",
                        margin: 0,
                        fontWeight: 600,
                        lineHeight: 1.5,
                      }}
                    >
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* KANAN - CEO + QUOTES */}
          <div
            style={{
              borderRadius: "16px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              position: "relative",
              overflow: "hidden",
              height: "400px",
            }}
          >
            <img
              src={ceoImg}
              alt="CEO"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                objectPosition: "top",
                position: "absolute",
                top: 0,
                left: 0,
              }}
            />
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background:
                  "linear-gradient(to top, rgba(7,43,80,0.95) 40%, rgba(7,43,80,0.3) 100%)",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "24px",
                left: "24px",
                right: "24px",
                background: "rgba(255,255,255,0.1)",
                backdropFilter: "blur(10px)",
                borderRadius: "12px",
                padding: "20px",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              <p
                style={{
                  fontSize: "13px",
                  color: "#fff",
                  margin: "0 0 12px 0",
                  fontStyle: "italic",
                  lineHeight: 1.7,
                }}
              >
                " Kami berkomitmen untuk menghadirkan produk teknologi terbaik
                dengan pelayanan yang profesional dan terpercaya. "
              </p>
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <div
                  style={{
                    width: "3px",
                    height: "36px",
                    background: "#3b82f6",
                    borderRadius: "2px",
                  }}
                />
                <div>
                  <p
                    style={{
                      fontSize: "14px",
                      fontWeight: 700,
                      color: "#fff",
                      margin: "0 0 2px 0",
                    }}
                  >
                    Jeon Jungkook
                  </p>
                  <p style={{ fontSize: "12px", color: "#93c5fd", margin: 0 }}>
                    CEO & Founder PT. Indo Bismar
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BAGIAN 2 - FORM (kiri) + SOSMED & MAPS (kanan) */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 1fr",
            gap: "32px",
            marginBottom: "40px",
          }}
        >
          {/* KIRI - FORM */}
          <div
            style={{
              background: "#fff",
              borderRadius: "16px",
              padding: "32px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            }}
          >
            <h2
              style={{
                fontSize: "20px",
                fontWeight: 700,
                color: "#111827",
                margin: "0 0 8px 0",
              }}
            >
              Kirim Pesan
            </h2>
            <p
              style={{
                fontSize: "14px",
                color: "#6b7280",
                margin: "0 0 24px 0",
              }}
            >
              Isi form di bawah dan kami akan segera menghubungi Anda.
            </p>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "16px",
                }}
              >
                {[
                  {
                    label: "Nama Lengkap",
                    placeholder: "John Doe",
                    type: "text",
                  },
                  {
                    label: "Email",
                    placeholder: "john@email.com",
                    type: "email",
                  },
                ].map((field) => (
                  <div key={field.label}>
                    <label
                      style={{
                        fontSize: "13px",
                        fontWeight: 600,
                        color: "#374151",
                        display: "block",
                        marginBottom: "6px",
                      }}
                    >
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      style={{
                        width: "100%",
                        padding: "10px 14px",
                        borderRadius: "8px",
                        border: "1px solid #e5e7eb",
                        fontSize: "13px",
                        outline: "none",
                        boxSizing: "border-box",
                      }}
                      onFocus={(e) =>
                        (e.currentTarget.style.border = "1px solid #072B50")
                      }
                      onBlur={(e) =>
                        (e.currentTarget.style.border = "1px solid #e5e7eb")
                      }
                    />
                  </div>
                ))}
              </div>
              <div>
                <label
                  style={{
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "#374151",
                    display: "block",
                    marginBottom: "6px",
                  }}
                >
                  No. Telepon
                </label>
                <input
                  type="tel"
                  placeholder="+62 812-xxxx-xxxx"
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: "8px",
                    border: "1px solid #e5e7eb",
                    fontSize: "13px",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) =>
                    (e.currentTarget.style.border = "1px solid #072B50")
                  }
                  onBlur={(e) =>
                    (e.currentTarget.style.border = "1px solid #e5e7eb")
                  }
                />
              </div>
              <div>
                <label
                  style={{
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "#374151",
                    display: "block",
                    marginBottom: "6px",
                  }}
                >
                  Pesan
                </label>
                <textarea
                  placeholder="Tulis pesan Anda di sini..."
                  rows={5}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: "8px",
                    border: "1px solid #e5e7eb",
                    fontSize: "13px",
                    outline: "none",
                    resize: "vertical",
                    boxSizing: "border-box",
                    fontFamily: "inherit",
                  }}
                  onFocus={(e) =>
                    (e.currentTarget.style.border = "1px solid #072B50")
                  }
                  onBlur={(e) =>
                    (e.currentTarget.style.border = "1px solid #e5e7eb")
                  }
                />
              </div>
              <button
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "10px",
                  background: "#072B50",
                  color: "#fff",
                  fontSize: "14px",
                  fontWeight: 700,
                  border: "none",
                  cursor: "pointer",
                  transition: "background 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background =
                    "#0e3d6e";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background =
                    "#072B50";
                }}
              >
                Kirim Pesan
              </button>
            </div>
          </div>

          {/* KANAN - SOSMED + MAPS */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            <div
              style={{
                background: "#fff",
                borderRadius: "16px",
                padding: "24px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              }}
            >
              <h3
                style={{
                  fontSize: "16px",
                  fontWeight: 700,
                  color: "#111827",
                  margin: "0 0 16px 0",
                }}
              >
                Follow Us
              </h3>
              <div style={{ display: "flex", gap: "12px" }}>
                {[
                  {
                    label: "Facebook",
                    color: "#1877f2",
                    icon: <Facebook size={20} />,
                  },
                  {
                    label: "Instagram",
                    color: "#e1306c",
                    icon: <Instagram size={20} />,
                  },
                  {
                    label: "TikTok",
                    color: "#010101",
                    icon: <Music2 size={20} />,
                  },
                  {
                    label: "WhatsApp",
                    color: "#25d366",
                    icon: <MessageCircle size={20} />,
                  },
                ].map((social) => (
                  <a
                    key={social.label}
                    href="#"
                    title={social.label}
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "12px",
                      background: social.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      textDecoration: "none",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                      transition: "transform 0.2s ease",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.transform = "translateY(-3px)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.transform = "translateY(0)")
                    }
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
            <div
              style={{
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                flex: 1,
              }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.4!2d112.7!3d-7.25!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMTUnMDAuMCJTIDExMsKwNDInMDAuMCJF!5e0!3m2!1sen!2sid!4v1"
                width="100%"
                height="320"
                style={{ border: 0, display: "block" }}
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* BAGIAN 3 - CABANG */}
        <div>
          <h2
            style={{
              fontSize: "20px",
              fontWeight: 700,
              color: "#111827",
              margin: "0 0 6px 0",
              textAlign: "center",
            }}
          >
            Cabang Kami
          </h2>
          <p
            style={{
              fontSize: "14px",
              color: "#6b7280",
              textAlign: "center",
              margin: "0 0 24px 0",
            }}
          >
            Temukan cabang terdekat dari lokasi Anda
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "16px",
            }}
          >
            {branches.map((branch, i) => (
              <div
                key={i}
                onClick={() => setSelectedBranch(branch)}
                style={{
                  background: "#fff",
                  borderRadius: "12px",
                  overflow: "hidden",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                  transition: "box-shadow 0.2s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.boxShadow =
                    "0 8px 24px rgba(0,0,0,0.12)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.boxShadow =
                    "0 2px 8px rgba(0,0,0,0.06)")
                }
              >
                <div
                  style={{
                    position: "relative",
                    height: "160px",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={cabangImg}
                    alt={branch.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background:
                        "linear-gradient(transparent, rgba(7,43,80,0.8))",
                      padding: "20px 16px 10px",
                    }}
                  >
                    <h3
                      style={{
                        fontSize: "14px",
                        fontWeight: 700,
                        color: "#fff",
                        margin: 0,
                      }}
                    >
                      {branch.name}
                    </h3>
                  </div>
                </div>
                <div
                  style={{ padding: "16px", borderTop: "3px solid #072B50" }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        gap: "8px",
                        alignItems: "flex-start",
                      }}
                    >
                      <MapPin
                        size={14}
                        style={{
                          color: "#6b7280",
                          marginTop: "2px",
                          flexShrink: 0,
                        }}
                      />
                      <span
                        style={{
                          fontSize: "12px",
                          color: "#6b7280",
                          lineHeight: 1.5,
                        }}
                      >
                        {branch.address}
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        gap: "8px",
                        alignItems: "center",
                      }}
                    >
                      <Phone
                        size={14}
                        style={{ color: "#6b7280", flexShrink: 0 }}
                      />
                      <span style={{ fontSize: "12px", color: "#6b7280" }}>
                        {branch.phone}
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        gap: "8px",
                        alignItems: "center",
                      }}
                    >
                      <Clock
                        size={14}
                        style={{ color: "#6b7280", flexShrink: 0 }}
                      />
                      <span style={{ fontSize: "12px", color: "#6b7280" }}>
                        {branch.hours}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MODAL DETAIL CABANG */}
      {selectedBranch && (
        <div
          onClick={() => setSelectedBranch(null)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "20px",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#fff",
              borderRadius: "16px",
              width: "100%",
              maxWidth: "560px",
              boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
              overflow: "hidden",
            }}
          >
            {/* HEADER */}
            <div
              style={{
                background: "linear-gradient(135deg, #072B50, #0e3d6e)",
                padding: "20px 24px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: "11px",
                    color: "#93c5fd",
                    margin: "0 0 4px 0",
                    letterSpacing: "1px",
                  }}
                >
                  DETAIL CABANG
                </p>
                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: 700,
                    color: "#fff",
                    margin: 0,
                  }}
                >
                  {selectedBranch.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedBranch(null)}
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.15)",
                  border: "none",
                  cursor: "pointer",
                  color: "#fff",
                  fontSize: "18px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "rgba(255,255,255,0.25)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "rgba(255,255,255,0.15)")
                }
              >
                ×
              </button>
            </div>

            {/* BODY */}
            <div style={{ padding: "24px" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px",
                  marginBottom: "20px",
                }}
              >
                {[
                  {
                    icon: <MapPin size={16} />,
                    label: "Alamat",
                    value: selectedBranch.address,
                  },
                  {
                    icon: <Phone size={16} />,
                    label: "Telepon",
                    value: selectedBranch.phone,
                  },
                  {
                    icon: <Mail size={16} />,
                    label: "Email",
                    value: selectedBranch.email,
                  },
                  {
                    icon: <Clock size={16} />,
                    label: "Jam Operasional",
                    value: selectedBranch.hours,
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      gap: "12px",
                      alignItems: "flex-start",
                    }}
                  >
                    <div
                      style={{
                        width: "34px",
                        height: "34px",
                        borderRadius: "8px",
                        background: "#eff6ff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#072B50",
                        flexShrink: 0,
                      }}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <p
                        style={{
                          fontSize: "11px",
                          color: "#9ca3af",
                          margin: "0 0 2px 0",
                        }}
                      >
                        {item.label}
                      </p>
                      <p
                        style={{
                          fontSize: "13px",
                          color: "#111827",
                          fontWeight: 600,
                          margin: 0,
                        }}
                      >
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* SOSMED */}
              <div
                style={{ display: "flex", gap: "10px", marginBottom: "20px" }}
              >
                {[
                  {
                    label: "Facebook",
                    color: "#1877f2",
                    icon: <Facebook size={16} />,
                  },
                  {
                    label: "Instagram",
                    color: "#e1306c",
                    icon: <Instagram size={16} />,
                  },
                  {
                    label: "TikTok",
                    color: "#010101",
                    icon: <Music2 size={16} />,
                  },
                  {
                    label: "WhatsApp",
                    color: "#25d366",
                    icon: <MessageCircle size={16} />,
                  },
                ].map((social) => (
                  <a
                    key={social.label}
                    href="#"
                    title={social.label}
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "8px",
                      background: social.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      textDecoration: "none",
                      transition: "transform 0.2s ease",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.transform = "translateY(-2px)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.transform = "translateY(0)")
                    }
                  >
                    {social.icon}
                  </a>
                ))}
              </div>

              {/* MAPS */}
              <div style={{ borderRadius: "10px", overflow: "hidden" }}>
                <iframe
                  src={selectedBranch.maps}
                  width="100%"
                  height="220"
                  style={{ border: 0, display: "block" }}
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
