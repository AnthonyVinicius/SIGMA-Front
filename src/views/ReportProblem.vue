<script setup>
import { ref, onBeforeUnmount, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import { QrCode, Camera, MapPin } from 'lucide-vue-next';
import BaseButton from '../components/BaseButton.vue';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { locais } from '../mock/MockDB';
import TicketsDAO from '../services/TicketsDAO';

const router = useRouter();
const isScanning = ref(false);
const isReporting = ref(false);
const selectedLocation = ref('');
const ticketTitle = ref('');
const ticketDescription = ref('');
const ticketPriority = ref('Normal');

let html5QrcodeScanner = null;

function startScan() {
    isScanning.value = true;
    nextTick(() => {
        const config = {
            fps: 10,
            qrbox: { width: 250, height: 250 },
            rememberLastUsedCamera: true,
            supportedScanTypes: [0]
        };
        html5QrcodeScanner = new Html5QrcodeScanner('qr-reader', config, false);
        html5QrcodeScanner.render(onScanSuccess, onScanFailure);
    });
}

function onScanSuccess(decodedText, decodedResult) {
    console.log(`Código lido com sucesso: ${decodedText}`, decodedResult);
    selectedLocation.value = decodedText;
    isReporting.value = true;
    stopScanner();
}

function onScanFailure(error) {
}

function stopScanner() {
    if (html5QrcodeScanner) {
        html5QrcodeScanner.clear().then(() => {
            console.log("Scanner parado com sucesso.");
            isScanning.value = false;
            html5QrcodeScanner = null;
        }).catch(error => {
            console.error("Falha ao parar o scanner.", error);
            isScanning.value = false;
        });
    }
}

function cancelScan() {
    stopScanner();
}

function selectLocation(locationId) {
    selectedLocation.value = locationId;
    isReporting.value = true;
}

async function submitTicket() {
    if (!ticketTitle.value || !ticketDescription.value) {
        alert('Por favor, preencha o título e a descrição do problema.');
        return;
    }

    try {
        const ticket = {
            title: ticketTitle.value,
            description: ticketDescription.value,
            location: selectedLocation.value,
            priority: ticketPriority.value,
            status: 'Aberto'
        };

        await TicketsDAO.criar(ticket);
        alert('Chamado criado com sucesso!');
        resetForm();
    } catch (error) {
        console.error('Erro ao criar chamado:', error);
        alert('Erro ao criar chamado. Tente novamente.');
    }
}

function resetForm() {
    isReporting.value = false;
    selectedLocation.value = '';
    ticketTitle.value = '';
    ticketDescription.value = '';
    ticketPriority.value = 'Normal';
}

onBeforeUnmount(() => {
    if (html5QrcodeScanner) {
        stopScanner();
    }
});
</script>

<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100 relative">
        <div class="flex justify-center">
            <div class="w-full max-w-lg space-y-5 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">

                <div class="flex items-start gap-4">
                    <QrCode class="h-10 w-10 text-gray-700" />
                    <div>
                        <h1 class="text-xl font-bold text-gray-800">Reportar Problema</h1>
                        <p class="text-sm text-gray-500">Escaneie o QR Code do local para abrir um chamado.</p>
                    </div>
                </div>
                <hr />

                <div v-if="!isScanning && !isReporting">
                    <button @click="startScan"
                        class="flex w-full items-center justify-center gap-2 rounded-lg bg-green-700 py-3 font-bold text-white transition-colors hover:bg-green-800">
                        <Camera class="h-6 w-6" />
                        <span>Escanear QR Code</span>
                    </button>

                    <div class="space-y-3 pt-5">
                        <h2 class="text-sm font-semibold uppercase text-gray-500">Acesso Rápido</h2>

                        <div v-for="(local, i) in locais.slice(0, 5)"
                            class="flex cursor-pointer items-center gap-4 rounded-lg bg-gray-100 p-3 transition-colors hover:bg-gray-200"
                            @click="selectLocation(local.nome)" :key="i">
                            <MapPin class="h-6 w-6 text-gray-600" />
                            <div>
                                <p class="font-bold text-gray-800">{{ local.nome }}</p>
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

                    <BaseButton @click="cancelScan" variant="outlined">
                        Cancelar
                    </BaseButton>
                </div>

                <div v-else-if="isReporting" class="flex flex-col items-center gap-6 text-center">
                    <h2 class="text-xl font-bold text-gray-800">Reportar Problema</h2>
                    <p class="text-sm text-gray-500">Local selecionado: {{ selectedLocation }}</p>

                    <div class="w-full space-y-4">
                        <input
                            v-model="ticketTitle"
                            type="text"
                            placeholder="Título do problema"
                            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />

                        <textarea
                            v-model="ticketDescription"
                            placeholder="Descrição do problema"
                            rows="4"
                            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        ></textarea>

                        <select
                            v-model="ticketPriority"
                            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                            <option value="Normal">Normal</option>
                            <option value="Alta">Alta</option>
                            <option value="Crítica">Crítica</option>
                        </select>
                    </div>

                    <div class="flex gap-4">
                        <BaseButton @click="submitTicket" variant="primary">
                            Enviar Chamado
                        </BaseButton>
                        <BaseButton @click="resetForm" variant="outlined">
                            Cancelar
                        </BaseButton>
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
