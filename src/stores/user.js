import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    id: localStorage.getItem("user-id") || null,
    token: localStorage.getItem("user-token") || null,
    name: null
  }),

  actions: {
    setSession(token, id) {
      this.token = token;
      this.id = id;

      localStorage.setItem("user-token", token);
      localStorage.setItem("user-id", id);
    },

    setName(name) {
      this.name = name;
    },

    logout() {
      this.id = null;
      this.token = null;
      this.name = null;

      localStorage.removeItem("user-token");
      localStorage.removeItem("user-id");
      localStorage.removeItem("user-name");
    }
  }
});
