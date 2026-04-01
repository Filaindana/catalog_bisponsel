import { useState } from "react";
import {
  Package,
  Tag,
  Building2,
  ArrowUpRight,
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

const tooltipLabels = chartData.map((bar) => `${bar.v} sales`);

const stats = [
  {
    label: "Total Produk",
    value: "120",
    change: "+12%",
    desc: "dari bulan lalu",
    icon: Package,
  },
  {
    label: "Promo Aktif",
    value: "8",
    change: "Stabil",
    desc: "sama seperti bulan lalu",
    icon: Tag,
  },
  {
    label: "Total Cabang",
    value: "7",
    change: "+1 baru",
    desc: "cabang ditambahkan",
    icon: Building2,
  },
];

export default function Dashboard() {
  const [hovered, setHovered] = useState(null);

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-indigo-50 via-white to-purple-50 font-sans">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Dashboard Admin</h1>
          <p className="text-gray-500 text-sm">
            Ringkasan performa toko kamu hari ini
          </p>
        </div>

        <div className="flex gap-3">
          <div className="flex items-center gap-2 bg-green-50 border border-green-200 px-3 py-2 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-green-600">Aktif</span>
          </div>

          <div className="bg-white border px-4 py-2 rounded-lg text-sm text-gray-500 shadow-sm">
            Senin, 30 Mar 2026
          </div>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-3 gap-5 mb-6">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <div
              key={i}
              className="bg-white/70 backdrop-blur-xl rounded-2xl p-5 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex justify-between mb-4">
                <div className="p-3 bg-indigo-600 rounded-xl text-white">
                  <Icon size={18} />
                </div>
                <ArrowUpRight className="text-gray-400" size={16} />
              </div>

              <p className="text-sm text-gray-500">{s.label}</p>
              <h2 className="text-3xl font-bold text-gray-800">{s.value}</h2>

              <p className="text-sm mt-2 text-gray-400">
                {s.change} {s.desc}
              </p>
            </div>
          );
        })}
      </div>

      {/* CHART MODERN */}
      <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-gray-100 mb-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="font-semibold text-gray-800">Analitik Tampilan</h3>
            <p className="text-xs text-gray-400">Performa 7 hari terakhir</p>
          </div>

          <select className="text-sm border rounded-lg px-3 py-1 bg-white shadow-sm">
            <option>7 Hari</option>
          </select>
        </div>

        <div className="flex items-end gap-4 h-52">
          {chartData.map((bar, i) => (
            <div
              key={i}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className="flex-1 flex flex-col items-center relative"
            >
              {/* TOOLTIP */}
              {hovered === i && (
                <div className="absolute -top-10 px-3 py-1.5 text-xs font-medium text-white bg-gray-900 rounded-lg shadow-lg animate-fadeIn">
                  {tooltipLabels[i]}
                </div>
              )}

              {/* BAR */}
              <div
                className={`w-full rounded-xl transition-all duration-500 ease-out ${
                  hovered === i ? "scale-110 shadow-xl" : "opacity-80"
                }`}
                style={{
                  height: `${bar.v}%`,
                  background:
                    hovered === i
                      ? "linear-gradient(180deg, #6366f1, #4f46e5)"
                      : "linear-gradient(180deg, #c7d2fe, #a5b4fc)",
                }}
              />

              {/* LABEL */}
              <span
                className={`text-xs mt-3 transition ${
                  hovered === i
                    ? "text-indigo-600 font-semibold"
                    : "text-gray-400"
                }`}
              >
                {bar.day}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* AKTIVITAS */}
      <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-sm p-6">
        <h3 className="font-semibold text-gray-700 mb-4">Aktivitas Terbaru</h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between hover:bg-gray-50 p-3 rounded-xl transition">
            <div>
              <p className="font-medium text-gray-800">
                Produk baru ditambahkan
              </p>
              <span className="text-sm text-gray-400">2 jam lalu</span>
            </div>
            <MoreHorizontal className="text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
}
