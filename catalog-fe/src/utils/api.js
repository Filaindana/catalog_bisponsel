// const BASE_URL = "/api";
const BASE_URL = "https://api.bizponsel.com/api";
// const BASE_URL = "http://127.0.0.1:8000/api";

// ambil token
const getToken = () => localStorage.getItem("token");

const api = async (endpoint, options = {}) => {
  const token = getToken();

  const isFormData = options.body instanceof FormData;
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      Accept: "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...(!isFormData && { "Content-Type": "application/json" }),
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