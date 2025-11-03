import { createRouter, createWebHistory } from "vue-router";
import UserDashboard from "../views/UserDashboard.vue";
import AdminDashboard from '../views/AdminDashboard.vue'
import LoginView from "../views/LoginView.vue";
import QrCodeReportView from "../views/QrCodeReportView.vue"
import ManageLocalView from "../views/LocalManagerView.vue"
import AllReportsView from "../views/AllReportsView.vue";
import FormReportView from "../views/FormReportView.vue";

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
      component: QrCodeReportView,
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
      component: FormReportView,
    },
  ],
});

export default router;
