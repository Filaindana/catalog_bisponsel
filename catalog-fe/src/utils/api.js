const BASE_URL = "/api";

// ambil token
const getToken = () => localStorage.getItem("token");

const api = async (endpoint, options = {}) => {
  const token = getToken();

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...(options.headers || {}),
    },
  });

  let data;
  try {
    data = await res.json();
  } catch (err) {
    console.log(err);    
    throw new Error("Response bukan JSON / kosong");
  }

  if (!res.ok) {
    throw new Error(data.message || "API Error");
  }

  return data;
};

export default api;