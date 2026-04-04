import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import heroImg from "../assets/hero1.jpg";

const slides = [
  {
    image:       heroImg,
    tag:         "Teknologi Terpercaya",
    title:       "Solusi Teknologi",
    titleAccent: "Terpercaya",
    titleEnd:    "untuk Bisnis Anda",
    desc:        "PT Indo Bismar menghadirkan produk IT dan perangkat teknologi berkualitas melalui jaringan distribusi profesional di seluruh Indonesia.",
    btnText:     "Lihat Produk",
    btnLink:     "/product",
  },
  {
    image:       heroImg,
    tag:         "Distribusi Nasional",
    title:       "Jaringan Distribusi",
    titleAccent: "Terluas",
    titleEnd:    "di Indonesia",
    desc:        "Dengan lebih dari 6 cabang aktif di Jawa Timur, kami memastikan produk teknologi sampai ke tangan Anda dengan cepat dan aman.",
    btnText:     "Lihat Cabang",
    btnLink:     "/contact",
  },
  {
    image:       heroImg,
    tag:         "Promo Eksklusif",
    title:       "Penawaran Spesial",
    titleAccent: "Terbaik",
    titleEnd:    "Bulan Ini",
    desc:        "Temukan promo eksklusif dan diskon menarik untuk berbagai produk teknologi pilihan. Jangan sampai ketinggalan!",
    btnText:     "Lihat Promo",
    btnLink:     "/promo",
  },
];

const DURATION = 5000;

export default function Hero() {
  const navigate      = useNavigate();
  const [idx, setIdx] = useState(0);
  const [key, setKey] = useState(0);
  const intervalRef   = useRef(null);

  const goTo = (next) => {
    if (next === idx) return;
    setIdx(next);
    setKey((k) => k + 1);
  };

  const startAuto = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setIdx((prev) => (prev + 1) % slides.length);
      setKey((k) => k + 1);
    }, DURATION);
  };

  useEffect(() => {
    startAuto();
    return () => clearInterval(intervalRef.current);
  }, []);

  const s = slides[idx];

  return (
    <section style={{ position: "relative", height: "570px", overflow: "hidden", background: "#06122a" }}>
      {/* BG IMAGE */}
      <div
        key={`bg-${idx}`}
        style={{
          position: "absolute", inset: 0,
          backgroundImage: `url(${s.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          animation: "hKB 5.5s ease forwards",
        }}
      />

      {/* OVERLAY */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to right, rgba(6,18,42,0.95) 0%, rgba(6,18,42,0.80) 35%, rgba(6,18,42,0.35) 65%, rgba(6,18,42,0.05) 100%)",
      }} />

      {/* CONTENT */}
      <div key={`c-${key}`} style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", paddingBottom: 48 }}>
        <div style={{ maxWidth: 1400, width: "100%", margin: "0 auto", padding: "0 40px" }}>
          <div style={{ maxWidth: 520 }}>

            {/* Tag */}
            <div className="h-tag" style={{
              display: "inline-flex", alignItems: "center", gap: 7,
              border: "1px solid rgba(255,255,255,0.22)", borderRadius: 30,
              padding: "5px 13px", marginBottom: 20,
              background: "rgba(255,255,255,0.07)",
            }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#60a5fa", boxShadow: "0 0 6px #60a5fa", flexShrink: 0 }} />
              <span style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.85)", letterSpacing: "1.2px", textTransform: "uppercase" }}>
                {s.tag}
              </span>
            </div>

            {/* H1 */}
            <h1 className="h-h1" style={{ fontSize: 44, fontWeight: 800, lineHeight: 1.2, color: "#fff", margin: "0 0 18px 0", letterSpacing: "-0.4px" }}>
              {s.title}<br />
              <span style={{
                background: "linear-gradient(90deg, #60a5fa 0%, #a78bfa 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                {s.titleAccent}
              </span>
              {s.titleEnd ? <> {s.titleEnd}</> : null}
            </h1>

            {/* Desc */}
            <p className="h-desc" style={{ fontSize: 14, color: "rgba(255,255,255,0.68)", lineHeight: 1.85, margin: "0 0 32px 0", maxWidth: 420 }}>
              {s.desc}
            </p>

            {/* Button */}
            <div className="h-btn">
              <button className="h-cta" onClick={() => navigate(s.btnLink)}>
                {s.btnText}
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* DOTS */}
      <div style={{ position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)", zIndex: 10, display: "flex", alignItems: "center", gap: 10 }}>
        {slides.map((_, i) => (
          <button key={i} className={`h-dot ${i === idx ? "on" : "off"}`} onClick={() => { goTo(i); startAuto(); }} />
        ))}
      </div>
    </section>
  );
}
