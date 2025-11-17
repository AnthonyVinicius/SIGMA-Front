import axios from "axios";

export const registerIfApi = axios.create({
  baseURL: "http://132.226.159.21:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

// ADICIONE ISSO:
registerIfApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("user-token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
