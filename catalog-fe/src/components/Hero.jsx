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

const DURATION = 6000;

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
    <section className="relative h-142.5 overflow-hidden bg-[#06122a]">

      {/* BG IMAGE */}
      <div
        key={`bg-${idx}`}
        className="absolute inset-0 bg-center bg-cover"
        style={{
          backgroundImage: `url(${s.image})`,
        }}
      />

      {/* OVERLAY */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to right, rgba(6,18,42,0.95) 0%, rgba(6,18,42,0.80) 35%, rgba(6,18,42,0.35) 65%, rgba(6,18,42,0.05) 100%)",
        }}
      />

      {/* CONTENT */}
      <div
        key={`c-${key}`}
        className="absolute inset-0 flex items-center pb-12"
      >
        <div className="w-full px-10 mx-auto max-w-350">
          <div className="max-w-130">

            {/* Tag */}
            <div className="h-tag inline-flex items-center gap-1.5 border border-white/22 rounded-[30px] px-3 py-1.25 mb-5 bg-white/[0.07]">
              <span className="w-1.25 h-1.25 rounded-full bg-blue-400 shrink-0" style={{ boxShadow: "0 0 6px #60a5fa" }} />
              <span className="text-[11px] font-bold text-white/85 tracking-[1.2px] uppercase">
                {s.tag}
              </span>
            </div>

            {/* H1 */}
            <h1 className="h-h1 text-[44px] font-extrabold leading-[1.2] text-white m-0 mb-4.5 tracking-[-0.4px]">
              {s.title}<br />
              <span
                style={{
                  background: "linear-gradient(90deg, #60a5fa 0%, #a78bfa 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {s.titleAccent}
              </span>
              {s.titleEnd ? <> {s.titleEnd}</> : null}
            </h1>

            {/* Desc */}
            <p className="h-desc text-sm text-white/68 leading-[1.85] m-0 mb-8 max-w-105">
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
      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2.5">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`h-dot ${i === idx ? "on" : "off"}`}
            onClick={() => { goTo(i); startAuto(); }}
          />
        ))}
      </div>
    </section>
  );
}