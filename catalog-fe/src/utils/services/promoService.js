import api from "../api";

/* ================= HELPERS ================= */

const formatRupiah = (num) =>
  "Rp " + Number(num).toLocaleString("id-ID").replace(/,/g, ".");

const getBannerColor = (status) => {
  switch (status) {
    case "aktif":
      return "#22c55e";
    case "segera":
      return "#f59e0b";
    case "berakhir":
      return "#ef4444";
    default:
      return "#94a3b8";
  }
};

const getImageUrl = (path) =>
  path ? `http://localhost:8000/storage/${path}` : "/fallback.jpg";

/* ================= GET PROMOS ================= */

export const getPromos = async ({ page = 1, limit = 10 } = {}) => {
  try {
    const res = await api(`/promo?page=${page}&per_page=${limit}`);
    const paginator = res.data;

    return {
      data: paginator.data.map((item) => ({
        id: item.id,
        name: item.nama,
        desc: item.deskripsi,
        startDate: item.tanggal_mulai,
        endDate: item.tanggal_selesai,
        status: item.status,
        banner: item.banner,
        bannerColor: getBannerColor(item.status),

        // 🔥 PRODUK DI DALAM PROMO
        products: (item.produk || []).map((p) => ({
          id: p.id,
          name: p.nama,
          category: p.kategori?.nama || "Produk",

          price: formatRupiah(p.harga),
          originalPrice: formatRupiah(p.harga * 1.2), // dummy

          rating: p.rating || 4.5,
          stock: p.stok,

          image: getImageUrl(p.gambar),

          // 🔥 ambil dari relasi spesifikasi
          spec: p.spesifikasi?.length
            ? p.spesifikasi
                .slice(0, 3)
                .map((s) => s.detail)
                .join(" • ")
            : "Spesifikasi tidak tersedia",
        })),
      })),
      current_page: paginator.current_page,
      last_page: paginator.last_page,
    };
  } catch (err) {
    console.error("Error getPromos:", err);
    throw err;
  }
};

/* ================= GET PROMO AKTIF (🔥 untuk homepage) ================= */

export const getActivePromoProducts = async () => {
  try {
    const res = await api("/promo");

    const promos = res?.data?.data || [];

    // ambil hanya promo dengan status "aktif" untuk ditampilkan di homepage
    const activePromos = promos.filter(p => p.status === "aktif");

    // ambil semua promo tanpa filter status 
    // const activePromos = promos; 

    // ambil promo dengan filter aktif dan segera
    // const activePromos = promos.filter(p =>
    //   ["aktif", "segera"].includes(p.status)
    // );

    console.log("FULL RESPONSE:", res.data);
    console.log("PROMOS RAW:", promos);

    let produkList = [];

    activePromos.forEach((promo) => {
      if (promo.produk && promo.produk.length > 0) {
        const mappedProduk = promo.produk.map((p) => ({
          id: p.id,
          category: p.kategori?.nama || "Produk",
          name: p.nama,

          spec: p.spesifikasi?.length
            ? p.spesifikasi.slice(0, 4).map(s => s.detail).join(" • ")
            : "Spesifikasi belum tersedia",

          price: "Rp " + Number(p.harga).toLocaleString("id-ID"),
          rating: p.rating || 4.5,
          stock: p.stok,

          image: p.gambar
            ? `http://localhost:8000/storage/${p.gambar}`
            : "/fallback.jpg",

          discount: 15,
        }));

        produkList.push(...mappedProduk);
      }
    });

    return produkList;
  } catch (err) {
    console.error("Error getActivePromoProducts:", err);
    throw err;
  }
};

/* ================= GET DETAIL ================= */

export const getPromoById = async (id) => {
  try {
    const res = await api(`/promo/${id}`);
    return res.data;
  } catch (err) {
    console.error("Error getPromoById:", err);
    throw err;
  }
};

/* ================= CREATE ================= */

export const createPromo = async (payload) => {
  try {
    const res = await api("/promo", {
      method: "POST",
      body: JSON.stringify({
        nama: payload.name,
        deskripsi: payload.desc,
        tanggal_mulai: payload.startDate,
        tanggal_selesai: payload.endDate,
        banner: payload.banner || null,
        produk_ids: payload.produk_ids || [],
      }),
    });

    return res.data;
  } catch (err) {
    console.error("Error createPromo:", err);
    throw err;
  }
};

/* ================= UPDATE ================= */

export const updatePromo = async (id, payload) => {
  try {
    const res = await api(`/promo/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        nama: payload.name,
        deskripsi: payload.desc,
        tanggal_mulai: payload.startDate,
        tanggal_selesai: payload.endDate,
        banner: payload.banner || null,
        produk_ids: payload.produk_ids || [],
      }),
    });

    return res.data;
  } catch (err) {
    console.error("Error updatePromo:", err);
    throw err;
  }
};

/* ================= DELETE ================= */

export const deletePromo = async (id) => {
  try {
    const res = await api(`/promo/${id}`, {
      method: "DELETE",
    });

    return res;
  } catch (err) {
    console.error("Error deletePromo:", err);
    throw err;
  }
};