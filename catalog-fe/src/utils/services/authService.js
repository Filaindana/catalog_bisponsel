import api from "../api";

// simpan token
const setToken = (token) => {
  localStorage.setItem("token", token);
};

// hapus token
const removeToken = () => {
  localStorage.removeItem("token");
};

// =======================
// 🔐 AUTH SERVICE
// =======================

// LOGIN
export const login = async (email, password) => {
  const res = await api("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  const authData = res.data || res;

  if (authData?.token) {
    setToken(authData.token);
  }

  return authData;
};


// REGISTER
export const register = async (payload) => {
  return await api("/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};


// GET USER LOGIN
export const getMe = async () => {
  return await api("/auth/me");
};


// LOGOUT
export const logout = async () => {
  try {
    await api("/auth/logout", {
      method: "POST",
    });
  } catch (err) {
    console.log(err);
    // ignore error
  } finally {
    removeToken();
  }
};


// CHECK LOGIN
export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};