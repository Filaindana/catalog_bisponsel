import api from "../api";

/**
 * Ambil semua produk (dengan filter opsional)
 * @param {Object} params - { kategori_id, promo, search, sort_by, sort_order, per_page, page }
 */
export const getProdukList = async (params = {}) => {
  const response = await api.get("/produk", { params });
  return response.data; // { success, data: { data: [...], current_page, last_page, ... } }
};

/**
 * Ambil detail satu produk berdasarkan ID
 * @param {number|string} id
 * @returns {{ id, kategori, nama, deskripsi, harga, stok, rating, adalah_promo, gambar, gambar_galeri, spesifikasi, ... }}
 */
export const getProdukDetail = async (id) => {
  const response = await api.get(`/produk/${id}`);
  return response.data.data;
};

/**
 * Ambil produk terkait (same kategori)
 * @param {number|string} id - ID produk yang sedang dilihat
 * @returns {Array}
 */
export const getProdukTerkait = async (id) => {
  const response = await api.get(`/produk/${id}/terkait`);
  return response.data.data;
};

/**
 * Buat produk baru
 * @param {Object} payload
 */
export const createProduk = async (payload) => {
  const response = await api.post("/produk", payload);
  return response.data.data;
};

/**
 * Update produk
 * @param {number|string} id
 * @param {Object} payload
 */
export const updateProduk = async (id, payload) => {
  const response = await api.put(`/produk/${id}`, payload);
  return response.data.data;
};

/**
 * Hapus produk
 * @param {number|string} id
 */
export const deleteProduk = async (id) => {
  const response = await api.delete(`/produk/${id}`);
  return response.data;
};

/**
 * Helper: format harga ke Rupiah
 * @param {number} harga
 * @returns {string} "Rp 17.499.000"
 */
export const formatHarga = (harga) =>
  "Rp " + Number(harga).toLocaleString("id-ID").replace(/,/g, ".");