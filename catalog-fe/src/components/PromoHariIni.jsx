import { useRef, useState, useEffect } from "react";
import ProductCard from "./ProductCard.jsx";
import { getActivePromoProducts } from "../utils/services/promoService.js";

function useCountdown(targetSeconds) {
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
  const scrollRef  = useRef(null);

  const [products, setProducts] = useState([]);
  const [saved, setSaved] = useState([]);

  const isDragging = useRef(false);
  const startX     = useRef(0);
  const scrollLeft = useRef(0);

  const [hours, minutes, secs] = useCountdown(6 * 3600 + 16 * 60 + 40);

  const onMouseDown = (e) => {
    const target = e.target;
    if (!target.closest(".ph-img-wrap")) return;
    isDragging.current = true;
    startX.current = e.pageX - (scrollRef.current?.offsetLeft ?? 0);
    scrollLeft.current = scrollRef.current?.scrollLeft ?? 0;
  };

  const onMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - (scrollRef.current?.offsetLeft ?? 0);
    const walk = (x - startX.current) * 1.5;
    if (scrollRef.current) scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const stopDrag = () => { isDragging.current = false; };
  const scrollBy = (dir) => {
    if (scrollRef.current) scrollRef.current.scrollLeft += dir * 280;
  };

  useEffect(() => {
  const fetchData = async () => {
    try {
      const data = await getActivePromoProducts();
      setProducts(data);
      setSaved(data.map(() => false));
      
      console.log("PROMO PRODUCTS:", data);
    } catch (err) {
      console.error(err);
    }
  };

  fetchData();
}, []);

  return (
    <section className="py-12.5 bg-white">
      <div className="px-10 mx-auto max-w-350">

        {/* HEADER */}
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-7">
          <h2 className="section-title m-0 border-l-[5px] border-[#072B50] pl-3.5">
            Promo Spesial Hari Ini
          </h2>

          <div className="flex items-center justify-between w-full gap-4 md:justify-end md:w-auto">

            {/* COUNTDOWN */}
            <div className="flex items-center gap-1.5">
              <span className="text-[14px] font-semibold text-gray-500">End in</span>
              <div className="ph-countdown-box">{hours}</div>
              <span className="text-[20px] font-extrabold text-gray-900 mx-0.5">:</span>
              <div className="ph-countdown-box">{minutes}</div>
              <span className="text-[20px] font-extrabold text-gray-900 mx-0.5">:</span>
              <div className="ph-countdown-box">{secs}</div>
            </div>

            {/* ARROWS */}
            <div className="flex gap-2">
              {[["‹", -1], ["›", 1]].map(([icon, dir]) => (
                <button
                  key={dir}
                  onClick={() => scrollBy(dir)}
                  className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-xl text-gray-600 border border-gray-200 shadow-md transition-all duration-200 hover:bg-[#072B50] hover:text-white hover:border-[#072B50]"
                >
                  {icon}
                </button>
              ))}
            </div>

          </div>
        </div>

        {/* SCROLL TRACK */}
        
        <div className="pb-2 -mb-2 overflow-hidden">
          <div
            ref={scrollRef}
            className="flex gap-5 px-1 pt-2 pb-4 overflow-x-auto no-scrollbar scroll-smooth"
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={stopDrag}
            onMouseLeave={stopDrag}
          >
            {products.length === 0 ? (
              <p className="text-gray-400">Loading promo...</p>
            ) : (
              products.map((product, index) => (
                <div key={`${product.id}-${index}`}  className="flex-[0_0_220px] min-w-55">
                  <ProductCard
                    product={product}
                    saved={saved[index]}
                    onToggleSave={() => {
                      setSaved(prev => {
                        const u = [...prev];
                        u[index] = !u[index];
                        return u;
                      });
                    }}
                    variant="promo"
                  />
                </div>
              ))
            )}
          </div>
        </div>


      </div>
    </section>
  );
}