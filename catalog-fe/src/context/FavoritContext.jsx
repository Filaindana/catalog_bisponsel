import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { getFavorit, addFavorit, removeFavorit } from "../utils/services/favoritService";

const FavoritContext = createContext(null);

export function FavoritProvider({ children }) {
  const [savedMap, setSavedMap] = useState({});

  const load = useCallback(async () => {
    try {
      const res = await getFavorit();
      const data = res?.data || res || [];
      const map = {};
      data.forEach((item) => { map[item.produk.id] = true; });
      setSavedMap(map);
    } catch {
      // belum login, savedMap tetap kosong
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const toggleSave = useCallback(async (productId) => {
    const isSaved = !!savedMap[productId];
    setSavedMap((prev) => ({ ...prev, [productId]: !isSaved }));
    try {
      if (isSaved) {
        await removeFavorit(productId);
      } else {
        await addFavorit(productId);
      }
    } catch {
      setSavedMap((prev) => ({ ...prev, [productId]: isSaved }));
    }
  }, [savedMap]);

  return (
    <FavoritContext.Provider value={{ savedMap, toggleSave, reload: load }}>
      {children}
    </FavoritContext.Provider>
  );
}

export function useFavorit() {
  return useContext(FavoritContext);
}
