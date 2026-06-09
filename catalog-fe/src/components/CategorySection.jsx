import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, FreeMode, Autoplay } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import kategoriService from "../utils/services/kategoriService";

import "swiper/css";
import "swiper/css/free-mode";

function CategoryItem({ item, onClick }) {
  const imageUrl = item.gambar_url || "/fallback-category.jpg";

  return (
    <div
      onClick={onClick}
      className="flex flex-col items-center w-full gap-2 py-3 cursor-pointer"
    >
      <div
        className="w-20 h-20 sm:w-22.5 sm:h-22.5 md:w-25 md:h-25

        rounded-full bg-gray-100 flex items-center justify-center overflow-hidden

        border-2 border-transparent hover:border-[#072B50] hover:scale-105

        transition-all duration-200 shadow-md"
      >
        <img
          src={imageUrl}
          alt={item.nama}
          onError={(e) => {
            e.target.onerror = null;

            e.target.src = "/fallback-category.jpg";
          }}
          className="object-cover w-full h-full"
        />
      </div>

      <span className="text-[12px] sm:text-[13px] md:text-[14px] font-semibold text-center text-gray-700 leading-tight">
        {item.nama}
      </span>
    </div>
  );
}

export default function CategorySection() {
  const navigate = useNavigate();
  const swiperRef = useRef(null);

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await kategoriService.getCategories();
      setCategories(res?.data || []);
    } catch (err) {
      console.error("Failed to load categories:", err);
      setError("Gagal memuat kategori produk. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleCategoryClick = (category) => {
    navigate(`/product?kategori=${category.slug}`);
  };

  if (loading) {
    return (
      <section className="py-10 bg-white md:py-15 animate-pulse">
        <h2 className="mb-6 text-center section-title md:mb-9">
          Product Category
        </h2>
        <div className="relative px-4 mx-auto max-w-350 sm:px-6 md:px-18">
          <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-7">
            {Array.from({ length: 7 }).map((_, idx) => (
              <div key={idx} className="flex flex-col items-center gap-3 py-3">
                <div className="w-20 h-20 sm:w-22.5 sm:h-22.5 md:w-25 md:h-25 rounded-full bg-gray-200" />
                <div className="w-16 h-3 bg-gray-200 rounded" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-10 bg-white md:py-15">
        <h2 className="mb-6 text-center section-title md:mb-9">
          Product Category
        </h2>
        <div className="flex flex-col items-center justify-center max-w-md gap-3 px-4 py-6 mx-auto text-center">
          <p className="text-[14px] text-red-500 font-medium m-0">{error}</p>
          <button
            onClick={loadCategories}
            className="px-4 py-2 text-[13px] font-bold text-white rounded-xl border-none cursor-pointer transition-all hover:opacity-90"
            style={{ background: "#072B50" }}
          >
            Coba Lagi
          </button>
        </div>
      </section>
    );
  }

  if (categories.length === 0) {
    return (
      <section className="py-10 bg-white md:py-15">
        <h2 className="mb-6 text-center section-title md:mb-9">
          Product Category
        </h2>
        <div className="flex flex-col items-center justify-center px-4 py-10 text-center">
          <p className="text-[14px] text-gray-400 font-semibold m-0">
            Belum ada kategori tersedia.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-10 bg-white md:py-15">
      <h2 className="mb-6 text-center section-title md:mb-9">
        Product Category
      </h2>

      <div className="relative px-4 mx-auto max-w-350 sm:px-6 md:px-18">
        {/* LEFT BUTTON */}
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-10
          w-10 h-10 rounded-full bg-white shadow-md items-center justify-center
          text-gray-500 hover:bg-[#072B50] hover:text-white transition-all"
        >
          <ChevronLeft size={18} />
        </button>

        {/* RIGHT BUTTON */}
        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-10
          w-10 h-10 rounded-full bg-white shadow-md items-center justify-center
          text-gray-500 hover:bg-[#072B50] hover:text-white transition-all"
        >
          <ChevronRight size={18} />
        </button>

        <Swiper
          modules={[Mousewheel, FreeMode, Autoplay]}
          onSwiper={(s) => {
            swiperRef.current = s;
          }}
          loop={false}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          mousewheel={{ forceToAxis: true }}
          freeMode
          spaceBetween={10}
          slidesPerView={3}
          breakpoints={{
            480: { slidesPerView: 4, spaceBetween: 10 },
            640: { slidesPerView: 5, spaceBetween: 12 },
            1024: { slidesPerView: 7, spaceBetween: 16 },
          }}
        >
          {categories.map((item) => (
            <SwiperSlide key={item.id} className="flex justify-center">
              <CategoryItem
                item={item}
                onClick={() => handleCategoryClick(item)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
