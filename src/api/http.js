import axios from "axios";

export const http = axios.create({
  baseURL: "https://fakestoreapi.com",
  timeout: 15000,
  headers: { Accept: "application/json" },
});

http.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
