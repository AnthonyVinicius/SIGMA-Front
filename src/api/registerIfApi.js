import axios from "axios";

export const registerIfApi = axios.create({
  baseURL: "http://132.226.159.21:8080",
  headers: {
    "Content-Type": "application/json",
  },
});
