import api from "../api";

const productService = {
  // Get all products with optional query params
  async getProducts(params = {}) {
    try {
      const queryString = new URLSearchParams(params).toString();
      const endpoint = queryString ? `/produk?${queryString}` : '/produk';
      const response = await api(endpoint);
      console.log('API Response getProducts:', response);
      return response;
    } catch (error) {
      console.error('Error in getProducts:', error);
      throw error;
    }
  },

  // Get single product by slug
  async getProductBySlug(slug) {
    try {
      const response = await api(`/produk/${slug}`);
      console.log('API Response getProductBySlug:', response);
      return response;
    } catch (error) {
      console.error('Error in getProductBySlug:', error);
      throw error;
    }
  },

  // Create new product
  async createProduct(data) {
    try {
      const response = await api('/produk', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      console.log('API Response createProduct:', response);
      return response;
    } catch (error) {
      console.error('Error in createProduct:', error);
      throw error;
    }
  },

  async uploadProductImages(formData) {
    try {
      const response = await api('/upload', {
        method: 'POST',
        body: formData,
      });
      console.log('API Response uploadProductImages:', response);
      return response;
    } catch (error) {
      console.error('Error in uploadProductImages:', error);
      throw error;
    }
  },

  // Update product by slug
  async updateProduct(slug, data) {
    try {
      const response = await api(`/produk/${slug}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      });
      console.log('API Response updateProduct:', response);
      return response;
    } catch (error) {
      console.error('Error in updateProduct:', error);
      throw error;
    }
  },

  // Delete product by slug
  async deleteProduct(slug) {
    try {
      const response = await api(`/produk/${slug}`, {
        method: 'DELETE',
      });
      console.log('API Response deleteProduct:', response);
      return response;
    } catch (error) {
      console.error('Error in deleteProduct:', error);
      throw error;
    }
  },
};

export default productService;

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