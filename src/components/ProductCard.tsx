import React from "react";
import { useNavigate } from "react-router-dom";

type Product = {
  id?: number | string;
  category: string;
  name: string;
  spec?: string;
  price: string;
  rating: number;
  image: string;
  badge?: string;
  discount?: number;
  stock?: number;
};

type Props = {
  product: Product;
  saved?: boolean;
  onToggleSave?: () => void;
  variant?: "default" | "promo";
};

export default function ProductCard({ product, saved = false, onToggleSave, variant = "default" }: Props) {
  const navigate = useNavigate();

  const css = `
    .pc-card{ background:#fff; border:1px solid #e5e7eb; border-radius:14px; overflow:hidden; min-width:220px }
    .pc-img-wrap{ position:relative; background:#f9fafb; overflow:hidden }
    .pc-img{ width:100%; height:210px; object-fit:contain; display:block; padding:14px; transition: transform .3s ease }
    .pc-img-wrap:hover .pc-img{ transform:scale(1.04) }
    .pc-badge{ position:absolute; top:12px; left:12px; background:#ef4444; color:#fff; font-size:12px; font-weight:700; padding:4px 8px; border-radius:8px }
    .pc-save-btn{ position:absolute; top:10px; right:10px; z-index:3; background:#fff; border-radius:8px; padding:7px; box-shadow:0 2px 8px rgba(0,0,0,0.12); border:none; cursor:pointer }
    .pc-overlay{ position:absolute; inset:0; display:flex; align-items:flex-end; padding:14px; background: linear-gradient(to top, rgba(7,43,80,0.88) 0%, transparent 60%); opacity:0; pointer-events:none; transition:opacity .2s ease }
    .pc-img-wrap:hover .pc-overlay{ opacity:1; pointer-events:all }
    .pc-btn-detail{ width:100%; padding:10px 14px; border-radius:10px; background:transparent; color:#e0f2fe; font-size:14px; font-weight:700; border:1px solid rgba(255,255,255,0.45); display:flex; align-items:center; justify-content:space-between; cursor:pointer }
    .pc-btn-detail:hover{ background:rgba(7,43,80,0.88); border-color:rgba(7,43,80,0.88); color:#fff }
    .pc-btn-detail:focus{ outline:none }
    .pc-info{ padding:14px; cursor:default }
    .pc-info *{ cursor:default }
    .pc-price{ font-size:16px; font-weight:800; color:#ef4444 }
    .pc-review{ font-size:16px; font-weight:700; color:#111827 }
    .pc-progress{ height:6px; background:#e5e7eb; border-radius:99px; overflow:hidden }
    .pc-progress-fill{ height:100%; background:#3b82f6; border-radius:99px }
  `;

  return (
    <div className="pc-card">
      <style>{css}</style>

      {/* INFO DI ATAS GAMBAR */}
      <div className="pc-info" style={{ paddingBottom: 0 }}>
        <p style={{ fontSize: 12, color: "#6b7280", margin: "0 0 4px 0" }}>{product.category}</p>
        <p style={{ fontSize: 16, fontWeight: 800, color: "#111827", margin: "0 0 4px 0", lineHeight: 1.2 }}>{product.name}</p>
        {product.spec && <p style={{ fontSize: 13, color: "#9ca3af", margin: 0, lineHeight: 1.4 }}>{product.spec}</p>}
      </div>

      {/* GAMBAR */}
      <div className="pc-img-wrap" style={{ marginTop: 10 }}>
        {product.badge && <span className="pc-badge">{product.badge}</span>}
        {variant === "promo" && typeof product.discount === "number" && (
          <span style={{ position: "absolute", top: 10, left: 10, zIndex: 3, background: "#e11d48", color: "#fff", fontSize: 12, fontWeight: 700, padding: "4px 10px", borderRadius: 20 }}>
            {product.discount}%
          </span>
        )}
        <button className="pc-save-btn" onClick={(e) => { e.stopPropagation(); onToggleSave?.(); }} aria-label="Simpan produk">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
            fill={saved ? "#072B50" : "none"} stroke={saved ? "none" : "#374151"}
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
          </svg>
        </button>
        <img src={product.image} alt={product.name} className="pc-img" />
        <div className="pc-overlay">
          <button className="pc-btn-detail" onClick={(e) => { e.stopPropagation(); if (product.id !== undefined) navigate(`/product/${product.id}`); }}>
            <span>Lihat Detail</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </button>
        </div>
      </div>

      {/* HARGA & RATING DI BAWAH */}
      <div className="pc-info" style={{ paddingTop: 12 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", borderTop: "1px solid #f3f4f6", paddingTop: 12 }}>
          <div>
            <p style={{ fontSize: 12, color: "#9ca3af", margin: "0 0 4px 0" }}>Harga</p>
            <p className="pc-price" style={{ margin: 0 }}>{product.price}</p>
          </div>
          <div style={{ textAlign: "right" }}>
            <p style={{ fontSize: 12, color: "#9ca3af", margin: "0 0 4px 0" }}>Review</p>
            <p className="pc-review" style={{ margin: 0 }}>⭐ {product.rating}</p>
          </div>
        </div>

        {variant === "promo" && typeof product.discount === "number" && (
          <div style={{ paddingTop: 10 }}>
            <div className="pc-progress">
              <div className="pc-progress-fill" style={{ width: `${Math.min(100, product.stock ?? 0)}%` }} />
            </div>
            <p style={{ fontSize: 12, color: "#6b7280", margin: "6px 0 0 0" }}>Stok Tersedia • Produk Populer</p>
          </div>
        )}
      </div>
    </div>
  );
}