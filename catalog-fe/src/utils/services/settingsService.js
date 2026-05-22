import api from "../api";

export const getSettings = async () => {
  try {
    const res = await api("/settings");
    return res.data;
  } catch (err) {
    console.error("Error getSettings:", err);
    throw err;
  }
};

export const updateSettings = async (payload) => {
  const { profile, kontak, jam_operasional, social_media, avatarFile } = payload;
  const body = { profile, kontak, jam_operasional, social_media };

  if (avatarFile instanceof File) {
    const formData = new FormData();
    formData.append("profile", JSON.stringify(profile));
    formData.append("kontak", JSON.stringify(kontak));
    formData.append("jam_operasional", JSON.stringify(jam_operasional));
    formData.append("social_media", JSON.stringify(social_media));
    formData.append("avatar", avatarFile);
    formData.append("_method", "PUT");

    return await api("/settings", {
      method: "POST",
      body: formData,
    });
  }

  return await api("/settings", {
    method: "PUT",
    body: JSON.stringify(body),
  });
};
