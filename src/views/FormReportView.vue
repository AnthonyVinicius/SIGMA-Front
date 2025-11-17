<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import BaseButton from "../components/BaseButton.vue";
import EnviromentalDAO from "../services/EnviromentalDAO";
import TicketsDAO from "../services/TicketsDAO";
import axios from "axios";

const route = useRoute();
const router = useRouter();

const environmentId = ref(route.query.environmentId || null);
const environment = ref(null);
const components = ref([]);

const loading = ref(false);
const isSubmitting = ref(false);

const successMessage = ref("");
const errorMessage = ref("");

const currentUserId = ref(null); // agora vem do backend

// Formulário corrigido
const form = ref({
  description: "",
  priority: "MEDIUM",
  problemType: "HARDWARE",
  status: "OPEN",
  environmentId: environmentId.value,
  componentId: "",
  createdById: null
});

// ---------- Buscar usuário autenticado ----------
async function loadUser() {
  try {
    const { data } = await axios.get("/usuario/autenticado");
    currentUserId.value = data.id;
    form.value.createdById = data.id;
  } catch (error) {
    console.error("Erro ao carregar usuário autenticado:", error);
    alert("Você precisa estar logado para abrir um chamado.");
    router.push("/login");
  }
}

// ---------- Carregar ambiente ----------
async function loadEnvironment() {
  try {
    loading.value = true;
    environment.value = await EnviromentalDAO.getById(environmentId.value);
    components.value = environment.value.components || [];
  } catch (error) {
    errorMessage.value = "Erro ao carregar o ambiente.";
  } finally {
    loading.value = false;
  }
}

// ---------- Enviar ticket ----------
async function submitTicket() {
  if (!form.value.description || !form.value.componentId) {
    alert("Preencha todos os campos antes de enviar.");
    return;
  }

  isSubmitting.value = true;

  try {
    const payload = {
      description: form.value.description,
      status: form.value.status,
      priority: form.value.priority,
      problemType: form.value.problemType,
      component: form.value.componentId,
      environment: form.value.environmentId,
      createdById: currentUserId.value,
      ticketFile: [] // se no futuro quiser anexos
    };

    await TicketsDAO.insert(payload);

    alert("Chamado criado com sucesso!");
    resetForm();
  } catch (error) {
    console.error(error);
    alert("Erro ao criar chamado. Tente novamente.");
  } finally {
    isSubmitting.value = false;
  }
}

// ---------- Resetar formulário ----------
function resetForm() {
  form.value.description = "";
  form.value.componentId = "";
  form.value.priority = "MEDIUM";
  form.value.problemType = "HARDWARE";
}

onMounted(async () => {
  await loadUser();       // pega o login da sessão
  if (environmentId.value) {
    await loadEnvironment();
  }
});
</script>

<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center">
    <div class="w-full max-w-2xl bg-white rounded-xl shadow p-6 space-y-6 border border-gray-200">

      <div>
        <h1 class="text-2xl font-bold text-green-800">Abrir Chamado</h1>
        <p class="text-gray-600 text-sm">Descreva o problema e selecione o item afetado.</p>
      </div>

      <div v-if="loading" class="text-gray-500 text-center py-6">Carregando...</div>

      <div v-else>
        <div v-if="environment" class="space-y-3">

          <p class="font-semibold text-gray-800">
            Local: <span class="text-green-700">{{ environment.name }}</span>
          </p>

          <!-- Componente -->
          <label class="block text-sm font-medium text-gray-700">Componente</label>
          <select
            v-model="form.componentId"
            class="border rounded-md p-2 w-full text-sm focus:ring-green-600 focus:border-green-600"
          >
            <option disabled value="">Selecione um componente</option>
            <option v-for="comp in components" :key="comp.id" :value="comp.id">
              {{ comp.name }}
            </option>
          </select>

          <!-- Descrição -->
          <label class="block text-sm font-medium text-gray-700 mt-4">Descrição</label>
          <textarea
            v-model="form.description"
            rows="4"
            placeholder="Descreva o problema..."
            class="border rounded-md p-2 w-full text-sm resize-none focus:ring-green-600 focus:border-green-600"
          ></textarea>

          <!-- Prioridade / Tipo -->
          <div class="grid grid-cols-2 gap-4 mt-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Prioridade</label>
              <select
                v-model="form.priority"
                class="border rounded-md p-2 w-full text-sm focus:ring-green-600 focus:border-green-600"
              >
                <option value="LOW">Baixa</option>
                <option value="MEDIUM">Média</option>
                <option value="HIGH">Alta</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">Tipo de Problema</label>
              <select
                v-model="form.problemType"
                class="border rounded-md p-2 w-full text-sm focus:ring-green-600 focus:border-green-600"
              >
                <option value="HARDWARE">Hardware</option>
                <option value="SOFTWARE">Software</option>
                <option value="NETWORK">Rede</option>
                <option value="OTHER">Outro</option>
              </select>
            </div>
          </div>

          <!-- Botão -->
          <div class="flex justify-end mt-6">
            <BaseButton @click="submitTicket" :disabled="isSubmitting">
              {{ isSubmitting ? "Enviando..." : "Criar Chamado" }}
            </BaseButton>
          </div>

          <!-- Mensagens -->
          <p v-if="successMessage" class="text-green-600 font-medium text-sm text-center">
            {{ successMessage }}
          </p>

          <p v-if="errorMessage" class="text-red-600 font-medium text-sm text-center">
            {{ errorMessage }}
          </p>

        </div>

        <div v-else class="text-gray-500 text-center py-6">
          Nenhum ambiente encontrado.
        </div>
      </div>
    </div>
  </div>
</template>
