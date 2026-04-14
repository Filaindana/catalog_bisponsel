import api from "../api";

/* GET ALL CABANG */
export const getCabangs = async () => {
  try {
    const res = await api("/cabang");
    return res.data;
  } catch (err) {
    console.error("Error getCabangs:", err.message);
    throw err;
  }
};

/* CREATE */
export const createCabang = async (payload) => {
  return await api("/cabang", {
    method: "POST",
    body: JSON.stringify({
      kode: payload.branchId,
      nama: payload.name,
      kota: payload.city,
      alamat: payload.address,
    }),
  });
};

/* UPDATE */
export const updateCabang = async (id, payload) => {
  return await api(`/cabang/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      kode: payload.branchId,
      nama: payload.name,
      kota: payload.city,
      alamat: payload.address,
    }),
  });
};

/* DELETE */
export const deleteCabang = async (id) => {
  return await api(`/cabang/${id}`, {
    method: "DELETE",
  });
};