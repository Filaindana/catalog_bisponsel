import { useState } from "react";
import {
  Package,
  Tag,
  Building2,
  TrendingUp,
  Activity,
  Clock,
  ArrowUpRight,
  ChevronRight,
  Eye,
  MoreHorizontal,
} from "lucide-react";

const NAVY = "#072B50";
const NAVY_LIGHT = "rgba(7,43,80,0.07)";
const NAVY_BORDER = "rgba(7,43,80,0.12)";
const NAVY_MID = "rgba(7,43,80,0.45)";

const chartData = [
  { day: "Sen", v: 40 },
  { day: "Sel", v: 55 },
  { day: "Rab", v: 65 },
  { day: "Kam", v: 90 },
  { day: "Jum", v: 75 },
  { day: "Sab", v: 45 },
  { day: "Min", v: 30 },
];

const stats = [
  {
    label: "Total Produk",
    value: "120",
    change: "+12%",
    desc: "dari bulan lalu",
    positive: true,
    icon: Package,
  },
  {
    label: "Promo Aktif",
    value: "8",
    change: "Stabil",
    desc: "sama seperti bulan lalu",
    positive: null,
    icon: Tag,
  },
  {
    label: "Total Cabang",
    value: "7",
    change: "+1 baru",
    desc: "cabang ditambahkan",
    positive: true,
    icon: Building2,
  },
];

const topProducts = [
  {
    rank: 1,
    name: "iPhone 15 Pro Max",
    views: "4,291",
    change: "+12%",
    positive: true,
    bar: 90,
  },
  {
    rank: 2,
    name: "Samsung S24 Ultra",
    views: "3,876",
    change: "+5%",
    positive: true,
    bar: 72,
  },
  {
    rank: 3,
    name: "Xiaomi 14 Pro",
    views: "2,541",
    change: "-2%",
    positive: false,
    bar: 50,
  },
];

const activities = [
  {
    emoji: "🛍️",
    title: "iPhone 15 Pro Max ditambahkan ke katalog",
    branch: "Cabang Jakarta Selatan",
    time: "2 jam lalu",
    tag: "Produk Baru",
    tagColor: NAVY,
    tagBg: NAVY_LIGHT,
  },
  {
    emoji: "🏷️",
    title: "Promo Summer Sale 2024 diaktifkan",
    branch: "Semua Cabang",
    time: "5 jam lalu",
    tag: "Aktif",
    tagColor: "#16a34a",
    tagBg: "#dcfce7",
  },
  {
    emoji: "✏️",
    title: "Harga diperbarui untuk Samsung S24 Ultra",
    branch: "Cabang Surabaya",
    time: "1 hari lalu",
    tag: "Diperbarui",
    tagColor: "#d97706",
    tagBg: "#fef3c7",
  },
];

const card = {
  background: "#fff",
  borderRadius: "16px",
  border: `1px solid ${NAVY_BORDER}`,
  overflow: "hidden",
};

export default function Dashboard() {
  const [hovered, setHovered] = useState(3);

  return (
    <div
      style={{
        background: "#f4f6fb",
        minHeight: "100vh",
        padding: "28px",
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,700;9..40,800&display=swap');
        * { box-sizing: border-box; }
        .hov-card { transition: box-shadow 0.2s, transform 0.2s; }
        .hov-card:hover { box-shadow: 0 8px 28px rgba(7,43,80,0.1); transform: translateY(-2px); }
        .hov-row { transition: background 0.15s; cursor: pointer; border-radius: 10px; }
        .hov-row:hover { background: rgba(7,43,80,0.04) !important; }
        .bar-item { transition: opacity 0.15s; cursor: pointer; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }
        .a1 { animation: fadeUp 0.4s ease 0.04s both; }
        .a2 { animation: fadeUp 0.4s ease 0.10s both; }
        .a3 { animation: fadeUp 0.4s ease 0.17s both; }
        .a4 { animation: fadeUp 0.4s ease 0.24s both; }
        @keyframes pulseDot { 0%,100%{opacity:1} 50%{opacity:0.45} }
      `}</style>

      {/* HEADER */}
      <div
        className="a1"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "22px",
        }}
      >
        <div>
          <h1
            style={{
              margin: "0 0 4px",
              fontSize: "20px",
              fontWeight: 800,
              color: NAVY,
              letterSpacing: "-0.4px",
            }}
          >
            Dashboard Admin
          </h1>
          <p style={{ margin: 0, fontSize: "13px", color: NAVY_MID }}>
            Selamat datang kembali — ringkasan katalog toko Anda.
          </p>
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "7px",
              background: "#f0fdf4",
              border: "1px solid #86efac",
              borderRadius: "10px",
              padding: "8px 14px",
            }}
          >
            <div
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                background: "#22c55e",
                animation: "pulseDot 2s infinite",
              }}
            />
            <span
              style={{ fontSize: "12px", fontWeight: 700, color: "#16a34a" }}
            >
              Toko Aktif
            </span>
          </div>
          <div
            style={{
              background: "#fff",
              border: `1px solid ${NAVY_BORDER}`,
              borderRadius: "10px",
              padding: "8px 14px",
              fontSize: "12px",
              color: NAVY_MID,
              fontWeight: 600,
            }}
          >
            Senin, 30 Mar 2026
          </div>
        </div>
      </div>

      {/* STAT CARDS */}
      <div
        className="a2"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: "14px",
          marginBottom: "14px",
        }}
      >
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <div
              key={i}
              className="hov-card"
              style={{ ...card, padding: "20px" }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "16px",
                }}
              >
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "12px",
                    background: NAVY,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 4px 14px rgba(7,43,80,0.28)",
                  }}
                >
                  <Icon size={20} color="#fff" />
                </div>
                <ArrowUpRight size={15} color={NAVY_MID} />
              </div>
              <p
                style={{
                  margin: "0 0 4px",
                  fontSize: "11px",
                  fontWeight: 700,
                  color: NAVY_MID,
                  textTransform: "uppercase",
                  letterSpacing: "0.8px",
                }}
              >
                {s.label}
              </p>
              <p
                style={{
                  margin: "0 0 12px",
                  fontSize: "34px",
                  fontWeight: 800,
                  color: NAVY,
                  lineHeight: 1,
                  letterSpacing: "-1.5px",
                }}
              >
                {s.value}
              </p>
              <div
                style={{ display: "flex", alignItems: "center", gap: "6px" }}
              >
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    padding: "3px 10px",
                    borderRadius: "20px",
                    color:
                      s.positive === true
                        ? "#16a34a"
                        : s.positive === false
                          ? "#ef4444"
                          : "#6b7280",
                    background:
                      s.positive === true
                        ? "#dcfce7"
                        : s.positive === false
                          ? "#fee2e2"
                          : "#f3f4f6",
                  }}
                >
                  {s.change}
                </span>
                <span style={{ fontSize: "12px", color: NAVY_MID }}>
                  {s.desc}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* ROW 2: Chart + Top Produk */}
      <div
        className="a3"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 360px",
          gap: "14px",
          marginBottom: "14px",
        }}
      >
        {/* CHART */}
        <div style={card}>
          <div
            style={{
              background: NAVY,
              padding: "14px 20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Activity size={15} color="#fff" />
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: 700,
                  color: "#fff",
                  letterSpacing: "0.4px",
                }}
              >
                Analitik Tampilan Katalog
              </span>
            </div>
            <select
              style={{
                fontSize: "12px",
                padding: "5px 10px",
                borderRadius: "7px",
                border: "1px solid rgba(255,255,255,0.25)",
                color: "#fff",
                background: "rgba(255,255,255,0.12)",
                cursor: "pointer",
                outline: "none",
                fontWeight: 600,
                fontFamily: "inherit",
              }}
            >
              <option style={{ color: NAVY }}>7 Hari Terakhir</option>
              <option style={{ color: NAVY }}>30 Hari Terakhir</option>
            </select>
          </div>

          <div style={{ padding: "20px 24px" }}>
            <div style={{ display: "flex", gap: "28px", marginBottom: "20px" }}>
              <div>
                <p
                  style={{
                    margin: "0 0 2px",
                    fontSize: "11px",
                    fontWeight: 700,
                    color: NAVY_MID,
                    textTransform: "uppercase",
                    letterSpacing: "0.7px",
                  }}
                >
                  Total Tampilan
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: "26px",
                    fontWeight: 800,
                    color: NAVY,
                    letterSpacing: "-1px",
                  }}
                >
                  11.9k
                </p>
              </div>
              <div style={{ width: "1px", background: NAVY_BORDER }} />
              <div>
                <p
                  style={{
                    margin: "0 0 2px",
                    fontSize: "11px",
                    fontWeight: 700,
                    color: NAVY_MID,
                    textTransform: "uppercase",
                    letterSpacing: "0.7px",
                  }}
                >
                  Rata-rata/Hari
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: "26px",
                    fontWeight: 800,
                    color: NAVY,
                    letterSpacing: "-1px",
                  }}
                >
                  1.7k
                </p>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                gap: "8px",
                height: "130px",
              }}
            >
              {chartData.map((bar, i) => {
                const active = hovered === i;
                return (
                  <div
                    key={i}
                    className="bar-item"
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "6px",
                      height: "100%",
                      position: "relative",
                    }}
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(3)}
                  >
                    {active && (
                      <div
                        style={{
                          position: "absolute",
                          top: "-26px",
                          fontSize: "10px",
                          fontWeight: 800,
                          color: "#fff",
                          background: NAVY,
                          padding: "2px 7px",
                          borderRadius: "6px",
                          boxShadow: "0 3px 8px rgba(7,43,80,0.3)",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {
                          [
                            "< 1k",
                            "1.6k",
                            "1.9k",
                            "2.7k",
                            "2.2k",
                            "1.3k",
                            "0.9k",
                          ][i]
                        }
                      </div>
                    )}
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
                          height: `${bar.v}%`,
                          borderRadius: "6px 6px 0 0",
                          background: active ? NAVY : NAVY_LIGHT,
                          transition: "all 0.2s ease",
                          boxShadow: active
                            ? "0 4px 14px rgba(7,43,80,0.28)"
                            : "none",
                        }}
                      />
                    </div>
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: active ? 800 : 500,
                        color: active ? NAVY : NAVY_MID,
                        transition: "all 0.2s",
                      }}
                    >
                      {bar.day}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* TOP PRODUK */}
        <div style={card}>
          <div
            style={{
              background: NAVY,
              padding: "14px 20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <TrendingUp size={15} color="#fff" />
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: 700,
                  color: "#fff",
                  letterSpacing: "0.4px",
                }}
              >
                Produk Terpopuler
              </span>
            </div>
            <Eye size={14} color="rgba(255,255,255,0.55)" />
          </div>

          <div style={{ padding: "14px" }}>
            {topProducts.map((p, i) => (
              <div
                key={i}
                className="hov-row"
                style={{
                  padding: "12px",
                  marginBottom: "4px",
                  background: i === 0 ? NAVY_LIGHT : "transparent",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom: "8px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 800,
                      color: i === 0 ? NAVY : NAVY_MID,
                      minWidth: "22px",
                    }}
                  >
                    {String(p.rank).padStart(2, "0")}
                  </span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p
                      style={{
                        margin: 0,
                        fontSize: "13px",
                        fontWeight: 700,
                        color: NAVY,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {p.name}
                    </p>
                    <p style={{ margin: 0, fontSize: "11px", color: NAVY_MID }}>
                      {p.views} tayangan
                    </p>
                  </div>
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      flexShrink: 0,
                      color: p.positive ? "#16a34a" : "#ef4444",
                      background: p.positive ? "#dcfce7" : "#fee2e2",
                      padding: "3px 9px",
                      borderRadius: "20px",
                    }}
                  >
                    {p.change}
                  </span>
                </div>
                <div
                  style={{
                    height: "4px",
                    background: NAVY_LIGHT,
                    borderRadius: "4px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${p.bar}%`,
                      background: NAVY,
                      borderRadius: "4px",
                      transition: "width 0.6s ease",
                    }}
                  />
                </div>
              </div>
            ))}

            <div
              className="hov-row"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "4px",
                marginTop: "8px",
                padding: "11px 12px",
                border: `1px dashed ${NAVY_BORDER}`,
                fontSize: "12px",
                color: NAVY_MID,
                fontWeight: 600,
              }}
            >
              Lihat Semua Produk <ChevronRight size={13} />
            </div>
          </div>
        </div>
      </div>

      {/* AKTIVITAS TERBARU */}
      <div className="a4" style={card}>
        <div
          style={{
            background: NAVY,
            padding: "14px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Clock size={15} color="#fff" />
            <span
              style={{
                fontSize: "13px",
                fontWeight: 700,
                color: "#fff",
                letterSpacing: "0.4px",
              }}
            >
              Aktivitas Terbaru
            </span>
          </div>
          <button
            style={{
              background: "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: "7px",
              padding: "4px 12px",
              cursor: "pointer",
              fontSize: "12px",
              color: "#fff",
              fontWeight: 600,
              fontFamily: "inherit",
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            Lihat semua <ChevronRight size={12} />
          </button>
        </div>

        <div style={{ padding: "0 20px" }}>
          {activities.map((act, i) => (
            <div
              key={i}
              className="hov-row"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                padding: "14px 10px",
                borderBottom:
                  i < activities.length - 1
                    ? `1px solid ${NAVY_BORDER}`
                    : "none",
              }}
            >
              <div
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "12px",
                  background: NAVY_LIGHT,
                  border: `1px solid ${NAVY_BORDER}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "20px",
                  flexShrink: 0,
                }}
              >
                {act.emoji}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p
                  style={{
                    margin: "0 0 3px",
                    fontSize: "13px",
                    fontWeight: 700,
                    color: NAVY,
                  }}
                >
                  {act.title}
                </p>
                <p style={{ margin: 0, fontSize: "12px", color: NAVY_MID }}>
                  {act.branch} · {act.time}
                </p>
              </div>
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  flexShrink: 0,
                  color: act.tagColor,
                  background: act.tagBg,
                  padding: "4px 12px",
                  borderRadius: "20px",
                  border: `1px solid ${act.tagColor}22`,
                }}
              >
                {act.tag}
              </span>
              <MoreHorizontal
                size={16}
                color={NAVY_MID}
                style={{ flexShrink: 0, cursor: "pointer" }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
