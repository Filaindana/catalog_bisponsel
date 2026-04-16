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
      className="h-40 overflow-hidden sm:h-55 md:h-70 lg:h-80 rounded-2xl"
    >
      {banners.map((_, i) => (
        <SwiperSlide key={i}>
          <div className="flex items-center justify-center h-full text-lg font-semibold text-gray-700 bg-slate-300">
            Banner {i + 1}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}