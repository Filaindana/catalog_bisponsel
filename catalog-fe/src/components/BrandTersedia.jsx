import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

export default function BrandSection() {
  const navigate = useNavigate();
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const data = await api("/brands");
        setBrands(Array.isArray(data) ? data : (data?.data || []));
      } catch (error) {
        console.error("Error fetching brands:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBrands();
  }, []);

  if (loading) {
    return (
      <section className="py-10 md:py-12.5 bg-white">
        <h2 className="mb-6 text-center section-title md:mb-8">
          Brand Tersedia
        </h2>
        <div className="flex justify-center items-center h-16">
          <div className="w-6 h-6 border-b-2 border-[#072B50] rounded-full animate-spin"></div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-10 md:py-12.5 bg-white">
      
      <h2 className="mb-6 text-center section-title md:mb-8">
        Brand Tersedia
      </h2>

      <div className="grid grid-cols-3 px-4 mx-auto max-w-250 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-y-6 gap-x-4 sm:gap-x-6">
        {brands.map((brand) => (
          <div
            key={brand.id}
            onClick={() => navigate(`/product?brand=${encodeURIComponent(brand.nama)}`)}
            className="flex flex-col items-center justify-center transition-all duration-300 cursor-pointer opacity-90 hover:opacity-100 hover:scale-110 active:scale-95"
            title={brand.nama}
          >
            <img
              src={brand.logo}
              alt={brand.nama}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/fallback-brand.png";
              }}
              className="h-7 sm:h-8 md:h-9 object-contain max-w-22.5"
            />
          </div>
        ))}
      </div>

    </section>
  );
}