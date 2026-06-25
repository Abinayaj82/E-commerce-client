import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});
  //console.log("API URL:", import.meta.env.VITE_API_URL);

// Attach token from localStorage to every request
api.interceptors.request.use((config) => {
  const userData = localStorage.getItem("user");
  if (userData) {
    const parsed = JSON.parse(userData);
    const token = parsed?.token;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
  }
  return config;
});

export default api;