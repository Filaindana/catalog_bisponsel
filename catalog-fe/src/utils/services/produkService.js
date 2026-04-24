import api from "../api";

// GET LIST PRODUK (paginate)
export const getProduk = async (page = 1) => {
  const res = await api(`/produk?page=${page}`);
  return res.data; // pagination object
};

// GET PRODUK TERKAIT (same kategori, exclude current id)
export const getProdukTerkait = async (kategoriId, excludeId, limit = 8) => {
  try {
    const res = await api(`/produk?kategori_id=${kategoriId}&per_page=${limit + 1}`);
    const items = res.data?.data || [];
    return items.filter((p) => p.id !== excludeId).slice(0, limit);
  } catch (err) {
    console.error("Gagal ambil produk terkait:", err.message);
    return [];
  }
};

// GET DETAIL PRODUK

export const getProdukById = async (id) => {
  try {
    const res = await api(`/produk/${id}`);
    return res.data;
  } catch (err) {
    console.error("Gagal ambil produk:", err.message);
    return null; // 🔥 penting
  }
};

// CREATE PRODUK
export const createProduk = async (data) => {
  return await api("/produk", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// UPDATE PRODUK
export const updateProduk = async (id, data) => {
  return await api(`/produk/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

// DELETE PRODUK
export const deleteProduk = async (id) => {
  return await api(`/produk/${id}`, {
    method: "DELETE",
  });
};

// export const getLatestProducts = async () => {
//   try {
//     const res = await api("/produk/latest");
//     return res?.data || [];
//   } catch (err) {
//     console.error("Gagal ambil latest:", err);
//     return [];
//   }
// };

export const getProdukFiltered = async ({
  page = 1,
  limit = 10,
  sort = "latest",
} = {}) => {
  try {
    const res = await api(
      `/produk?page=${page}&per_page=${limit}&sort=${sort}`
    );

    // karena ini paginate, ambil data di dalamnya
    return res?.data?.data || [];
  } catch (err) {
    console.error("Gagal ambil produk:", err);
    return [];
  }
};