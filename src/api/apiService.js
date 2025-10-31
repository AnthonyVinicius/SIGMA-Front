import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://132.226.159.21:8082",
  headers: {
    "Content-Type": "application/json",
  },
});

const request = async (method, url, data = {}, params = {}) => {
  try {
    const response = await api.request({ method, url, data, params });
    return response.data;
  } catch (error) {
    const err = {
      status: error.response?.status || 500,
      message:
        error.response?.data?.message || error.message || "Erro desconhecido",
      details: error.response?.data || null,
    };
    console.error("Erro na requisição:", err);
    throw err;
  }
};

export default request;
