<template>
  <div class="flex items-center justify-center min-h-screen px-4 sm:px-6">
    <div
      class="w-full max-w-md p-6 sm:p-8 space-y-4 sm:space-y-6
             bg-[#1c5e27] rounded-2xl shadow-lg"
    >

      <div class="text-center">
        <div
          class="inline-flex items-center justify-center p-3 sm:p-4
                 bg-white bg-opacity-10 rounded-full mb-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6 sm:w-7 sm:h-7 text-green-700"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              d="M18 7V5a1 1 0 0 0-1-1H6.5a.5.5 0 0 0-.4.8l4.5 6a2 2 0 0 1 0 2.4l-4.5 6a.5.5 0 0 0 .4.8H17a1 1 0 0 0 1-1v-2"
            />
          </svg>
        </div>
        <h1 class="text-2xl sm:text-3xl font-bold text-white">SIGMA</h1>
      </div>

      <form class="space-y-4 sm:space-y-5" @submit.prevent="handleLogin">
        <h1 class="text-lg sm:text-xl font-bold text-white">Login</h1>

        <div>
          <label class="block mb-1 sm:mb-2 text-sm font-medium text-white">
            Usuário
          </label>
          <input
            v-model="email"
            type="email"
            class="w-full px-4 py-3 text-gray-800 bg-white rounded-lg
                   focus:ring-2 focus:ring-green-400 focus:outline-none"
            placeholder="email@email.com"
          />
        </div>

        <div>
          <label class="block mb-1 sm:mb-2 text-sm font-medium text-white">
            Senha
          </label>
          <input
            v-model="password"
            type="password"
            class="w-full px-4 py-3 text-gray-800 bg-white rounded-lg
                   focus:ring-2 focus:ring-green-400 focus:outline-none"
            placeholder="••••••••"
          />
        </div>

        <div class="text-sm sm:text-base text-white">
          Não tem conta?
          <router-link
            to="/registerUser"
            class="ml-1 underline hover:text-green-300"
          >
            Registrar-se
          </router-link>
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full px-4 py-3 font-semibold
                 text-green-700 bg-white rounded-lg
                 hover:bg-gray-200 transition
                 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ loading ? "Entrando..." : "Entrar" }}
        </button>
      </form>

    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { AuthService } from "../services/AuthService";
import { useUserStore } from "../stores/user";

const router = useRouter();
const userStore = useUserStore();

const email = ref("");
const password = ref("");
const loading = ref(false);

async function handleLogin() {
  if (!email.value || !password.value) {
    alert("Preencha email e senha!");
    return;
  }

  loading.value = true;

  try {
    const session = await AuthService.login(email.value, password.value);

    userStore.setSession(session.token, session.userId);
    userStore.setUserData({
      name: session.name,
      role: session.role,
    });

    if (session.role === "ADMIN") {
      router.push("/adminDashboard");
    } else {
      router.push("/userDashboard");
    }
  } catch (err) {
    console.error(err);
    alert("Email ou senha incorretos!");
  } finally {
    loading.value = false;
  }
}
</script>
