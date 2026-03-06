import {
  Package,
  Tag,
  Building2,
  TrendingUp,
  ArrowRight,
  Plus,
} from "lucide-react";

const stats = [
  {
    label: "Total Produk",
    value: "120",
    change: "↑ 12% from last month",
    changeColor: "#22c55e",
    icon: <Package size={22} color="#4f46e5" />,
    iconBg: "#eef2ff",
    action: <TrendingUp size={16} color="#9ca3af" />,
  },
  {
    label: "Promo Aktif",
    value: "8",
    change: "Same as last month",
    changeColor: "#6b7280",
    icon: <Tag size={22} color="#8b5cf6" />,
    iconBg: "#f5f3ff",
    action: <ArrowRight size={16} color="#9ca3af" />,
  },
  {
    label: "Total Cabang",
    value: "7",
    change: "↑ 1 new branch added",
    changeColor: "#22c55e",
    icon: <Building2 size={22} color="#f59e0b" />,
    iconBg: "#fffbeb",
    action: <Plus size={16} color="#9ca3af" />,
  },
];

const topProducts = [
  {
    rank: "01",
    name: "iPhone 15 Pro Max",
    sold: "42 Terjual",
    change: "+12%",
    changeColor: "#22c55e",
  },
  {
    rank: "02",
    name: "Samsung S24 Ultra",
    sold: "38 Terjual",
    change: "+5%",
    changeColor: "#22c55e",
  },
  {
    rank: "03",
    name: "Xiaomi 14 Pro",
    sold: "25 Terjual",
    change: "-2%",
    changeColor: "#ef4444",
  },
];

const activities = [
  {
    icon: "🛍️",
    title: "iPhone 15 Pro Max ditambahkan ke katalog",
    sub: "Cabang Jakarta Selatan • 2 jam yang lalu",
    tag: "#PROD-9021",
    tagColor: "#6b7280",
  },
  {
    icon: "🏷️",
    title: "Promo Summer Sale 2024 diaktifkan",
    sub: "Semua Cabang • 5 jam yang lalu",
    tag: "AKTIF",
    tagColor: "#22c55e",
  },
  {
    icon: "✏️",
    title: "Harga diperbarui untuk Samsung S24 Ultra",
    sub: "Cabang Surabaya • 1 hari yang lalu",
    tag: "#PROD-6823",
    tagColor: "#6b7280",
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

export default function Dashboard() {
  return (
    <div>
      {/* HEADER */}
      <div style={{ marginBottom: "28px" }}>
        <h1
          style={{
            fontSize: "24px",
            fontWeight: 700,
            color: "#111827",
            margin: "0 0 6px 0",
          }}
        >
          Ringkasan Dashboard
        </h1>
        <p style={{ fontSize: "14px", color: "#6b7280", margin: 0 }}>
          Selamat datang kembali, berikut perkembangan di toko Anda.
        </p>
      </div>

      {/* STAT CARDS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
          marginBottom: "28px",
        }}
      >
        {stats.map((stat, i) => (
          <div
            key={i}
            style={{
              background: "#fff",
              borderRadius: "14px",
              padding: "22px 24px",
              boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
              border: "1px solid #f1f5f9",
            }}
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
                  width: "46px",
                  height: "46px",
                  borderRadius: "12px",
                  background: stat.iconBg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {stat.icon}
              </div>
              {stat.action}
            </div>
            <p
              style={{
                fontSize: "13px",
                color: "#6b7280",
                margin: "0 0 6px 0",
              }}
            >
              {stat.label}
            </p>
            <p
              style={{
                fontSize: "32px",
                fontWeight: 800,
                color: "#111827",
                margin: "0 0 8px 0",
                lineHeight: 1,
              }}
            >
              {stat.value}
            </p>
            <p style={{ fontSize: "12px", color: stat.changeColor, margin: 0 }}>
              {stat.change}
            </p>
          </div>
        ))}
      </div>

      {/* CHART + TOP PRODUK */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.6fr 1fr",
          gap: "20px",
          marginBottom: "28px",
        }}
      >
        {/* CHART */}
        <div
          style={{
            background: "#fff",
            borderRadius: "14px",
            padding: "24px",
            boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
            border: "1px solid #f1f5f9",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "24px",
            }}
          >
            <h3
              style={{
                fontSize: "16px",
                fontWeight: 700,
                color: "#111827",
                margin: 0,
              }}
            >
              Analitik Katalog
            </h3>
            <select
              style={{
                fontSize: "13px",
                padding: "6px 12px",
                borderRadius: "8px",
                border: "1px solid #e2e8f0",
                color: "#374151",
                background: "#fff",
                cursor: "pointer",
                outline: "none",
              }}
            >
              <option>7 Hari Terakhir</option>
              <option>30 Hari Terakhir</option>
            </select>
          </div>
          {/* BAR CHART */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              gap: "12px",
              height: "140px",
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
                      background: i === 3 ? "#4f46e5" : "#e0e7ff",
                      transition: "height 0.3s ease",
                    }}
                  />
                </div>
                <span style={{ fontSize: "11px", color: "#9ca3af" }}>
                  {bar.day}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* TOP PRODUK */}
        <div
          style={{
            background: "#fff",
            borderRadius: "14px",
            padding: "24px",
            boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
            border: "1px solid #f1f5f9",
          }}
        >
          <h3
            style={{
              fontSize: "16px",
              fontWeight: 700,
              color: "#111827",
              margin: "0 0 20px 0",
            }}
          >
            Produk Terlaris
          </h3>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            {topProducts.map((p, i) => (
              <div
                key={i}
                style={{ display: "flex", alignItems: "center", gap: "14px" }}
              >
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "#9ca3af",
                    minWidth: "24px",
                  }}
                >
                  {p.rank}
                </span>
                <div style={{ flex: 1 }}>
                  <p
                    style={{
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "#111827",
                      margin: "0 0 2px 0",
                    }}
                  >
                    {p.name}
                  </p>
                  <p style={{ fontSize: "12px", color: "#9ca3af", margin: 0 }}>
                    {p.sold}
                  </p>
                </div>
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: 600,
                    color: p.changeColor,
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
      <div
        style={{
          background: "#fff",
          borderRadius: "14px",
          padding: "24px",
          boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
          border: "1px solid #f1f5f9",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <h3
            style={{
              fontSize: "16px",
              fontWeight: 700,
              color: "#111827",
              margin: 0,
            }}
          >
            Aktivitas Terbaru
          </h3>
          <span
            style={{
              fontSize: "13px",
              color: "#4f46e5",
              cursor: "pointer",
              fontWeight: 500,
            }}
          >
            Lihat semua
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {activities.map((act, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                paddingBottom: i < activities.length - 1 ? "16px" : 0,
                borderBottom:
                  i < activities.length - 1 ? "1px solid #f1f5f9" : "none",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "10px",
                  background: "#f8fafc",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "18px",
                  flexShrink: 0,
                }}
              >
                {act.icon}
              </div>
              <div style={{ flex: 1 }}>
                <p
                  style={{
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "#111827",
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
                  fontWeight: 600,
                  color: act.tagColor,
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
