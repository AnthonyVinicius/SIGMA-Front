<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { QrCode, Camera, MapPin } from "lucide-vue-next";
import { useQrScanner } from "../composables/useQrScanner";
import EnviromentalDAO from "../services/EnviromentalDAO";
import TicketsDAO from "../services/TicketsDAO";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";

const router = useRouter();

const environments = ref([]);
const selectedEnvironment = ref(null);
const components = ref([]);


const userStore = useUserStore();

const ticket = ref({
  description: "",
  priority: "LOW",
  problemType: "HARDWARE",
  componentId: "",
  environmentId: "",
  status: "OPEN",
  createdById: userStore.id,
});

const isReporting = ref(false);
const isSubmitting = ref(false);

async function loadEnvironments() {
  try {
    environments.value = await EnviromentalDAO.getAll();
  } catch {
    alert("Falha ao carregar ambientes.");
  }
}

async function onScanSuccess(decodedText) {
  await stop();
  try {
    const env = await EnviromentalDAO.getById(decodedText);
    selectedEnvironment.value = { id: env.id, name: env.name };
    components.value = env.components || [];
    ticket.value.environmentId = env.id;
    isReporting.value = true;
  } catch {
    alert("Ambiente não encontrado.");
  }
}

function onScanFailure() {}
function stopScanner() {
  stop();
  resetForm();
}

const { isScanning, start, stop } = useQrScanner(onScanSuccess, onScanFailure);

async function selectEnvironment(env) {
  selectedEnvironment.value = env;
  components.value = await EnviromentalDAO.getComponentsByEnviromentId(env.id);
  ticket.value.environmentId = env.id;
  isReporting.value = true;
}

async function submitTicket() {
  if (!ticket.value.description || !ticket.value.componentId) {
    alert("Preencha todos os campos antes de enviar.");
    return;
  }

  isSubmitting.value = true;
  try {
    const payload = {
      description: ticket.value.description,
      status: ticket.value.status,
      priority: ticket.value.priority,
      problemType: ticket.value.problemType,
      component: ticket.value.componentId,
      environment: ticket.value.environmentId,
      createdBy: ticket.value.createdById,
      ticketFile: [],
    };

    await TicketsDAO.insert(payload);
    alert("Chamado criado com sucesso!");
    resetForm();
  } catch (err) {
    console.error(err);
    alert("Erro ao criar chamado. Tente novamente.");
  } finally {
    isSubmitting.value = false;
  }
}

function resetForm() {
  isReporting.value = false;
  selectedEnvironment.value = null;
  components.value = [];
  ticket.value = {
    description: "",
    priority: "LOW",
    problemType: "HARDWARE",
    componentId: "",
    environmentId: "",
    status: "OPEN",
    createdById: currentUserId,
  };
}

onMounted(async () => {
  loadEnvironments();
});
onBeforeUnmount(stop);
</script>

<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gray-100 relative"
  >
    <div class="flex justify-center">
      <div
        class="w-full max-w-lg space-y-5 rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
      >
        <div class="flex items-start gap-4">
          <QrCode class="h-10 w-10 text-gray-700" />
          <div>
            <h1 class="text-xl font-bold text-gray-800">Reportar Problema</h1>
            <p class="text-sm text-gray-500">
              Escaneie o QR Code do local ou selecione um ambiente abaixo.
            </p>
          </div>
        </div>
        <hr />

        <div v-if="!isScanning && !isReporting">
          <button
            @click="start"
            class="flex w-full items-center justify-center gap-2 rounded-lg bg-green-700 py-3 font-bold text-white transition-colors hover:bg-green-800"
          >
            <Camera class="h-6 w-6" />
            <span>Escanear QR Code</span>
          </button>

          <div class="space-y-3 pt-5">
            <h2 class="text-sm font-semibold uppercase text-gray-500">
              Acesso Rápido
            </h2>

            <div
              v-for="(env, i) in environments.slice(0, 5)"
              :key="env.id || i"
              @click="selectEnvironment(env)"
              class="flex cursor-pointer items-center gap-4 rounded-lg bg-gray-100 p-3 transition-colors hover:bg-gray-200"
            >
              <MapPin class="h-6 w-6 text-gray-600" />
              <div>
                <p class="font-bold text-gray-800">{{ env.name }}</p>
              </div>
            </div>
          </div>
        </div>

        <div
          v-else-if="isScanning"
          class="flex flex-col items-center gap-6 text-center"
        >
          <div id="qr-reader" class="w-full"></div>
          <button
            @click="stopScanner"
            class="bg-[#1C5E27] text-white font-semibold py-2.5 px-5 rounded-lg flex items-center gap-2 hover:bg-[#154b1f] transition-colors text-sm"
          >
            Cancelar
          </button>
        </div>

        <div
          v-else-if="isReporting"
          class="flex flex-col items-center gap-3 text-center"
        >
          <h2 class="text-xl font-bold text-gray-800">Reportar Problema</h2>
          <p class="text-sm text-gray-500">
            Local selecionado: {{ selectedEnvironment?.name }}
          </p>

          <div class="w-full space-y-2">
            <textarea
              v-model="ticket.description"
              placeholder="Descreva o problema"
              rows="3"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            ></textarea>

            <select
              v-model="ticket.priority"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="LOW">Baixa</option>
              <option value="MEDIUM">Média</option>
              <option value="HIGH">Alta</option>
            </select>

            <select
              v-model="ticket.problemType"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="HARDWARE">Hardware</option>
              <option value="SOFTWARE">Software</option>
              <option value="NETWORK">Rede</option>
              <option value="OTHER">Outro</option>
            </select>

            <select
              v-if="components.length > 0"
              v-model="ticket.componentId"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option disabled value="">Selecione o componente</option>
              <option
                v-for="comp in components"
                :key="comp.id"
                :value="comp.id"
              >
                {{ comp.description }}
              </option>
            </select>
          </div>

          <div class="flex gap-4">
            <button
              @click="submitTicket"
              :disabled="isSubmitting"
              class="bg-[#1C5E27] text-white font-semibold py-2.5 px-5 rounded-lg flex items-center gap-2 hover:bg-[#154b1f] transition-colors text-sm"
            >
              {{ isSubmitting ? "Enviando..." : "Enviar Chamado" }}
            </button>

            <button
              @click="resetForm"
              class="bg-gray-500 text-white font-semibold py-2.5 px-5 rounded-lg flex items-center gap-2 hover:bg-gray-600 transition-colors text-sm"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>

    <button
      @click="router.back()"
      class="bg-[#1C5E27] text-white font-semibold py-2.5 px-5 rounded-lg flex items-center gap-2 hover:bg-[#154b1f] transition-colors text-sm absolute bottom-6 right-6"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-arrow-big-left"
      >
        <path
          d="M13 9a1 1 0 0 1-1-1V5.061a1 1 0 0 0-1.811-.75l-6.835 6.836a1.207 1.207 0 0 0 0 1.707l6.835 6.835a1 1 0 0 0 1.811-.75V16a1 1 0 0 1 1-1h6a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1z"
        />
      </svg>

      Voltar
    </button>
  </div>
</template>

<style>
#qr-reader {
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
}

#qr-reader video {
  width: 100% !important;
  height: auto !important;
}

#qr-reader__dashboard_section_swaplink {
  color: #1c5e27 !important;
}
</style>
