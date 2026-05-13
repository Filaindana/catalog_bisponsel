import { useState, useEffect, useRef } from "react";

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
function useCountdown(end) {
  const [t, setT] = useState({ h:"00", m:"00", s:"00" });
  useEffect(() => {
    const tick = () => {
      const d = Math.max(0, end - Date.now());
      setT({
        h: String(Math.floor(d / 3600000)).padStart(2,"0"),
        m: String(Math.floor((d % 3600000) / 60000)).padStart(2,"0"),
        s: String(Math.floor((d % 60000) / 1000)).padStart(2,"0"),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [end]);
  return t;
}

const PROMOS = [
  {
    id:1, tag:"HOT DEAL", tagBg:"#fff0f0", tagColor:"#e03131", discount:"30%",
    title:"Samsung Galaxy A55", subtitle:"5G · 256GB · 50MP Triple Camera",
    desc:"Super AMOLED 6.6\", baterai 5000mAh, desain premium kelas flagship. Stok terbatas!",
    originalPrice:"Rp 5.999.000", salePrice:"Rp 4.199.000", saving:"Hemat Rp 1.800.000",
    image:"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=700&q=80",
    accent:"#e03131", hero:true, endTime: Date.now() + 86400000*2 + 3600000*5,
  },
  {
    id:2, tag:"FLASH SALE", tagBg:"#fff4e6", tagColor:"#e67700", discount:"45%",
    title:"iPhone 15 Pro", subtitle:"256GB · Natural Titanium",
    desc:"Chip A17 Pro, kamera 48MP zoom 5×. Penawaran eksklusif hari ini saja.",
    originalPrice:"Rp 21.999.000", salePrice:"Rp 15.999.000", saving:"Terlaris Minggu Ini",
    image:"https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&q=80",
    accent:"#e67700",
  },
  {
    id:3, tag:"NEW ARRIVAL", tagBg:"#ebfbee", tagColor:"#2f9e44", discount:"Baru",
    title:"Xiaomi 14T Pro", subtitle:"12GB/512GB · Leica Camera",
    desc:"Kamera Leica profesional, Snapdragon 8s Gen 3, pengisian 120W super cepat.",
    originalPrice:"Rp 9.499.000", salePrice:"Rp 8.299.000", saving:"Free Buds + Case",
    image:"https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&q=80",
    accent:"#2f9e44",
  },
  {
    id:4, tag:"BUNDLE", tagBg:"#f3f0ff", tagColor:"#7048e8", discount:"2+1",
    title:"TWS Earbuds Pro", subtitle:"ANC · 40 Jam · IPX5",
    desc:"Active Noise Cancellation, latensi 40ms. Beli 2 gratis 1 langsung.",
    originalPrice:"Rp 1.299.000", salePrice:"Rp 899.000", saving:"Bundle Terbaik",
    image:"https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&q=80",
    accent:"#7048e8",
  },
  {
    id:5, tag:"CASHBACK", tagBg:"#fff0f6", tagColor:"#c2255c", discount:"20%",
    title:"Galaxy Watch 7", subtitle:"Always-On · GPS · 45mm",
    desc:"Kesehatan 24/7, ECG, deteksi crash. Cashback kartu BCA & Mandiri.",
    originalPrice:"Rp 6.799.000", salePrice:"Rp 5.299.000", saving:"Cashback s/d Rp 1,3jt",
    image:"https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&q=80",
    accent:"#c2255c",
  },
  {
    id:6, tag:"HOT DEAL", tagBg:"#fff0f0", tagColor:"#e03131", discount:"25%",
    title:"ASUS ROG Phone 8", subtitle:"Snapdragon 8 Gen 3 · 16GB · 165Hz",
    desc:"Layar 165Hz AMOLED, pendingin aktif, baterai 5500mAh. Gaming phone terkencang.",
    originalPrice:"Rp 14.999.000", salePrice:"Rp 11.199.000", saving:"Hemat Rp 3.800.000",
    image:"https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=500&q=80",
    accent:"#e03131",
  },
  {
    id:7, tag:"FLASH SALE", tagBg:"#fff4e6", tagColor:"#e67700", discount:"35%",
    title:"MacBook Air M3", subtitle:"13\" · 8GB · 256GB · Midnight",
    desc:"Chip M3 terbaru, layar Liquid Retina, baterai tahan 18 jam. Tipis & ringan.",
    originalPrice:"Rp 19.999.000", salePrice:"Rp 12.999.000", saving:"Terlaris Pekan Ini",
    image:"https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=80",
    accent:"#e67700",
  },
  {
    id:8, tag:"NEW ARRIVAL", tagBg:"#ebfbee", tagColor:"#2f9e44", discount:"Baru",
    title:"Sony WH-1000XM6", subtitle:"ANC · 40Jam · Hi-Res Audio",
    desc:"Noise cancelling terbaik di kelasnya. Suara jernih, nyaman seharian.",
    originalPrice:"Rp 5.499.000", salePrice:"Rp 4.799.000", saving:"Bonus Pouch Eksklusif",
    image:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
    accent:"#2f9e44",
  },
  {
    id:9, tag:"BUNDLE", tagBg:"#f3f0ff", tagColor:"#7048e8", discount:"Hemat 40%",
    title:"Gaming Setup Bundle", subtitle:"Monitor + Keyboard + Mouse",
    desc:"Paket lengkap gaming: monitor 144Hz + keyboard mekanikal + mouse RGB.",
    originalPrice:"Rp 8.999.000", salePrice:"Rp 5.399.000", saving:"Bundle Paling Laris",
    image:"https://images.unsplash.com/photo-1547082299-de196ea013d6?w=500&q=80",
    accent:"#7048e8",
  },
];

const TABS = ["Semua","Hot Deal","Flash Sale","Bundle","Cashback","New Arrival"];

const BANNERS = [
  {
    id:"b1", label:"THE PROFESSIONAL EDGE",
    title:"Professional\nWorkstation Bundle",
    desc:"Hemat hingga 30% saat membangun setup impian Anda. CPU performa tinggi & layar 4K tersedia.",
    btnText:"Konfigurasi Sekarang",
    bg:"linear-gradient(135deg, #1a1a2e 0%, #16213e 40%, #0f3460 100%)",
    image:"https://images.unsplash.com/photo-1593640408182-31c228f37e8e?w=700&q=80",
    textAlign:"left", accent:"#6aaff5",
  },
  {
    id:"b2", label:"ARTISTIC EXCELLENCE",
    title:"Creative Studio\nSeries",
    desc:"Wujudkan imajinasi Anda dengan hardware audio-visual khusus untuk para kreator.",
    btnText:"Jelajahi Seri",
    bg:"linear-gradient(135deg, #2d1b69 0%, #3d1a78 40%, #5b21b6 100%)",
    image:"https://images.unsplash.com/photo-1518770660439-4636190af475?w=700&q=80",
    textAlign:"right", accent:"#c084fc",
  },
];

/* ─── Digit countdown box ─── */
function Digit({ val, label }) {
  return (
    <div className="countdown-box flex flex-col items-center bg-[#f0f4f9] border border-[#dde6f0] rounded-lg px-3 py-2 min-w-11">
      <span className="text-xl font-black text-[#072B50] leading-none">{val}</span>
      <span className="text-[8px] font-semibold text-[#8a9bb0] tracking-widest uppercase mt-1">{label}</span>
    </div>
  );
}

/* ─── Info Badge ─── */
function InfoBadge({ small = false }) {
  return (
    <div className={`inline-flex items-center gap-1.5 bg-[#f0f4f9] border border-[#dde6f0] rounded-lg text-[#072B50] font-semibold whitespace-nowrap ${small ? "px-3 py-1.5 text-[11px]" : "px-4 py-2.5 text-xs"}`}>
      <svg width={small?11:13} height={small?11:13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
      {small ? "Info" : "Hubungi toko untuk info"}
    </div>
  );
}

/* ─── Ticker ─── */
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
function HeroCard({ p }) {
  const t   = useCountdown(p.endTime);
  const ref = useReveal();
  return (
    <div ref={ref} className="mb-6 reveal">
      <div className="promo-card flex flex-col md:flex-row bg-white rounded-2xl border border-[#e8edf4] overflow-hidden shadow-sm hover:shadow-xl">
        {/* Gambar */}
        <div className="relative w-full md:w-[42%] shrink-0 overflow-hidden bg-[#f0f4f9] min-h-60 md:min-h-95">
          <img
            className="absolute inset-0 object-cover w-full h-full promo-img"
            src={p.image} alt={p.title}
            onError={e => { e.currentTarget.style.display="none"; }}
          />
          <div className="absolute top-5 left-5 bg-[#072B50] text-white text-[13px] font-black rounded-lg px-3.5 py-2">
            -{p.discount} OFF
          </div>
        </div>

        {/* Konten */}
        <div className="flex flex-col justify-between flex-1 p-7 md:p-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase mb-6"
              style={{ background:p.tagBg, color:p.tagColor }}>
              🔥 {p.tag}
            </div>
            <p className="text-[11px] font-bold text-[#8a9bb0] tracking-widest uppercase mb-2.5">{p.subtitle}</p>
            <h2 className="text-2xl md:text-[30px] font-black text-[#072B50] leading-tight tracking-tight mb-4">{p.title}</h2>
            <p className="text-[13.5px] text-[#5a6880] leading-relaxed mb-7">{p.desc}</p>

            {/* Countdown */}
            <div className="mb-7">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1.25 h-1.25 rounded-full bg-[#e03131]" style={{ animation:"pulse 1.5s infinite" }} />
                <span className="text-[10px] font-bold text-[#e03131] tracking-widest uppercase">Berakhir Dalam</span>
              </div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <Digit val={t.h} label="Jam" />
                <span className="text-lg font-bold text-[#c8d6e8] mb-4">:</span>
                <Digit val={t.m} label="Menit" />
                <span className="text-lg font-bold text-[#c8d6e8] mb-4">:</span>
                <Digit val={t.s} label="Detik" />
              </div>
            </div>
          </div>

          <div>
            <div className="h-px bg-[#dde6f0] mb-6" />
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <div className="text-xs text-[#aab4c0] line-through mb-1.5">{p.originalPrice}</div>
                <div className="text-2xl md:text-[30px] font-black text-[#072B50] tracking-tight leading-none">{p.salePrice}</div>
                <div className="flex items-center gap-1.5 mt-2 text-[11px] font-bold" style={{ color:p.accent }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                  {p.saving}
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

/* ─── Small Card ─── */
function SmallCard({ p, delay = "" }) {
  const ref = useReveal();
  return (
    <div ref={ref} className={`reveal ${delay}`}>
      <div className="promo-card flex flex-col bg-white rounded-2xl border border-[#e8edf4] overflow-hidden shadow-sm hover:shadow-xl h-full">
        {/* Gambar */}
        <div className="relative h-43.75 overflow-hidden bg-[#f0f4f9] shrink-0">
          <img
            className="absolute inset-0 object-cover w-full h-full promo-img"
            src={p.image} alt={p.title}
            onError={e => { e.currentTarget.style.display="none"; }}
          />
          <div className="absolute inset-0 pointer-events-none" style={{ background:"linear-gradient(to top,rgba(7,43,80,.5) 0%,transparent 55%)" }} />
          <div className="absolute top-3.5 left-3.5 bg-[#072B50] text-white text-[11px] font-black rounded-md px-3 py-1.5">
            -{p.discount}
          </div>
          <div className="absolute bottom-3 left-3.5">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase"
              style={{ background:"rgba(255,255,255,0.92)", color:p.tagColor, backdropFilter:"blur(6px)" }}>
              {p.tag}
            </span>
          </div>
        </div>

        {/* Konten */}
        <div className="flex flex-col flex-1 p-5">
          <p className="text-[10px] font-bold text-[#8a9bb0] tracking-wider uppercase mb-1.5">{p.subtitle}</p>
          <h3 className="text-[15px] font-black text-[#072B50] tracking-tight leading-snug mb-2.5">{p.title}</h3>
          <p className="text-[12px] text-[#6b7a8f] leading-relaxed mb-4 flex-1">{p.desc}</p>

          <div className="h-px bg-[#dde6f0] mb-4" />

          <div className="flex items-end justify-between gap-3">
            <div>
              <div className="text-[11px] text-[#b0bcc8] line-through mb-1">{p.originalPrice}</div>
              <div className="text-[18px] font-black text-[#072B50] tracking-tight leading-none">{p.salePrice}</div>
              <div className="text-[10px] font-bold mt-1.5" style={{ color:p.accent }}>{p.saving}</div>
            </div>
            <InfoBadge small />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Banner Card ─── */
function BannerCard({ b, delay="" }) {
  const ref = useReveal();
  const isRight = b.textAlign === "right";
  return (
    <div ref={ref} className={`reveal ${delay}`}>
      <div className="relative overflow-hidden shadow-lg cursor-pointer banner-card rounded-2xl min-h-55">
        <div className="absolute inset-0" style={{ background:b.bg }} />
        <img src={b.image} alt={b.title}
          className="absolute inset-0 object-cover w-full h-full transition-opacity duration-300 opacity-25 hover:opacity-35"
          onError={e => { e.currentTarget.style.display="none"; }}
        />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: isRight
            ? "linear-gradient(to left,rgba(0,0,0,0.05) 0%,rgba(0,0,0,0.6) 100%)"
            : "linear-gradient(to right,rgba(0,0,0,0.05) 0%,rgba(0,0,0,0.6) 100%)" }} />

      
      </div>
    </div>
  );
}

/* ─── MAIN PAGE ─── */
export default function PromoPage() {
  const [tab, setTab] = useState("Semua");

  const filtered = PROMOS.filter(p => {
    if (tab === "Semua")       return true;
    if (tab === "Hot Deal")    return p.tag === "HOT DEAL";
    if (tab === "Flash Sale")  return p.tag === "FLASH SALE";
    if (tab === "Bundle")      return p.tag === "BUNDLE";
    if (tab === "Cashback")    return p.tag === "CASHBACK";
    if (tab === "New Arrival") return p.tag === "NEW ARRIVAL";
    return true;
  });

  const hero   = filtered.find(p => p.hero) || filtered[0];
  const smalls = filtered.filter(p => p.id !== hero?.id);
  const delays = ["reveal-d1","reveal-d2","reveal-d3","reveal-d4","reveal-d5","reveal-d6"];

  const headerRef = useReveal();

  return (
    <div className="promo-root min-h-screen bg-[#f5f7fa]">

      {/* ── TICKER ── */}
      <Ticker />

      {/* ── PAGE HEADER ── */}
      <div ref={headerRef} className="reveal relative overflow-hidden px-5 md:px-12 py-12 md:py-16"
        style={{ background: "linear-gradient(135deg, #061e38 0%, #0a2d52 50%, #0d3666 100%)" }}>

        {/* decorative blobs */}
        <div style={{ position:"absolute", top:-80, right:-80, width:320, height:320, borderRadius:"50%", background:"radial-gradient(circle, rgba(96,165,250,0.12) 0%, transparent 70%)", pointerEvents:"none" }} />
        <div style={{ position:"absolute", bottom:-60, left:"30%", width:240, height:240, borderRadius:"50%", background:"radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)", pointerEvents:"none" }} />

        {/* dot grid */}
        <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(rgba(255,255,255,0.045) 1px, transparent 1px)", backgroundSize:"28px 28px", pointerEvents:"none" }} />

        <div className="relative flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mx-auto max-w-350">
          <div>
            {/* badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4"
              style={{ background:"rgba(96,165,250,0.15)", border:"1px solid rgba(96,165,250,0.3)" }}>
              <span style={{ fontSize:14 }}>🔥</span>
              <span className="text-[11px] font-bold text-[#93c5fd] tracking-[2px] uppercase">Penawaran Terbatas</span>
            </div>

            <h1 className="text-[28px] md:text-[42px] font-black text-white tracking-tight leading-tight mb-3">
              Promo Terbaik{" "}
              <span style={{ background:"linear-gradient(90deg, #60a5fa, #a78bfa)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
                Bulan Ini
              </span>
            </h1>

            <p className="text-[13px] text-white/50 mb-0">
              {PROMOS.length} penawaran eksklusif &nbsp;·&nbsp; Stok sangat terbatas
            </p>
          </div>

          {/* stats pills */}
          <div className="flex gap-3 shrink-0">
            <div className="flex flex-col items-center px-5 py-3 rounded-2xl"
              style={{ background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)" }}>
              <span className="text-[22px] font-black text-white leading-none">{PROMOS.length}</span>
              <span className="text-[10px] text-white/45 font-medium mt-1">Promo Aktif</span>
            </div>
            <div className="flex flex-col items-center px-5 py-3 rounded-2xl"
              style={{ background:"rgba(96,165,250,0.12)", border:"1px solid rgba(96,165,250,0.25)" }}>
              <span className="text-[22px] font-black text-[#93c5fd] leading-none">
                {Math.max(...PROMOS.map(p => parseInt(p.discount) || 0))}%
              </span>
              <span className="text-[10px] text-white/45 font-medium mt-1">Maks. Diskon</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div className="px-5 py-8 pb-16 mx-auto max-w-350 md:px-12">

        {/* Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {TABS.map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`tab-btn px-4 py-2 rounded-full text-xs font-semibold border border-[#e0e8f2] bg-white text-[#6b7a8f] ${tab===t?"tab-active":""}`}
            >
              {t}
            </button>
          ))}
          <div className="ml-auto flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500" style={{ animation:"pulse 2s infinite" }} />
            <span className="text-[11px] text-[#6b7a8f] font-medium">{filtered.length} promo ditemukan</span>
          </div>
        </div>

        {/* Hero card */}
        {hero && <HeroCard p={hero} />}

        {/* Small cards grid */}
        {smalls.length > 0 && (
          <div className="grid grid-cols-1 gap-5 mb-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {smalls.map((p, i) => (
              <SmallCard key={p.id} p={p} delay={delays[i % delays.length]} />
            ))}
          </div>
        )}

      

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="py-24 text-center">
            <div className="mb-4 text-6xl">🔍</div>
            <p className="text-[15px] font-semibold text-[#072B50] mb-1">Tidak ada promo untuk kategori ini</p>
            <p className="text-[13px] text-[#9aa5b4]">Coba pilih kategori lain atau kembali ke Semua</p>
          </div>
        )}

        {/* Info note */}
        <div className="flex items-start gap-3.5 bg-white rounded-xl border border-[#dde6f0] px-6 py-4">
          <svg className="shrink-0 mt-0.5" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#072B50" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          <p className="text-[12.5px] text-[#5a6880] leading-relaxed m-0">
            <strong className="text-[#072B50]">Catatan:</strong> Semua harga dan promo bersifat informatif. Untuk informasi lebih lanjut, silakan kunjungi toko kami atau hubungi tim kami langsung.
          </p>
        </div>

      </div>
    </div>
  );
}