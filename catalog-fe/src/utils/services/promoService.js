import api from "../api";

/* GET ALL PROMO */
// export const getPromos = async (status = null) => {
//   try {
//     const query = status ? `?status=${status}` : "";
//     const res = await api(`/promo${query}`, {
//       method: "GET",
//     });
//     return res.data;
//   } catch (err) {
//     console.error("Error getPromos:", err.message);
//     throw err;
//   }
// };
const getBannerColor = (status) => {
  switch (status) {
    case "aktif":
      return "#22c55e"; // hijau
    case "segera":
      return "#f59e0b"; // kuning
    case "berakhir":
      return "#ef4444"; // merah
    default:
      return "#94a3b8";
  }
};

export const getPromos = async (status = null) => {
  try {
    const endpoint = status ? `/promo?status=${status}` : `/promo`;
    const res = await api(endpoint);

    return res.data.map((item) => ({
      id: item.id,
      name: item.nama,
      desc: item.deskripsi,
      startDate: item.tanggal_mulai,
      endDate: item.tanggal_selesai,
      status: item.status,
      banner: item.banner,

      // optional UI tambahan
      bannerColor: getBannerColor(item.status),
    }));
  } catch (err) {
    console.error("Error getPromos:", err.message);
    throw err;
  }
};

/* GET DETAIL PROMO */
export const getPromoById = async (id) => {
  try {
    const res = await api(`/promo/${id}`, {
      method: "GET",
    });
    return res.data;
  } catch (err) {
    console.error("Error getPromoById:", err.message);
    throw err;
  }
};

/* CREATE PROMO */
export const createPromo = async (payload) => {
  try {
    const res = await api("/promo", {
      method: "POST",
      body: JSON.stringify({
        nama: payload.name,
        deskripsi: payload.desc,
        tanggal_mulai: payload.startDate,
        tanggal_selesai: payload.endDate,
        status: payload.status.toLowerCase(),
        banner: payload.banner || null,
        produk_ids: payload.produk_ids || [],
      }),
    });

    return res.data;
  } catch (err) {
    console.error("Error createPromo:", err.message);
    throw err;
  }
};

/* UPDATE PROMO */
export const updatePromo = async (id, payload) => {
  try {
    const res = await api(`/promo/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        nama: payload.name,
        deskripsi: payload.desc,
        tanggal_mulai: payload.startDate,
        tanggal_selesai: payload.endDate,
        status: payload.status.toLowerCase(),
        banner: payload.banner || null,
        produk_ids: payload.produk_ids || [],
      }),
    });

    return res.data;
  } catch (err) {
    console.error("Error updatePromo:", err.message);
    throw err;
  }
};

/* DELETE PROMO */
export const deletePromo = async (id) => {
  try {
    const res = await api(`/promo/${id}`, {
      method: "DELETE",
    });

    return res;
  } catch (err) {
    console.error("Error deletePromo:", err.message);
    throw err;
  }
};