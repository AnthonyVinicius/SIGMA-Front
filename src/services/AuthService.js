import { ApiRegistry } from "../api/ApiRegistry";

export const AuthService = {
  async login(email, password) {
    return ApiRegistry.registerIF.post("/auth/login", { email, password });
  },

  saveSession(token, userId) {
    localStorage.setItem("user-token", token);
    localStorage.setItem("user-id", userId);
  },

  logout() {
    localStorage.removeItem("user-token");
    localStorage.removeItem("user-id");
  }
};
