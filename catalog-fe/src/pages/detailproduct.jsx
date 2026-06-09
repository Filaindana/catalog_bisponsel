import { useState, useRef, useCallback, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { ArrowLeft, Star } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { FiBox, FiUsers, FiTag, FiShield } from "react-icons/fi";
import "swiper/css";


import ProductCard from "../components/ProductCard";
import { getProdukBySlug, getProdukTerkait } from "../utils/services/produkService";
import { getImageUrl } from "../utils/imageHelper";

/* ── Style inject ── */
if (typeof document !== "undefined" && !document.querySelector("[data-detail-style]")) {
  const s = document.createElement("style");
  s.setAttribute("data-detail-style", "true");
  s.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
    .detail-root, .detail-root * { font-family:'Inter',sans-serif !important; box-sizing:border-box; }

    @keyframes scaleIn { from{opacity:0;transform:scale(.97)} to{opacity:1;transform:scale(1)} }
    @keyframes fadeUp  { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }

    .thumb-item { transition: border-color .15s, transform .15s, box-shadow .15s; }
    .thumb-item:hover { transform:scale(1.06); }

    .tab-btn   { transition: color .15s, border-color .15s; }
    .spec-row  { transition: background .13s; }
    .spec-row:hover { background:#f0f4f9 !important; }

    .arrow-btn { transition: background .15s, color .15s, transform .15s; }
    .arrow-btn:hover { background:#072B50 !important; color:#fff !important; transform:scale(1.07); }

    .wa-btn { transition: background .15s, transform .15s, box-shadow .15s; }
    .wa-btn:hover { background:#1ab954 !important; transform:translateY(-2px); box-shadow:0 8px 24px rgba(37,211,102,.32); }

    .badge-g { transition: box-shadow .18s, transform .18s; }
    .badge-g:hover { box-shadow:0 4px 16px rgba(7,43,80,.1); transform:translateY(-1px); }

    /* ── Zoom overlay ── */
    .img-zoom-wrap { position:relative; overflow:hidden; cursor:crosshair; }
    .zoom-lens {
      position:absolute; pointer-events:none; z-index:10;
      border:2px solid rgba(7,43,80,0.55);
      border-radius:8px;
      background:rgba(7,43,80,0.07);
      box-shadow:0 0 0 9999px rgba(255,255,255,0.0);
      display:none;
    }
    .zoom-active .zoom-lens { display:block; }

    /* Zoomed view renders INSIDE the same box via CSS scale+translate */
    .zoom-preview {
      position:absolute; inset:0; z-index:9;
      pointer-events:none;
      overflow:hidden;
      border-radius:inherit;
      display:none;
      background:#fff;
    }
    .zoom-active .zoom-preview { display:block; }
    .zoom-preview img {
      position:absolute;
      max-width:none !important;
      transform-origin:top left;
    }

    /* Pill hint */
    .zoom-hint { transition:opacity .2s; }
    .zoom-active .zoom-hint { opacity:0 !important; }
  `;
  document.head.appendChild(s);
}

const GUARANTEES = [
  { icon: <FiBox size={17}/>,    label: "Stok Terupdate",     sub: "Selalu diperbarui"       },
  { icon: <FiUsers size={17}/>,  label: "Layanan Terbaik",    sub: "Cepat dan responsif"     },
  { icon: <FiTag size={17}/>,    label: "Harga Kompetitif",   sub: "Bersaing dan transparan" },
  { icon: <FiShield size={17}/>, label: "Produk Berkualitas", sub: "Terjamin dan terpercaya" },
];

const NAVY = "#072B50";
const LENS_SIZE = 100; // px
const ZOOM_SCALE = 2.6;

/* ── Image Zoom (overlay style — zoomed view inside same container) ── */
function useZoom() {
  const wrapRef    = useRef(null);
  const lensRef    = useRef(null);
  const previewRef = useRef(null); // the zoomed img inside preview
  const [on, setOn] = useState(false);

  const move = useCallback((e) => {
    const wrap    = wrapRef.current;
    const lens    = lensRef.current;
    const preview = previewRef.current;
    if (!wrap || !lens || !preview) return;

    const rect = wrap.getBoundingClientRect();
    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;

    // clamp lens inside box
    const lx = Math.max(0, Math.min(cx - LENS_SIZE/2, rect.width  - LENS_SIZE));
    const ly = Math.max(0, Math.min(cy - LENS_SIZE/2, rect.height - LENS_SIZE));

    lens.style.left   = lx + "px";
    lens.style.top    = ly + "px";
    lens.style.width  = LENS_SIZE + "px";
    lens.style.height = LENS_SIZE + "px";

    // scale the preview image so the lens region fills the preview panel
    const imgW = rect.width  * ZOOM_SCALE;
    const imgH = rect.height * ZOOM_SCALE;
    preview.style.width  = imgW + "px";
    preview.style.height = imgH + "px";
    preview.style.transform = `translate(${-lx * ZOOM_SCALE}px, ${-ly * ZOOM_SCALE}px)`;
  }, []);

  return { wrapRef, lensRef, previewRef, on, setOn, move };
}

export default function DetailProduct() {
  const navigate = useNavigate();
  const swiperRef = useRef(null);
  const [activeImage, setActiveImage]     = useState(0);
  const [activeTab,   setActiveTab]       = useState("spesifikasi");
  const [selectedColor, setSelectedColor] = useState(0);
  const [quantity, setQuantity]           = useState(1);
  const [saved, setSaved] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const zoom = useZoom();
  const [product, setProduct] = useState(null);

  const fmt = (p) => "Rp " + p.toLocaleString("id-ID").replace(/,/g,".");

  // const { id } = useParams();
  // console.log("Product ID:", id);
  const { slug } = useParams();

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // const data = await getProdukBySlug(slug);
        console.log("SLUG:", slug);
        const response = await getProdukBySlug(slug);
        console.log("DETAIL DATA:", response);

        const data = response?.data || response;

        if (!data) {
          console.error("Produk tidak ditemukan");
          return;
        }
        
        const mapped = {
          id: data.id,
          slug: data.slug,

          name: data.nama,
          price: data.harga,
          stock: data.stok,
          rating: data.rating || 4.5,
          reviews: data.reviews || 0,

          category: data.kategori?.nama || "Produk",
          brand: data.brand?.nama || "-",

          // images: data.images?.length
          //   ? data.images.map(getImageUrl)
          //   : [getImageUrl(data.gambar)],
          images: data.gambar?.length
            ? data.gambar.map((img) => getImageUrl(img.url_gambar))
            : ["/fallback.jpg"],

          colors: data.colors || [],
          colorLabels: data.color_labels || [],

          spec: data.deskripsi, // 🔥 TAMBAH INI
          description: data.deskripsi,
          detailDescription: data.deskripsi_detail,

          specs: data.spesifikasi?.length
            ? data.spesifikasi.map((item) => ({
                attribute: item.atribut,
                detail: item.detail,
              }))
            : [
                { attribute: "Nama", detail: data.nama },
                { attribute: "Stok", detail: data.stok + " unit" },
              ],
        };

        setProduct(mapped);

        if (data.kategori_id) {
          const related = await getProdukTerkait(data.kategori_id, data.id);
          console.log("RELATED RAW:", related);
          console.log("RELATED FIRST:", related[0]);
          console.log("RELATED GAMBAR:", related[0]?.gambar);
          setRelatedProducts(related.map((p) => ({
            id: p.id,
            slug: p.slug,
            name: p.nama,
            category: p.kategori?.nama || "",
            brand: p.brand?.nama || "-",
            price: fmt(p.harga),
            rating: p.rating || 4.5,
            image: p.images?.length
              ? getImageUrl(p.images[0])
              : p.gambar?.length
                ? getImageUrl(p.gambar[0].url_gambar)
                : "/fallback.jpg",
          })));
        }
      } catch (err) {
        console.error("Gagal ambil produk:", err);
      }
    };

    fetchProduct();
  }, [slug]);
  

  if (!product) {
    return <div>Loading...</div>;
  }
  
  return (
    <div className="detail-root bg-[#f5f7fa] min-h-screen">
      {/* tighter max-width + reduced horizontal padding */}
      <div className="px-3 py-5 mx-auto max-w-300 sm:px-5">

        {/* ── BACK ── */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 bg-transparent border-none cursor-pointer text-[13px] text-gray-500 mb-4 px-3 py-1.5 rounded-lg hover:bg-white hover:text-[#072B50] transition-all font-medium"
        >
          <ArrowLeft size={14}/> Kembali
        </button>

        {/* ══ TOP SECTION ══ */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#e8edf4] mb-4 overflow-visible">
          <div className="grid grid-cols-1 gap-0 md:grid-cols-2">

            {/* ── LEFT: MAIN IMAGE + THUMBNAILS BOTTOM ── */}
            <div className="flex flex-col border-b md:border-b-0 md:border-r border-[#f0f4f9]">

              {/* Main image area with zoom */}
              <div className="relative flex-1 flex items-center justify-center bg-[#fafbfc] rounded-tl-2xl rounded-tr-2xl md:rounded-tr-none min-h-75 sm:min-h-90 p-5">

                {/* ── ZOOM WRAP ── */}
                <div
                  ref={zoom.wrapRef}
                  className={`img-zoom-wrap relative w-full h-full flex items-center justify-center rounded-xl ${zoom.on ? "zoom-active" : ""}`}
                  style={{ minHeight: 260 }}
                  onMouseEnter={() => zoom.setOn(true)}
                  onMouseLeave={() => zoom.setOn(false)}
                  onMouseMove={zoom.move}
                >
                  {/* Main product image */}
                  <img
                    key={activeImage}
                    src={product.images?.[activeImage] || product.images?.[0]}
                    onError={(e) => (e.target.src = "/fallback.jpg")}
                    alt={product.name}
                    className="relative z-0 object-contain w-full max-h-75"
                    style={{ animation:"scaleIn .28s ease both" }}
                  />

                  {/* Lens overlay */}
                  <div ref={zoom.lensRef} className="zoom-lens" />

                  {/* Zoomed preview — fills same box, overlays on top */}
                  <div
                    className="zoom-preview rounded-xl"
                    style={{ border:"1.5px solid #dde6f0", boxShadow:"inset 0 0 0 1px rgba(7,43,80,0.06)" }}
                  >
                    <img
                      ref={zoom.previewRef}
                      src={product.images?.[activeImage] || product.images?.[0]}
                      onError={(e) => (e.target.src = "/fallback.jpg")}
                      alt="zoom"
                    />
                  </div>

                  {/* Hint pill */}
                  <div className="zoom-hint absolute bottom-3 right-3 z-20 flex items-center gap-1.5 bg-[#072B50]/75 text-white text-[10px] font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm pointer-events-none"
                    style={{ opacity: zoom.on ? 0 : 1, transition:"opacity .2s" }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                      <line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>
                    </svg>
                    Hover untuk zoom
                  </div>
                </div>

                {/* Prev / Next arrows */}
                <button onClick={() => setActiveImage(p => Math.max(0, p-1))}
                  className="arrow-btn absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white border border-[#e8edf4] shadow-sm cursor-pointer flex items-center justify-center text-base text-gray-500 z-20">
                  ‹
                </button>
                <button onClick={() => setActiveImage(p => Math.min(product.images.length-1, p+1))}
                  className="arrow-btn absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white border border-[#e8edf4] shadow-sm cursor-pointer flex items-center justify-center text-base text-gray-500 z-20">
                  ›
                </button>
              </div>

              {/* ── THUMBNAILS — BOTTOM ── */}
              <div className="flex flex-row gap-2 px-4 py-3 overflow-x-auto border-t border-[#f0f4f9] justify-center">
                {product.images.map((img, i) => (
                  <div
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`thumb-item shrink-0 w-14.5 h-14.5 rounded-xl overflow-hidden cursor-pointer bg-[#f8fafc] flex items-center justify-center border-2 ${
                      activeImage === i
                        ? "border-[#072B50] shadow-md"
                        : "border-[#e8edf4] hover:border-[#a8b8cc]"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-contain p-1.5"/>
                  </div>
                ))}
              </div>
            </div>

            {/* ── RIGHT: PRODUCT INFO ── */}
            <div className="flex flex-col gap-5 p-7 sm:p-8">

              {/* Category + badge */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-bold tracking-widest uppercase text-[#8a9bb0]">{product.category}</span>
                {product.brand && (
                  <span className="text-[10px] font-bold tracking-widest uppercase text-[#8a9bb0]">
                    {product.brand}
                  </span>
                )}
                {/* <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-50 text-green-600 border border-green-100">In Stock</span> */}
              </div>

              {/* Name */}
              <h1 className="text-[28px] font-black text-[#072B50] leading-tight tracking-tight m-0">
                {product.name}
              </h1>
              
              {/* Short Description */}
              {product.spec && (
                <p className="text-[13.5px] text-gray-500 leading-[1.7] m-0">
                  {product.spec}
                </p>
              )}

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {Array.from({length:5},(_,i)=>(
                    <Star key={i} size={14} fill={i<Math.floor(product.rating)?"#f59e0b":"none"} stroke="#f59e0b"/>
                  ))}
                </div>
                <span className="text-[12px] font-semibold text-amber-500">{product.rating}</span>
                <span className="text-[12px] text-gray-400">({product.reviews} reviews)</span>
              </div>

              <div className="h-px bg-[#f0f4f9]" />

              {/* Price */}
              <div>
                <p className="text-[10px] font-bold tracking-widest uppercase text-[#8a9bb0] mb-1">Harga</p>
                <p className="text-[24px] font-black m-0 leading-none text-red-500">{fmt(product.price)}</p>
                {/* <p className="text-[11px] text-emerald-500 font-medium mt-1.5 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block"/>
                  Stok tersedia ({product.stock} unit)
                </p> */}
              </div>

              {/* Color */}
              <div>
                <p className="text-[12px] font-semibold text-gray-600 mb-2">
                  Warna: <span className="font-bold text-[#072B50]">{product.colorLabels?.[selectedColor] || "-"}</span>
                </p>
                <div className="flex gap-2.5">
                  {product.colors.map((color,i)=>(
                    <div key={i} onClick={()=>setSelectedColor(i)} title={product.colorLabels[i]}
                      className="transition-all duration-200 rounded-full cursor-pointer w-7 h-7"
                      style={{
                        backgroundColor:color,
                        outline: selectedColor===i ? `3px solid ${NAVY}` : "3px solid transparent",
                        outlineOffset:"2px",
                        transform: selectedColor===i ? "scale(1.15)" : "scale(1)",
                      }}/>
                  ))}
                </div>
              </div>

              {/* Quantity  */}
              {/* <div>
                <p className="text-[12px] font-semibold text-gray-600 mb-2">Jumlah</p>
                <div className="flex items-center">
                  <button onClick={()=>setQuantity(q=>Math.max(1,q-1))}
                    className="w-9 h-9 border border-[#e8edf4] rounded-l-lg bg-[#f8fafc] cursor-pointer text-lg text-gray-600 hover:bg-[#f0f4f9] transition-colors font-bold">−</button>
                  <div className="w-12 h-9 border-t border-b border-[#e8edf4] flex items-center justify-center text-sm font-bold text-[#072B50]">
                    {quantity}
                  </div>
                  <button onClick={()=>setQuantity(q=>Math.min(product.stock,q+1))}
                    className="w-9 h-9 border border-[#e8edf4] rounded-r-lg bg-[#f8fafc] cursor-pointer text-lg text-gray-600 hover:bg-[#f0f4f9] transition-colors font-bold">+</button>
                  <span className="ml-3 text-[11px] text-gray-400">maks. {product.stock}</span>
                </div>
              </div> */}
             

              {/* WhatsApp */}
              <a
                href={`https://wa.me/6281359271816?text=Halo,%20saya%20ingin%20menanyakan%20produk%20*${encodeURIComponent(product.name)}*%20seharga%20${encodeURIComponent(fmt(product.price))}%20(qty:%20${quantity})`}
                target="_blank" rel="noopener noreferrer"
                className="wa-btn flex items-center justify-center gap-2.5 py-3.5 rounded-xl bg-[#25d366] text-white text-[13px] font-bold no-underline mt-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Tanya via WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* ── GUARANTEE BADGES ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-4">
          {GUARANTEES.map((g,i)=>(
            <div key={i} className="badge-g flex items-center gap-2.5 bg-white rounded-xl border border-[#e8edf4] px-3.5 py-3 cursor-default">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg shrink-0" style={{background:"#f0f4f9",color:NAVY}}>
                {g.icon}
              </div>
              <div>
                <p className="text-[12px] font-bold text-[#072B50] m-0">{g.label}</p>
                <p className="text-[10px] text-gray-400 m-0 font-medium">{g.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── TAB DESKRIPSI / SPESIFIKASI ── */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#e8edf4] mb-4 overflow-hidden">
          <div className="flex border-b border-[#f0f4f9]">
            {["deskripsi","spesifikasi"].map(tab=>(
              <button key={tab} onClick={()=>setActiveTab(tab)}
                className={`tab-btn px-6 py-3.5 border-none bg-transparent cursor-pointer text-[13px] capitalize font-semibold -mb-px ${
                  activeTab===tab
                    ? "text-[#072B50] border-b-[3px] border-[#072B50]"
                    : "text-gray-400 border-b-[3px] border-transparent hover:text-gray-600"
                }`}>
                {tab.charAt(0).toUpperCase()+tab.slice(1)}
              </button>
            ))}
          </div>
          <div className="p-6">
            {activeTab==="deskripsi" ? (
              // <p className="text-[13.5px] text-gray-600 leading-[1.85] m-0">{product.detailDescription || product.description}</p>
              <div className="space-y-5">
                {(product.detailDescription || product.description)
                  ?.split("\n\n")
                  .filter((p) => p.trim() !== "")
                  .map((paragraph, index) => (
                    <p
                      key={index}
                      className={`text-[13.5px] leading-[1.85] m-0 ${
                        index === 0
                          ? "text-gray-800 font-medium"
                          : "text-gray-600"
                      }`}
                    >
                      {paragraph.trim()}
                    </p>
                  ))}
              </div>
            ) : (
              <div className="overflow-x-auto rounded-xl border border-[#e8edf4] overflow-hidden">
                <table className="w-full border-collapse">
                  <thead>
                    <tr style={{background:NAVY}}>
                      <th className="px-5 py-3 text-left text-[12px] font-semibold text-white w-2/5 tracking-wide">Atribut</th>
                      <th className="px-5 py-3 text-left text-[12px] font-semibold text-white tracking-wide">Detail</th>
                    </tr>
                  </thead>
                  <tbody>
                    {product.specs.map((spec,i)=>(
                      <tr key={i} className={`spec-row ${i%2===0?"bg-white":"bg-[#fafbfc]"}`}>
                        <td className="px-5 py-3 text-[13px] font-semibold border-b border-[#f0f4f9]" style={{color:NAVY}}>{spec.attribute}</td>
                        <td className="px-5 py-3 text-[13px] text-gray-500 border-b border-[#f0f4f9]">{spec.detail}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* ── RELATED PRODUCTS ── */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#e8edf4] p-5">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-1 h-5 rounded-full" style={{background:NAVY}}/>
            <h2 className="text-[16px] font-black text-[#072B50] m-0 tracking-tight">Produk Terkait</h2>
          </div>
          <div className="flex items-center gap-2.5">
            <button onClick={()=>swiperRef.current?.slidePrev()}
              className="arrow-btn w-9 h-9 min-w-9 rounded-full bg-white border border-[#e8edf4] shadow-sm cursor-pointer flex items-center justify-center text-lg text-gray-600">‹</button>
            <div className="flex-1 min-w-0">
              <Swiper onSwiper={s=>(swiperRef.current=s)} spaceBetween={12} slidesPerView={5}
                loop={relatedProducts.length >= 5}
                breakpoints={{
                  320:{slidesPerView:1.5,spaceBetween:10},
                  480:{slidesPerView:2.5,spaceBetween:11},
                  640:{slidesPerView:3,spaceBetween:12},
                  1024:{slidesPerView:5,spaceBetween:12},
                }}>
                {relatedProducts.length === 0 ? (
                  <SwiperSlide>
                    <p className="py-4 text-sm text-gray-400">Tidak ada produk terkait.</p>
                  </SwiperSlide>
                ) : relatedProducts.map((item, index) => (
                  <SwiperSlide key={item.id}>
                    <ProductCard compact
                      product={item}
                      saved={saved[index]}
                      onToggleSave={() => setSaved(prev => { const u = [...prev]; u[index] = !u[index]; return u; })}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <button onClick={()=>swiperRef.current?.slideNext()}
              className="arrow-btn w-9 h-9 min-w-9 rounded-full bg-white border border-[#e8edf4] shadow-sm cursor-pointer flex items-center justify-center text-lg text-gray-600">›</button>
          </div>
        </div>

      </div>
    </div>
  );
}