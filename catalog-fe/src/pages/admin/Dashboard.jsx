import {
  Package,
  Tag,
  Building2,
  TrendingUp,
  ArrowUpRight,
  Activity,
  Clock,
} from "lucide-react";

const NAVY = "#072B50";
const NAVY_LIGHT = "rgba(7,43,80,0.08)";
const NAVY_BORDER = "rgba(7,43,80,0.15)";
const NAVY_MID = "rgba(7,43,80,0.6)";

const stats = [
  {
    label: "Total Produk",
    value: "120",
    change: "↑ 12% dari bulan lalu",
    changeColor: "#16a34a",
    changeBg: "#dcfce7",
    icon: <Package size={20} color="#fff" />,
  },
  {
    label: "Promo Aktif",
    value: "8",
    change: "Sama seperti bulan lalu",
    changeColor: "#6b7280",
    changeBg: "#f3f4f6",
    icon: <Tag size={20} color="#fff" />,
  },
  {
    label: "Total Cabang",
    value: "7",
    change: "↑ 1 cabang baru",
    changeColor: "#d97706",
    changeBg: "#fef3c7",
    icon: <Building2 size={20} color="#fff" />,
  },
];

const topProducts = [
  {
    rank: "01",
    name: "iPhone 15 Pro Max",
    sold: "42 Terjual",
    change: "+12%",
    positive: true,
  },
  {
    rank: "02",
    name: "Samsung S24 Ultra",
    sold: "38 Terjual",
    change: "+5%",
    positive: true,
  },
  {
    rank: "03",
    name: "Xiaomi 14 Pro",
    sold: "25 Terjual",
    change: "-2%",
    positive: false,
  },
];

const activities = [
  {
    icon: "🛍️",
    title: "iPhone 15 Pro Max ditambahkan ke katalog",
    sub: "Cabang Jakarta Selatan • 2 jam yang lalu",
    tag: "#PROD-9021",
    tagBg: NAVY_LIGHT,
    tagColor: NAVY,
  },
  {
    icon: "🏷️",
    title: "Promo Summer Sale 2024 diaktifkan",
    sub: "Semua Cabang • 5 jam yang lalu",
    tag: "AKTIF",
    tagBg: "#dcfce7",
    tagColor: "#16a34a",
  },
  {
    icon: "✏️",
    title: "Harga diperbarui untuk Samsung S24 Ultra",
    sub: "Cabang Surabaya • 1 hari yang lalu",
    tag: "#PROD-6823",
    tagBg: NAVY_LIGHT,
    tagColor: NAVY,
  },
];

const chartData = [
  { day: "Sen", height: 40 },
  { day: "Sel", height: 55 },
  { day: "Rab", height: 65 },
  { day: "Kam", height: 90 },
  { day: "Jum", height: 75 },
  { day: "Sab", height: 45 },
  { day: "Min", height: 30 },
];

const cardStyle = {
  background: "#fff",
  borderRadius: "16px",
  boxShadow: "0 2px 12px rgba(7,43,80,0.08)",
  border: `1.5px solid ${NAVY_BORDER}`,
  overflow: "hidden",
};

const sectionHeaderStyle = {
  background: NAVY,
  padding: "13px 20px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

export default function Dashboard() {
  return (
    <div style={{ minHeight: "100%" }}>
      {/* HEADER */}
      <div
        style={{
          marginBottom: "24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "6px",
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "12px",
                background: NAVY,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 12px rgba(7,43,80,0.3)",
                fontSize: "18px",
              }}
            >
              📊
            </div>
            <h1
              style={{
                fontSize: "24px",
                fontWeight: 700,
                color: NAVY,
                margin: 0,
                letterSpacing: "-0.5px",
              }}
            >
              Ringkasan Dashboard
            </h1>
          </div>
          <p
            style={{
              fontSize: "14px",
              color: "#6b7280",
              margin: 0,
              paddingLeft: "52px",
            }}
          >
            Selamat datang kembali, berikut perkembangan di toko Anda.
          </p>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: "#f0fdf4",
            border: "1.5px solid #86efac",
            borderRadius: "12px",
            padding: "9px 16px",
          }}
        >
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#22c55e",
            }}
          />
          <span style={{ fontSize: "13px", fontWeight: 700, color: "#16a34a" }}>
            Toko Aktif
          </span>
        </div>
      </div>

      {/* STAT CARDS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "16px",
          marginBottom: "20px",
        }}
      >
        {stats.map((stat, i) => (
          <div key={i} style={{ ...cardStyle, padding: "0" }}>
            <div style={{ padding: "18px 20px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "14px",
                }}
              >
                <div
                  style={{
                    width: "42px",
                    height: "42px",
                    borderRadius: "12px",
                    background: NAVY,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 4px 10px rgba(7,43,80,0.25)",
                  }}
                >
                  {stat.icon}
                </div>
                <ArrowUpRight size={16} color={NAVY_MID} />
              </div>
              <p
                style={{
                  fontSize: "12px",
                  color: "#6b7280",
                  fontWeight: 600,
                  margin: "0 0 4px 0",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                {stat.label}
              </p>
              <p
                style={{
                  fontSize: "28px",
                  fontWeight: 800,
                  color: NAVY,
                  margin: "0 0 10px 0",
                  lineHeight: 1,
                  letterSpacing: "-1px",
                }}
              >
                {stat.value}
              </p>
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  color: stat.changeColor,
                  background: stat.changeBg,
                  padding: "3px 10px",
                  borderRadius: "20px",
                }}
              >
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* CHART + TOP PRODUK */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.6fr 1fr",
          gap: "16px",
          marginBottom: "16px",
        }}
      >
        {/* CHART */}
        <div style={cardStyle}>
          <div style={sectionHeaderStyle}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Activity size={15} color="#fff" />
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: 700,
                  color: "#fff",
                  textTransform: "uppercase",
                  letterSpacing: "0.8px",
                }}
              >
                Analitik Katalog
              </span>
            </div>
            <select
              style={{
                fontSize: "12px",
                padding: "5px 12px",
                borderRadius: "8px",
                border: "1.5px solid rgba(255,255,255,0.3)",
                color: "#fff",
                background: "rgba(255,255,255,0.15)",
                cursor: "pointer",
                outline: "none",
                fontWeight: 600,
              }}
            >
              <option style={{ color: NAVY }}>7 Hari Terakhir</option>
              <option style={{ color: NAVY }}>30 Hari Terakhir</option>
            </select>
          </div>
          <div style={{ padding: "24px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                gap: "10px",
                height: "150px",
              }}
            >
              {chartData.map((bar, i) => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "8px",
                    height: "100%",
                  }}
                >
                  <div
                    style={{
                      flex: 1,
                      width: "100%",
                      display: "flex",
                      alignItems: "flex-end",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        height: `${bar.height}%`,
                        borderRadius: "6px 6px 0 0",
                        background: i === 3 ? NAVY : NAVY_LIGHT,
                        boxShadow:
                          i === 3 ? "0 4px 12px rgba(7,43,80,0.35)" : "none",
                        position: "relative",
                      }}
                    >
                      {i === 3 && (
                        <div
                          style={{
                            position: "absolute",
                            top: "-28px",
                            left: "50%",
                            transform: "translateX(-50%)",
                            background: NAVY,
                            color: "#fff",
                            fontSize: "10px",
                            fontWeight: 800,
                            padding: "3px 8px",
                            borderRadius: "6px",
                            whiteSpace: "nowrap",
                          }}
                        >
                          Tertinggi
                        </div>
                      )}
                    </div>
                  </div>
                  <span
                    style={{
                      fontSize: "11px",
                      color: i === 3 ? NAVY : "#9ca3af",
                      fontWeight: i === 3 ? 800 : 500,
                    }}
                  >
                    {bar.day}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* TOP PRODUK */}
        <div style={cardStyle}>
          <div style={sectionHeaderStyle}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <TrendingUp size={15} color="#fff" />
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: 700,
                  color: "#fff",
                  textTransform: "uppercase",
                  letterSpacing: "0.8px",
                }}
              >
                Produk Terlaris
              </span>
            </div>
          </div>
          <div
            style={{
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            {topProducts.map((p, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "12px 14px",
                  borderRadius: "10px",
                  background: i === 0 ? NAVY_LIGHT : "#fafbff",
                  border: `1.5px solid ${i === 0 ? NAVY_BORDER : "transparent"}`,
                }}
              >
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 800,
                    color: i === 0 ? NAVY : "#9ca3af",
                    minWidth: "24px",
                  }}
                >
                  {p.rank}
                </span>
                <div style={{ flex: 1 }}>
                  <p
                    style={{
                      fontSize: "13px",
                      fontWeight: 700,
                      color: NAVY,
                      margin: "0 0 2px 0",
                    }}
                  >
                    {p.name}
                  </p>
                  <p style={{ fontSize: "11px", color: "#9ca3af", margin: 0 }}>
                    {p.sold}
                  </p>
                </div>
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: 800,
                    color: p.positive ? "#16a34a" : "#ef4444",
                    background: p.positive ? "#dcfce7" : "#fee2e2",
                    padding: "3px 10px",
                    borderRadius: "20px",
                  }}
                >
                  {p.change}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AKTIVITAS TERBARU */}
      <div style={cardStyle}>
        <div style={sectionHeaderStyle}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Clock size={15} color="#fff" />
            <span
              style={{
                fontSize: "13px",
                fontWeight: 700,
                color: "#fff",
                textTransform: "uppercase",
                letterSpacing: "0.8px",
              }}
            >
              Aktivitas Terbaru
            </span>
          </div>
          <span
            style={{
              fontSize: "13px",
              color: "rgba(255,255,255,0.8)",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Lihat semua →
          </span>
        </div>
        <div style={{ padding: "8px 20px" }}>
          {activities.map((act, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                padding: "14px 0",
                borderBottom:
                  i < activities.length - 1
                    ? `1.5px solid ${NAVY_LIGHT}`
                    : "none",
              }}
            >
              <div
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "12px",
                  background: NAVY_LIGHT,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "20px",
                  flexShrink: 0,
                  border: `1.5px solid ${NAVY_BORDER}`,
                }}
              >
                {act.icon}
              </div>
              <div style={{ flex: 1 }}>
                <p
                  style={{
                    fontSize: "13px",
                    fontWeight: 700,
                    color: NAVY,
                    margin: "0 0 3px 0",
                  }}
                >
                  {act.title}
                </p>
                <p style={{ fontSize: "12px", color: "#9ca3af", margin: 0 }}>
                  {act.sub}
                </p>
              </div>
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: 700,
                  color: act.tagColor,
                  background: act.tagBg,
                  padding: "4px 12px",
                  borderRadius: "20px",
                  whiteSpace: "nowrap",
                }}
              >
                {act.tag}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
