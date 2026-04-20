import api from "../api";

export const getFavorit = async () => {
  const res = await api("/favorit"); // endpoint kamu
  return res.data;
};

export const removeFavorit = async (produkId) => {
  const res = await api(`/favorit/${produkId}`, {
    method: "DELETE",
  });
  return res;
};

export const addFavorit = async (produkId) => {
  return await api("/favorit", {
    method: "POST",
    body: JSON.stringify({ produk_id: produkId }),
  });
};