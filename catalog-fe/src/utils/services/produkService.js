import api from "../api";

// GET LIST PRODUK (paginate)
export const getProduk = async (page = 1) => {
  const res = await api(`/produk?page=${page}`);
  return res.data; // pagination object
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