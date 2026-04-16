import api from "../api";

/* KIRIM PESAN */
export const sendKontak = async (payload) => {
  try {
    const res = await api("/kontak", {
      method: "POST",
      body: JSON.stringify({
        nama: payload.nama,
        email: payload.email,
        telepon: payload.telepon,
        pesan: payload.pesan,
      }),
    });

    return res.data;
  } catch (err) {
    console.error("Error sendKontak:", err);
    throw err;
  }
};