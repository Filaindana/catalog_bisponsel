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
    <div className="countdown-box flex flex-col items-center bg-[#f0f4f9] border border-[#dde6f0] rounded-lg px-3 py-2 min-w-[44px]">
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
    <div className="overflow-hidden bg-[#072B50] py-2.5">
      <div className="promo-ticker-inner">
        {[...items,...items].map((x,i) => (
          <span key={i} className="text-[11.5px] font-medium whitespace-nowrap px-7 text-white/75">
            {x}<span className="ml-7 text-white/18">◆</span>
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
    <div ref={ref} className="reveal mb-6">
      <div className="promo-card flex flex-col md:flex-row bg-white rounded-2xl border border-[#e8edf4] overflow-hidden shadow-sm hover:shadow-xl">
        {/* Gambar */}
        <div className="relative w-full md:w-[42%] shrink-0 overflow-hidden bg-[#f0f4f9] min-h-[240px] md:min-h-[380px]">
          <img
            className="promo-img w-full h-full object-cover absolute inset-0"
            src={p.image} alt={p.title}
            onError={e => { e.currentTarget.style.display="none"; }}
          />
          <div className="absolute inset-0 pointer-events-none" style={{ background:"linear-gradient(to right,transparent 60%,rgba(255,255,255,0.06) 100%)" }} />
          <div className="absolute top-5 left-5 bg-[#072B50] text-white text-[13px] font-black rounded-lg px-3.5 py-2">
            -{p.discount} OFF
          </div>
        </div>

        {/* Konten */}
        <div className="flex-1 flex flex-col justify-between p-7 md:p-10">
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
                <div className="w-[5px] h-[5px] rounded-full bg-[#e03131]" style={{ animation:"pulse 1.5s infinite" }} />
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
            <div className="flex items-end justify-between gap-4 flex-wrap">
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
        <div className="relative h-[175px] overflow-hidden bg-[#f0f4f9] shrink-0">
          <img
            className="promo-img w-full h-full object-cover absolute inset-0"
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
      <div className="banner-card relative rounded-2xl overflow-hidden min-h-[220px] cursor-pointer shadow-lg">
        <div className="absolute inset-0" style={{ background:b.bg }} />
        <img src={b.image} alt={b.title}
          className="absolute inset-0 w-full h-full object-cover opacity-25 transition-opacity duration-300 hover:opacity-35"
          onError={e => { e.currentTarget.style.display="none"; }}
        />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: isRight
            ? "linear-gradient(to left,rgba(0,0,0,0.05) 0%,rgba(0,0,0,0.6) 100%)"
            : "linear-gradient(to right,rgba(0,0,0,0.05) 0%,rgba(0,0,0,0.6) 100%)" }} />

        <div className={`relative z-10 flex flex-col justify-between p-8 md:p-9 min-h-[220px] ${isRight?"items-end text-right":"items-start text-left"}`}>
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 mb-4 border border-white/20 bg-white/10">
              <div className="w-1.5 h-1.5 rounded-full" style={{ background:b.accent }} />
              <span className="text-[9px] font-bold text-white/70 tracking-[2px] uppercase">{b.label}</span>
            </div>
            <h3 className="text-2xl md:text-[26px] font-black text-white tracking-tight leading-snug mb-2.5 whitespace-pre-line">{b.title}</h3>
            <p className="text-xs text-white/60 leading-relaxed max-w-[290px] mb-6" style={{ marginLeft:isRight?"auto":0 }}>{b.desc}</p>
          </div>
          <div className={`flex gap-3 flex-wrap ${isRight?"justify-end":"justify-start"}`}>
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white text-[#072B50] text-[13px] font-bold transition-all hover:-translate-y-0.5 hover:shadow-lg">
              {b.btnText}
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </button>
            <button className="px-5 py-2.5 rounded-lg text-[13px] font-semibold text-white/80 border border-white/30 bg-transparent hover:bg-white/10 hover:border-white transition-all">
              Pelajari Lebih
            </button>
          </div>
        </div>
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
      <div ref={headerRef} className="reveal bg-[#072B50] px-5 md:px-12 py-10 md:py-12">
        <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-5 h-0.5 rounded-full bg-white/35" />
              <span className="text-[10px] font-bold text-white/45 tracking-[2.5px] uppercase">Penawaran Terbatas</span>
            </div>
            <h1 className="text-2xl md:text-[34px] font-black text-white tracking-tight leading-tight mb-2">
              Promo Terbaik <span className="text-[#6aaff5]">Bulan Ini</span>
            </h1>
            <p className="text-[13px] text-white/45">{PROMOS.length} penawaran eksklusif · Stok sangat terbatas</p>
          </div>
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div className="max-w-[1400px] mx-auto px-5 md:px-12 py-8 pb-16">

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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-10">
            {smalls.map((p, i) => (
              <SmallCard key={p.id} p={p} delay={delays[i % delays.length]} />
            ))}
          </div>
        )}

        {/* ── BANNER SECTION ── */}
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-7">
            <div className="w-[5px] h-8 rounded-[3px] bg-[#072B50] shrink-0" />
            <span className="text-[22px] font-extrabold text-[#072B50] tracking-tight">Promo Spesial Hari Ini</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {BANNERS.map((b,i) => (
              <BannerCard key={b.id} b={b} delay={delays[i]} />
            ))}
          </div>
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="text-center py-24">
            <div className="text-6xl mb-4">🔍</div>
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