import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { ArrowLeft, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "swiper/css";

import laptopImg from "../assets/laptop.png";
import mouseImg from "../assets/mouse.png";
import keyboardImg from "../assets/keyboard.png";
import soundImg from "../assets/sound.png";
import monitorImg from "../assets/monitor.png";
import ProductCard from "../components/ProductCard";

const product = {
  name: "PC Gaming Pro Ryzen Edition",
  category: "Komputer (PC)",
  price: 17499000,
  rating: 4.8,
  reviews: 120,
  stock: 15,
  colors: ["#1e1e1e", "#1a3a5c", "#5c1a1a", "#2d5c1a"],
  images: [monitorImg, laptopImg, mouseImg, keyboardImg, soundImg],
  description:
    "PC Gaming Pro Ryzen Edition adalah komputer gaming performa tinggi yang dirancang untuk memberikan pengalaman gaming terbaik. Dilengkapi dengan prosesor AMD Ryzen 7 terbaru dan GPU RTX 4060 yang powerful.",
  specs: [
    { attribute: "Prosesor", detail: "AMD Ryzen 7 7700X" },
    { attribute: "GPU", detail: "NVIDIA RTX 4060 8GB" },
    { attribute: "RAM", detail: "16GB DDR5 5600MHz" },
    { attribute: "Storage", detail: "SSD NVMe 1TB" },
    { attribute: "Motherboard", detail: "B650 ATX" },
    { attribute: "PSU", detail: "650W 80+ Gold" },
    { attribute: "Case", detail: "ATX Mid Tower RGB" },
    { attribute: "OS", detail: "Windows 11 Home" },
  ],
};

const relatedProducts = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
  name: "PC Gaming Pro Ryzen Edition",
  category: "Komputer (PC)",
  price: 17499000,
  rating: 4.8,
  image: [monitorImg, laptopImg, mouseImg, keyboardImg, soundImg][i % 5],
}));

export default function DetailProduct() {
  const navigate = useNavigate();
  const swiperRef = useRef(null);
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState("spesifikasi");
  const [selectedColor, setSelectedColor] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [saved, setSaved] = useState(relatedProducts.map(() => false));

  const formatPrice = (price) =>
    "Rp " + price.toLocaleString("id-ID").replace(/,/g, ".");

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-5 py-6">

        {/* BACK BUTTON */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 bg-transparent border-none cursor-pointer text-sm text-gray-700 mb-6 px-3 py-1.5 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <ArrowLeft size={16} /> Kembali
        </button>

        {/* TOP SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-[80px_1fr_1fr] gap-5 bg-white rounded-2xl p-6 shadow-sm mb-6">

          {/* THUMBNAIL */}
          <div className="flex md:flex-col flex-row gap-2.5 overflow-x-auto md:overflow-visible">
            {product.images.map((img, i) => (
              <div
                key={i}
                onClick={() => setActiveImage(i)}
                className={`w-[70px] h-[70px] flex-shrink-0 rounded-lg overflow-hidden cursor-pointer bg-gray-50 flex items-center justify-center transition-all ${
                  activeImage === i
                    ? "border-2 border-[#072B50]"
                    : "border-2 border-gray-200"
                }`}
              >
                <img
                  src={img}
                  alt=""
                  className="w-full h-full object-contain p-1"
                />
              </div>
            ))}
          </div>

          {/* GAMBAR BESAR */}
          <div className="bg-gray-50 rounded-xl flex items-center justify-center p-5 relative">
            <button
              onClick={() => setActiveImage((prev) => Math.max(0, prev - 1))}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white border border-gray-200 cursor-pointer flex items-center justify-center text-base z-10 hover:bg-gray-100 transition-colors"
            >
              ‹
            </button>
            <img
              src={product.images[activeImage]}
              alt={product.name}
              className="w-full max-h-[340px] object-contain"
            />
            <button
              onClick={() =>
                setActiveImage((prev) =>
                  Math.min(product.images.length - 1, prev + 1)
                )
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white border border-gray-200 cursor-pointer flex items-center justify-center text-base z-10 hover:bg-gray-100 transition-colors"
            >
              ›
            </button>
          </div>

          {/* INFO PRODUK */}
          <div className="flex flex-col gap-3.5">
            <p className="text-xs text-gray-500 m-0">{product.category}</p>
            <h1 className="text-[22px] font-bold text-gray-900 m-0 leading-tight">
              {product.name}
            </h1>

            {/* RATING */}
            <div className="flex items-center gap-1.5">
              {Array.from({ length: 5 }, (_, i) => (
                <Star
                  key={i}
                  size={16}
                  fill={i < Math.floor(product.rating) ? "#f59e0b" : "none"}
                  stroke="#f59e0b"
                />
              ))}
              <span className="text-[13px] text-gray-500">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            {/* HARGA */}
            <p className="text-[26px] font-extrabold text-red-500 m-0">
              {formatPrice(product.price)}
            </p>

            {/* STOK */}
            <p className="text-[13px] text-emerald-500 m-0 font-medium">
              ✓ Stok tersedia ({product.stock} unit)
            </p>

            {/* WARNA */}
            <div>
              <p className="text-[13px] font-semibold text-gray-700 m-0 mb-2">
                Colour
              </p>
              <div className="flex gap-2">
                {product.colors.map((color, i) => (
                  <div
                    key={i}
                    onClick={() => setSelectedColor(i)}
                    className={`w-7 h-7 rounded-full cursor-pointer transition-all ${
                      selectedColor === i
                        ? "outline outline-2 outline-blue-300 border-[3px] border-[#072B50]"
                        : "border-[3px] border-transparent"
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            {/* QUANTITY */}
            <div>
              <p className="text-[13px] font-semibold text-gray-700 m-0 mb-2">
                Jumlah
              </p>
              <div className="flex items-center">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-9 h-9 border border-gray-200 rounded-l-lg bg-gray-50 cursor-pointer text-lg text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  −
                </button>
                <div className="w-12 h-9 border-t border-b border-gray-200 flex items-center justify-center text-sm font-semibold">
                  {quantity}
                </div>
                <button
                  onClick={() =>
                    setQuantity((q) => Math.min(product.stock, q + 1))
                  }
                  className="w-9 h-9 border border-gray-200 rounded-r-lg bg-gray-50 cursor-pointer text-lg text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* TOMBOL WA */}
            <div className="mt-1">
              <a
                href={`https://wa.me/6281359271816?text=Halo,%20saya%20ingin%20menanyakan%20produk%20*${encodeURIComponent(product.name)}*%20seharga%20${encodeURIComponent(formatPrice(product.price))}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 rounded-xl bg-[#25d366] text-white text-sm font-bold no-underline hover:bg-[#1ebe5d] transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="white"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Tanya via WhatsApp
              </a>
            </div>
          </div>
        </div>
        {/* tutup TOP SECTION */}

        {/* TAB DESKRIPSI / SPESIFIKASI */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
          <div className="flex border-b-2 border-gray-100 mb-6">
            {["deskripsi", "spesifikasi"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2.5 border-none bg-transparent cursor-pointer text-sm capitalize transition-all -mb-0.5 ${
                  activeTab === tab
                    ? "font-bold text-[#072B50] border-b-[3px] border-[#072B50]"
                    : "font-medium text-gray-500 border-b-[3px] border-transparent"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {activeTab === "deskripsi" ? (
            <p className="text-sm text-gray-700 leading-relaxed m-0">
              {product.description}
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#072B50]">
                    <th className="px-4 py-3 text-left text-[13px] font-semibold text-white w-2/5">
                      Attribute
                    </th>
                    <th className="px-4 py-3 text-left text-[13px] font-semibold text-white">
                      Details
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {product.specs.map((spec, i) => (
                    <tr
                      key={i}
                      className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}
                    >
                      <td className="px-4 py-3 text-[13px] text-gray-700 font-medium border-b border-gray-100">
                        {spec.attribute}
                      </td>
                      <td className="px-4 py-3 text-[13px] text-gray-500 border-b border-gray-100">
                        {spec.detail}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* RELATED PRODUCTS */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 m-0 mb-5 text-center">
            Related Products
          </h2>
          <div className="flex items-center gap-3">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="w-9 h-9 min-w-[36px] rounded-full bg-white border border-gray-200 shadow cursor-pointer flex items-center justify-center text-lg text-gray-700 transition-all hover:bg-[#072B50] hover:text-white"
            >
              ‹
            </button>

            <div className="flex-1 min-w-0">
              <Swiper
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                spaceBetween={16}
                slidesPerView={5}
                breakpoints={{
                  320: { slidesPerView: 1.5 },
                  640: { slidesPerView: 3 },
                  1024: { slidesPerView: 5 },
                }}
              >
                {relatedProducts.map((item, index) => (
                  <SwiperSlide key={item.id}>
                    <ProductCard
                      product={{
                        id: item.id,
                        category: item.category,
                        name: item.name,
                        price: formatPrice(item.price),
                        rating: item.rating,
                        image: item.image,
                      }}
                      saved={saved[index]}
                      onToggleSave={() =>
                        setSaved((prev) => {
                          const u = [...prev];
                          u[index] = !u[index];
                          return u;
                        })
                      }
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="w-9 h-9 min-w-[36px] rounded-full bg-white border border-gray-200 shadow cursor-pointer flex items-center justify-center text-lg text-gray-700 transition-all hover:bg-[#072B50] hover:text-white"
            >
              ›
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}