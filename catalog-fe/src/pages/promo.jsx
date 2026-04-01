import { useState, useEffect } from "react";

if (typeof document !== "undefined" && !document.querySelector("[data-font-promo]")) {
  const s = document.createElement("style");
  s.setAttribute("data-font-promo", "true");
  s.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Inter', sans-serif; background: #f5f7fa; }

    @keyframes fadeUp   { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
    @keyframes fadeIn   { from{opacity:0} to{opacity:1} }
    @keyframes ticker   { from{transform:translateX(0)} to{transform:translateX(-50%)} }
    @keyframes pulse    { 0%,100%{opacity:1} 50%{opacity:.4} }
    @keyframes shimmer  { from{background-position:-600px 0} to{background-position:600px 0} }
    @keyframes float    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }

    .card-enter { animation: fadeUp .45s ease both; }
    .card-enter:nth-child(1){animation-delay:.06s}
    .card-enter:nth-child(2){animation-delay:.12s}
    .card-enter:nth-child(3){animation-delay:.18s}
    .card-enter:nth-child(4){animation-delay:.24s}

    .p-card {
      background:#fff; border-radius:18px; border:1px solid #e8edf4; overflow:hidden;
      cursor:default; transition: transform .28s cubic-bezier(.34,1.3,.64,1), box-shadow .28s ease;
      box-shadow: 0 2px 12px rgba(7,43,80,.06); font-family:'Inter',sans-serif;
    }
    .p-card:hover { transform: translateY(-5px); box-shadow: 0 20px 48px rgba(7,43,80,.14); }
    .p-card:hover .p-img { transform: scale(1.06); }
    .p-img { transition: transform .6s cubic-bezier(.25,.46,.45,.94); }

    .tab-pill {
      padding: 7px 18px; border-radius: 30px; font-size: 12px; font-weight: 600;
      border: 1.5px solid #e0e8f2; background: #fff; color: #6b7a8f; cursor: pointer;
      font-family: 'Inter', sans-serif; transition: all .18s;
    }
    .tab-pill:hover { border-color:#a8b8cc; color:#072B50; }
    .tab-pill.active { background: #072B50; color: #fff; border-color: #072B50; }

    .wish-btn {
      width:32px; height:32px; border-radius:50%; background:#fff; border:1.5px solid #e0e8f2;
      cursor:pointer; display:flex; align-items:center; justify-content:center;
      transition: border-color .18s, transform .2s; flex-shrink:0;
    }
    .wish-btn:hover { border-color:#ff4d6d; transform:scale(1.1); }

    .ticker-wrap { overflow:hidden; background:#072B50; }
    .ticker-inner { display:flex; width:max-content; animation:ticker 28s linear infinite; }
    .ticker-inner:hover { animation-play-state:paused; }

    .countdown-box {
      display:flex; flex-direction:column; align-items:center;
      background:#f0f4f9; border:1px solid #dde6f0; border-radius:8px; padding:6px 10px; min-width:40px;
    }

    .badge-tag {
      display:inline-flex; align-items:center; gap:4px; padding:3px 9px;
      border-radius:30px; font-size:10px; font-weight:700; letter-spacing:.8px;
      text-transform:uppercase; font-family:'Inter',sans-serif;
    }

    /* Banner CTA button */
    .banner-btn {
      display:inline-flex; align-items:center; gap:8px;
      padding:12px 24px; border-radius:10px; font-size:13px; font-weight:700;
      font-family:'Inter',sans-serif; cursor:pointer; border:none;
      transition: transform .2s, box-shadow .2s;
    }
    .banner-btn:hover { transform:translateY(-2px); box-shadow:0 8px 24px rgba(0,0,0,0.25); }
    .banner-btn-primary { background:#fff; color:#072B50; }
    .banner-btn-outline { background:transparent; color:#fff; border:1.5px solid rgba(255,255,255,0.5); }
    .banner-btn-outline:hover { background:rgba(255,255,255,0.1); border-color:#fff; }

    /* Responsive */
    @media(max-width:900px) {
      .hero-inner { flex-direction:column!important; }
      .hero-img    { width:100%!important; height:220px!important; min-height:unset!important; }
      .cards-grid  { grid-template-columns: repeat(2,1fr)!important; }
      .banner-grid { grid-template-columns: 1fr!important; }
      .page-wrap   { padding:16px!important; }
      .page-header { padding:28px 16px 24px!important; }
      .header-stats{ display:none!important; }
      .hero-content{ padding:24px!important; }
      .hero-title  { font-size:22px!important; }
      .hero-price  { font-size:22px!important; }
      .banner-content { padding:32px 24px!important; }
      .banner-title{ font-size:24px!important; }
    }
    @media(max-width:560px) {
      .cards-grid  { grid-template-columns:1fr!important; }
      .hero-countdown { flex-wrap:wrap; gap:8px!important; }
    }
  `;
  document.head.appendChild(s);
}

const NAVY       = "#072B50";
const NAVY_FAINT = "#f0f4f9";
const NAVY_BORDER= "#dde6f0";

const PROMOS = [
  {
    id:1, tag:"HOT DEAL", tagBg:"#fff0f0", tagColor:"#e03131", discount:"30%",
    title:"Samsung Galaxy A55", subtitle:"5G · 256GB · 50MP Triple Camera",
    desc:"Super AMOLED 6.6\", baterai 5000mAh, desain premium kelas flagship. Stok terbatas!",
    originalPrice:"Rp 5.999.000", salePrice:"Rp 4.199.000", saving:"Hemat Rp 1.800.000",
    image:"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&q=80",
    accent:"#e03131", hero:true, endTime: Date.now() + 86400000*2 + 3600000*5
  },
  {
    id:2, tag:"FLASH SALE", tagBg:"#fff4e6", tagColor:"#e67700", discount:"45%",
    title:"iPhone 15 Pro", subtitle:"256GB · Natural Titanium",
    desc:"Chip A17 Pro, kamera 48MP zoom 5×. Penawaran hari ini saja.",
    originalPrice:"Rp 21.999.000", salePrice:"Rp 15.999.000", saving:"Terlaris Minggu Ini",
    image:"https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&q=80",
    accent:"#e67700"
  },
  {
    id:3, tag:"NEW ARRIVAL", tagBg:"#ebfbee", tagColor:"#2f9e44", discount:"Baru",
    title:"Xiaomi 14T Pro", subtitle:"12GB/512GB · Leica Camera",
    desc:"Kamera Leica profesional, Snapdragon 8s Gen 3, pengisian 120W.",
    originalPrice:"Rp 9.499.000", salePrice:"Rp 8.299.000", saving:"Free Buds + Case",
    image:"https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&q=80",
    accent:"#2f9e44"
  },
  {
    id:4, tag:"BUNDLE", tagBg:"#f3f0ff", tagColor:"#7048e8", discount:"2+1",
    title:"TWS Earbuds Pro", subtitle:"ANC · 40 Jam · IPX5",
    desc:"Active Noise Cancellation, latensi 40ms. Beli 2 gratis 1.",
    originalPrice:"Rp 1.299.000", salePrice:"Rp 899.000", saving:"Bundle Terbaik",
    image:"https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&q=80",
    accent:"#7048e8"
  },
  {
    id:5, tag:"CASHBACK", tagBg:"#fff0f6", tagColor:"#c2255c", discount:"20%",
    title:"Galaxy Watch 7", subtitle:"Always-On · GPS · 45mm",
    desc:"Kesehatan 24/7, ECG, deteksi crash. Cashback kartu BCA & Mandiri.",
    originalPrice:"Rp 6.799.000", salePrice:"Rp 5.299.000", saving:"Cashback s/d Rp 1,3jt",
    image:"https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&q=80",
    accent:"#c2255c"
  },
];

const BANNERS = [
  {
    id:"b1",
    label:"THE PROFESSIONAL EDGE",
    title:"Professional\nWorkstation Bundle",
    desc:"Save up to 30% when you build your dream setup. High-performance CPUs and 4K displays included.",
    btnText:"Configure Now",
    bg:"linear-gradient(135deg, #1a1a2e 0%, #16213e 40%, #0f3460 100%)",
    image:"https://images.unsplash.com/photo-1593640408182-31c228f37e8e?w=700&q=80",
    textAlign:"left",
    accent:"#6aaff5",
  },
  {
    id:"b2",
    label:"ARTISTIC EXCELLENCE",
    title:"Creative Studio\nSeries",
    desc:"Unleash your imagination with specialized audio and visual hardware designed for creators.",
    btnText:"Explore Series",
    bg:"linear-gradient(135deg, #2d1b69 0%, #3d1a78 40%, #5b21b6 100%)",
    image:"https://images.unsplash.com/photo-1518770660439-4636190af475?w=700&q=80",
    textAlign:"right",
    accent:"#c084fc",
  },
];

const TABS = ["Semua","Hot Deal","Flash Sale","Bundle","Cashback","New Arrival"];

/* ── hooks & sub-components ── */
function useCountdown(end) {
  const [t, setT] = useState({ h:"00", m:"00", s:"00" });
  useEffect(() => {
    const tick = () => {
      const d = Math.max(0, end - Date.now());
      setT({
        h: String(Math.floor(d/3600000)).padStart(2,"0"),
        m: String(Math.floor((d%3600000)/60000)).padStart(2,"0"),
        s: String(Math.floor((d%60000)/1000)).padStart(2,"0"),
      });
    };
    tick(); const id = setInterval(tick,1000); return () => clearInterval(id);
  }, [end]);
  return t;
}

function WishBtn({ id }) {
  const [on, setOn] = useState(false);
  return (
    <button className="wish-btn" onClick={(e) => { e.stopPropagation(); setOn(v=>!v); }}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill={on?"#ff4d6d":"none"} stroke={on?"#ff4d6d":"#9aa5b4"} strokeWidth="2">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    </button>
  );
}

function Digit({ val, label }) {
  return (
    <div className="countdown-box">
      <span style={{ fontSize:"18px", fontWeight:800, color:NAVY, lineHeight:1, fontFamily:"'Inter',sans-serif" }}>{val}</span>
      <span style={{ fontSize:"8px", color:"#8a9bb0", fontWeight:600, letterSpacing:"1px", textTransform:"uppercase", marginTop:"2px", fontFamily:"'Inter',sans-serif" }}>{label}</span>
    </div>
  );
}

function InfoBadge({ small }) {
  return (
    <div style={{ display:"inline-flex", alignItems:"center", gap:"6px", background:NAVY_FAINT, border:`1px solid ${NAVY_BORDER}`, borderRadius:"9px", padding: small ? "6px 11px" : "10px 18px" }}>
      <svg width={small?11:13} height={small?11:13} viewBox="0 0 24 24" fill="none" stroke={NAVY} strokeWidth="2.2">
        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
      <span style={{ fontSize: small?"11px":"12px", fontWeight:600, color:NAVY, whiteSpace:"nowrap", fontFamily:"'Inter',sans-serif" }}>
        {small ? "Info" : "Hubungi toko untuk info"}
      </span>
    </div>
  );
}

/* ── Hero Card ── */
function HeroCard({ p }) {
  const t = useCountdown(p.endTime);
  return (
    <div className="p-card card-enter hero-inner" style={{ display:"flex" }}>
      {/* Image */}
      <div className="hero-img" style={{ width:"40%", flexShrink:0, position:"relative", overflow:"hidden", background:NAVY_FAINT, minHeight:"360px" }}>
        <img className="p-img" src={p.image} alt={p.title}
          style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}
          onError={(e)=>{ e.currentTarget.style.display="none"; }}
        />
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(to right, transparent 60%, rgba(255,255,255,0.08) 100%)", pointerEvents:"none" }} />
        <div style={{ position:"absolute", top:"16px", left:"16px", background:NAVY, color:"#fff", borderRadius:"8px", padding:"6px 12px", fontSize:"13px", fontWeight:800, fontFamily:"'Inter',sans-serif" }}>
          -{p.discount} OFF
        </div>
      </div>

      {/* Content */}
      <div className="hero-content" style={{ flex:1, padding:"36px", display:"flex", flexDirection:"column", justifyContent:"space-between" }}>
        <div>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"20px" }}>
            <span className="badge-tag" style={{ background:p.tagBg, color:p.tagColor }}>🔥 {p.tag}</span>
            <WishBtn id={p.id} />
          </div>
          <p style={{ fontSize:"11px", fontWeight:700, color:"#8a9bb0", letterSpacing:"1.2px", textTransform:"uppercase", marginBottom:"8px", fontFamily:"'Inter',sans-serif" }}>{p.subtitle}</p>
          <h2 className="hero-title" style={{ fontSize:"28px", fontWeight:900, color:NAVY, letterSpacing:"-0.5px", lineHeight:1.15, marginBottom:"12px", fontFamily:"'Inter',sans-serif" }}>{p.title}</h2>
          <p style={{ fontSize:"13px", color:"#5a6880", lineHeight:1.75, marginBottom:"24px", fontFamily:"'Inter',sans-serif" }}>{p.desc}</p>

          {/* Countdown */}
          <div style={{ marginBottom:"24px" }}>
            <div style={{ display:"flex", alignItems:"center", gap:"6px", marginBottom:"10px" }}>
              <div style={{ width:"5px", height:"5px", borderRadius:"50%", background:"#e03131", animation:"pulse 1.5s infinite" }} />
              <span style={{ fontSize:"10px", fontWeight:700, color:"#e03131", letterSpacing:"1.2px", textTransform:"uppercase", fontFamily:"'Inter',sans-serif" }}>Berakhir Dalam</span>
            </div>
            <div className="hero-countdown" style={{ display:"flex", gap:"8px", alignItems:"center" }}>
              <Digit val={t.h} label="Jam" />
              <span style={{ fontSize:"18px", fontWeight:700, color:"#c8d6e8", marginBottom:"14px" }}>:</span>
              <Digit val={t.m} label="Menit" />
              <span style={{ fontSize:"18px", fontWeight:700, color:"#c8d6e8", marginBottom:"14px" }}>:</span>
              <Digit val={t.s} label="Detik" />
            </div>
          </div>
        </div>

        <div>
          <div style={{ height:"1px", background:NAVY_BORDER, marginBottom:"20px" }} />
          <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", gap:"12px", flexWrap:"wrap" }}>
            <div>
              <div style={{ fontSize:"12px", color:"#aab4c0", textDecoration:"line-through", marginBottom:"4px", fontFamily:"'Inter',sans-serif" }}>{p.originalPrice}</div>
              <div className="hero-price" style={{ fontSize:"28px", fontWeight:900, color:NAVY, letterSpacing:"-0.5px", lineHeight:1, fontFamily:"'Inter',sans-serif" }}>{p.salePrice}</div>
              <div style={{ fontSize:"11px", color:p.accent, fontWeight:700, marginTop:"6px", display:"flex", alignItems:"center", gap:"4px", fontFamily:"'Inter',sans-serif" }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                {p.saving}
              </div>
            </div>
            <InfoBadge small={false} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Small Card ── */
function SmallCard({ p }) {
  return (
    <div className="p-card card-enter" style={{ display:"flex", flexDirection:"column" }}>
      <div style={{ position:"relative", height:"165px", overflow:"hidden", background:NAVY_FAINT, flexShrink:0 }}>
        <img className="p-img" src={p.image} alt={p.title}
          style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}
          onError={(e)=>{ e.currentTarget.style.display="none"; }}
        />
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(7,43,80,.5) 0%, transparent 55%)", pointerEvents:"none" }} />
        <div style={{ position:"absolute", top:"12px", left:"12px", background:NAVY, color:"#fff", borderRadius:"6px", padding:"4px 9px", fontSize:"11px", fontWeight:800, fontFamily:"'Inter',sans-serif" }}>
          -{p.discount}
        </div>
        <div style={{ position:"absolute", top:"10px", right:"10px" }}><WishBtn id={p.id} /></div>
        <div style={{ position:"absolute", bottom:"10px", left:"12px" }}>
          <span className="badge-tag" style={{ background:"rgba(255,255,255,0.92)", color:p.tagColor, backdropFilter:"blur(6px)" }}>{p.tag}</span>
        </div>
      </div>
      <div style={{ padding:"16px 18px 20px", display:"flex", flexDirection:"column", flex:1, fontFamily:"'Inter',sans-serif" }}>
        <p style={{ fontSize:"10px", fontWeight:700, color:"#8a9bb0", letterSpacing:"1px", textTransform:"uppercase", marginBottom:"5px" }}>{p.subtitle}</p>
        <h3 style={{ fontSize:"15px", fontWeight:800, color:NAVY, letterSpacing:"-0.3px", lineHeight:1.25, marginBottom:"8px" }}>{p.title}</h3>
        <p style={{ fontSize:"11.5px", color:"#6b7a8f", lineHeight:1.65, marginBottom:"14px", flex:1 }}>{p.desc}</p>
        <div style={{ height:"1px", background:NAVY_BORDER, marginBottom:"14px" }} />
        <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", gap:"8px" }}>
          <div>
            <div style={{ fontSize:"11px", color:"#b0bcc8", textDecoration:"line-through", marginBottom:"2px" }}>{p.originalPrice}</div>
            <div style={{ fontSize:"18px", fontWeight:900, color:NAVY, letterSpacing:"-0.3px", lineHeight:1 }}>{p.salePrice}</div>
            <div style={{ fontSize:"10px", color:p.accent, fontWeight:700, marginTop:"4px" }}>{p.saving}</div>
          </div>
          <InfoBadge small={true} />
        </div>
      </div>
    </div>
  );
}

/* ── Banner Section (bawah small cards) ── */
function BannerSection() {
  return (
    <div style={{ marginTop:"28px" }}>
      {/* Label */}
      <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"16px" }}>
        <div style={{ width:"3px", height:"18px", borderRadius:"3px", background:NAVY }} />
        <span style={{ fontSize:"13px", fontWeight:700, color:NAVY, fontFamily:"'Inter',sans-serif" }}>Koleksi Unggulan</span>
        <div style={{ flex:1, height:"1px", background:NAVY_BORDER }} />
      </div>

      <div className="banner-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"16px" }}>
        {BANNERS.map((b) => (
          <BannerCard key={b.id} b={b} />
        ))}
      </div>
    </div>
  );
}

function BannerCard({ b }) {
  const [hovered, setHovered] = useState(false);
  const isRight = b.textAlign === "right";
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius:"18px", overflow:"hidden", position:"relative", minHeight:"200px",
        background:b.bg, cursor:"pointer",
        boxShadow: hovered ? "0 24px 56px rgba(7,43,80,0.22)" : "0 4px 20px rgba(7,43,80,0.1)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        transition:"transform .3s cubic-bezier(.34,1.3,.64,1), box-shadow .3s ease",
      }}
    >
      {/* Background image */}
      <img
        src={b.image}
        alt={b.title}
        style={{
          position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover",
          opacity: hovered ? 0.35 : 0.25,
          transition:"opacity .4s ease",
        }}
        onError={(e)=>{ e.currentTarget.style.display="none"; }}
      />

      {/* Overlay gradient */}
      <div style={{
        position:"absolute", inset:0,
        background: isRight
          ? "linear-gradient(to left, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.55) 100%)"
          : "linear-gradient(to right, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.55) 100%)",
        pointerEvents:"none",
      }} />

      {/* Decorative circle */}
      <div style={{
        position:"absolute",
        right: isRight ? "unset" : "-40px",
        left: isRight ? "-40px" : "unset",
        top:"-40px",
        width:"200px", height:"200px", borderRadius:"50%",
        background:"rgba(255,255,255,0.04)",
        pointerEvents:"none",
      }} />

      {/* Content */}
      <div
        className="banner-content"
        style={{
          position:"relative", zIndex:2,
          padding:"32px 36px",
          display:"flex", flexDirection:"column",
          alignItems: isRight ? "flex-end" : "flex-start",
          textAlign: b.textAlign,
          minHeight:"200px", justifyContent:"space-between",
        }}
      >
        <div>
          {/* Label */}
          <div style={{
            display:"inline-flex", alignItems:"center", gap:"6px",
            background:"rgba(255,255,255,0.1)", border:"1px solid rgba(255,255,255,0.2)",
            borderRadius:"30px", padding:"4px 12px", marginBottom:"14px",
          }}>
            <div style={{ width:"5px", height:"5px", borderRadius:"50%", background:b.accent }} />
            <span style={{ fontSize:"9px", fontWeight:700, color:"rgba(255,255,255,0.7)", letterSpacing:"2px", textTransform:"uppercase", fontFamily:"'Inter',sans-serif" }}>
              {b.label}
            </span>
          </div>

          {/* Title */}
          <h3 className="banner-title" style={{
            fontSize:"26px", fontWeight:900, color:"#fff",
            letterSpacing:"-0.5px", lineHeight:1.2, marginBottom:"10px",
            fontFamily:"'Inter',sans-serif",
            whiteSpace:"pre-line",
          }}>
            {b.title}
          </h3>

          {/* Desc */}
          <p style={{
            fontSize:"12px", color:"rgba(255,255,255,0.65)", lineHeight:1.7,
            maxWidth:"300px", marginBottom:"22px", fontFamily:"'Inter',sans-serif",
            marginLeft: isRight ? "auto" : "0",
          }}>
            {b.desc}
          </p>
        </div>

        {/* Buttons */}
        <div style={{ display:"flex", gap:"10px", flexWrap:"wrap", justifyContent: isRight ? "flex-end" : "flex-start" }}>
          <button className="banner-btn banner-btn-primary">
            {b.btnText}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </button>
          <button className="banner-btn banner-btn-outline">
            Pelajari Lebih
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Ticker ── */
function Ticker() {
  const items = ["🔥 Samsung A55 — Diskon 30%","⚡ iPhone 15 Pro Flash Sale","🎁 TWS Bundle 2+1 Gratis","🆕 Xiaomi 14T Pro Pre-Order","📱 Galaxy Watch 7 Cashback 20%","🚚 Gratis Ongkir Semua Promo"];
  const doubled = [...items, ...items];
  return (
    <div className="ticker-wrap" style={{ padding:"9px 0" }}>
      <div className="ticker-inner">
        {doubled.map((item,i) => (
          <span key={i} style={{ color:"rgba(255,255,255,0.75)", fontSize:"11.5px", fontWeight:500, whiteSpace:"nowrap", padding:"0 28px", fontFamily:"'Inter',sans-serif" }}>
            {item}<span style={{ marginLeft:"28px", color:"rgba(255,255,255,0.18)" }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── Main Page ── */
export default function PromoPage() {
  const [tab, setTab] = useState("Semua");

  const filtered = PROMOS.filter(p => {
    if (tab==="Semua")       return true;
    if (tab==="Hot Deal")    return p.tag==="HOT DEAL";
    if (tab==="Flash Sale")  return p.tag==="FLASH SALE";
    if (tab==="Bundle")      return p.tag==="BUNDLE";
    if (tab==="Cashback")    return p.tag==="CASHBACK";
    if (tab==="New Arrival") return p.tag==="NEW ARRIVAL";
    return true;
  });

  const hero   = filtered.find(p=>p.hero) || filtered[0];
  const smalls = filtered.filter(p=>p.id!==hero?.id);

  return (
    <div style={{ background:"#f5f7fa", minHeight:"100vh", fontFamily:"'Inter', sans-serif" }}>
      <Ticker />

      {/* PAGE HEADER */}
      <div className="page-header" style={{ background:NAVY, padding:"40px 40px 32px", animation:"fadeIn .5s ease both" }}>
        <div style={{ maxWidth:"1400px", margin:"0 auto", display:"flex", alignItems:"flex-end", justifyContent:"space-between", flexWrap:"wrap", gap:"16px" }}>
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"10px" }}>
              <div style={{ width:"20px", height:"2px", borderRadius:"2px", background:"rgba(255,255,255,0.35)" }} />
              <span style={{ fontSize:"10px", color:"rgba(255,255,255,0.45)", fontWeight:700, letterSpacing:"2.5px", textTransform:"uppercase", fontFamily:"'Inter',sans-serif" }}>Penawaran Terbatas</span>
            </div>
            <h1 style={{ fontSize:"32px", fontWeight:900, color:"#fff", letterSpacing:"-0.6px", lineHeight:1.1, marginBottom:"8px", fontFamily:"'Inter',sans-serif" }}>
              Promo Terbaik <span style={{ color:"#6aaff5" }}>Bulan Ini</span>
            </h1>
            <p style={{ fontSize:"13px", color:"rgba(255,255,255,0.45)", fontFamily:"'Inter',sans-serif" }}>{PROMOS.length} penawaran eksklusif · Stok sangat terbatas</p>
          </div>
          <div className="header-stats" style={{ display:"flex", gap:"32px" }}>
            {[["5+","Promo Aktif"],["45%","Diskon Maks"],["6","Brand"]].map(([val,lbl])=>(
              <div key={lbl} style={{ textAlign:"center" }}>
                <div style={{ fontSize:"24px", fontWeight:900, color:"#fff", letterSpacing:"-0.4px", fontFamily:"'Inter',sans-serif" }}>{val}</div>
                <div style={{ fontSize:"10px", color:"rgba(255,255,255,0.4)", fontWeight:600, letterSpacing:"0.8px", textTransform:"uppercase", fontFamily:"'Inter',sans-serif" }}>{lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="page-wrap" style={{ maxWidth:"1400px", margin:"0 auto", padding:"28px 40px 52px" }}>

        {/* Tabs */}
        <div style={{ display:"flex", gap:"6px", marginBottom:"24px", flexWrap:"wrap", alignItems:"center", animation:"fadeIn .5s ease .1s both" }}>
          {TABS.map(t=>(
            <button key={t} className={`tab-pill${tab===t?" active":""}`} onClick={()=>setTab(t)}>{t}</button>
          ))}
          <div style={{ marginLeft:"auto", display:"flex", alignItems:"center", gap:"6px" }}>
            <div style={{ width:"6px", height:"6px", borderRadius:"50%", background:"#2f9e44", animation:"pulse 2s infinite" }} />
            <span style={{ fontSize:"11px", color:"#6b7a8f", fontWeight:500, fontFamily:"'Inter',sans-serif" }}>{filtered.length} promo ditemukan</span>
          </div>
        </div>

        {/* Hero card */}
        {hero && <div style={{ marginBottom:"16px" }}><HeroCard p={hero} /></div>}

        {/* Small cards grid */}
        {smalls.length > 0 && (
          <div className="cards-grid" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"14px" }}>
            {smalls.map(p => <SmallCard key={p.id} p={p} />)}
          </div>
        )}

        {/* ── Banner Section ── */}
        <BannerSection />

        {/* Empty state */}
        {filtered.length === 0 && (
          <div style={{ textAlign:"center", padding:"80px 20px", color:"#9aa5b4" }}>
            <div style={{ fontSize:"40px", marginBottom:"12px" }}>🔍</div>
            <p style={{ fontSize:"15px", fontWeight:600, color:NAVY, marginBottom:"6px", fontFamily:"'Inter',sans-serif" }}>Tidak ada promo untuk kategori ini</p>
            <p style={{ fontSize:"13px", fontFamily:"'Inter',sans-serif" }}>Coba pilih kategori lain atau kembali ke Semua</p>
          </div>
        )}

        {/* Info note */}
        <div style={{ marginTop:"28px", background:"#fff", borderRadius:"13px", border:`1px solid ${NAVY_BORDER}`, padding:"16px 22px", display:"flex", alignItems:"center", gap:"12px" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={NAVY} strokeWidth="2">
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          <p style={{ fontSize:"12.5px", color:"#5a6880", lineHeight:1.6, margin:0, fontFamily:"'Inter',sans-serif" }}>
            <strong style={{ color:NAVY }}>Catatan:</strong> Semua harga dan promo bersifat informatif. Untuk informasi lebih lanjut, silakan kunjungi toko kami atau hubungi tim kami langsung.
          </p>
        </div>
      </div>
    </div>
  );
}