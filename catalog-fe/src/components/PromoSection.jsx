import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import Banner1Img from "../assets/banner1.jpg";
import Banner2Img from "../assets/banner2.jpg";
import Banner3Img from "../assets/banner3.jpg";
import Banner4Img from "../assets/banner4.jpg";

const banners = [
  { image: Banner1Img, alt: "Banner 1" },
  { image: Banner2Img, alt: "Banner 2" },
  { image: Banner3Img, alt: "Banner 3" },
  { image: Banner4Img, alt: "Banner 4" },
];

export default function PromoSection() {
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="bg-[#072B50] py-6 md:py-10">
      <div className="max-w-[1100px] mx-auto px-4 md:px-5">
        
        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-3 md:h-[380px]">
          
          {/* LEFT BIG BANNER */}
          <div className="rounded-xl overflow-hidden h-[220px] md:h-full border border-white/15">
            <Swiper
              modules={[Autoplay, Pagination]}
              pagination={{ clickable: true }}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              loop={false}
              onSwiper={(swiper) => setSwiperInstance(swiper)}
              onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
              className="w-full h-full"
            >
              {banners.map((banner, index) => (
                <SwiperSlide
                  key={index}
                  className="flex items-center justify-center bg-transparent"
                >
                  <img
                    src={banner.image}
                    alt={banner.alt}
                    className="w-full h-full object-contain block"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* RIGHT THUMBNAIL */}
          <div className="grid grid-cols-2 grid-rows-2 gap-2 md:gap-2.5 h-[200px] md:h-full">
            {banners.map((card, index) => (
              <div
                key={index}
                onClick={() => {
                  swiperInstance?.slideTo(index);
                  setActiveIndex(index);
                }}
                className={`rounded-lg overflow-hidden cursor-pointer flex items-center justify-center transition-all duration-200 ${
                  activeIndex === index
                    ? "outline outline-[3px] outline-blue-400"
                    : "outline outline-[3px] outline-transparent"
                }`}
              >
                <img
                  src={card.image}
                  alt={card.alt}
                  className={`w-full h-full object-contain block transition-all duration-300 ${
                    activeIndex === index ? "opacity-100" : "opacity-60"
                  } hover:scale-105`}
                />
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}