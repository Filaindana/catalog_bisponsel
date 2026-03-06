import { useRef, useState } from "react";
import produkImg from "../assets/monitor.png";
import ProductCard from "./ProductCard";

const products = [
  { category: "Komputer (PC)", name: "PC Gaming Pro Ryzen Edition", spec: "Ryzen 7 • RTX 4060 • 16GB RAM • SSD 1TB", price: "Rp 17.499.000", rating: 4.8, badge: "New", image: produkImg },
  { category: "Komputer (PC)", name: "PC Gaming Pro Ryzen Edition", spec: "Ryzen 7 • RTX 4060 • 16GB RAM • SSD 1TB", price: "Rp 17.499.000", rating: 4.8, badge: "New", image: produkImg },
  { category: "Komputer (PC)", name: "PC Gaming Pro Ryzen Edition", spec: "Ryzen 7 • RTX 4060 • 16GB RAM • SSD 1TB", price: "Rp 17.499.000", rating: 4.8, badge: "New", image: produkImg },
  { category: "Komputer (PC)", name: "PC Gaming Pro Ryzen Edition", spec: "Ryzen 7 • RTX 4060 • 16GB RAM • SSD 1TB", price: "Rp 17.499.000", rating: 4.8, badge: "New", image: produkImg },
  { category: "Komputer (PC)", name: "PC Gaming Pro Ryzen Edition", spec: "Ryzen 7 • RTX 4060 • 16GB RAM • SSD 1TB", price: "Rp 17.499.000", rating: 4.8, badge: "New", image: produkImg },
  { category: "Komputer (PC)", name: "PC Gaming Pro Ryzen Edition", spec: "Ryzen 7 • RTX 4060 • 16GB RAM • SSD 1TB", price: "Rp 17.499.000", rating: 4.8, badge: "New", image: produkImg },
];

const css = `
  .np-scroll-track {
    display: flex;
    gap: 20px;
    overflow-x: auto;
    overflow-y: visible;
    scroll-behavior: smooth;
    cursor: default;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
  }
  .np-scroll-track::-webkit-scrollbar { display: none; }

  .np-card {
    flex: 0 0 calc(20% - 16px);
    min-width: 220px;
    border: 1px solid #e5e7eb;
    border-radius: 16px;
    overflow: hidden;
    background: #fff;
    cursor: default;
    transition: box-shadow 0.3s ease, transform 0.3s ease, border-color 0.3s ease;
  }
  .np-card:hover {
    box-shadow: 0 12px 32px rgba(7,43,80,0.13);
    transform: translateY(-5px);
    border-color: #bfdbfe;
  }

  /* gambar: grab cursor + overlay */
  .np-img-wrap {
    position: relative;
    background: #f9fafb;
    cursor: grab;
    overflow: hidden;
  }
  .np-img-wrap:active { cursor: grabbing; }
  .np-img-wrap img {
    transition: transform 0.4s ease;
  }
  .np-img-wrap:hover img {
    transform: scale(1.06);
  }

  .np-overlay {
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
  .np-img-wrap:hover .np-overlay {
    opacity: 1;
    pointer-events: all;
  }
  .np-btn-detail {
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
    letter-spacing: 0.2px;
  }
  .np-btn-detail:hover {
    background: #3b82f6;
    border-color: #3b82f6;
    color: #fff;
  }
  .np-btn-detail:active {
    background: #1d4ed8;
    border-color: #1d4ed8;
    transform: scale(0.98);
  }

  /* info: default cursor, no interaction */
  .np-info { cursor: default; }
  .np-info * { cursor: default; }

  .np-save-btn {
    position: absolute; top: 10px; right: 10px; z-index: 3;
    background: #fff; border-radius: 8px; padding: 7px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.12);
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; border: none; transition: transform 0.2s ease;
  }
  .np-save-btn:hover { transform: scale(1.15); }

  .np-arrow {
    width: 40px; height: 40px; border-radius: 50%;
    background: #fff; border: 1px solid #e5e7eb;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    cursor: pointer; display: flex; align-items: center;
    justify-content: center; font-size: 20px; color: #374151;
    transition: all 0.2s ease; padding: 0; line-height: 1;
  }
  .np-arrow:hover { background: #072B50; color: #fff; border-color: #072B50; }

  .np-hint span { display: inline-block; animation: npBounce 1.4s ease-in-out infinite; }
  @keyframes npBounce { 0%,100%{transform:translateX(0)} 50%{transform:translateX(6px)} }
`;

export default function NewProduct() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [saved, setSaved] = useState<boolean[]>(products.map(() => false));
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const onMouseDown = (e: React.MouseEvent) => {
    // hanya drag jika klik di area gambar (.np-img-wrap)
    const target = e.target as HTMLElement;
    if (!target.closest(".np-img-wrap")) return;
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
    <section style={{ padding: "50px 0", background: "#fff" }}>
      <style>{css}</style>
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 40px" }}>

        {/* HEADER */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "28px" }}>
          <div>
            <h2 style={{ fontSize: "26px", fontWeight: 700, color: "#111827", margin: 0, borderLeft: "5px solid #072B50", paddingLeft: "14px" }}>
              Produk Terbaru
            </h2>
            <div className="np-hint" style={{ paddingLeft: "19px", display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "#9ca3af", marginTop: "4px" }}>
              <span>⟶</span> Geser untuk melihat lebih banyak
            </div>
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            <button className="np-arrow" onClick={() => scrollBy(-1)}>‹</button>
            <button className="np-arrow" onClick={() => scrollBy(1)}>›</button>
          </div>
        </div>

        {/* SCROLL TRACK — bukan Swiper, full control cursor */}
        <div
          ref={scrollRef}
          className="np-scroll-track"
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={stopDrag}
          onMouseLeave={stopDrag}
        >
          {products.map((product, index) => (
            <ProductCard
              key={index}
              product={{ ...product, id: index + 1 }}
              saved={saved[index]}
              onToggleSave={() => setSaved(prev => { const u = [...prev]; u[index] = !u[index]; return u; })}
            />
          ))}
        </div>

      </div>
    </section>
  );
}