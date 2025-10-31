import axios from "axios";

export const sigmaApi = axios.create({
  baseURL: "http://132.226.159.21:8082",
  headers: {
    "Content-Type": "application/json",
  },
});
