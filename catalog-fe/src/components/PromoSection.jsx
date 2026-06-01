import { useState, useEffect } from "react";
import { getPromosList as getPromos } from "../utils/services/promoService";

const INTERVAL = 3000;

export default function PromoSection() {
  const [banners, setBanners] = useState([]);
  const [activeSlide, setActiveSlide] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPromos = async () => {
      try {
        const data = await getPromos();
        const activePromos = data
          .filter((promo) => promo.status === "aktif")
          .slice(0, 4);
        setBanners(activePromos);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadPromos();
  }, []);

  useEffect(() => {
    if (banners.length <= 1) return;
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % banners.length);
    }, INTERVAL);
    return () => clearInterval(timer);
  }, [banners.length]);

  if (loading) {
    return (
      <section
        className="w-full px-4 py-12 md:py-20 md:px-10"
        style={{ backgroundColor: "#072B50", fontFamily: "'Inter', sans-serif" }}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-5">
          {/* Slider Skeleton */}
          <div className="w-full aspect-[16/11] bg-white/10 animate-pulse rounded-2xl"></div>
          {/* Thumbnails Skeleton */}
          <div className="grid grid-cols-2 gap-3.5">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-full aspect-[16/11] bg-white/10 animate-pulse rounded-2xl"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (banners.length === 0) {
    return (
      <section
        className="w-full px-4 py-12 flex justify-center items-center"
        style={{ backgroundColor: "#072B50", fontFamily: "'Inter', sans-serif" }}
      >
        <p className="text-white/60 font-semibold text-[15px]">Tidak ada promo aktif.</p>
      </section>
    );
  }

  return (
    <section
      className="w-full px-4 py-12 md:py-16 md:px-10"
      style={{ backgroundColor: "#072B50", fontFamily: "'Inter', sans-serif" }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-5 items-stretch">

        {/* LEFT COLUMN: Main Slider (Hero) */}
        <div className="relative flex flex-col h-full min-h-[220px] lg:min-h-0">
          <div className="w-full flex-1 relative overflow-hidden rounded-2xl aspect-[16/11] lg:aspect-auto">
            <img
              src={banners[activeSlide]?.banner_url}
              alt={banners[activeSlide]?.nama}
              className="w-full h-full object-cover object-center rounded-2xl lg:absolute lg:inset-0"
              style={{ transition: "opacity 0.4s ease" }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/fallback-brand.png";
              }}
            />
          </div>

          {/* Dots overlayed at the bottom center of the slider */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10 bg-black/30 px-3.5 py-1.5 rounded-full backdrop-blur-sm">
            {banners.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveSlide(i)}
                style={{
                  width: i === activeSlide ? "16px" : "6px",
                  height: "6px",
                  borderRadius: "9999px",
                  backgroundColor:
                    i === activeSlide ? "#ffffff" : "rgba(255,255,255,0.4)",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  transition: "all 0.3s ease",
                }}
              />
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: 4 Thumbnail Cards (2x2 Grid) */}
        <div className="grid grid-cols-2 gap-3.5">
          {banners.map((banner, i) => (
            <div
              key={banner.id}
              onClick={() => setActiveSlide(i)}
              className="overflow-hidden rounded-2xl cursor-pointer relative group"
              style={{
                border: i === activeSlide
                  ? "2.5px solid rgba(255,255,255,0.95)"
                  : "2.5px solid transparent",
                opacity: i === activeSlide ? 1 : 0.7,
                transition: "all 0.3s ease",
                boxSizing: "border-box",
              }}
            >
              <img
                src={banner.banner_url}
                alt={banner.nama}
                className="w-full object-cover object-center aspect-[16/11] block group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/fallback-brand.png";
                }}
              />
              {/* Subtle overlay on hover/active */}
              <div className="absolute inset-0 bg-[#072B50]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>
          ))}

          {/* If there are less than 4 promos, pad with placeholders to maintain grid height perfectly */}
          {banners.length < 4 && Array.from({ length: 4 - banners.length }).map((_, idx) => (
            <div
              key={`placeholder-${idx}`}
              className="overflow-hidden rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center aspect-[16/11] opacity-30 select-none pointer-events-none"
            >
              <span className="text-white/40 text-[10px] uppercase font-bold tracking-wider">BizPonsel Promo</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}