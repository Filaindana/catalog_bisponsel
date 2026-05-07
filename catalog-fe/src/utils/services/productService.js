import api from "../api";

/* ─────────────────────────────
   QUERY BUILDER
───────────────────────────── */
const buildParams = (filters) => {
  const params = {};

  if (filters.search) params.search = filters.search;
  if (filters.maxPrice) params.max_price = filters.maxPrice;

  if (filters.categories?.length) {
    params["category[]"] = filters.categories;
  }

  if (filters.status?.length) {
    params["status[]"] = filters.status;
  }

  if (filters.discounts?.length) {
    params["discounts[]"] = filters.discounts;
  }

  switch (filters.sortBy) {
    case "Harga Terendah":
      params.sort = "price_asc";
      break;
    case "Harga Tertinggi":
      params.sort = "price_desc";
      break;
    case "Rating":
      params.sort = "rating";
      break;
    default:
      params.sort = "latest";
  }

  params.page = filters.page || 1;
  params.per_page = filters.limit || 15;

  return params;
};

/* ─────────────────────────────
   GET LIST PRODUK
───────────────────────────── */
export const getProducts = async (filters = {}) => {
  const params = buildParams(filters);

  const qs = new URLSearchParams();
  Object.entries(params).forEach(([key, val]) => {
    if (Array.isArray(val)) {
      val.forEach((v) => qs.append(key, v));
    } else if (val !== undefined && val !== null) {
      qs.append(key, val);
    }
  });

  const res = await api(`/produk?${qs.toString()}`);

  return {
    products: res.data.data || [],
    currentPage: res.data.current_page,
    totalPages: res.data.last_page,
    meta: res.data.meta || {},
  };
};

/* ─────────────────────────────
   GET DETAIL BY SLUG (FIXED)
───────────────────────────── */
// export const getProdukBySlug = async (slug) => {
//   try {
//     if (!slug) {
//       console.error("Slug is undefined");
//       return null;
//     }

//     const res = await api(`/produk/${slug}`);

//     return res.data.data;
//   } catch (err) {
//     console.error("Gagal ambil produk:", err.message);
//     return null;
//   }
// };

export const getProdukBySlug = async (slug) => {
  try {
    const res = await api(`/produk/${slug}`);

    console.log("FULL RES:", res);
    console.log("RES.DATA:", res.data);

    return res.data;
  } catch (err) {
    console.error("Gagal ambil produk:", err);
    return null;
  }
};

/* ─────────────────────────────
   RELATED PRODUCTS
───────────────────────────── */
export const getProdukTerkait = async (kategoriId, excludeSlug, limit = 8) => {
  try {
    const res = await api(
      `/produk?kategori_id=${kategoriId}&per_page=${limit + 1}`
    );

    const items = res.data?.data || [];

    return items
      .filter((p) => p.slug !== excludeSlug) // 🔥 FIX: pakai slug
      .slice(0, limit);
  } catch (err) {
    console.error("Gagal ambil produk terkait:", err.message);
    return [];
  }
};

/* ─────────────────────────────
   CREATE
───────────────────────────── */
export const createProduk = async (data) => {
  return await api("/produk", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

/* ─────────────────────────────
   UPDATE (SLUG BASED)
───────────────────────────── */
export const updateProduk = async (slug, data) => {
  if (!slug) throw new Error("Slug is required");

  return await api(`/produk/${slug}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

/* ─────────────────────────────
   DELETE (SLUG BASED)
───────────────────────────── */
export const deleteProduk = async (slug) => {
  if (!slug) throw new Error("Slug is required");

  return await api(`/produk/${slug}`, {
    method: "DELETE",
  });
};

/* ─────────────────────────────
   SIMPLE PAGINATION (LEGACY SAFE)
───────────────────────────── */
export const getProduk = async (page = 1) => {
  const res = await api(`/produk?page=${page}`);

  return res.data;
};

/* ─────────────────────────────
   FILTERED SIMPLE
───────────────────────────── */
export const getProdukFiltered = async ({
  page = 1,
  limit = 10,
  sort = "latest",
} = {}) => {
  try {
    const res = await api(
      `/produk?page=${page}&per_page=${limit}&sort=${sort}`
    );

    return res?.data?.data || [];
  } catch (err) {
    console.error("Gagal ambil produk:", err);
    return [];
  }
};