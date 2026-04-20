import api from "../api";

// =======================
// 👤 PROFILE SERVICE
// =======================

// GET PROFILE (ME)
export const getProfile = async () => {
  const res = await api("/auth/me");
  return res.data;
};

// UPDATE PROFILE
export const updateProfile = async (id, payload) => {
  const res = await api(`/users/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });

  return res.data;
};

// UPDATE PASSWORD
export const changePassword = async (payload) => {
  return await api("/auth/change-password", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};