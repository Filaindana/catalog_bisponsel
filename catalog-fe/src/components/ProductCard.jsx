import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProductCard({
  product,
  saved = false,
  onToggleSave,
  variant = "default",
  compact = false,
  onCategoryClick,
  onClick,
}) {
  const navigate = useNavigate();
  const [hoverSave, setHoverSave] = useState(false);
  const imgHeight = compact ? "h-[150px]" : "h-[210px]";

  const handleSave = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const isLoggedIn = !!localStorage.getItem("token");
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      onToggleSave?.();
    }
  };

  const saveIsFilled = saved || hoverSave;

  return (
    <div
      onClick={onClick}
      className={`pc-gradient-hover rounded-2xl cursor-pointer p-0.5 bg-gray-200 ${
        compact ? "min-w-50" : "min-w-55"
      }`}
    >
      <div className="bg-white rounded-[13px] overflow-hidden font-[Inter]">

        {/* INFO */}
        <div className="px-3.5 pt-3.5 cursor-default">
          <p
            onClick={(e) => {
              e.stopPropagation();
              onCategoryClick?.();
            }}
            className={`text-[12px] text-gray-500 mb-1 ${
              onCategoryClick ? "cursor-pointer" : ""
            }`}
          >
            {product.category}
          </p>

          <p className="text-[16px] font-extrabold text-gray-900 mb-1 leading-tight line-clamp-2 min-h-10">
            {product.name}
          </p>

          {product.spec && (
            <p className="text-[13px] text-gray-400 leading-snug line-clamp-2 min-h-9">
              {product.spec}
            </p>
          )}
        </div>

        {/* IMAGE */}
        {/* <div className="relative bg-gray-50 overflow-hidden mt-2.5 group"> */}
        <div className="relative bg-gray-50 overflow-hidden mt-2.5 group h-50 flex items-center justify-center">

          {product.badge && (
            <span className="absolute top-3 left-3 bg-red-500 text-white text-[12px] font-bold px-2 py-1 rounded-lg z-10">
              {product.badge}
            </span>
          )}

          {variant === "promo" && typeof product.discount === "number" && (
            <span className="absolute top-2.5 left-2.5 z-10 bg-rose-600 text-white text-[12px] font-bold px-3 py-1 rounded-full">
              {product.discount}%
            </span>
          )}

          {/* SAVE BUTTON */}
          {variant !== "promo" && (
            <button
              onClick={handleSave}
              onMouseEnter={(e) => { e.stopPropagation(); setHoverSave(true); }}
              onMouseLeave={(e) => { e.stopPropagation(); setHoverSave(false); }}
              className={`absolute top-2.5 right-2.5 z-10 w-9 h-9 rounded-lg flex items-center justify-center shadow-md transition-all duration-200 active:scale-95 ${
                saveIsFilled
                  ? "bg-[#072B50]"
                  : "bg-white"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill={saveIsFilled ? "white" : "none"}
                stroke={saveIsFilled ? "none" : "#072B50"}
                strokeWidth="2"
              >
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
              </svg>
            </button>
          )}

          <img
            src={product.image}
            alt={product.name}
            className={`w-full object-contain block p-3.5 ${imgHeight} transition-transform duration-300 group-hover:scale-105`}
          />
        </div>

        {/* PRICE */}
        <div className="px-3.5 pb-3.5 pt-3 cursor-default">
          <div className="flex items-end justify-between pt-3 border-t border-gray-100">
            <div>
              <p className="text-[12px] text-gray-400 mb-1">Harga</p>
              <p className="text-[14px] font-bold text-red-500">
                {product.price}
              </p>
            </div>

            <div className="text-right">
              <p className="text-[12px] text-gray-400 mb-1">Review</p>
              <p className="text-[14px] font-semibold text-gray-900">
                ⭐ {product.rating}
              </p>
            </div>
          </div>

          {variant === "promo" && typeof product.discount === "number" && (
            <div className="pt-2.5">
              <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#072B50] rounded-full"
                  style={{ width: `${Math.min(100, product.stock ?? 0)}%` }}
                />
              </div>
              <p className="text-[12px] text-gray-500 mt-1.5">
                Stok Tersedia • Produk Populer
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}