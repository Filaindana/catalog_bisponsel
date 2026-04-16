import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, FreeMode } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "swiper/css";
import "swiper/css/free-mode";

import keyboardImg   from "/src/assets/keyboard.png";
import kabellanImg   from "/src/assets/kabel.png";
import laptopImg     from "/src/assets/laptop.png";
import soundImg      from "/src/assets/sound.png";
import mouseImg      from "/src/assets/mouse.png";
import pcImg         from "/src/assets/monitor.png";
import handphoneImg  from "/src/assets/handphone.png";

function CategoryItem({ item, onClick }) {
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
          src={item.image}
          alt={item.name}
          className="w-[60%] h-[60%] object-contain"
        />
      </div>

      <span className="text-[12px] sm:text-[13px] md:text-[14px] font-semibold text-center text-gray-700 leading-tight">
        {item.name}
      </span>
    </div>
  );
}

export default function CategorySection() {
  const navigate = useNavigate();

  const categories = [
    { name: "Keyboard",      image: keyboardImg },
    { name: "Kabel Lan",     image: kabellanImg },
    { name: "Laptop",        image: laptopImg },
    { name: "Speaker",       image: soundImg },
    { name: "Mouse",         image: mouseImg },
    { name: "Komputer (PC)", image: pcImg },
    { name: "Handphone",     image: handphoneImg },
    { name: "Handphone",     image: handphoneImg },
    { name: "Handphone",     image: handphoneImg },
  ];

  const [swiper, setSwiper] = useState(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const handleCategoryClick = (categoryName) => {
    navigate(`/product?category=${encodeURIComponent(categoryName)}`);
  };

  return (
    <section className="py-10 bg-white md:py-15">
      <h2 className="mb-6 text-center section-title md:mb-9">
        Product Category
      </h2>

      <div className="relative px-4 mx-auto max-w-350 sm:px-6 md:px-18">

        {/* LEFT BUTTON */}
        {!isBeginning && (
          <button
            onClick={() => swiper?.slidePrev()}
            className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 
            w-10 h-10 rounded-full bg-white shadow-md items-center justify-center 
            text-gray-500 hover:bg-[#072B50] hover:text-white transition-all"
          >
            <ChevronLeft size={18} />
          </button>
        )}

        {/* RIGHT BUTTON */}
        {!isEnd && (
          <button
            onClick={() => swiper?.slideNext()}
            className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 
            w-10 h-10 rounded-full bg-white shadow-md items-center justify-center 
            text-gray-500 hover:bg-[#072B50] hover:text-white transition-all"
          >
            <ChevronRight size={18} />
          </button>
        )}

        <Swiper
          modules={[Mousewheel, FreeMode]}
          onSwiper={setSwiper}
          onSlideChange={(s) => {
            setIsBeginning(s.isBeginning);
            setIsEnd(s.isEnd);
          }}
          mousewheel={{ forceToAxis: true }}
          freeMode
          spaceBetween={10}
          slidesPerView={3}
          breakpoints={{
            480:  { slidesPerView: 4, spaceBetween: 10 },
            640:  { slidesPerView: 5, spaceBetween: 12 },
            1024: { slidesPerView: 7, spaceBetween: 16 },
          }}
        >
          {categories.map((item, index) => (
            <SwiperSlide key={index} className="flex justify-center">
              <CategoryItem
                item={item}
                onClick={() => handleCategoryClick(item.name)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}