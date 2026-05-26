import api from "../api";

const unwrapCabangResponse = (response) => {
  if (response?.data !== undefined) {
    return response.data;
  }

  return response;
};

/* GET ALL CABANG */
export const getCabangs = async () => {
  try {
    const res = await api("/cabang");
    const payload = unwrapCabangResponse(res);

    return Array.isArray(payload) ? payload : [];
  } catch (err) {
    console.error("Error getCabangs:", err.message);
    throw err;
  }
};

/* CREATE */
export const createCabang = async (payload) => {
  const formData = new FormData();
  console.log("createCabang payload:", payload);

  formData.append("kode", payload.branchId);
  formData.append("nama", payload.name);
  formData.append("kota", payload.city);
  formData.append("alamat", payload.address);
  formData.append("telepon", payload.phone || "");
  formData.append("email", payload.email || "");
  formData.append("jam_buka", payload.jamBuka || "");
  formData.append("jam_tutup", payload.jamTutup || "");
  formData.append("maps_link", payload.mapsLink || "");

  if (payload.foto instanceof File) {
    formData.append("foto", payload.foto);
  }

  // Debug: log FormData entries
  try {
    for (const pair of formData.entries()) {
      console.log("createCabang formData:", pair[0], pair[1]);
    }
  } catch (e) {
    console.log("createCabang: unable to iterate formData", e);
  }

  const res = await api("/cabang", {
    method: "POST",
    body: formData,
  });

  return { data: unwrapCabangResponse(res) };
};

/* UPDATE */
export const updateCabang = async (id, payload) => {
  const formData = new FormData();
  console.log("updateCabang id:", id, "payload:", payload);

  formData.append("kode", payload.branchId);
  formData.append("nama", payload.name);
  formData.append("kota", payload.city);
  formData.append("alamat", payload.address);
  formData.append("telepon", payload.phone || "");
  formData.append("email", payload.email || "");
  formData.append("jam_buka", payload.jamBuka || "");
  formData.append("jam_tutup", payload.jamTutup || "");
  formData.append("maps_link", payload.mapsLink || "");

  if (payload.foto instanceof File) {
    formData.append("foto", payload.foto);
  }

  // Debug: log FormData entries
  try {
    for (const pair of formData.entries()) {
      console.log("updateCabang formData:", pair[0], pair[1]);
    }
  } catch (e) {
    console.log("updateCabang: unable to iterate formData", e);
  }

  // some servers (Laravel) handle multipart form-data updates better when using POST + _method=PUT
  formData.append("_method", "PUT");

  const res = await api(`/cabang/${id}`, {
    method: "POST",
    body: formData,
  });

  return { data: unwrapCabangResponse(res) };
};

/* DELETE */
export const deleteCabang = async (id) => {
  const res = await api(`/cabang/${id}`, {
    method: "DELETE",
  });

  return unwrapCabangResponse(res);
};