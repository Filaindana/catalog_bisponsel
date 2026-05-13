// const BASE_URL = "/api";
const BASE_URL = "http://127.0.0.1:8000/api";

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
// const api = async (endpoint, options = {}) => {
//   const token = getToken();

//   console.log("FETCH URL:", `${BASE_URL}${endpoint}`);

//   const res = await fetch(`${BASE_URL}${endpoint}`, {
//     ...options,
//     headers: {
//       "Content-Type": "application/json",
//       Accept: "application/json",
//       ...(token && { Authorization: `Bearer ${token}` }),
//       ...(options.headers || {}),
//     },
//   });

//   console.log("RAW RESPONSE:", res);

//   const text = await res.text();

//   console.log("RAW TEXT:", text);

//   let data;

//   try {
//     data = JSON.parse(text);
//   } catch (err) {
//     console.error("JSON PARSE ERROR:", err);
//     throw new Error("Response bukan JSON");
//   }

//   console.log("PARSED DATA:", data);

//   if (!res.ok) {
//     throw new Error(data.message || "API Error");
//   }

//   return data;
// };

export default api;