import { useRef, useState, useEffect } from "react";
import produkImg from "../assets/monitor.png";
import ProductCard from "./ProductCard";

const products = [
  { category: "Komputer (PC)", name: "PC Gaming Pro Ryzen Edition", spec: "Ryzen 7 • RTX 4060 • 16GB RAM • SSD 1TB", price: "Rp 17.499.000", originalPrice: "Rp 20.499.000", discount: 15, rating: 4.8, stock: 72, image: produkImg },
  { category: "Komputer (PC)", name: "PC Gaming Pro Ryzen Edition", spec: "Ryzen 7 • RTX 4060 • 16GB RAM • SSD 1TB", price: "Rp 17.499.000", originalPrice: "Rp 20.499.000", discount: 15, rating: 4.8, stock: 45, image: produkImg },
  { category: "Komputer (PC)", name: "PC Gaming Pro Ryzen Edition", spec: "Ryzen 7 • RTX 4060 • 16GB RAM • SSD 1TB", price: "Rp 17.499.000", originalPrice: "Rp 20.499.000", discount: 15, rating: 4.8, stock: 88, image: produkImg },
  { category: "Komputer (PC)", name: "PC Gaming Pro Ryzen Edition", spec: "Ryzen 7 • RTX 4060 • 16GB RAM • SSD 1TB", price: "Rp 17.499.000", originalPrice: "Rp 20.499.000", discount: 15, rating: 4.8, stock: 30, image: produkImg },
  { category: "Komputer (PC)", name: "PC Gaming Pro Ryzen Edition", spec: "Ryzen 7 • RTX 4060 • 16GB RAM • SSD 1TB", price: "Rp 17.499.000", originalPrice: "Rp 20.499.000", discount: 15, rating: 4.8, stock: 60, image: produkImg },
  { category: "Komputer (PC)", name: "PC Gaming Pro Ryzen Edition", spec: "Ryzen 7 • RTX 4060 • 16GB RAM • SSD 1TB", price: "Rp 17.499.000", originalPrice: "Rp 20.499.000", discount: 15, rating: 4.8, stock: 55, image: produkImg },
];

const css = `
  .ph-scroll-track {
    display: flex;
    gap: 20px;
    overflow-x: auto;
    overflow-y: visible;
    scroll-behavior: smooth;
    cursor: default;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    padding-bottom: 4px;
  }
  .ph-scroll-track::-webkit-scrollbar { display: none; }

  .ph-card {
    flex: 0 0 calc(20% - 16px);
    min-width: 220px;
    border: 1px solid #e5e7eb;
    border-radius: 16px;
    overflow: hidden;
    background: #fff;
    cursor: default;
    transition: box-shadow 0.3s ease, transform 0.3s ease, border-color 0.3s ease;
  }
  .ph-card:hover {
    box-shadow: 0 12px 32px rgba(7,43,80,0.13);
    transform: translateY(-5px);
    border-color: #bfdbfe;
  }

  .ph-img-wrap {
    position: relative;
    background: #f9fafb;
    cursor: grab;
    overflow: hidden;
  }
  .ph-img-wrap:active { cursor: grabbing; }
  .ph-img-wrap img { transition: transform 0.4s ease; }
  .ph-img-wrap:hover img { transform: scale(1.06); }

  .ph-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(7,43,80,0.88) 0%, transparent 60%);
    display: flex;
    align-items: flex-end;
    padding: 14px;
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
    z-index: 2;
  }
  .ph-img-wrap:hover .ph-overlay {
    opacity: 1;
    pointer-events: all;
  }
  .ph-btn-detail {
    width: 100%;
    padding: 10px 14px;
    border-radius: 10px;
    background: transparent;
    color: #e0f2fe;
    font-size: 13px;
    font-weight: 600;
    border: 1px solid rgba(255,255,255,0.45);
    cursor: pointer;
    transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease, transform 0.15s ease;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-family: 'Inter', sans-serif;
  }
    .ph-btn-detail:hover { background: #3b82f6; border-color: #3b82f6; color: #fff; }
    .ph-btn-detail:active { background: #1d4ed8; border-color: #1d4ed8; transform: scale(0.98); }
    .ph-btn-detail:focus { outline: none; }

  .ph-save-btn {
    position: absolute; top: 10px; right: 10px; z-index: 3;
    background: #fff; border-radius: 8px; padding: 7px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.12);
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; border: none; transition: transform 0.2s ease;
  }
  .ph-save-btn:hover { transform: scale(1.15); }

  .ph-info { cursor: default; }
  .ph-info * { cursor: default; }

  .ph-arrow {
    width: 40px; height: 40px; border-radius: 50%;
    background: #fff; border: 1px solid #e5e7eb;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    cursor: pointer; display: flex; align-items: center;
    justify-content: center; font-size: 20px; color: #374151;
    transition: all 0.2s ease; padding: 0; line-height: 1;
  }
  .ph-arrow:hover { background: #072B50; color: #fff; border-color: #072B50; }

  .ph-countdown-box {
    display: flex; align-items: center; justify-content: center;
    background: #facc15; color: #1a1a1a;
    font-size: 20px; font-weight: 800;
    border-radius: 8px; width: 42px; height: 42px;
    font-variant-numeric: tabular-nums;
    font-family: 'Inter', sans-serif;
  }
  .ph-countdown-sep { font-size: 20px; font-weight: 800; color: #111827; margin: 0 2px; }

  .ph-progress-bar {
    height: 4px; background: #e5e7eb;
    border-radius: 99px; overflow: hidden; margin-top: 8px;
  }
  .ph-progress-fill {
    height: 100%; background: #3b82f6;
    border-radius: 99px;
  }
`;

function useCountdown(targetSeconds: number) {
  const [seconds, setSeconds] = useState(targetSeconds);
  useEffect(() => {
    const t = setInterval(() => setSeconds(s => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return [h, m, s].map(n => String(n).padStart(2, "0"));
}

export default function PromoHariIni() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [saved, setSaved] = useState<boolean[]>(products.map(() => false));
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const [hours, minutes, secs] = useCountdown(6 * 3600 + 16 * 60 + 40);

  const onMouseDown = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target.closest(".ph-img-wrap")) return;
    isDragging.current = true;
    startX.current = e.pageX - (scrollRef.current?.offsetLeft ?? 0);
    scrollLeft.current = scrollRef.current?.scrollLeft ?? 0;
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - (scrollRef.current?.offsetLeft ?? 0);
    const walk = (x - startX.current) * 1.5;
    if (scrollRef.current) scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };
  const stopDrag = () => { isDragging.current = false; };
  const scrollBy = (dir: number) => {
    if (scrollRef.current) scrollRef.current.scrollLeft += dir * 280;
  };

  return (
    <section style={{ padding: "50px 0", background: "#fff", fontFamily: "'Inter', sans-serif" }}>
      <style>{css}</style>
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 40px" }}>

        {/* HEADER */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "28px" }}>
          <h2 style={{ fontSize: "26px", fontWeight: 800, color: "#111827", margin: 0, borderLeft: "5px solid #072B50", paddingLeft: "14px" }}>
            Promo Spesial Hari Ini
          </h2>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            {/* COUNTDOWN */}
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ fontSize: "14px", fontWeight: 600, color: "#6b7280" }}>End in</span>
              <div className="ph-countdown-box">{hours}</div>
              <span className="ph-countdown-sep">:</span>
              <div className="ph-countdown-box">{minutes}</div>
              <span className="ph-countdown-sep">:</span>
              <div className="ph-countdown-box">{secs}</div>
            </div>
            {/* ARROWS */}
            <div style={{ display: "flex", gap: "8px" }}>
              <button className="ph-arrow" onClick={() => scrollBy(-1)}>‹</button>
              <button className="ph-arrow" onClick={() => scrollBy(1)}>›</button>
            </div>
          </div>
        </div>

        {/* SCROLL TRACK */}
        <div
          ref={scrollRef}
          className="ph-scroll-track"
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={stopDrag}
          onMouseLeave={stopDrag}
        >
          {products.map((product, index) => (
            <ProductCard
              key={index}
              product={{ ...product, id: index + 1, badge: undefined }}
              saved={saved[index]}
              onToggleSave={() => setSaved(prev => { const u = [...prev]; u[index] = !u[index]; return u; })}
              variant="promo"
            />
          ))}
        </div>
      </div>
    </section>
  );
}