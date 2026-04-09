import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

export default function BannerSlider() {
  const banners = [1, 2, 3];

  return (
    <Swiper
      modules={[Pagination, Autoplay]}
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      loop
      className="h-[160px] sm:h-[220px] md:h-[280px] lg:h-[320px] rounded-2xl overflow-hidden"
    >
      {banners.map((_, i) => (
        <SwiperSlide key={i}>
          <div className="h-full bg-slate-300 flex items-center justify-center text-lg font-semibold text-gray-700">
            Banner {i + 1}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}