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

const chartData = [
  { day: "Sen", v: 40 },
  { day: "Sel", v: 55 },
  { day: "Rab", v: 65 },
  { day: "Kam", v: 90 },
  { day: "Jum", v: 75 },
  { day: "Sab", v: 45 },
  { day: "Min", v: 30 },
];

const tooltipLabels = ["< 1k", "1.6k", "1.9k", "2.7k", "2.2k", "1.3k", "0.9k"];

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
    tagColor: "#072B50",
    tagBg: "rgba(7,43,80,0.07)",
    tagBorder: "rgba(7,43,80,0.22)",
  },
  {
    emoji: "🏷️",
    title: "Promo Summer Sale 2024 diaktifkan",
    branch: "Semua Cabang",
    time: "5 jam lalu",
    tag: "Aktif",
    tagColor: "#16a34a",
    tagBg: "#dcfce7",
    tagBorder: "#16a34a22",
  },
  {
    emoji: "✏️",
    title: "Harga diperbarui untuk Samsung S24 Ultra",
    branch: "Cabang Surabaya",
    time: "1 hari lalu",
    tag: "Diperbarui",
    tagColor: "#d97706",
    tagBg: "#fef3c7",
    tagBorder: "#d9770622",
  },
];

export default function Dashboard() {
  const [hovered, setHovered] = useState(3);

  return (
    <div className="bg-[#f4f6fb] min-h-screen p-7 font-['DM_Sans','Segoe_UI',sans-serif]">
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
        .pulse-dot { animation: pulseDot 2s infinite; }
      `}</style>

      {/* HEADER */}
      <div className="a1 flex justify-between items-center mb-[22px]">
        <div>
          <h1 className="m-0 mb-1 text-[20px] font-extrabold text-[#072B50] tracking-[-0.4px]">
            Dashboard Admin
          </h1>
          <p className="m-0 text-[13px] text-[rgba(7,43,80,0.45)]">
            Selamat datang kembali — ringkasan katalog toko Anda.
          </p>
        </div>
        <div className="flex gap-2">
          <div className="flex items-center gap-[7px] bg-[#f0fdf4] border border-[#86efac] rounded-[10px] px-3.5 py-2">
            <div className="pulse-dot w-[7px] h-[7px] rounded-full bg-[#22c55e]" />
            <span className="text-xs font-bold text-[#16a34a]">Toko Aktif</span>
          </div>
          <div className="bg-white border border-[rgba(7,43,80,0.12)] rounded-[10px] px-3.5 py-2 text-xs text-[rgba(7,43,80,0.45)] font-semibold">
            Senin, 30 Mar 2026
          </div>
        </div>
      </div>

      {/* STAT CARDS */}
      <div className="a2 grid grid-cols-3 gap-3.5 mb-3.5">
        {stats.map((s, i) => {
          const Icon = s.icon;
          const changeCls =
            s.positive === true
              ? "text-[#16a34a] bg-[#dcfce7]"
              : s.positive === false
                ? "text-[#ef4444] bg-[#fee2e2]"
                : "text-gray-500 bg-gray-100";
          return (
            <div
              key={i}
              className="hov-card bg-white rounded-2xl border border-[rgba(7,43,80,0.12)] overflow-hidden p-5"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-11 h-11 rounded-xl bg-[#072B50] flex items-center justify-center shadow-[0_4px_14px_rgba(7,43,80,0.28)]">
                  <Icon size={20} color="#fff" />
                </div>
                <ArrowUpRight size={15} color="rgba(7,43,80,0.45)" />
              </div>
              <p className="m-0 mb-1 text-[11px] font-bold text-[rgba(7,43,80,0.45)] uppercase tracking-[0.8px]">
                {s.label}
              </p>
              <p className="m-0 mb-3 text-[34px] font-extrabold text-[#072B50] leading-none tracking-[-1.5px]">
                {s.value}
              </p>
              <div className="flex items-center gap-1.5">
                <span
                  className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${changeCls}`}
                >
                  {s.change}
                </span>
                <span className="text-xs text-[rgba(7,43,80,0.45)]">
                  {s.desc}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* ROW 2: Chart + Top Produk */}
      <div
        className="a3 grid gap-3.5 mb-3.5"
        style={{ gridTemplateColumns: "1fr 360px" }}
      >
        {/* CHART */}
        <div className="bg-white rounded-2xl border border-[rgba(7,43,80,0.12)] overflow-hidden">
          <div className="bg-[#072B50] px-5 py-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity size={15} color="#fff" />
              <span className="text-[13px] font-bold text-white tracking-[0.4px]">
                Analitik Tampilan Katalog
              </span>
            </div>
            <select className="text-xs px-2.5 py-[5px] rounded-[7px] border border-white/25 text-white bg-white/12 cursor-pointer outline-none font-semibold font-[inherit]">
              <option style={{ color: "#072B50" }}>7 Hari Terakhir</option>
              <option style={{ color: "#072B50" }}>30 Hari Terakhir</option>
            </select>
          </div>

          <div className="px-6 py-5">
            <div className="flex gap-7 mb-5">
              <div>
                <p className="m-0 mb-0.5 text-[11px] font-bold text-[rgba(7,43,80,0.45)] uppercase tracking-[0.7px]">
                  Total Tampilan
                </p>
                <p className="m-0 text-[26px] font-extrabold text-[#072B50] tracking-[-1px]">
                  11.9k
                </p>
              </div>
              <div className="w-px bg-[rgba(7,43,80,0.12)]" />
              <div>
                <p className="m-0 mb-0.5 text-[11px] font-bold text-[rgba(7,43,80,0.45)] uppercase tracking-[0.7px]">
                  Rata-rata/Hari
                </p>
                <p className="m-0 text-[26px] font-extrabold text-[#072B50] tracking-[-1px]">
                  1.7k
                </p>
              </div>
            </div>

            <div className="flex items-end gap-2 h-[130px]">
              {chartData.map((bar, i) => {
                const active = hovered === i;
                return (
                  <div
                    key={i}
                    className="bar-item flex-1 flex flex-col items-center gap-1.5 h-full relative"
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(3)}
                  >
                    {active && (
                      <div className="absolute -top-[26px] text-[10px] font-extrabold text-white bg-[#072B50] px-[7px] py-0.5 rounded-md shadow-[0_3px_8px_rgba(7,43,80,0.3)] whitespace-nowrap">
                        {tooltipLabels[i]}
                      </div>
                    )}
                    <div className="flex-1 w-full flex items-end">
                      <div
                        className="w-full rounded-t-md transition-all duration-200"
                        style={{
                          height: `${bar.v}%`,
                          background: active ? "#072B50" : "rgba(7,43,80,0.07)",
                          boxShadow: active
                            ? "0 4px 14px rgba(7,43,80,0.28)"
                            : "none",
                        }}
                      />
                    </div>
                    <span
                      className="text-[11px] transition-all duration-200"
                      style={{
                        fontWeight: active ? 800 : 500,
                        color: active ? "#072B50" : "rgba(7,43,80,0.45)",
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
        <div className="bg-white rounded-2xl border border-[rgba(7,43,80,0.12)] overflow-hidden">
          <div className="bg-[#072B50] px-5 py-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp size={15} color="#fff" />
              <span className="text-[13px] font-bold text-white tracking-[0.4px]">
                Produk Terpopuler
              </span>
            </div>
            <Eye size={14} color="rgba(255,255,255,0.55)" />
          </div>

          <div className="p-3.5">
            {topProducts.map((p, i) => (
              <div
                key={i}
                className="hov-row p-3 mb-1"
                style={{
                  background: i === 0 ? "rgba(7,43,80,0.07)" : "transparent",
                }}
              >
                <div className="flex items-center gap-2.5 mb-2">
                  <span
                    className="text-[11px] font-extrabold min-w-[22px]"
                    style={{
                      color: i === 0 ? "#072B50" : "rgba(7,43,80,0.45)",
                    }}
                  >
                    {String(p.rank).padStart(2, "0")}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="m-0 text-[13px] font-bold text-[#072B50] truncate">
                      {p.name}
                    </p>
                    <p className="m-0 text-[11px] text-[rgba(7,43,80,0.45)]">
                      {p.views} tayangan
                    </p>
                  </div>
                  <span
                    className={`text-[11px] font-bold shrink-0 px-[9px] py-0.5 rounded-full ${
                      p.positive
                        ? "text-[#16a34a] bg-[#dcfce7]"
                        : "text-[#ef4444] bg-[#fee2e2]"
                    }`}
                  >
                    {p.change}
                  </span>
                </div>
                <div className="h-1 bg-[rgba(7,43,80,0.07)] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#072B50] rounded-full transition-all duration-[600ms] ease-in-out"
                    style={{ width: `${p.bar}%` }}
                  />
                </div>
              </div>
            ))}

            <div className="hov-row flex items-center justify-center gap-1 mt-2 px-3 py-[11px] border border-dashed border-[rgba(7,43,80,0.12)] text-xs text-[rgba(7,43,80,0.45)] font-semibold">
              Lihat Semua Produk <ChevronRight size={13} />
            </div>
          </div>
        </div>
      </div>

      {/* AKTIVITAS TERBARU */}
      <div className="a4 bg-white rounded-2xl border border-[rgba(7,43,80,0.12)] overflow-hidden">
        <div className="bg-[#072B50] px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock size={15} color="#fff" />
            <span className="text-[13px] font-bold text-white tracking-[0.4px]">
              Aktivitas Terbaru
            </span>
          </div>
          <button className="bg-white/[0.12] border border-white/20 rounded-[7px] px-3 py-1 cursor-pointer text-xs text-white font-semibold font-[inherit] flex items-center gap-1">
            Lihat semua <ChevronRight size={12} />
          </button>
        </div>

        <div className="px-5">
          {activities.map((act, i) => (
            <div
              key={i}
              className="hov-row flex items-center gap-3.5 px-2.5 py-3.5"
              style={{
                borderBottom:
                  i < activities.length - 1
                    ? "1px solid rgba(7,43,80,0.12)"
                    : "none",
              }}
            >
              <div className="w-[42px] h-[42px] rounded-xl bg-[rgba(7,43,80,0.07)] border border-[rgba(7,43,80,0.12)] flex items-center justify-center text-[20px] shrink-0">
                {act.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <p className="m-0 mb-[3px] text-[13px] font-bold text-[#072B50]">
                  {act.title}
                </p>
                <p className="m-0 text-xs text-[rgba(7,43,80,0.45)]">
                  {act.branch} · {act.time}
                </p>
              </div>
              <span
                className="text-[11px] font-bold shrink-0 px-3 py-1 rounded-full border"
                style={{
                  color: act.tagColor,
                  background: act.tagBg,
                  borderColor: act.tagBorder,
                }}
              >
                {act.tag}
              </span>
              <MoreHorizontal
                size={16}
                color="rgba(7,43,80,0.45)"
                className="shrink-0 cursor-pointer"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
