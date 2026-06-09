import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPromoById } from "../utils/services/promoService";
import { getImageUrl } from "../utils/imageHelper";

const formatRange = (startStr, endStr) => {
  const start = new Date(startStr);
  const end = new Date(endStr);

  const formatMonth = (d) =>
    new Intl.DateTimeFormat("id-ID", { month: "short" }).format(d);

  const startDay = start.getDate();
  const endDay = end.getDate();
  const startMonth = formatMonth(start);
  const endMonth = formatMonth(end);
  const startYear = start.getFullYear();
  const endYear = end.getFullYear();

  if (startYear !== endYear) {
    return `${startDay} ${startMonth} ${startYear} - ${endDay} ${endMonth} ${endYear}`;
  }

  if (startMonth === endMonth) {
    return `${startDay} - ${endDay} ${startMonth} ${startYear}`;
  }

  return `${startDay} ${startMonth} - ${endDay} ${endMonth} ${startYear}`;
};



export default function PromoDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [promo, setPromo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPromo = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const data = await getPromoById(id);
        console.log("PROMO DETAIL:", data);
        setPromo(data);
      } catch (err) {
        console.error("Error loading promo detail:", err);
        setError("Gagal memuat detail promo.");
      } finally {
        setLoading(false);
      }
    };

    fetchPromo();
  }, [id]);

  return (
    <div className="min-h-screen bg-[#f5f7fa] py-10 px-5 md:px-12">
      <div className="mx-auto max-w-7xl">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#dbe2eb] bg-white px-4 py-2 text-sm font-semibold text-[#334155] shadow-sm transition hover:border-[#a1b4cc]"
        >
          ← Kembali ke Promo
        </button>

        {loading && (
          <div className="rounded-3xl bg-white p-12 text-center text-[#1e293b] shadow-sm">
            Memuat detail promo...
          </div>
        )}

        {error && !loading && (
          <div className="p-12 text-center text-red-600 bg-white shadow-sm rounded-3xl">
            {error}
          </div>
        )}

        {!loading && !error && !promo && (
          <div className="rounded-3xl bg-white p-12 text-center text-[#334155] shadow-sm">
            Promo tidak ditemukan.
          </div>
        )}

        {!loading && promo && (
          <div className="grid gap-8 lg:grid-cols-[1.4fr_0.9fr]">
            <div className="space-y-6">
              <div className="overflow-hidden bg-white shadow-sm rounded-3xl">
                <img
                  src={getImageUrl(promo.banner_url || promo.banner) || "/fallback.jpg"}
                  alt={promo.name}
                  className="object-cover w-full"
                  style={{ height: 360 }}
                  onError={(e) => {
                    e.currentTarget.src = "/fallback.jpg";
                  }}
                />
              </div>

              <div className="p-8 bg-white shadow-sm rounded-3xl">
                <h1 className="text-3xl font-black text-[#0f172a] mb-4">
                  {promo.name}
                </h1>
                <p className="text-[15px] leading-relaxed text-[#475569] mb-6">
                  {promo.desc || "Tidak ada deskripsi promo tersedia."}
                </p>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-[#e2e8f0] bg-[#f8fafc] p-5">
                    <div className="text-xs uppercase tracking-[0.22em] text-[#64748b] mb-3">
                      Tanggal Mulai
                    </div>
                    <div className="text-base font-semibold text-[#0f172a]">
                      {promo.startDate || "-"}
                    </div>
                  </div>
                  <div className="rounded-2xl border border-[#e2e8f0] bg-[#f8fafc] p-5">
                    <div className="text-xs uppercase tracking-[0.22em] text-[#64748b] mb-3">
                      Tanggal Selesai
                    </div>
                    <div className="text-base font-semibold text-[#0f172a]">
                      {promo.endDate || "-"}
                    </div>
                  </div>
                </div>

                <div className="mt-6 rounded-2xl border border-[#e2e8f0] bg-[#ffffff] p-5">
                  <div className="text-xs uppercase tracking-[0.22em] text-[#64748b] mb-3">
                    Periode Promo
                  </div>
                  <div className="text-base font-semibold text-[#0f172a]">
                    {formatRange(promo.startDate, promo.endDate)}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="p-8 bg-white shadow-sm rounded-3xl">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <p className="text-sm uppercase tracking-[0.22em] text-[#64748b] mb-2">
                      Produk Terkait
                    </p>
                    <h2 className="text-xl font-black text-[#0f172a]">
                      {promo.products?.length ?? 0} Produk
                    </h2>
                  </div>
                </div>
                
                {promo.products?.length > 0 ? (
                <div className="grid gap-4">
                    {promo.products.map((product) => (
                    <div
                        key={product.id}
                        onClick={() => {
                        if (product?.slug) {
                            navigate(`/product/${product.slug}`);
                        } else {
                            console.warn("Slug kosong!", product);
                        }
                        }}
                        className="grid gap-4 rounded-3xl border border-[#e2e8f0] bg-[#f8fafc] p-4 sm:grid-cols-[120px_1fr] cursor-pointer transition-all duration-200 hover:border-[#072B50] hover:shadow-lg"
                    >
                        <div className="overflow-hidden bg-white rounded-2xl">
                        <img
                            src={product.image || "/fallback.jpg"}
                            alt={product.name}
                            className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                            onError={(e) => {
                            e.currentTarget.src = "/fallback.jpg";
                            }}
                        />
                        </div>

                        <div className="flex flex-col justify-between gap-3">
                        <div>
                            <p className="text-sm font-semibold text-[#334155] mb-1">
                            {product.name}
                            </p>

                            <p className="text-xs text-[#64748b]">
                            {product.category || "Produk"}
                            </p>
                        </div>

                        <div className="flex flex-col gap-2">
                            <span className="text-base font-bold text-[#0f172a]">
                            {product.price}
                            </span>

                            {product.originalPrice && (
                            <span className="text-xs line-through text-[#94a3b8]">
                                {product.originalPrice}
                            </span>
                            )}
                        </div>
                        </div>
                    </div>
                    ))}
                </div>
                ) : (
                <div className="rounded-3xl border border-dashed border-[#cbd5e1] bg-white p-8 text-center text-[#64748b]">
                    Tidak ada produk terkait untuk promo ini.
                </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
