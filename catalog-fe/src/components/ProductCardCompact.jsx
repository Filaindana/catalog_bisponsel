import React from "react";

export default function ProductCardCompact({ product, saved = false, onToggleSave, variant = "default", onCategoryClick }) {
  const imgHeight = 150;

  return (
    <div
      className="pc-gradient-hover"
      style={{ minWidth: 200, borderRadius: 16, cursor: "pointer", padding: 2, background: "#e5e7eb" }}
    >
      <div style={{ background: "#fff", borderRadius: 13, overflow: "hidden", fontFamily: "Inter, sans-serif" }}>

        {/* INFO DI ATAS GAMBAR */}
        <div style={{ padding: "14px 14px 0", cursor: "default" }}>
          <p
            onClick={(e) => { e.stopPropagation(); onCategoryClick?.(); }}
            style={{ fontSize: 12, color: "#6b7280", marginBottom: 4, cursor: onCategoryClick ? "pointer" : "default" }}
          >
            {product.category}
          </p>
          <p style={{ fontSize: 13, fontWeight: 800, color: "#111827", marginBottom: 4, lineHeight: 1.2 }}>{product.name}</p>
          {product.spec && <p style={{ fontSize: 11, color: "#9ca3af", lineHeight: 1.4 }}>{product.spec}</p>}
        </div>

        {/* GAMBAR */}
        <div
          style={{ position: "relative", background: "#f9fafb", overflow: "hidden", marginTop: 10 }}
          onMouseEnter={e => { e.currentTarget.style.background = "#fff"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "#f9fafb"; }}
        >
          {product.badge && (
            <span style={{ position: "absolute", top: 12, left: 12, background: "#ef4444", color: "#fff", fontSize: 12, fontWeight: 700, padding: "4px 8px", borderRadius: 8, zIndex: 3 }}>
              {product.badge}
            </span>
          )}
          {variant === "promo" && typeof product.discount === "number" && (
            <span style={{ position: "absolute", top: 10, left: 10, zIndex: 3, background: "#e11d48", color: "#fff", fontSize: 12, fontWeight: 700, padding: "4px 10px", borderRadius: 20 }}>
              {product.discount}%
            </span>
          )}
          <button
            style={{ position: "absolute", top: 10, right: 10, zIndex: 3, display: "flex", alignItems: "center", justifyContent: "center", width: 36, height: 36, borderRadius: 8, padding: 8, boxShadow: "0 2px 8px rgba(0,0,0,0.12)", border: "none", cursor: "pointer", outline: "none", transition: "background 0.2s ease", background: saved ? "#072B50" : "#fff" }}
            onClick={(e) => { e.stopPropagation(); onToggleSave?.(); }}
            aria-label="Simpan produk"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
              fill={saved ? "#fff" : "none"} stroke={saved ? "none" : "#072B50"}>
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
            </svg>
          </button>
          <img
            src={product.image}
            alt={product.name}
            style={{ width: "100%", objectFit: "contain", display: "block", padding: 14, height: imgHeight, transition: "transform 0.3s ease" }}
            onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.04)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}
          />
        </div>

        {/* HARGA & RATING */}
        <div style={{ padding: "12px 14px 14px", cursor: "default" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", borderTop: "1px solid #f3f4f6", paddingTop: 12 }}>
            <div>
              <p style={{ fontSize: 12, color: "#9ca3af", marginBottom: 4 }}>Harga</p>
              <p style={{ fontSize: 14, fontWeight: 700, color: "#ef4444" }}>{product.price}</p>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ fontSize: 12, color: "#9ca3af", marginBottom: 4 }}>Review</p>
              <p style={{ fontSize: 14, fontWeight: 600, color: "#111827" }}>⭐ {product.rating}</p>
            </div>
          </div>

          {variant === "promo" && typeof product.discount === "number" && (
            <div style={{ paddingTop: 10 }}>
              <div style={{ height: 6, background: "#e5e7eb", borderRadius: 9999, overflow: "hidden" }}>
                <div style={{ height: "100%", background: "#072B50", borderRadius: 9999, width: `${Math.min(100, product.stock ?? 0)}%` }} />
              </div>
              <p style={{ fontSize: 12, color: "#6b7280", marginTop: 6 }}>Stok Tersedia • Produk Populer</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
