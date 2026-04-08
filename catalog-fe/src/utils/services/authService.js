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

  if (res.token) {
    setToken(res.token);
  }

  return res;
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