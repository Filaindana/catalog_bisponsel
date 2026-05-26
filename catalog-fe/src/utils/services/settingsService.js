import api from "../api";

const EMPTY_SETTINGS = {
  profile: {
    nama: "",
    email: "",
    avatar: null,
    jabatan: "",
    quote: "",
  },
  kontak: {
    whatsapp: "",
    email: "",
    alamat: "",
    telepon: "",
    maps_embed: "",
  },
  jam_operasional: {
    pusat: {
      senin_jumat: { buka: "08:30", tutup: "17:00", libur: false },
      sabtu: { buka: "08:00", tutup: "15:00", libur: false },
      minggu: { libur: true },
    },
    cabang: [],
  },
  cabang: [],
  social_media: [],
};

const normalizeSettingsResponse = (response) => {
  const payload = response?.data ?? response;

  if (!payload || typeof payload !== "object") {
    return EMPTY_SETTINGS;
  }

  return {
    profile: payload.profile ?? EMPTY_SETTINGS.profile,
    kontak: payload.kontak ?? EMPTY_SETTINGS.kontak,
    jam_operasional: payload.jam_operasional ?? EMPTY_SETTINGS.jam_operasional,
    cabang: Array.isArray(payload.cabang) ? payload.cabang : [],
    social_media: Array.isArray(payload.social_media) ? payload.social_media : [],
  };
};

export const getSettings = async () => {
  try {
    const res = await api("/settings");
    return normalizeSettingsResponse(res);
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
