import React from "react";

export default function ProductCardCompact({
  product,
  saved = false,
  onToggleSave,
  variant = "default",
  onCategoryClick,
}) {
  return (
    <div className="pc-gradient-hover min-w-50 rounded-2xl cursor-pointer p-0.5 bg-gray-200">
      <div className="bg-white rounded-[13px] overflow-hidden font-[Inter]">

        {/* INFO */}
        <div className="px-3.5 pt-3.5 cursor-default">
          <p
            onClick={(e) => {
              e.stopPropagation();
              onCategoryClick?.();
            }}
            className="text-[12px] text-gray-500 mb-1"
          >
            {product.category}
          </p>

          <p className="text-[13px] font-extrabold text-gray-900 mb-1 leading-tight">
            {product.name}
          </p>

          {product.spec && (
            <p className="text-[11px] text-gray-400 leading-snug">
              {product.spec}
            </p>
          )}
        </div>

        {/* IMAGE */}
        <div className="relative bg-gray-50 overflow-hidden mt-2.5 group">

          {variant === "promo" && typeof product.discount === "number" && (
            <span className="absolute top-2.5 left-2.5 z-10 bg-rose-600 text-white text-[12px] font-bold px-3 py-1 rounded-full">
              {product.discount}%
            </span>
          )}

          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave?.();
            }}
            className={`absolute top-2.5 right-2.5 z-10 w-9 h-9 rounded-lg flex items-center justify-center shadow-md ${
              saved
                ? "bg-[#072B50] text-white"
                : "bg-white text-[#072B50]"
            }`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24"
              fill={saved ? "white" : "none"}
              stroke={saved ? "none" : "#072B50"}>
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
          </button>

          <img
            src={product.image}
            alt={product.name}
            className="w-full h-37.5 object-contain block p-3.5 transition-transform duration-300 group-hover:scale-105"
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