import api from "../api";

/* ================= HELPERS ================= */

const formatRupiah = (num) =>
  "Rp " + Number(num || 0).toLocaleString("id-ID").replace(/,/g, ".");

const getBannerColor = (status) => {
  switch (String(status).toLowerCase()) {
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
  path ? `/storage/${path}` : "/fallback.jpg";

const normalizeMeta = (meta = {}) => ({
  aktif_count: Number(meta.aktif_count ?? 0),
  segera_count: Number(meta.segera_count ?? 0),
  berakhir_count: Number(meta.berakhir_count ?? 0),
});

const normalizePromo = (item = {}) => ({
  id: item.id,
  slug: item.slug,
  name: item.nama,
  desc: item.deskripsi,
  startDate: item.tanggal_mulai,
  endDate: item.tanggal_selesai,
  status: item.status,
  banner: item.banner,
  banner_url: item.banner_url || (item.banner ? `/storage/${item.banner}` : "/fallback-promo.png"),
  bannerColor: getBannerColor(item.status),
  produk: (item.produk || []).map((p) => ({
    id: p.id,
    name: p.nama,
    category: p.kategori?.nama || "Produk",
    price: formatRupiah(p.harga),
    originalPrice: formatRupiah((p.harga || 0) * 1.2),
    rating: p.rating || 4.5,
    stock: p.stok,
    image: getImageUrl(p.gambar),
    spec: p.spesifikasi?.length
      ? p.spesifikasi
          .slice(0, 3)
          .map((s) => s.detail)
          .join(" • ")
      : "Spesifikasi tidak tersedia",
  })),
  products: (item.produk || []).map((p) => ({
    id: p.id,
    slug: p.slug,
    name: p.nama,
    category: p.kategori?.nama || "Produk",
    price: formatRupiah(p.harga),
    originalPrice: formatRupiah((p.harga || 0) * 1.2),
    rating: p.rating || 4.5,
    stock: p.stok,
    image: getImageUrl(p.gambar),
    spec: p.spesifikasi?.length
      ? p.spesifikasi
          .slice(0, 3)
          .map((s) => s.detail)
          .join(" • ")
      : "Spesifikasi tidak tersedia",
  })),
});

/* ================= GET PROMOS ================= */

export const getPromos = async ({ page = 1, limit = 10 } = {}) => {
  try {
    const res = await api(`/promo?page=${page}&per_page=${limit}`);
    const paginator = res.data || {};
    const items = Array.isArray(paginator.data) ? paginator.data : [];

    return {
      data: items.map(normalizePromo),
      current_page: paginator.current_page ?? 1,
      last_page: paginator.last_page ?? 1,
      per_page: paginator.per_page ?? limit,
      total: paginator.total ?? items.length,
      meta: normalizeMeta(res.meta),
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
            ? `/storage/${p.gambar}`
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

    console.log("RAW PROMO API:", res.data);

    const payload = res.data?.data || res.data || res;

    return normalizePromo(payload);
  } catch (err) {
    console.error("Error getPromoById:", err);
    throw err;
  }
};

/* ================= CREATE ================= */

export const createPromo = async (payload) => {
  try {
    console.log("createPromo payload:", payload);
    const formData = new FormData();

    formData.append("nama", payload.name || "");
    formData.append("deskripsi", payload.desc || "");
    formData.append("tanggal_mulai", payload.startDate || "");
    formData.append("tanggal_selesai", payload.endDate || "");

    if (payload.banner instanceof File) {
      formData.append("banner", payload.banner);
    }

    const relatedIds = payload.produk_terkait || payload.produk_ids || [];
    if (Array.isArray(relatedIds)) {
      relatedIds
        .filter((id) => id !== undefined && id !== null)
        .forEach((id) => formData.append("produk_terkait[]", id));
    }

    for (const pair of formData.entries()) {
      console.log("createPromo FormData:", pair[0], pair[1]);
    }

    const res = await api("/promo", {
      method: "POST",
      body: formData,
    });

    return normalizePromo(res.data);
  } catch (err) {
    console.error("Error createPromo:", err);
    throw err;
  }
};

/* ================= UPDATE ================= */

export const updatePromo = async (id, payload) => {
  try {
    console.log("updatePromo payload:", payload);
    const formData = new FormData();
    formData.append("_method", "PUT");

    if (payload.name !== undefined) {
      formData.append("nama", payload.name);
    }
    if (payload.desc !== undefined) {
      formData.append("deskripsi", payload.desc);
    }
    if (payload.startDate) {
      formData.append("tanggal_mulai", payload.startDate);
    }
    if (payload.endDate) {
      formData.append("tanggal_selesai", payload.endDate);
    }

    if (payload.banner instanceof File) {
      formData.append("banner", payload.banner);
    }

    const relatedIds = payload.produk_terkait || payload.produk_ids || [];
    if (Array.isArray(relatedIds)) {
      relatedIds
        .filter((id) => id !== undefined && id !== null)
        .forEach((id) => formData.append("produk_terkait[]", id));
    }

    for (const pair of formData.entries()) {
      console.log("updatePromo FormData:", pair[0], pair[1]);
    }

    const res = await api(`/promo/${id}`, {
      method: "POST",
      body: formData,
    });

    return normalizePromo(res.data);
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



/* ================= GET PUBLIC PROMOS ================= */

export const getPublicPromos = async () => {
  try {
    const res = await api("/promo");

    console.log("FULL API RESPONSE:", res.data);

    // langsung ambil array data
    const promos = res.data.data;

    console.log("PROMOS ARRAY:", promos);

    return promos.map(normalizePromo);

  } catch (err) {
    console.error("Error getPublicPromos:", err);
    throw err;
  }
};

/* ================= GET PROMO DETAIL ================= */

export const getPublicPromoDetail = async (id) => {
  try {
    const res = await api(`/promo/${id}`);

    return normalizePromo(res?.data?.data);
  } catch (err) {
    console.error("Error getPublicPromoDetail:", err);
    throw err;
  }
};

/* ================= GET HOME PROMOS LIST ================= */

export const getPromosList = async () => {
  try {
    const res = await api("/promos");
    return Array.isArray(res) ? res : (res?.data || []);
  } catch (err) {
    console.error("Error getPromosList:", err);
    throw err;
  }
};