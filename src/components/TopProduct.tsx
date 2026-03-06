import { useRef, useState } from "react";
import produkImg from "../assets/monitor.png";
import ProductCard from "./ProductCard";

const products = [
  { category: "Komputer (PC)", name: "PC Gaming Pro Ryzen Edition", spec: "Ryzen 7 • RTX 4060 • 16GB RAM • SSD 1TB", price: "Rp 17.499.000", rating: 4.8, image: produkImg },
  { category: "Komputer (PC)", name: "PC Gaming Pro Ryzen Edition", spec: "Ryzen 7 • RTX 4060 • 16GB RAM • SSD 1TB", price: "Rp 17.499.000", rating: 4.8, image: produkImg },
  { category: "Komputer (PC)", name: "PC Gaming Pro Ryzen Edition", spec: "Ryzen 7 • RTX 4060 • 16GB RAM • SSD 1TB", price: "Rp 17.499.000", rating: 4.8, image: produkImg },
  { category: "Komputer (PC)", name: "PC Gaming Pro Ryzen Edition", spec: "Ryzen 7 • RTX 4060 • 16GB RAM • SSD 1TB", price: "Rp 17.499.000", rating: 4.8, image: produkImg },
  { category: "Komputer (PC)", name: "PC Gaming Pro Ryzen Edition", spec: "Ryzen 7 • RTX 4060 • 16GB RAM • SSD 1TB", price: "Rp 17.499.000", rating: 4.8, image: produkImg },
];

const css = `
  .tp-track {
    display: flex;
    gap: 14px;
    overflow-x: auto;
    scroll-behavior: smooth;
    scrollbar-width: none;
    padding: 8px 4px 12px;
    cursor: default;
  }
  .tp-track::-webkit-scrollbar { display: none; }

  /* overlay lihat detail — sama persis dengan NewProduct & PromoHariIni */
  .tp-imgbox {
    position: relative;
    background: #f9fafb;
    overflow: hidden;
    cursor: grab;
  }
  .tp-imgbox:active { cursor: grabbing; }
  .tp-imgbox img { transition: transform 0.4s ease; display: block; }
  .tp-imgbox:hover img { transform: scale(1.06); }

  .tp-overlay {
    position: absolute; inset: 0; z-index: 2;
    background: linear-gradient(to top, rgba(7,43,80,0.88) 0%, transparent 60%);
    display: flex; align-items: flex-end; padding: 14px;
    opacity: 0; transition: opacity 0.3s ease; pointer-events: none;
  }
  .tp-imgbox:hover .tp-overlay { opacity: 1; pointer-events: all; }

  .tp-btn-detail {
    width: 100%; padding: 10px 14px; border-radius: 10px;
    background: transparent; color: #e0f2fe;
    font-size: 13px; font-weight: 600;
    border: 1px solid rgba(255,255,255,0.45);
    cursor: pointer; display: flex; align-items: center; justify-content: space-between;
    transition: background 0.2s, border-color 0.2s, color 0.2s;
  }
  .tp-btn-detail:hover { background: #3b82f6; border-color: #3b82f6; color: #fff; }
  .tp-btn-detail:focus { outline: none; }

  /* tombol panah floating seperti gambar */
  .tp-rel { position: relative; flex: 1; min-width: 0; }
  .tp-arrow {
    position: absolute; top: 50%; transform: translateY(-50%); z-index: 10;
    width: 36px; height: 36px; border-radius: 50%;
    background: #fff; border: none;
    box-shadow: 0 2px 8px rgba(0,0,0,0.35);
    cursor: pointer; display: flex; align-items: center; justify-content: center;
    font-size: 15px; color: #374151;
    transition: all 0.2s ease; padding: 0;
  }
  .tp-arrow:hover { background: #1e40af; color: #fff; }
  .tp-arrow.prev { left: -18px; }
  .tp-arrow.next { right: -18px; }
`;

export default function TopProduct() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [saved, setSaved] = useState<boolean[]>(products.map(() => false));
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftRef = useRef(0);

  const onMouseDown = (e: React.MouseEvent) => {
    const t = e.target as HTMLElement;
    if (!t.closest(".tp-imgbox")) return;
    isDragging.current = true;
    startX.current = e.pageX - (trackRef.current?.offsetLeft ?? 0);
    scrollLeftRef.current = trackRef.current?.scrollLeft ?? 0;
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - (trackRef.current?.offsetLeft ?? 0);
    if (trackRef.current) trackRef.current.scrollLeft = scrollLeftRef.current - (x - startX.current) * 1.5;
  };
  const stopDrag = () => { isDragging.current = false; };
  const move = (d: number) => { if (trackRef.current) trackRef.current.scrollLeft += d * 280; };

  return (
    <section style={{ background: "#072B50", padding: "60px 20px" }}>
      <style>{css}</style>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>

          {/* KIRI — tidak diubah */}
          <div style={{ minWidth: "180px", maxWidth: "180px" }}>
            <h2 style={{ fontSize: "28px", fontWeight: 800, color: "#fff", margin: "0 0 16px 0", lineHeight: 1.2, textTransform: "uppercase", letterSpacing: "1px" }}>
              Top Product
            </h2>
            <p style={{ fontSize: "14px", color: "#93c5fd", margin: 0, lineHeight: 1.7 }}>
              Pilihan produk terbaik dengan kualitas terjamin
            </p>
          </div>

          {/* KANAN — scroll + tombol floating */}
          <div className="tp-rel">
            <button className="tp-arrow prev" onClick={() => move(-1)}>❮</button>

            <div className="tp-track" ref={trackRef}
              onMouseDown={onMouseDown} onMouseMove={onMouseMove}
              onMouseUp={stopDrag} onMouseLeave={stopDrag}>

              {products.map((product, index) => (
                <div key={index} style={{ flex: '0 0 calc(25% - 14px)', minWidth: 220 }}>
                  <ProductCard
                    product={{ ...product, id: index + 1 }}
                    saved={saved[index]}
                    onToggleSave={() => setSaved(prev => { const u = [...prev]; u[index] = !u[index]; return u; })}
                  />
                </div>
              ))}
            </div>

            <button className="tp-arrow next" onClick={() => move(1)}>❯</button>
          </div>

        </div>
      </div>
    </section>
  );
}