<template>
  <div class="flex items-center justify-center min-h-screen">
    
    <div class="w-full max-w-md p-8 space-y-8 bg-[#1c5e27] rounded-2xl shadow-lg">
      
      <div class="text-center">
        <div class="inline-block p-3 mb-4 bg-white bg-opacity-10 rounded-full">
          <img 
            src="/src/img/biometria.png" 
            alt="Ícone de biometria" 
            class="w-8 h-8"
          >
        </div>
        <h1 class="text-2xl font-bold text-white">Administração de presença</h1>
        <p class="text-gray-300">Acesso restrito ao administrador</p>
      </div>
      
      <form class="space-y-6" @submit.prevent="handleLogin">
        <div>
          <label for="email" class="block mb-2 text-sm font-medium text-white">Usuário</label>
          <input 
            v-model="email"
            type="email" 
            name="email" 
            id="email" 
            class="w-full px-4 py-3 text-gray-800 bg-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400" 
            placeholder="seuemail@exemplo.com"
          >
        </div>
        
        <div>
          <label for="password" class="block mb-2 text-sm font-medium text-white">Senha</label>
          <input 
            v-model="password"
            type="password" 
            name="password" 
            id="password" 
            class="w-full px-4 py-3 text-gray-800 bg-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400" 
            placeholder="••••••••"
          >
        </div>
        
        <div>
          <button 
            type="submit" 
            class="w-full px-4 py-3 font-semibold text-green-700 bg-white rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50 transition-colors"
          >
            Entrar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'; // 1. Importe o 'ref'
import { useRouter } from 'vue-router';

const router = useRouter();

// 2. Crie as variáveis reativas para o email e a senha
const email = ref('');
const password = ref('');

function handleLogin() {
  // Agora você pode usar os valores digitados pelo usuário
  console.log("Tentativa de login com:");
  console.log("Email:", email.value);
  console.log("Senha:", password.value);

  // Aqui você faria a chamada para sua API para validar o login
  // if (loginValido) {
    localStorage.setItem('user-token', 'meu-token-secreto-123');
    router.push('/dashboard');
  // }
}
</script>