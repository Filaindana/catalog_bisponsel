import api from "../api";

// GET LIST PRODUK (paginate)
export const getProduk = async (page = 1) => {
  const res = await api(`/produk?page=${page}`);
  return res.data; // pagination object
};

// GET DETAIL PRODUK
// export const getProdukById = async (id) => {
//   const res = await api(`/produk/${id}`);
//   return res.data;
// };
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