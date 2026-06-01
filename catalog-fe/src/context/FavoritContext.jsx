// import { createContext, useContext, useState, useEffect, useCallback } from "react";
// import { getFavorit, addFavorit, removeFavorit } from "../utils/services/favoritService";

// const FavoritContext = createContext(null);

// export function FavoritProvider({ children }) {
//   const [savedMap, setSavedMap] = useState({});

//   const load = useCallback(async () => {
//     try {
//       const res = await getFavorit();
//       const data = res?.data || res || [];
//       const map = {};
//       data.forEach((item) => { map[item.produk.id] = true; });
//       setSavedMap(map);
//     } catch {
//       // belum login, savedMap tetap kosong
//     }
//   }, []);

//   useEffect(() => {
//     load();
//   }, [load]);

//   const toggleSave = useCallback(async (productId) => {
//     const isSaved = !!savedMap[productId];
//     setSavedMap((prev) => ({ ...prev, [productId]: !isSaved }));
//     try {
//       if (isSaved) {
//         await removeFavorit(productId);
//       } else {
//         await addFavorit(productId);
//       }
//     } catch {
//       setSavedMap((prev) => ({ ...prev, [productId]: isSaved }));
//     }
//   }, [savedMap]);

//   return (
//     <FavoritContext.Provider value={{ savedMap, toggleSave, reload: load }}>
//       {children}
//     </FavoritContext.Provider>
//   );
// }

// export function useFavorit() {
//   return useContext(FavoritContext);
// }


import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { getFavorit, addFavorit, removeFavorit } from "../utils/services/favoritService";
import { toastSuccess, toastError } from "../utils/swal";

// Ubah default dari null ke objek aman
const FavoritContext = createContext({
  savedMap: {},
  toggleSave: () => {},
  reload: () => {},
});

export function FavoritProvider({ children }) {
  const [savedMap, setSavedMap] = useState({});

  const load = useCallback(async () => {
    try {
      const res = await getFavorit();
      // getFavorit() sekarang return raw res, ambil .data di sini
      const data = Array.isArray(res?.data) ? res.data : [];
      const map = {};
      data.forEach((item) => {
        if (item?.produk?.id) {
          map[item.produk.id] = true;
        }
      });
      setSavedMap(map);
    } catch {
      // Belum login atau error, biarkan savedMap kosong
      setSavedMap({});
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const toggleSave = useCallback(async (productId) => {
    const isSaved = !!savedMap[productId];
    // Optimistic update dulu
    setSavedMap((prev) => ({ ...prev, [productId]: !isSaved }));
    try {
      if (isSaved) {
        await removeFavorit(productId);
        toastSuccess("Produk dihapus dari wishlist");
      } else {
        await addFavorit(productId);
        toastSuccess("Produk ditambahkan ke wishlist");
      }
    } catch {
      // Rollback kalau gagal
      setSavedMap((prev) => ({ ...prev, [productId]: isSaved }));
      toastError(isSaved ? "Gagal menghapus dari wishlist" : "Gagal menambahkan ke wishlist");
    }
  }, [savedMap]);

  return (
    <FavoritContext.Provider value={{ savedMap, toggleSave, reload: load }}>
      {children}
    </FavoritContext.Provider>
  );
}

export function useFavorit() {
  const ctx = useContext(FavoritContext);
  // Guard: jangan crash kalau null
  if (!ctx) return { savedMap: {}, toggleSave: () => {}, reload: () => {} };
  return ctx;
}