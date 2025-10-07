import { createRouter, createWebHistory } from "vue-router";
import UserDashboard from "../views/UserDashboard.vue";
import TestComponents from "../views/TestComponents.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/dashboard",
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      component: UserDashboard,
    },
    {
      path: "/test",
      name: "TestComponent",
      component: TestComponents,
    },
  ],
});

export default router;
