<template>
  <div class="flex items-center justify-center min-h-screen">
    <div class="w-full max-w-md p-8 space-y-3 bg-[#1c5e27] rounded-2xl shadow-lg">

      <div class="text-center">
        <div class="inline-block p-3  bg-white bg-opacity-10 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
            fill="none" stroke="currentColor" stroke-width="2"
            class="lucide lucide-sigma-icon">
            <path d="M18 7V5a1 1 0 0 0-1-1H6.5a.5.5 0 0 0-.4.8l4.5 6a2 2 0 0 1 0 2.4l-4.5 6a.5.5 0 0 0 .4.8H17a1 1 0 0 0 1-1v-2" />
          </svg>
        </div>
        <h1 class="text-2xl font-bold text-white">SIGMA</h1>
      </div>

      <form class="space-y-4" @submit.prevent="handleLogin">
        <h1 class="text-xl font-bold text-white">Login</h1>

        <div>
          <label class="block mb-2 text-sm font-medium text-white">Usuário</label>
          <input v-model="email" type="email"
            class="w-full px-4 py-3 text-gray-800 bg-white rounded-lg focus:ring-2 focus:ring-green-400"
            placeholder="email@email.com" />
        </div>

        <div>
          <label class="block mb-2 text-sm font-medium text-white">Senha</label>
          <input v-model="password" type="password"
            class="w-full px-4 py-3 text-gray-800 bg-white rounded-lg focus:ring-2 focus:ring-green-400"
            placeholder="••••••••" />
        </div>

        <div class="text-white">
          Não tem conta?
          <router-link to="/registerUser" class="underline hover:text-green-400">
            Registrar-se
          </router-link>
        </div>

        <div>
          <button type="submit" :disabled="loading"
            class="w-full px-4 py-3 font-semibold text-green-700 bg-white rounded-lg 
                   hover:bg-gray-200 disabled:opacity-50">
            {{ loading ? "Entrando..." : "Entrar" }}
          </button>
        </div>
      </form>

    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { AuthService } from "../services/AuthService";
import { decodeJWT } from "../utils/jwt";
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
    const response = await AuthService.login(email.value, password.value);
    const token = response.data;

    const payload = decodeJWT(token);
    if (!payload) throw new Error("Token inválido");

    const userId = payload.id ?? payload.userId ?? payload.sub;

    userStore.setSession(token, userId);

    router.push("/userDashboard");
  } catch (err) {
    console.error(err);
    alert("Email ou senha incorretos!");
  } finally {
    loading.value = false;
  }
}
</script>
