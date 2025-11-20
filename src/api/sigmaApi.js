import axios from "axios";

export const sigmaApi = axios.create({
  baseURL: "http://132.226.159.21:8082",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

sigmaApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("user-token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
