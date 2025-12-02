import { ApiRegistry } from "../api/ApiRegistry";
import { decodeJWT } from "../utils/decodeJWT";

export const AuthService = {
  async login(email, password) {
    const response = await ApiRegistry.registerIF.post("/auth/login", {
      email,
      password,
    });
    const token = response.data;

    const payload = decodeJWT(token);

    const userId = payload.id ?? payload.userId ?? payload.sub;
    const name = payload.name;
    const role = payload.role;

    this.saveSession({
      token,
      userId,
      name,
      role,
    });

    return { token, userId, name, role };
  },

  saveSession({ token, userId, name, role }) {
    localStorage.setItem("user-token", token);
    localStorage.setItem("user-id", userId);
    localStorage.setItem("user-name", name);
    localStorage.setItem("user-role", role);
  },

  logout() {
    localStorage.removeItem("user-token");
    localStorage.removeItem("user-id");
    localStorage.removeItem("user-name");
    localStorage.removeItem("user-role");
  },
};
