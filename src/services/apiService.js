import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

export default {
  getLocations() {
    return apiClient.get("/locais");
  },

  getLocation(id) {
    return apiClient.get(`/locais/${id}`);
  },

  createTicket(data) {
    return apiClient.post("/chamados", data);
  },

  updateTicket(id, data) {
    return apiClient.put(`/chamados/${id}`, data);
  },
};
