import API from "../api";

// 🔥 helper query builder
const buildParams = (filters) => {
  const params = {};

  if (filters.search) params.search = filters.search;
  if (filters.maxPrice) params.max_price = filters.maxPrice;

  if (filters.categories?.length) {
    params["category[]"] = filters.categories;
  }

  if (filters.brands?.length) {
    params["brand[]"] = filters.brands;
  }

  // 🔄 sorting mapping
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
  params.limit = filters.limit || 15;

  return params;
};

// ✅ GET PRODUCTS
export const getProducts = async (filters = {}) => {
  const res = await API.get("/products", {
    params: buildParams(filters),
  });
  return res.data;
};

// ✅ DETAIL
export const getProductById = async (id) => {
  const res = await API.get(`/products/${id}`);
  return res.data;
};