<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { QrCode, Camera, MapPin } from "lucide-vue-next";
import BaseButton from "../components/BaseButton.vue";
import { useQrScanner } from "../composables/useQrScanner";
import EnvironmentService from "../services/EnviromentalDAO";
import TicketsService from "../services/TicketsDAO";

const environments = ref([]);
const selectedEnvironment = ref(null);
const components = ref([]);

const ticket = ref({
    description: "",
    priority: "LOW",
    problemType: "HARDWARE",
    component: null,
    environment: null,
    status: "OPEN",
});

const isReporting = ref(false);
const isSubmitting = ref(false);

async function loadEnvironments() {
    try {
        environments.value = await EnvironmentService.getAll();
    } catch {
        alert("Falha ao carregar ambientes.");
    }
}

async function onScanSuccess(decodedText) {
    await stop();
    try {
        const env = await EnvironmentService.getById(decodedText);
        console.log(env)
        selectedEnvironment.value = {
            id: env.id,
            name: env.name
        };
        components.value = env.components || [];
        ticket.value.environment = env.id;
        isReporting.value = true;
    } catch {
        alert("Ambiente não encontrado.");
    }
}


function onScanFailure() { }
function stopScanner() {
    stop();
    resetForm();
}

const { isScanning, start, stop } = useQrScanner(onScanSuccess, onScanFailure);

function selectEnvironment(env) {
    selectedEnvironment.value = env;
    components.value = env.components || [];
    ticket.value.environment = env.id;
    isReporting.value = true;
}

async function submitTicket() {
    if (!ticket.value.description) {
        alert("Por favor, descreva o problema.");
        return;
    }

    isSubmitting.value = true;
    try {
        const payload = {
            description: ticket.value.description,
            status: "OPEN",
            priority: ticket.value.priority,
            problemType: ticket.value.problemType,
            component: ticket.value.component,
            environment: ticket.value.environment,
        };

        await TicketsService.insert(payload);
        alert("Chamado criado com sucesso!");
        resetForm();
    } catch {
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
        component: null,
        environment: null,
        status: "OPEN",
    };
}

onMounted(loadEnvironments);
onBeforeUnmount(stop);
</script>

<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100 relative">
        <div class="flex justify-center">
            <div class="w-full max-w-lg space-y-5 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                <div class="flex items-start gap-4">
                    <QrCode class="h-10 w-10 text-gray-700" />
                    <div>
                        <h1 class="text-xl font-bold text-gray-800">Reportar Problema</h1>
                        <p class="text-sm text-gray-500">
                            Escaneie o QR Code do local para abrir um chamado.
                        </p>
                    </div>
                </div>
                <hr />

                <div v-if="!isScanning && !isReporting">
                    <button @click="start"
                        class="flex w-full items-center justify-center gap-2 rounded-lg bg-green-700 py-3 font-bold text-white transition-colors hover:bg-green-800">
                        <Camera class="h-6 w-6" />
                        <span>Escanear QR Code</span>
                    </button>

                    <div class="space-y-3 pt-5">
                        <h2 class="text-sm font-semibold uppercase text-gray-500">
                            Acesso Rápido
                        </h2>

                        <div v-for="(env, i) in environments.slice(0, 5)" :key="env.id || i"
                            @click="selectEnvironment(env)"
                            class="flex cursor-pointer items-center gap-4 rounded-lg bg-gray-100 p-3 transition-colors hover:bg-gray-200">
                            <MapPin class="h-6 w-6 text-gray-600" />
                            <div>
                                <p class="font-bold text-gray-800">{{ env.name }}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-else-if="isScanning" class="flex flex-col items-center gap-6 text-center">
                    <button
                        class="flex w-full items-center justify-center gap-2 rounded-lg bg-green-800 py-3 font-bold text-white"
                        disabled>
                        <Camera class="h-6 w-6 animate-pulse" />
                        <span>Aponte para o QR Code...</span>
                    </button>

                    <div id="qr-reader" class="w-full"></div>

                    <button @click="stopScanner"
                        class="bg-[#1C5E27] text-white font-semibold py-2.5 px-5 rounded-lg flex items-center gap-2 hover:bg-[#154b1f] transition-colors text-sm">
                        Cancelar
                    </button>
                </div>

                <div v-else-if="isReporting" class="flex flex-col items-center gap-6 text-center">
                    <h2 class="text-xl font-bold text-gray-800">Reportar Problema</h2>
                    <p class="text-sm text-gray-500">
                        Local selecionado: {{ selectedEnvironment?.name }}
                    </p>

                    <div class="w-full space-y-4">
                        <textarea v-model="ticket.description" placeholder="Descreva o problema" rows="4"
                            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"></textarea>

                        <select v-model="ticket.priority"
                            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                            <option value="LOW">Baixa</option>
                            <option value="MEDIUM">Média</option>
                            <option value="HIGH">Alta</option>
                        </select>

                        <select v-model="ticket.problemType"
                            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                            <option value="HARDWARE">Hardware</option>
                            <option value="SOFTWARE">Software</option>
                            <option value="NETWORK">Rede</option>
                            <option value="OTHER">Outro</option>
                        </select>

                        <select v-if="components.length > 0" v-model="ticket.component"
                            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                            <option disabled value="">Selecione o componente</option>
                            <option v-for="comp in components" :key="comp.id" :value="comp.id">
                                {{ comp.name }}
                            </option>
                        </select>
                    </div>

                    <div class="flex gap-4">
                        <button @click="submitTicket" :disabled="isSubmitting"
                            class="bg-[#1C5E27] text-white font-semibold py-2.5 px-5 rounded-lg flex items-center gap-2 hover:bg-[#154b1f] transition-colors text-sm">
                            Enviar Chamado
                        </button>
                        <button @click="resetForm"
                            class="bg-[#1C5E27] text-white font-semibold py-2.5 px-5 rounded-lg flex items-center gap-2 hover:bg-[#154b1f] transition-colors text-sm">
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <router-link to="/login">
            <button
                class="bg-[#1C5E27] text-white font-semibold py-2.5 px-5 rounded-lg flex items-center gap-2 hover:bg-[#154b1f] transition-colors text-sm absolute bottom-6 right-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="lucide lucide-lock-icon lucide-lock">
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                Fazer Login
            </button>
        </router-link>
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
    color: #1C5E27 !important;
}
</style>
