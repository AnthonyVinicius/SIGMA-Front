<script setup>
import { ref } from "vue";
import UserDAO from "../services/UserDAO";

const user = ref({
    name: "",
    email: "",
    registration: "",
    password: "",
    role: "OTHER",
});

const limparForms = () => {
    user.value = {
        name: "",
        email: "",
        phone: "",
        password: "",
        role: "OTHER",
    };
}


const submitForm = async () => {
    try {
        await UserDAO.insert(user.value);
        alert("Usuário cadastrado com sucesso!");
        limparForms()
        push('/login')
    } catch (err) {
        console.error(err);
        alert("Erro ao cadastrar usuário: " + err.message);
    }
};
</script>

<template>
    <<div class="flex items-center justify-center min-h-screen">

        <form @submit.prevent="submitForm" class="w-full max-w-md p-8 space-y-1 bg-[#1c5e27] rounded-2xl shadow-lg">
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
            <h2 class="text-xl font-bold text-white">Cadastrar Usuário</h2>

            <div>
                <label class="block text-sm font-medium text-white mb-1">Nome</label>
                <input v-model="user.name" type="text" maxlength="100"
                    class="w-full bg-white border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 p-2"
                    required />
            </div>
            <div>
                <label class="block text-sm font-medium text-white mb-1">Telefone</label>
                <input v-model="user.phone" type="number" maxlength="100"
                    class="w-full bg-white border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 p-2"
                    required />
            </div>

            <div>
                <label class="block text-sm font-medium text-white mb-1">Email</label>
                <input v-model="user.email" type="email" maxlength="150"
                    class="w-full bg-white border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 p-2"
                    required />
            </div>

            <div>
                <label class="block text-sm font-medium text-white mb-1">Senha</label>
                <input v-model="user.password" type="password" maxlength="20"
                    class="w-full bg-white border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 p-2"
                    required />
            </div>

            <div class="">
                <span class="text-white">Já possui uma conta? </span>
                <router-link to="/login">
                    <span class="text-white text-lead underline hover:text-green-400">Login</span>
                </router-link>
            </div>


            <button type="submit"
                class="w-full px-4 py-3 font-semibold text-green-700 bg-white rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50 transition-colors">
                Registrar-se
            </button>
        </form>

        </div>
</template>
