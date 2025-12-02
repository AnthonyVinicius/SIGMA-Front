import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    id: localStorage.getItem("user-id") || null,
    token: localStorage.getItem("user-token") || null,
    name: localStorage.getItem("user-name") || null,
    role: localStorage.getItem("user-role") || null,
  }),

  actions: {
    setSession(token, id) {
      this.token = token;
      this.id = id;

      localStorage.setItem("user-token", token);
      localStorage.setItem("user-id", id);
    },

    setUserData({ name, role }) {
      this.name = name;
      this.role = role;

      localStorage.setItem("user-name", name);
      localStorage.setItem("user-role", role);
    },

    logout() {
      this.id = null;
      this.token = null;
      this.name = null;
      this.role = null;

      localStorage.removeItem("user-token");
      localStorage.removeItem("user-id");
      localStorage.removeItem("user-name");
      localStorage.removeItem("user-role");
    },
  },
});
