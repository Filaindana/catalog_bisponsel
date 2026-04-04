import { useState } from "react";
import { Package, Tag, Building2, ArrowUpRight, TrendingUp } from "lucide-react";
import logoImg from "../../assets/logo.png";

const chartData = [
  { day: "Sen", v: 40 },
  { day: "Sel", v: 55 },
  { day: "Rab", v: 65 },
  { day: "Kam", v: 90 },
  { day: "Jum", v: 75 },
  { day: "Sab", v: 45 },
  { day: "Min", v: 30 },
];

const CHART_H = 160;
const maxV = Math.max(...chartData.map((d) => d.v));

const topProducts = [
  { rank: "01", name: "iPhone 15 Pro Max", sold: 42, change: "+12%", up: true },
  { rank: "02", name: "Samsung S24 Ultra",  sold: 38, change: "+5%",  up: true },
  { rank: "03", name: "Xiaomi 14 Pro",      sold: 25, change: "-2%",  up: false },
];

const stats = [
  {
    label: "TOTAL PRODUK",
    value: "120",
    badge: "↑ 12% dari bulan lalu",
    badgeBg: "#dcfce7",
    badgeColor: "#16a34a",
    icon: Package,
  },
  {
    label: "PROMO AKTIF",
    value: "8",
    badge: "Sama seperti bulan lalu",
    badgeBg: "#f1f5f9",
    badgeColor: "#64748b",
    icon: Tag,
  },
  {
    label: "TOTAL CABANG",
    value: "7",
    badge: "↑ 1 cabang baru",
    badgeBg: "#fef9c3",
    badgeColor: "#b45309",
    icon: Building2,
  },
];

export default function Dashboard() {
  const [hovered, setHovered] = useState(null);

  return (
    <div style={{ fontFamily: "sans-serif" }}>

      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "56px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <img src={logoImg} alt="Logo" style={{ width: "48px", height: "48px", borderRadius: "12px", objectFit: "contain" }} />
          <div>
            <h1 style={{ fontSize: "22px", fontWeight: 700, color: "#111827", margin: 0 }}>Ringkasan Dashboard</h1>
            <p style={{ fontSize: "13px", color: "#6b7280", margin: "4px 0 0 0" }}>
              Selamat datang kembali, berikut perkembangan di toko Anda.
            </p>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", border: "1px solid #86efac", padding: "8px 16px", borderRadius: "999px" }}>
          <div style={{ width: "8px", height: "8px", background: "#22c55e", borderRadius: "50%" }} />
          <span style={{ fontSize: "13px", fontWeight: 600, color: "#16a34a" }}>Toko Aktif</span>
        </div>
      </div>

      {/* STATS */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "28px", marginBottom: "48px" }}>
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <div
              key={i}
              style={{
                background: "#fff",
                borderRadius: "16px",
                padding: "28px",
                border: "1px solid #e5e7eb",
                boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
                <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: "#072B50", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>
                  <Icon size={20} />
                </div>
                <ArrowUpRight size={16} color="#9ca3af" />
              </div>
              <p style={{ fontSize: "11px", fontWeight: 700, color: "#9ca3af", letterSpacing: "0.1em", margin: "0 0 6px 0" }}>{s.label}</p>
              <h2 style={{ fontSize: "40px", fontWeight: 700, color: "#111827", margin: "0 0 16px 0" }}>{s.value}</h2>
              <span style={{ fontSize: "12px", fontWeight: 600, padding: "4px 12px", borderRadius: "999px", background: s.badgeBg, color: s.badgeColor }}>
                {s.badge}
              </span>
            </div>
          );
        })}
      </div>

      {/* BOTTOM ROW */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: "28px" }}>

        {/* CHART */}
        <div style={{ background: "#072B50", borderRadius: "16px", padding: "28px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <TrendingUp size={16} color="#7aafd4" />
              <span style={{ fontSize: "11px", fontWeight: 800, color: "rgba(255,255,255,0.8)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                Analitik Katalog
              </span>
            </div>
            <select
              style={{ fontSize: "12px", fontWeight: 600, padding: "6px 12px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.12)", color: "#fff", outline: "none", cursor: "pointer" }}
            >
              <option>7 Hari Terakhir</option>
            </select>
          </div>

          {/* BARS */}
          <div style={{ display: "flex", alignItems: "flex-end", gap: "12px", height: `${CHART_H}px` }}>
            {chartData.map((bar, i) => {
              const isMax = bar.v === maxV;
              const isHov = hovered === i;
              const active = isMax || isHov;
              const barH = Math.round((bar.v / maxV) * CHART_H);
              return (
                <div
                  key={i}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  style={{ flex: 1, height: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-end", alignItems: "center", position: "relative", cursor: "pointer" }}
                >
                  {active && (
                    <div style={{ position: "absolute", bottom: `${barH + 8}px`, background: "#fff", color: "#072B50", fontSize: "11px", fontWeight: 700, padding: "4px 10px", borderRadius: "8px", whiteSpace: "nowrap" }}>
                      {isMax && !isHov ? "Tertinggi" : `${bar.v} views`}
                    </div>
                  )}
                  <div
                    style={{
                      width: "100%",
                      height: `${barH}px`,
                      borderRadius: "8px",
                      background: active ? "#ffffff" : "rgba(255,255,255,0.22)",
                      transition: "all 0.2s",
                    }}
                  />
                </div>
              );
            })}
          </div>

          {/* LABELS */}
          <div style={{ display: "flex", gap: "12px", marginTop: "12px" }}>
            {chartData.map((bar, i) => {
              const active = bar.v === maxV || hovered === i;
              return (
                <div key={i} style={{ flex: 1, textAlign: "center" }}>
                  <span style={{ fontSize: "12px", fontWeight: 600, color: active ? "#fff" : "rgba(255,255,255,0.45)" }}>
                    {bar.day}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* TOP PRODUCTS */}
        <div style={{ background: "#072B50", borderRadius: "16px", padding: "28px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "28px" }}>
            <TrendingUp size={16} color="#7aafd4" />
            <span style={{ fontSize: "11px", fontWeight: 800, color: "rgba(255,255,255,0.8)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Produk Terlaris
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {topProducts.map((p, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  padding: "14px 16px",
                  borderRadius: "12px",
                  background: i === 0 ? "rgba(255,255,255,0.14)" : "rgba(255,255,255,0.07)",
                }}
              >
                <span style={{ fontSize: "12px", fontWeight: 800, width: "24px", flexShrink: 0, color: i === 0 ? "#fff" : "rgba(255,255,255,0.4)" }}>
                  {p.rank}
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: "13px", fontWeight: 700, color: "#fff", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.name}</p>
                  <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", margin: "2px 0 0 0" }}>{p.sold} Terjual</p>
                </div>
                <span style={{ fontSize: "12px", fontWeight: 700, padding: "4px 10px", borderRadius: "999px", flexShrink: 0, background: p.up ? "rgba(34,197,94,0.2)" : "rgba(239,68,68,0.2)", color: p.up ? "#4ade80" : "#f87171" }}>
                  {p.change}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
