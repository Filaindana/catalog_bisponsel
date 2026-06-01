import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getPublicPromos } from "../utils/services/promoService";

/* ── Minimal style: hanya animasi & keyframes ── */
if (typeof document !== "undefined" && !document.querySelector("[data-promo-style]")) {
  const s = document.createElement("style");
  s.setAttribute("data-promo-style", "true");
  s.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
    .promo-root * { font-family: 'Inter', sans-serif !important; box-sizing: border-box; }

    @keyframes fadeUp   { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
    @keyframes fadeIn   { from{opacity:0} to{opacity:1} }
    @keyframes fadeLeft { from{opacity:0;transform:translateX(-24px)} to{opacity:1;transform:translateX(0)} }
    @keyframes ticker   { from{transform:translateX(0)} to{transform:translateX(-50%)} }
    @keyframes pulse    { 0%,100%{opacity:1} 50%{opacity:.35} }

    /* Scroll-reveal: default hidden */
    .reveal       { opacity:0; transform:translateY(28px); transition:opacity .55s ease, transform .55s ease; }
    .reveal.left  { transform:translateX(-24px); }
    .reveal.right { transform:translateX(24px); }
    .reveal.shown { opacity:1 !important; transform:none !important; }

    /* stagger delays */
    .reveal-d1 { transition-delay:.08s; }
    .reveal-d2 { transition-delay:.16s; }
    .reveal-d3 { transition-delay:.24s; }
    .reveal-d4 { transition-delay:.32s; }
    .reveal-d5 { transition-delay:.40s; }
    .reveal-d6 { transition-delay:.48s; }

    .promo-card  { transition: transform .25s cubic-bezier(.34,1.3,.64,1), box-shadow .25s ease; }
    .promo-card:hover { transform:translateY(-5px); }
    .promo-img   { transition: transform .5s cubic-bezier(.25,.46,.45,.94); }
    .promo-card:hover .promo-img { transform:scale(1.06); }

    .tab-active  { background:#072B50 !important; color:#fff !important; border-color:#072B50 !important; }
    .tab-btn     { transition: all .15s ease; }
    .tab-btn:hover:not(.tab-active) { border-color:#a8b8cc !important; color:#072B50 !important; }

    .banner-card { transition: transform .3s cubic-bezier(.34,1.3,.64,1), box-shadow .3s ease; }
    .banner-card:hover { transform:translateY(-5px); box-shadow:0 28px 60px rgba(7,43,80,.22) !important; }

    .countdown-box { animation: fadeUp .35s ease both; }
    .promo-ticker-inner { display:flex; width:max-content; animation:ticker 32s linear infinite; }
    .promo-ticker-inner:hover { animation-play-state:paused; }
  `;
  document.head.appendChild(s);
}

const formatRange = (startStr, endStr) => {
  const start = new Date(startStr);
  const end = new Date(endStr);

  const formatMonth = (d) =>
    new Intl.DateTimeFormat("id-ID", { month: "short" }).format(d);

  const startDay = start.getDate();
  const endDay = end.getDate();

  const startMonth = formatMonth(start);
  const endMonth = formatMonth(end);

  const startYear = start.getFullYear();
  const endYear = end.getFullYear();

  if (startYear !== endYear) {
    return `${startDay} ${startMonth} ${startYear} - ${endDay} ${endMonth} ${endYear}`;
  }

  if (startMonth === endMonth) {
    return `${startDay} - ${endDay} ${startMonth} ${startYear}`;
  }

  return `${startDay} ${startMonth} - ${endDay} ${endMonth} ${startYear}`;
};

/* ── Scroll-reveal hook ── */
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("shown"); obs.unobserve(el); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

/* ── Countdown ── */
// function useCountdown(end) {
//   const [t, setT] = useState({ h:"00", m:"00", s:"00" });
//   useEffect(() => {
//     const tick = () => {
//       const d = Math.max(0, end - Date.now());
//       setT({
//         h: String(Math.floor(d / 3600000)).padStart(2,"0"),
//         m: String(Math.floor((d % 3600000) / 60000)).padStart(2,"0"),
//         s: String(Math.floor((d % 60000) / 1000)).padStart(2,"0"),
//       });
//     };
//     tick();
//     const id = setInterval(tick, 1000);
//     return () => clearInterval(id);
//   }, [end]);
//   return t;
// }

// const BANNERS = [
//   {
//     id:"b1", label:"THE PROFESSIONAL EDGE",
//     title:"Professional\nWorkstation Bundle",
//     desc:"Hemat hingga 30% saat membangun setup impian Anda. CPU performa tinggi & layar 4K tersedia.",
//     btnText:"Konfigurasi Sekarang",
//     bg:"linear-gradient(135deg, #1a1a2e 0%, #16213e 40%, #0f3460 100%)",
//     image:"https://images.unsplash.com/photo-1593640408182-31c228f37e8e?w=700&q=80",
//     textAlign:"left", accent:"#6aaff5",
//   },
//   {
//     id:"b2", label:"ARTISTIC EXCELLENCE",
//     title:"Creative Studio\nSeries",
//     desc:"Wujudkan imajinasi Anda dengan hardware audio-visual khusus untuk para kreator.",
//     btnText:"Jelajahi Seri",
//     bg:"linear-gradient(135deg, #2d1b69 0%, #3d1a78 40%, #5b21b6 100%)",
//     image:"https://images.unsplash.com/photo-1518770660439-4636190af475?w=700&q=80",
//     textAlign:"right", accent:"#c084fc",
//   },
// ];

/* ─── Digit countdown box ─── */
// function Digit({ val, label }) {
//   return (
//     <div className="countdown-box flex flex-col items-center bg-[#f0f4f9] border border-[#dde6f0] rounded-lg px-3 py-2 min-w-11">
//       <span className="text-xl font-black text-[#072B50] leading-none">{val}</span>
//       <span className="text-[8px] font-semibold text-[#8a9bb0] tracking-widest uppercase mt-1">{label}</span>
//     </div>
//   );
// }

/* ─── Info Badge ─── */
function InfoBadge({ small = false }) {
  return (
    <div className={`inline-flex items-center gap-1.5 bg-[#f0f4f9] border border-[#dde6f0] rounded-lg text-[#072B50] font-semibold whitespace-nowrap ${small ? "px-3 py-1.5 text-[11px]" : "px-4 py-2.5 text-xs"}`}>
      <svg width={small?11:13} height={small?11:13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
      {small ? "Detail" : "Detail Promo"}
    </div>
  );
}

// /* ─── Ticker ─── */
function Ticker() {
  const items = ["🔥 Samsung A55 — Diskon 30%","⚡ iPhone 15 Pro Flash Sale","🎁 TWS Bundle 2+1 Gratis","🆕 Xiaomi 14T Pro Pre-Order","📱 Galaxy Watch 7 Cashback 20%","💻 MacBook Air M3 Flash Sale","🎮 ROG Phone 8 Hot Deal","🚚 Gratis Ongkir Semua Promo"];
  return (
    <div className="overflow-hidden bg-[#072B50] py-4">
      <div className="promo-ticker-inner">
        {[...items,...items].map((x,i) => (
          <span key={i} className="text-[14px] font-semibold whitespace-nowrap px-8 text-white/90">
            {x}<span className="ml-8 text-white/30">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── Hero Card ─── */
function HeroCard({ p, onClick }) {
  const ref = useReveal();

  const statusColor =
    p.status === "aktif"
      ? "#10b981"
      : p.status === "segera"
      ? "#f59e0b"
      : "#ef4444";

  return (
    <div ref={ref} className="mb-6 reveal">
      <div
        onClick={onClick}
        className="promo-card flex flex-col md:flex-row bg-white rounded-2xl border border-[#e8edf4] overflow-hidden shadow-sm hover:shadow-xl cursor-pointer"
      >

        {/* IMAGE */}
        <div className="relative w-full md:w-[45%] shrink-0 overflow-hidden bg-[#f0f4f9] aspect-[16/10] md:aspect-auto md:min-h-[420px]">
          <img
            className="absolute inset-0 object-cover object-center w-full h-full promo-img"
            src={p.image}
            alt={p.title}
            onError={(e) => {
              e.currentTarget.src = "/fallback.jpg";
            }}
          />

          {/* overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(7,43,80,.55) 0%, transparent 60%)",
            }}
          />

          {/* STATUS */}
          <div className="absolute top-5 left-5">
            <span
              className="px-4 py-2 rounded-lg text-[12px] font-black uppercase tracking-wider"
              style={{
                background: "rgba(255,255,255,0.92)",
                color: statusColor,
                backdropFilter: "blur(8px)",
              }}
            >
              {p.status}
            </span>
          </div>
        </div>

        {/* CONTENT */}
        <div className="flex flex-col justify-between flex-1 p-7 md:p-10">

          <div>
            {/* subtitle */}
            <p className="text-[11px] font-bold text-[#8a9bb0] tracking-widest uppercase mb-3">
              Promo Terbaru
            </p>

            {/* title */}
            <h2 className="text-2xl md:text-[32px] font-black text-[#072B50] leading-tight tracking-tight mb-4">
              {p.title}
            </h2>

            {/* desc */}
            <p className="text-[14px] text-[#5a6880] leading-relaxed mb-7">
              {p.desc}
            </p>

            {/* DATE */}
            <div className="mb-7">
              <div className="flex items-center gap-2 mb-3">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{
                    background: statusColor,
                  }}
                />

                <span
                  className="text-[11px] font-bold tracking-widest uppercase"
                  style={{ color: statusColor }}
                >
                  Periode Promo
                </span>
              </div>

              <div className="text-[14px] font-semibold text-[#072B50]">
                {formatRange(p.startDate, p.endDate)}
              </div>
            </div>
          </div>

          {/* FOOTER */}
          <div>
            <div className="h-px bg-[#dde6f0] mb-6" />

            <div className="flex flex-wrap items-center justify-between gap-4">

              <div>
                <div className="text-[12px] text-[#9aa5b4] mb-1">
                  Status Promo
                </div>

                <div
                  className="text-[18px] font-black uppercase"
                  style={{ color: statusColor }}
                >
                  {p.status}
                </div>
              </div>

              <InfoBadge />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// SMALL CARD
function SmallCard({ p, delay = "", onClick }) {
  const ref = useReveal();

  const statusColor =
    p.status === "aktif"
      ? "#10b981"
      : p.status === "segera"
      ? "#f59e0b"
      : "#ef4444";

  return (
    <div ref={ref} className={`reveal ${delay}`}>
      <div
        onClick={onClick}
        className="promo-card flex flex-col bg-white rounded-2xl border border-[#e8edf4] overflow-hidden shadow-sm hover:shadow-xl h-full transition-all duration-300 cursor-pointer"
      >

        {/* IMAGE */}
        <div className="relative aspect-[16/8] overflow-hidden bg-[#f0f4f9] shrink-0">
          <img
            className="absolute inset-0 object-cover object-center w-full h-full promo-img"
            src={p.image}
            alt={p.title}
            onError={(e) => {
              e.currentTarget.src = "/fallback.jpg";
            }}
          />

          {/* overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to top,rgba(7,43,80,.65) 0%,transparent 55%)",
            }}
          />

          {/* STATUS */}
          <div className="absolute top-3 left-3">
            <span
              className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase"
              style={{
                background: "rgba(255,255,255,0.92)",
                color: statusColor,
                backdropFilter: "blur(6px)",
              }}
            >
              {p.status}
            </span>
          </div>
        </div>

        {/* CONTENT */}
        <div className="flex flex-col flex-1 p-5">

          {/* subtitle */}
          <p className="text-[10px] font-bold text-[#8a9bb0] tracking-wider uppercase mb-2">
            Promo Spesial
          </p>

          {/* title */}
          <h3 className="text-[16px] font-black text-[#072B50] tracking-tight leading-snug mb-3">
            {p.title}
          </h3>

          {/* desc */}
          <p className="text-[13px] text-[#6b7a8f] leading-relaxed mb-5 flex-1">
            {p.desc}
          </p>

          <div className="h-px bg-[#dde6f0] mb-4" />

          {/* footer */}
          <div className="flex items-center justify-between gap-3">

            <div>
              <p className="text-[11px] text-[#9aa5b4] mb-1">
                Berlaku:
              </p>

              <p className="text-[12px] font-semibold text-[#072B50]">
                {formatRange(p.startDate, p.endDate)}
              </p>
            </div>

            <InfoBadge small />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Banner Card ─── */
// function BannerCard({ b, delay="" }) {
//   const ref = useReveal();
//   const isRight = b.textAlign === "right";
//   return (
//     <div ref={ref} className={`reveal ${delay}`}>
//       <div className="relative overflow-hidden shadow-lg cursor-pointer banner-card rounded-2xl min-h-55">
//         <div className="absolute inset-0" style={{ background:b.bg }} />
//         <img src={b.image} alt={b.title}
//           className="absolute inset-0 object-cover w-full h-full transition-opacity duration-300 opacity-25 hover:opacity-35"
//           onError={e => { e.currentTarget.style.display="none"; }}
//         />
//         <div className="absolute inset-0 pointer-events-none"
//           style={{ background: isRight
//             ? "linear-gradient(to left,rgba(0,0,0,0.05) 0%,rgba(0,0,0,0.6) 100%)"
//             : "linear-gradient(to right,rgba(0,0,0,0.05) 0%,rgba(0,0,0,0.6) 100%)" }} />

      
//       </div>
//     </div>
//   );
// }

/* ─── MAIN PAGE ─── */

export default function PromoPage() {
  const [tab, setTab] = useState("Semua");
  const [promos, setPromos] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const headerRef = useReveal();

  useEffect(() => {
    const fetchPromos = async () => {
      try {
        setLoading(true);

        const data = await getPublicPromos();

        console.log("DATA DARI API:", data);

        const mapped = data.map((promo, index) => ({
          id: promo.id,
          title: promo.name,
          desc: promo.desc,

          image: promo.banner
            ? `http://127.0.0.1:8000/storage/${promo.banner}`
            : "/fallback.jpg",

          status: promo.status,
          startDate: promo.startDate,
          endDate: promo.endDate,

          hero: index === 0,

          product: promo.products?.[0] || null,
        }));

        console.log("MAPPED:", mapped);

        setPromos(mapped);

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPromos();
  }, []);
  
  /* ================= FILTER ================= */

  const filtered = promos.filter((p) => {
    const now = new Date();

    const start = new Date(p.startDate);
    const end = new Date(p.endDate);

    const diffToStart =
      (start.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
    
    console.log("TAB SEKARANG:", tab);

    const isActive = now >= start && now <= end;
    const isSoon = diffToStart <= 3 && diffToStart > 0;
    const isEnded = now > end;

    if (tab === "Semua") {
      console.log("MASUK SEMUA");
      return isActive || isSoon;
    }

    if (tab === "aktif") {
      console.log("MASUK AKTIF");
      return isActive;
    }

    if (tab === "segera") {
      console.log("MASUK SEGERA");
      return isSoon;
    }

    if (tab === "berakhir") {
      console.log("MASUK BERAKHIR");
      return isEnded;
    }

    return false;
  });


  const hero = filtered.find((p) => p.hero) || filtered[0];
  const smalls = filtered.filter((p) => p.id !== hero?.id);

  return (
    <div className="promo-root min-h-screen bg-[#f5f7fa]">

      {/* ── TICKER ── */}
      <Ticker />

      {/* ── PAGE HEADER ── */}
      <div
        ref={headerRef}
        className="relative px-5 py-12 overflow-hidden reveal md:px-12 md:py-16"
        style={{
          background:
            "linear-gradient(135deg, #061e38 0%, #0a2d52 50%, #0d3666 100%)",
        }}
      >
        {/* decorative blobs */}
        <div
          style={{
            position: "absolute",
            top: -80,
            right: -80,
            width: 320,
            height: 320,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(96,165,250,0.12) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "absolute",
            bottom: -60,
            left: "30%",
            width: 240,
            height: 240,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.045) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            pointerEvents: "none",
          }}
        />

        <div className="relative flex flex-col items-start justify-between gap-6 mx-auto sm:flex-row sm:items-end max-w-350">
          <div>
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4"
              style={{
                background: "rgba(96,165,250,0.15)",
                border: "1px solid rgba(96,165,250,0.3)",
              }}
            >
              <span style={{ fontSize: 14 }}>🔥</span>

              <span className="text-[11px] font-bold text-[#93c5fd] tracking-[2px] uppercase">
                Penawaran Terbatas
              </span>
            </div>

            <h1 className="text-[28px] md:text-[42px] font-black text-white tracking-tight leading-tight mb-3">
              Promo Terbaik{" "}
              <span
                style={{
                  background: "linear-gradient(90deg, #60a5fa, #a78bfa)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Bulan Ini
              </span>
            </h1>

            <p className="text-[13px] text-white/50 mb-0">
              {promos.length} promo tersedia
            </p>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="px-5 py-8 pb-16 mx-auto max-w-350 md:px-12">

        {/* Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {["Semua", "aktif", "segera"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`tab-btn px-4 py-2 rounded-full text-xs font-semibold border border-[#e0e8f2] bg-white text-[#6b7a8f] ${
                tab === t ? "tab-active" : ""
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Loading */}
        {loading && (
          <div className="py-20 text-center text-[#072B50] font-semibold">
            Loading promo...
          </div>
        )}

        {/* Hero */}
        {!loading && hero && (
          <div className="mb-6">
            <HeroCard p={hero} onClick={() => navigate(`/promo/${hero.id}`)} />
          </div>
        )}

        {/* Grid */}
        {/* {!loading && smalls.length > 0 && (
          <div className="grid grid-cols-1 gap-5 mb-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {smalls.map((promo) => (
              <SmallCard
                key={promo.id}
                promo={promo}
              />
            ))}
          </div>
        )} */}
        {!loading && smalls.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {smalls.map((promo, index) => (
              <SmallCard
                key={promo.id}
                p={promo}
                delay={`delay-${index * 100}`}
                onClick={() => navigate(`/promo/${promo.id}`)}
              />
            ))}
          </div>
        )}

        {/* Empty */}
        {!loading && filtered.length === 0 && (
          <div className="py-24 text-center">
            <p className="text-[15px] font-semibold text-[#072B50] mb-1">
              Tidak ada promo
            </p>

            <p className="text-[13px] text-[#9aa5b4]">
              Promo belum tersedia
            </p>
          </div>
        )}
      </div>
    </div>
  );
}