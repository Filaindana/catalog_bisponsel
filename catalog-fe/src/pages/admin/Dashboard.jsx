import { useState } from "react";
import {
  Package,
  Tag,
  Building2,
  TrendingUp,
  ChevronDown,
  ArrowUpRight,
  Sparkles,
  ArrowRight,
  Info,
} from "lucide-react";

/* ─── DATA ─── */
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
    badgeColor: "text-emerald-600 bg-emerald-50",
    icon: Package,
    accentBg: "bg-blue-50", // ← berubah
    accentText: "text-[#1e3a5f]",
  },
  {
    label: "Promo Aktif",
    value: "8",
    badge: "Sama seperti bulan lalu",
    badgeColor: "text-slate-500 bg-slate-100",
    icon: Tag,
    accentBg: "bg-blue-50", // ← berubah dari bg-violet-50
    accentText: "text-[#1e3a5f]",
  },
  {
    label: "Total Cabang",
    value: "7",
    badge: "↑ 1 cabang baru",
    badgeColor: "text-amber-600 bg-amber-50",
    icon: Building2,
    accentBg: "bg-blue-50", // ← berubah dari bg-amber-50
    accentText: "text-[#1e3a5f]",
  },
];

/* ─── PREDIKSI DATA ─── */
const prediksiData = [
  { label: "6 mgg lalu", actual: 310, predicted: null },
  { label: "5 mgg lalu", actual: 340, predicted: null },
  { label: "4 mgg lalu", actual: 295, predicted: null },
  { label: "3 mgg lalu", actual: 380, predicted: null },
  { label: "2 mgg lalu", actual: 420, predicted: null },
  { label: "Minggu lalu", actual: 390, predicted: null },
  { label: "Minggu ini", actual: 445, predicted: 445 },
  { label: "+1 minggu", actual: null, predicted: 480 },
  { label: "+2 minggu", actual: null, predicted: 510 },
  { label: "+3 minggu", actual: null, predicted: 495 },
  { label: "+4 minggu", actual: null, predicted: 540 },
];

const allValues = prediksiData.flatMap((d) =>
  [d.actual, d.predicted].filter(Boolean),
);
const maxPred = Math.max(...allValues);
const minPred = Math.min(...allValues);
const range = maxPred - minPred;

function pct(v) {
  return Math.round(((v - minPred) / range) * 80 + 10);
}

/* ─── MODAL PREDIKSI LENGKAP ─── */
function PrediksiModal({ onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40"
      onClick={onClose}
    >
      <div
        className="w-[700px] bg-white rounded-2xl max-h-[88vh] flex flex-col overflow-hidden border border-slate-200 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#072B50] px-6 py-5 flex items-start justify-between flex-shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles size={14} className="text-blue-300" />
              <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest">
                AI Forecasting
              </span>
            </div>
            <p className="text-base font-bold text-white">
              Prediksi Penjualan Lengkap
            </p>
            <p className="text-xs text-white/50 mt-0.5">
              Proyeksi 4 minggu ke depan berdasarkan tren historis
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center border border-white/20 text-white/60 hover:bg-white/10 transition-colors cursor-pointer bg-transparent mt-0.5"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          {/* Summary cards */}
          <div className="grid grid-cols-3 gap-3">
            {[
              {
                label: "Proyeksi +1 Minggu",
                value: "480",
                delta: "+7.9%",
                up: true,
              },
              {
                label: "Proyeksi +2 Minggu",
                value: "510",
                delta: "+6.3%",
                up: true,
              },
              {
                label: "Proyeksi +4 Minggu",
                value: "540",
                delta: "+5.9%",
                up: true,
              },
            ].map((c, i) => (
              <div
                key={i}
                className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3.5"
              >
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                  {c.label}
                </p>
                <p className="text-2xl font-bold text-slate-900 tabular-nums">
                  {c.value}
                </p>
                <span
                  className={`text-xs font-semibold ${c.up ? "text-emerald-600" : "text-red-500"}`}
                >
                  {c.delta} vs minggu ini
                </span>
              </div>
            ))}
          </div>

          {/* Full chart */}
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">
              Grafik Prediksi Detail
            </p>
            <div className="relative h-52 bg-slate-50 rounded-xl px-4 pt-4 pb-8">
              {[25, 50, 75].map((y) => (
                <div
                  key={y}
                  className="absolute left-4 right-4 border-t border-slate-200/80"
                  style={{ top: `${y}%` }}
                />
              ))}
              <div className="relative h-full flex items-end gap-1.5">
                {prediksiData.map((d, i) => {
                  const isPred = d.actual === null;
                  const val = d.actual ?? d.predicted;
                  const barPct = pct(val);
                  return (
                    <div
                      key={i}
                      className="flex-1 flex flex-col justify-end items-center gap-1 h-full group relative"
                    >
                      <div className="absolute bottom-full mb-1.5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                        <div className="bg-slate-900 text-white text-[10px] font-semibold px-2 py-1 rounded-lg whitespace-nowrap">
                          {val} unit
                          {isPred && (
                            <span className="text-blue-300 ml-1">
                              (prediksi)
                            </span>
                          )}
                        </div>
                      </div>
                      <div
                        className={`w-full rounded-md transition-all duration-200 group-hover:opacity-90 ${
                          isPred
                            ? "bg-blue-400/60 border border-blue-400 border-dashed"
                            : "bg-[#072B50]"
                        }`}
                        style={{ height: `${barPct}%` }}
                      />
                    </div>
                  );
                })}
              </div>
              <div className="absolute bottom-1 left-4 right-4 flex gap-1.5">
                {prediksiData.map((d, i) => (
                  <div key={i} className="flex-1 text-center">
                    <span
                      className={`text-[9px] font-semibold leading-tight ${
                        d.actual === null ? "text-blue-500" : "text-slate-400"
                      }`}
                    >
                      {d.label
                        .replace(" lalu", "")
                        .replace("Minggu ini", "Skrg")}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-5 mt-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-2.5 bg-[#072B50] rounded-sm" />
                <span className="text-xs text-slate-500">Data aktual</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-2.5 bg-blue-400/60 border border-blue-400 border-dashed rounded-sm" />
                <span className="text-xs text-slate-500">Prediksi AI</span>
              </div>
            </div>
          </div>

          {/* Tabel prediksi */}
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">
              Rincian Mingguan
            </p>
            <div className="rounded-xl border border-slate-100 overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    {[
                      "Periode",
                      "Prediksi Penjualan",
                      "Perubahan",
                      "Kepercayaan",
                    ].map((h, i) => (
                      <th
                        key={i}
                        className={`px-4 py-2.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest ${
                          i === 0 ? "text-left" : "text-right"
                        }`}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      period: "+1 Minggu",
                      val: 480,
                      delta: "+7.9%",
                      conf: "92%",
                      up: true,
                    },
                    {
                      period: "+2 Minggu",
                      val: 510,
                      delta: "+6.3%",
                      conf: "88%",
                      up: true,
                    },
                    {
                      period: "+3 Minggu",
                      val: 495,
                      delta: "-2.9%",
                      conf: "83%",
                      up: false,
                    },
                    {
                      period: "+4 Minggu",
                      val: 540,
                      delta: "+9.1%",
                      conf: "79%",
                      up: true,
                    },
                  ].map((row, i) => (
                    <tr
                      key={i}
                      className="border-t border-slate-100 hover:bg-slate-50 transition-colors"
                    >
                      <td className="px-4 py-3 text-sm font-semibold text-slate-700">
                        {row.period}
                      </td>
                      <td className="px-4 py-3 text-sm text-right tabular-nums text-slate-900 font-semibold">
                        {row.val} unit
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span
                          className={`text-xs font-semibold ${row.up ? "text-emerald-600" : "text-red-500"}`}
                        >
                          {row.delta}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="inline-flex items-center gap-1.5">
                          <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-[#072B50] rounded-full"
                              style={{ width: row.conf }}
                            />
                          </div>
                          <span className="text-xs text-slate-500 tabular-nums">
                            {row.conf}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Catatan */}
          <div className="flex items-start gap-3 px-4 py-3 rounded-xl bg-blue-50 border border-blue-100">
            <Info size={14} className="text-blue-400 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-blue-600 leading-relaxed">
              Prediksi dihasilkan berdasarkan tren historis 6 minggu terakhir.
              Tingkat kepercayaan menurun seiring jauhnya proyeksi. Data ini
              bersifat indikatif dan belum mencerminkan faktor eksternal seperti
              kampanye promo atau kondisi pasar.
            </p>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex justify-end flex-shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-[#072B50] text-white text-sm font-semibold hover:bg-[#0e3d6e] cursor-pointer transition-colors border-0 font-[inherit]"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── MAIN DASHBOARD ─── */
export default function Dashboard() {
  const [hovered, setHovered] = useState(null);
  const [predHovered, setPredHovered] = useState(null);
  const [showPrediksi, setShowPrediksi] = useState(false);

  return (
    <div className="font-sans">
      {/* PAGE HEADER */}
      <div className="flex items-end justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 leading-tight">
            Ringkasan Dashboard
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Selamat datang kembali — berikut perkembangan di toko Anda.
          </p>
        </div>
        <div className="flex items-center gap-2 border border-emerald-200 px-4 py-1.5 rounded-full bg-emerald-50/60">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-semibold text-emerald-600">
            Toko Aktif
          </span>
        </div>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <div
              key={i}
              className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-5">
                <div
                  className={`w-10 h-10 rounded-xl ${s.accentBg} flex items-center justify-center`}
                >
                  <Icon size={17} className={s.accentText} />
                </div>
                <ArrowUpRight size={14} className="text-slate-200" />
              </div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                {s.label}
              </p>
              <h2 className="text-4xl font-bold text-slate-900 mb-4 tabular-nums">
                {s.value}
              </h2>
              <span
                className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${s.badgeColor}`}
              >
                {s.badge}
              </span>
            </div>
          );
        })}
      </div>

      {/* DUA CHART SEJAJAR: Prediksi (kiri) + Analitik Katalog (kanan) */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* KIRI — Prediksi Penjualan */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <div className="flex items-start justify-between mb-5">
            <div className="min-h-[52px]">
              <div className="flex items-center gap-2 mb-0.5">
                <Sparkles size={13} className="text-violet-400" />
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  AI Forecasting
                </p>
              </div>
              <h2 className="text-sm font-bold text-slate-800">
                Prediksi Penjualan
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Proyeksi 4 minggu ke depan · Data dummy
              </p>
            </div>
            <button
              onClick={() => setShowPrediksi(true)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#072B50] hover:bg-[#0e3d6e] text-white text-xs font-semibold cursor-pointer border-0 transition-colors font-[inherit]"
            >
              Lengkap
              <ArrowRight size={11} />
            </button>
          </div>

          {/* Mini bar chart prediksi */}
          <div className="relative bg-slate-50 rounded-xl px-3 pt-3">
            <div className="relative h-36 flex items-end gap-1">
              {[33, 66].map((y) => (
                <div
                  key={y}
                  className="absolute left-0 right-0 border-t border-slate-200/70"
                  style={{ top: `${y}%` }}
                />
              ))}
              {prediksiData.map((d, i) => {
                const isPred = d.actual === null;
                const val = d.actual ?? d.predicted;
                const barPct = pct(val);
                const isHov = predHovered === i;
                return (
                  <div
                    key={i}
                    className="flex-1 flex flex-col justify-end items-center h-full relative cursor-pointer"
                    onMouseEnter={() => setPredHovered(i)}
                    onMouseLeave={() => setPredHovered(null)}
                  >
                    {isHov && (
                      <div className="absolute bottom-full mb-1.5 z-10 pointer-events-none">
                        <div className="bg-slate-900 text-white text-[10px] font-semibold px-2 py-1 rounded-lg whitespace-nowrap">
                          {val} unit
                          {isPred && (
                            <span className="text-blue-300"> ·pred</span>
                          )}
                        </div>
                      </div>
                    )}
                    <div
                      className={`w-full rounded-sm transition-all duration-150 ${
                        isHov ? "opacity-80" : "opacity-100"
                      } ${
                        isPred
                          ? "bg-blue-300/70 border border-dashed border-blue-400"
                          : "bg-[#072B50]"
                      }`}
                      style={{ height: `${barPct}%` }}
                    />
                  </div>
                );
              })}
            </div>

            {/* Label — di luar area bar */}
            <div className="flex gap-1 mt-1 pb-2">
              {prediksiData.map((d, i) => (
                <div key={i} className="flex-1 text-center">
                  <span
                    className={`text-[8px] font-semibold ${
                      d.actual === null ? "text-blue-400" : "text-slate-300"
                    }`}
                  >
                    {i === 6 ? "Skrg" : i < 6 ? "" : `+${i - 6}W`}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Legend + insight */}
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <div className="w-6 h-2 bg-[#072B50] rounded-sm" />
                <span className="text-[11px] text-slate-400">Aktual</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-6 h-2 bg-blue-300/70 border border-dashed border-blue-400 rounded-sm" />
                <span className="text-[11px] text-slate-400">Prediksi</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <TrendingUp size={12} className="text-emerald-500" />
              <span className="text-[11px] font-semibold text-emerald-600">
                +21% proyeksi bulan ini
              </span>
            </div>
          </div>
        </div>

        {/* KANAN — Analitik Katalog */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <div className="flex justify-between items-center mb-5">
            <div className="min-h-[52px]">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">
                Performa
              </p>
              <div className="flex items-center gap-2">
                <TrendingUp size={14} className="text-violet-400" />
                <span className="text-[11px] font-bold text-slate-800 uppercase tracking-widest">
                  Analitik Katalog
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-100 border border-slate-200 rounded-lg px-3 py-1.5 cursor-pointer hover:bg-slate-200 transition-colors">
              <span className="text-xs font-semibold text-slate-600">
                7 Hari Terakhir
              </span>
              <ChevronDown size={12} className="text-slate-400" />
            </div>
          </div>

          {/* Area bar */}
          <div className="relative bg-slate-50 rounded-xl px-3 pt-3">
            <div className="relative h-36 flex items-end gap-2.5">
              {[33, 66].map((y) => (
                <div
                  key={y}
                  className="absolute left-0 right-0 border-t border-slate-200/70"
                  style={{ top: `${y}%` }}
                />
              ))}
              {chartData.map((bar, i) => {
                const isMax = bar.v === maxV;
                const isHov = hovered === i;
                const active = isMax || isHov;
                const barPct = Math.round((bar.v / maxV) * 100);
                return (
                  <div
                    key={i}
                    className="flex-1 flex flex-col justify-end items-center relative h-full cursor-pointer"
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    {active && (
                      <div className="absolute bottom-full mb-1.5 z-10 pointer-events-none">
                        <div className="bg-slate-900 text-white text-[10px] font-semibold px-2 py-1 rounded-lg whitespace-nowrap">
                          {bar.v} views
                        </div>
                      </div>
                    )}
                    <div
                      className={`w-full rounded-sm transition-all duration-150 ${active ? "opacity-80" : "opacity-100"} bg-[#072B50]`}
                      style={{ height: `${barPct}%` }}
                    />
                  </div>
                );
              })}
            </div>

            {/* Label hari — di luar area bar */}
            <div className="flex gap-2.5 mt-1 pb-2">
              {chartData.map((bar, i) => {
                const active = bar.v === maxV || hovered === i;
                return (
                  <div key={i} className="flex-1 text-center">
                    <span
                      className={`text-[8px] font-semibold transition-colors ${
                        active ? "text-slate-700" : "text-slate-300"
                      }`}
                    >
                      {bar.day}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-2 bg-[#072B50] rounded-sm" />
              <span className="text-[11px] text-slate-400">Views katalog</span>
            </div>
            <div className="flex items-center gap-1.5">
              <TrendingUp size={12} className="text-emerald-500" />
              <span className="text-[11px] font-semibold text-emerald-600">
                Puncak: Kamis
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* PRODUK TERLARIS — di bawah kedua chart */}
      <div className="bg-[#072B50] rounded-2xl p-6">
        <div className="mb-5">
          <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-0.5">
            Ranking
          </p>
          <div className="flex items-center gap-2">
            <TrendingUp size={14} className="text-blue-300" />
            <span className="text-[11px] font-bold text-white/80 uppercase tracking-widest">
              Produk Terlaris
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-2.5">
          {topProducts.map((p, i) => (
            <div
              key={i}
              className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-colors ${
                i === 0
                  ? "bg-white/[0.13]"
                  : "bg-white/[0.06] hover:bg-white/[0.09]"
              }`}
            >
              <span
                className={`text-xs font-bold w-5 shrink-0 tabular-nums ${i === 0 ? "text-white" : "text-white/30"}`}
              >
                {p.rank}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">
                  {p.name}
                </p>
                <p className="text-xs text-white/40 mt-0.5">{p.sold} Terjual</p>
              </div>
              <span
                className={`text-[11px] font-bold px-2 py-1 rounded-lg shrink-0 ${
                  p.up
                    ? "bg-emerald-500/20 text-emerald-400"
                    : "bg-red-500/20 text-red-400"
                }`}
              >
                {p.change}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL PREDIKSI LENGKAP */}
      {showPrediksi && <PrediksiModal onClose={() => setShowPrediksi(false)} />}
    </div>
  );
}
