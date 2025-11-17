<template>
  <div class="flex items-center justify-center min-h-screen">
    <div class="w-full max-w-md p-8 space-y-8 bg-[#1c5e27] rounded-2xl shadow-lg">
      <div class="text-center">
        <div class="inline-block p-3 mb-4 bg-white bg-opacity-10 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="lucide lucide-sigma-icon lucide-sigma">
            <path
              d="M18 7V5a1 1 0 0 0-1-1H6.5a.5.5 0 0 0-.4.8l4.5 6a2 2 0 0 1 0 2.4l-4.5 6a.5.5 0 0 0 .4.8H17a1 1 0 0 0 1-1v-2" />
          </svg>
        </div>
        <h1 class="text-2xl font-bold text-white">SIGMA</h1>
      </div>

      <form class="space-y-4" @submit.prevent="handleLogin">
        <h1 class="text-xl font-bold text-white">Login</h1>
        <div>
          <label for="email" class="block mb-2 text-sm font-medium text-white">Usuário</label>
          <input v-model="email" type="email" name="email" id="email"
            class="w-full px-4 py-3 text-gray-800 bg-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="seuemail@exemplo.com">
        </div>

        <div>
          <label for="password" class="block mb-2 text-sm font-medium text-white">Senha</label>
          <input v-model="password" type="password" name="password" id="password"
            class="w-full px-4 py-3 text-gray-800 bg-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="••••••••">
        </div>
        <div class="">
          <span class="text-white">Não tem conta? </span>
          <router-link to="/registerUser">
            <span class="text-white text-lead underline hover:text-green-400">Registrar-se</span>
          </router-link>
        </div>

        <div>
          <button type="submit"
            class="w-full px-4 py-3 font-semibold text-green-700 bg-white rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50 transition-colors">
            Entrar
          </button>
        </div>
      </form>
    </div>
    <router-link to="/reportar">
      <button
        class="bg-[#1C5E27] text-white font-semibold py-2.5 px-5 rounded-lg flex items-center gap-2 hover:bg-[#154b1f] transition-colors text-sm absolute bottom-6 right-6">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
          class="lucide lucide-qr-code-icon lucide-qr-code">
          <rect width="5" height="5" x="3" y="3" rx="1" />
          <rect width="5" height="5" x="16" y="3" rx="1" />
          <rect width="5" height="5" x="3" y="16" rx="1" />
          <path d="M21 16h-3a2 2 0 0 0-2 2v3" />
          <path d="M21 21v.01" />
          <path d="M12 7v3a2 2 0 0 1-2 2H7" />
          <path d="M3 12h.01" />
          <path d="M12 3h.01" />
          <path d="M12 16v.01" />
          <path d="M16 12h1" />
          <path d="M21 12v.01" />
          <path d="M12 21v-1" />
        </svg>
        Registrar Chamado
      </button>
    </router-link>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { ApiRegistry } from "../api/ApiRegistry"; // <-- caminho correto

const router = useRouter();

const email = ref("");
const password = ref("");

async function handleLogin() {
  try {
    const response = await ApiRegistry.registerIF.post("/auth/login", {
      email: email.value,
      password: password.value
    });

    // O backend retorna o token diretamente?
    // Se retornar { token: "abc" }, adapte para response.data.token
    const token = response.data;

    if (!token) {
      throw new Error("Token não recebido do servidor.");
    }

    // Decodifica o payload do JWT com segurança
    const payloadPart = token.split(".")[1];
    const decodedPayload = JSON.parse(atob(payloadPart));

    // O backend precisa realmente enviar "id" no JWT!
    const userId = decodedPayload.id ?? decodedPayload.userId ?? decodedPayload.sub;

    if (!userId) {
      console.warn("⚠ Token recebido, mas sem userId dentro do JWT.");
    }

    // Salva o token e ID no localStorage
    localStorage.setItem("user-token", token);
    if (userId) localStorage.setItem("user-id", userId);

    router.push("/userDashboard");
  } catch (err) {
    console.error("Erro no login:", err);
    alert("Email ou senha incorretos!");
  }
}
</script>
