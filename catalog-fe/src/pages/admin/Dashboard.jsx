import { useState } from "react";
import {
  Package,
  Tag,
  Building2,
  ArrowUpRight,
  TrendingUp,
  Settings,
  ChevronDown,
  LayoutDashboard,
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

const maxV = Math.max(...chartData.map((d) => d.v));

const topProducts = [
  { rank: "01", name: "iPhone 15 Pro Max", sold: 42, change: "+12%", up: true },
  { rank: "02", name: "Samsung S24 Ultra", sold: 38, change: "+5%", up: true },
  { rank: "03", name: "Xiaomi 14 Pro", sold: 25, change: "-2%", up: false },
];

const stats = [
  {
    label: "Total Produk",
    value: "120",
    badge: "↑ 12% dari bulan lalu",
    badgeClass: "text-green-600 bg-green-50",
    icon: Package,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-500",
  },
  {
    label: "Promo Aktif",
    value: "8",
    badge: "Sama seperti bulan lalu",
    badgeClass: "text-gray-500 bg-gray-100",
    icon: Tag,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-500",
  },
  {
    label: "Total Cabang",
    value: "7",
    badge: "↑ 1 cabang baru",
    badgeClass: "text-amber-600 bg-amber-50",
    icon: Building2,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-500",
  },
];

const activities = [
  {
    icon: Package,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    title: "iPhone 15 Pro Max ditambahkan ke katalog",
    sub: "Cabang Jakarta Selatan • 2 jam yang lalu",
    tag: "#PROD-9021",
    tagClass: "text-gray-400",
  },
  {
    icon: Tag,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    title: "Promo Summer Sale 2024 diaktifkan",
    sub: "Semua Cabang • 5 jam yang lalu",
    tag: "AKTIF",
    tagClass: "text-green-500 font-semibold",
  },
  {
    icon: Settings,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-500",
    title: "Harga diperbarui untuk 3 produk",
    sub: "Cabang Surabaya • 8 jam yang lalu",
    tag: "#PROD-8823",
    tagClass: "text-gray-400",
  },
];

export default function Dashboard() {
  const [hovered, setHovered] = useState(null);

  return (
    <div className="font-sans">
      {/* PAGE HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          {/* Icon pengganti logo */}
          <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center shrink-0">
            <LayoutDashboard size={20} className="text-indigo-600" />
          </div>
          <div>
            <h1
              className="font-bold text-gray-900 leading-tight"
              style={{ fontSize: "26px" }}
            >
              Ringkasan Dashboard
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">
              Selamat datang kembali, berikut perkembangan di toko Anda.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 border border-green-200 px-4 py-1.5 rounded-full bg-white">
          <div className="w-2 h-2 bg-green-500 rounded-full" />
          <span className="text-xs font-semibold text-green-600">
            Toko Aktif
          </span>
        </div>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-3 gap-5 mb-6">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <div
              key={i}
              className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm"
            >
              <div className="flex justify-between items-start mb-4">
                <div
                  className={`w-10 h-10 rounded-xl ${s.iconBg} flex items-center justify-center`}
                >
                  <Icon size={18} className={s.iconColor} />
                </div>
                <ArrowUpRight size={15} className="text-gray-300" />
              </div>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                {s.label}
              </p>
              <h2 className="text-4xl font-bold text-gray-900 mb-3">
                {s.value}
              </h2>
              <span
                className={`text-xs font-semibold px-3 py-1 rounded-full ${s.badgeClass}`}
              >
                {s.badge}
              </span>
            </div>
          );
        })}
      </div>

      {/* CHART + TOP PRODUCTS */}
      <div
        className="grid gap-5 mb-6"
        style={{ gridTemplateColumns: "1fr 340px" }}
      >
        {/* CHART */}
        <div className="bg-[#072B50] rounded-2xl p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <TrendingUp size={15} className="text-blue-300" />
              <span className="text-[11px] font-extrabold text-white/80 uppercase tracking-widest">
                Analitik Katalog
              </span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/10 border border-white/20 rounded-lg px-3 py-1.5 cursor-pointer">
              <span className="text-xs font-semibold text-white">
                7 Hari Terakhir
              </span>
              <ChevronDown size={13} className="text-white/60" />
            </div>
          </div>

          {/* Bars */}
          <div className="flex items-end gap-3 h-36">
            {chartData.map((bar, i) => {
              const isMax = bar.v === maxV;
              const isHov = hovered === i;
              const active = isMax || isHov;
              const pct = Math.round((bar.v / maxV) * 100);
              return (
                <div
                  key={i}
                  className="flex-1 flex flex-col justify-end items-center relative h-full cursor-pointer"
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                >
                  {active && (
                    <div className="absolute bottom-full mb-2 bg-white text-[#072B50] text-[10px] font-bold px-2.5 py-1 rounded-lg whitespace-nowrap shadow">
                      {isMax && !isHov ? "Tertinggi" : `${bar.v} views`}
                    </div>
                  )}
                  <div
                    className="w-full rounded-lg transition-all duration-200"
                    style={{
                      height: `${pct}%`,
                      background: active ? "#ffffff" : "rgba(255,255,255,0.22)",
                    }}
                  />
                </div>
              );
            })}
          </div>

          {/* Day labels */}
          <div className="flex gap-3 mt-3">
            {chartData.map((bar, i) => {
              const active = bar.v === maxV || hovered === i;
              return (
                <div key={i} className="flex-1 text-center">
                  <span
                    className={`text-xs font-semibold transition-colors ${active ? "text-white" : "text-white/40"}`}
                  >
                    {bar.day}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* TOP PRODUCTS */}
        <div className="bg-[#072B50] rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp size={15} className="text-blue-300" />
            <span className="text-[11px] font-extrabold text-white/80 uppercase tracking-widest">
              Produk Terlaris
            </span>
          </div>

          <div className="flex flex-col gap-3">
            {topProducts.map((p, i) => (
              <div
                key={i}
                className={`flex items-center gap-4 px-4 py-3.5 rounded-xl ${
                  i === 0 ? "bg-white/[0.14]" : "bg-white/[0.07]"
                }`}
              >
                <span
                  className={`text-xs font-extrabold w-6 shrink-0 ${i === 0 ? "text-white" : "text-white/35"}`}
                >
                  {p.rank}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-white truncate">
                    {p.name}
                  </p>
                  <p className="text-xs text-white/50 mt-0.5">
                    {p.sold} Terjual
                  </p>
                </div>
                <span
                  className={`text-xs font-bold px-2.5 py-1 rounded-full shrink-0 ${
                    p.up
                      ? "bg-green-500/20 text-green-400"
                      : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {p.change}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RECENT ACTIVITIES */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold text-gray-800">Aktivitas Terbaru</h2>
          <button className="text-xs font-semibold text-blue-600 hover:underline">
            Lihat semua
          </button>
        </div>

        <div className="flex flex-col divide-y divide-gray-50">
          {activities.map((act, i) => {
            const Icon = act.icon;
            return (
              <div key={i} className="flex items-center gap-4 py-3.5">
                <div
                  className={`w-9 h-9 rounded-xl ${act.iconBg} flex items-center justify-center shrink-0`}
                >
                  <Icon size={16} className={act.iconColor} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800 truncate">
                    {act.title}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">{act.sub}</p>
                </div>
                <span className={`text-xs shrink-0 ${act.tagClass}`}>
                  {act.tag}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
