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
      autoplay={{ delay: 3000 }}
      loop
      style={{ height: "100%" }}
    >
      {banners.map((_, i) => (
        <SwiperSlide key={i}>
          <div className="h-full bg-slate-300 flex items-center justify-center">
            Banner {i + 1}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
