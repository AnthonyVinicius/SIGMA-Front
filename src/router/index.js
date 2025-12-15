import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "../stores/user";

import UserDashboard from "../views/UserDashboard.vue";
import AdminDashboard from "../views/AdminDashboard.vue";
import LoginView from "../views/LoginView.vue";
import QrCodeReportView from "../views/QrCodeReportView.vue";
import ManageLocalView from "../views/LocalManagerView.vue";
import AllReportsView from "../views/AllReportsView.vue";
import AllReportsUserView from "../views/AllReportsUserView.vue";
import FormReportView from "../views/FormReportView.vue";
import RegisterView from "../views/RegisterView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/login" },

    {
      path: "/userDashboard",
      name: "Dashboard",
      component: UserDashboard,
      meta: { role: "OTHER" },
    },

    {
      path: "/adminDashboard",
      name: "AdminDashboard",
      component: AdminDashboard,
      meta: { role: "ADMIN" },
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
      path: "/AllReportsUser",
      name: "all-ReportsUser",
      component: AllReportsUserView,
      meta: { role: "OTHER" },
    },

    {
      path: "/manageLocals",
      name: "manage-Locals",
      component: ManageLocalView,
      meta: { role: "ADMIN" },
    },

    {
      path: "/locais/:id/itens",
      name: "ItensPorLocal",
      component: () => import("../views/ItensManager.vue"),
      meta: { role: "ADMIN" },
    },

    {
      path: "/AllReports",
      name: "all-Reports",
      component: AllReportsView,
      meta: { role: "ADMIN" },
    },

    {
      path: "/report-create",
      name: "report-create",
      component: FormReportView,
      meta: { requiresAuth: true },
    },

    {
      path: "/registerUser",
      name: "registerUser",
      component: RegisterView,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();

  if (
    (to.meta.requiresAuth || to.meta.role) &&
    !userStore.role &&
    to.path !== "/login" &&
    to.path !== "/registerUser"
  ) {
    return next("/login");
  }

  if (to.meta.role && userStore.role !== to.meta.role) {
    if (to.meta.role === "ADMIN") return next("/userDashboard");
    if (to.meta.role === "OTHER") return next("/adminDashboard");
    return next("/login");
  }

  next();
});

export default router;
