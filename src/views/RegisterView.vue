<script setup>
import { onMounted, ref } from "vue";
import UserDAO from "../services/UserDAO";
import { useRouter } from "vue-router";

const router = useRouter();
const user = ref({
  name: "",
  email: "",
  registration: null,
  phone: "",
  password: "",
  role: "OTHER",
});

const limparForms = () => {
  user.value = {
    name: "",
    email: "",
    registration: "",
    phone: "",
    password: "",
    role: "OTHER",
  };
};

const formatPhone = (value) => {
  value = value.replace(/\D/g, "");
  if (value.length > 2)
    value = `(${value.slice(0, 2)})${value.slice(2, 7)}${
      value.length > 7 ? "-" + value.slice(7, 11) : ""
    }`;
  return value;
};

const submitForm = async () => {
  try {
    if (user.value.password.length < 8) {
      alert("A senha deve conter no mínimo 8 caracteres.");
      return;
    }

    await UserDAO.insert(user.value);
    alert("Usuário cadastrado com sucesso!");
    router.push("/login");
  } catch (err) {
    console.error(err);
    alert("Erro ao cadastrar usuário: " + err.message);
  }
};

onMounted(async () => {
  console.log(await UserDAO.getAll());
});
</script>

<template>
  <div class="flex items-center justify-center min-h-screen px-4 sm:px-6">
    <form
      @submit.prevent="submitForm"
      class="w-full max-w-md
             p-6 sm:p-8
             space-y-3 sm:space-y-4
             bg-[#1c5e27]
             rounded-2xl shadow-lg"
    >
      <div class="text-center">
        <div
          class="inline-flex items-center justify-center
                 p-3 sm:p-4 mb-3
                 bg-white bg-opacity-10 rounded-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6 sm:w-7 sm:h-7  text-green-700"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path
              d="M18 7V5a1 1 0 0 0-1-1H6.5a.5.5 0 0 0-.4.8l4.5 6a2 2 0 0 1 0 2.4l-4.5 6a.5.5 0 0 0 .4.8H17a1 1 0 0 0 1-1v-2"
            />
          </svg>
        </div>
        <h1 class="text-2xl sm:text-3xl font-bold text-white">SIGMA</h1>
      </div>

      <h2 class="text-lg sm:text-xl font-bold text-white">
        Cadastrar Usuário
      </h2>

      <div>
        <label class="block text-sm font-medium text-white mb-1">Nome</label>
        <input
          v-model="user.name"
          type="text"
          maxlength="100"
          class="w-full px-3 py-2.5
                 bg-white rounded-lg
                 focus:ring-2 focus:ring-green-400 focus:outline-none"
          required
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-white mb-1">
          Telefone
        </label>
        <input
          :value="user.phone"
          @input="user.phone = formatPhone($event.target.value)"
          type="text"
          class="w-full px-3 py-2.5
                 bg-white rounded-lg
                 focus:ring-2 focus:ring-green-400 focus:outline-none"
          required
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-white mb-1">Email</label>
        <input
          v-model="user.email"
          type="email"
          maxlength="150"
          class="w-full px-3 py-2.5
                 bg-white rounded-lg
                 focus:ring-2 focus:ring-green-400 focus:outline-none"
          required
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-white mb-1">Senha</label>
        <input
          v-model="user.password"
          type="password"
          maxlength="20"
          class="w-full px-3 py-2.5
                 bg-white rounded-lg
                 focus:ring-2 focus:ring-green-400 focus:outline-none"
          required
        />
      </div>

      <div class="text-sm sm:text-base">
        <span class="text-white">Já possui uma conta?</span>
        <router-link to="/login" class="ml-1 underline hover:text-green-300 text-white">
          Login
        </router-link>
      </div>

      <button
        type="submit"
        class="w-full px-4 py-3
               font-semibold
               text-green-700 bg-white
               rounded-lg
               hover:bg-gray-200
               transition
               focus:outline-none
               focus:ring-2 focus:ring-gray-300"
      >
        Registrar-se
      </button>
    </form>
  </div>
</template>
