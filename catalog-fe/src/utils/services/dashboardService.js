import api from "../api";

// TOTAL PRODUK
export const getTotalProduk = async () => {
  const res = await api("/produk?per_page=1");
  return res.data.total; // dari paginate Laravel
};

// PROMO AKTIF
export const getPromoAktif = async () => {
  const res = await api("/promo?status=aktif");
  return res.data.length;
};

// TOTAL CABANG
export const getTotalCabang = async () => {
  const res = await api("/cabang");
  return res.data.length;
};