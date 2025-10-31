import { createRouter, createWebHistory } from "vue-router";
import UserDashboard from "../views/UserDashboard.vue";
import AdminDashboard from '../views/AdminDashboard.vue'
import LoginView from "../views/LoginView.vue";
import ReportProblem from "../views/ReportProblem.vue";
import ManageLocalView from "../views/ManageLocalView.vue"
import AllReportsView from "../views/AllReportsView.vue";
import ReportCreateView from "../views/ReportCreateView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/reportar",
    },
    {
      path: "/userDashboard",
      name: "Dashboard",
      component: UserDashboard,
    },
    {
      path: "/adminDashboard",
      name: "AdminDashboard",
      component: AdminDashboard,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/reportar",
      name: "reportar-problema",
      component: ReportProblem,
    },
    {
      path: "/manageLocals",
      name: "manage-Locals",
      component: ManageLocalView,
    },
    {
      path: "/locais/:id/itens",
      name: "ItensPorLocal",
      component: () => import("../views/ItensManager.vue"),
    },
    {
      path: "/AllReports",
      name: "all-Reports",
      component: AllReportsView,
    },
    {
      path: "/report-create",
      name: "report-create",
      component: ReportCreateView,
    },
  ],
});

export default router;
