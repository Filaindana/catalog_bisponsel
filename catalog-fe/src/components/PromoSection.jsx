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
        className="w-full px-4 py-6"
        style={{ backgroundColor: "#072B50", fontFamily: "'Inter', sans-serif" }}
      >
        <div className="max-w-7xl mx-auto flex flex-col gap-4">
          {/* Hero Slider Skeleton */}
          <div className="w-full flex flex-col gap-3">
            <div className="w-full aspect-[16/10] bg-white/10 animate-pulse rounded-2xl"></div>
            <div className="flex justify-center gap-2 mt-1">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-2.5 h-2.5 rounded-full bg-white/20 animate-pulse"></div>
              ))}
            </div>
          </div>
          {/* Bottom 3 Banners Skeleton */}
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-full aspect-[16/8] bg-white/10 animate-pulse rounded-2xl"></div>
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
      className="w-full px-4 py-6"
      style={{ backgroundColor: "#072B50", fontFamily: "'Inter', sans-serif" }}
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-4">

        {/* Main Big Banner Slider */}
        <div className="w-full flex flex-col gap-3">
          <div className="w-full overflow-hidden rounded-2xl">
            <img
              src={banners[activeSlide]?.banner_url}
              alt={banners[activeSlide]?.nama}
              className="w-full object-cover object-center aspect-[16/10] rounded-2xl"
              style={{ transition: "opacity 0.4s ease" }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/fallback-brand.png";
              }}
            />
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-1">
            {banners.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveSlide(i)}
                style={{
                  width: i === activeSlide ? "24px" : "10px",
                  height: "10px",
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

        {/* 3 Big Banner Landscape Cards */}
        {banners.length > 0 && (
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
            {banners.slice(0, 3).map((banner, i) => (
              <div
                key={banner.id}
                onClick={() => setActiveSlide(i)}
                className="overflow-hidden rounded-2xl cursor-pointer"
                style={{
                  border: i === activeSlide
                    ? "2px solid rgba(255,255,255,0.9)"
                    : "2px solid transparent",
                  opacity: i === activeSlide ? 1 : 0.75,
                  transition: "opacity 0.3s ease, border-color 0.3s ease",
                  boxSizing: "border-box",
                }}
              >
                <img
                  src={banner.banner_url}
                  alt={banner.nama}
                  className="w-full h-full object-cover object-center aspect-[16/8] block"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/fallback-brand.png";
                  }}
                />
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}