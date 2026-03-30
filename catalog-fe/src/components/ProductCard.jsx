import React from "react";

export default function ProductCard({ product, saved = false, onToggleSave, variant = "default", compact = false, onCategoryClick }) {
  const imgHeight = compact ? 150 : 210;
  const minWidth = compact ? 200 : 220;

  const css = `
    .pc-wrap{ min-width:${minWidth}px; border-radius:16px; cursor:pointer; padding:2px; background:#e5e7eb; transition: transform .2s cubic-bezier(.2,.8,.2,1), background .2s ease; }
    .pc-wrap:hover{ background: linear-gradient(135deg, #3b82f6, #072B50, #60a5fa, #3b82f6); background-size:300% 300%; animation: gradientBorder 2s ease infinite; transform: translateY(-4px); }
    .pc-wrap:active{ transform: scale(0.97) translateY(0px); }
    .pc-wrap:focus{ outline:none; }
    .pc-wrap *:focus{ outline:none; }
    .pc-card{ background:#fff; border-radius:13px; overflow:hidden; font-family: 'Inter', sans-serif; }
    @keyframes gradientBorder { 0%{ background-position:0% 50% } 50%{ background-position:100% 50% } 100%{ background-position:0% 50% } }
    .pc-img-wrap{ position:relative; background:#f9fafb; overflow:hidden; transition: background-color .3s ease; }
    .pc-img-wrap:hover{ background:#ffffff; }
    .pc-img{ width:100%; height:${imgHeight}px; object-fit:contain; display:block; padding:14px; transition: transform .3s ease }
    .pc-img-wrap:hover .pc-img{ transform:scale(1.04) }
    .pc-badge{ position:absolute; top:12px; left:12px; background:#ef4444; color:#fff; font-size:12px; font-weight:700; padding:4px 8px; border-radius:8px }
    .pc-save-btn{ position:absolute; top:10px; right:10px; z-index:3; display:flex; align-items:center; justify-content:center; width:36px; height:36px; border-radius:8px; padding:8px; box-shadow:0 2px 8px rgba(0,0,0,0.12); border:none; cursor:pointer; outline:none; transition:background .2s ease; }
    
    .pc-info{ padding:14px; cursor:default }
    .pc-info *{ cursor:default }
    .pc-price{ font-size:14px; font-weight:700; color:#ef4444 }
    .pc-review{ font-size:14px; font-weight:600; color:#111827 }
    .pc-progress{ height:6px; background:#e5e7eb; border-radius:99px; overflow:hidden }
    .pc-progress-fill{ height:100%; background:#072B50; border-radius:99px }
  `;

  return (
    <div className="pc-wrap">
    <div className="pc-card">
      <style>{css}</style>

      {/* INFO DI ATAS GAMBAR */}
      <div className="pc-info" style={{ paddingBottom: 0 }}>
        <p
          onClick={(e) => { e.stopPropagation(); onCategoryClick?.(); }}
          style={{ fontSize: 12, color: "#6b7280", margin: "0 0 4px 0", cursor: onCategoryClick ? "pointer" : "default" }}
        >
          {product.category}
        </p>
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
        <button className="pc-save-btn" onClick={(e) => { e.stopPropagation(); onToggleSave?.(); }} aria-label="Simpan produk" style={{ background: saved ? "#072B50" : "#fff" }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
            fill={saved ? "#fff" : "none"} stroke={saved ? "none" : "#072B50"}>
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
          </svg>
        </button>
        <img src={product.image} alt={product.name} className="pc-img" />
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
    </div>
  );
}