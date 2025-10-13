import { createRouter, createWebHistory } from "vue-router";
import UserDashboard from "../views/UserDashboard.vue";
import TestComponents from "../views/TestComponents.vue";
import AdminDashboard from '../views/AdminDashboard.vue'
import TelaLogin from "../components/TelaLogin.vue";
import ReportProblem from "../views/ReportProblem.vue";

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
    {
      path: "/adminDashboard",
      name: "AdminDashboard",
      component: AdminDashboard,
    },
    {
      path : "/login",
      name : "login",
      component : TelaLogin,
    
    },
    {
      path: "/reportar",
      name: "reportar-problema",
      component: ReportProblem,
    }
  ],
});

export default router;
