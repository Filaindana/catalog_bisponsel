
import api from "../api";

// helper query builder (tetap sama)
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

export const getProducts = async (filters = {}) => {
  const params = buildParams(filters);
  const qs = new URLSearchParams();
  for (const [key, val] of Object.entries(params)) {
    if (Array.isArray(val)) {
      val.forEach((v) => qs.append(key, v));
    } else if (val !== undefined && val !== null) {
      qs.append(key, val);
    }
  }

  const res = await api(`/produk?${qs.toString()}`, {
    method: "GET",
  });

  return {
    products: res.data.data,
    currentPage: res.data.current_page,
    totalPages: res.data.last_page,
    meta: res.meta,
  };
};

// 🔥 DETAIL
export const getProductById = async (id) => {
  const res = await api(`/produk/${id}`, {
    method: "GET",
  });

  return res;
};