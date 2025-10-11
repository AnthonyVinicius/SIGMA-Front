// src/views/ReportProblem.vue

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import BaseLayout from '../components/BaseLayout.vue'
import { QrCode, Camera, MapPin } from 'lucide-vue-next'
import BaseButton from '../components/BaseButton.vue'

const router = useRouter()

const isScanning = ref(false)

const quickAccessLocations = ref([
    { id: 1, name: 'Banheiro 2º Andar', itemTypes: 3, openCalls: 1 },
    { id: 2, name: 'Copa 3º Andar', itemTypes: 3, openCalls: 1 },
    { id: 3, name: 'Sala de Reunião 101', itemTypes: 3, openCalls: 1 },
    { id: 4, name: 'Laboratório 07', itemTypes: 3, openCalls: 1 },
])

function startScan() {
    isScanning.value = true
    setTimeout(() => {
        if (isScanning.value) {
            alert('QR Code lido com sucesso! (Simulação)')
            isScanning.value = false
        }
    }, 3000);
}

function cancelScan() {
    isScanning.value = false
}

function goToReport(locationId) {
    alert(`Redirecionando para abrir chamado no local ID: ${locationId}`)
}
</script>

<template>
    <BaseLayout>
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

                <div v-if="!isScanning">
                    <button @click="startScan"
                        class="flex w-full items-center justify-center gap-2 rounded-lg bg-green-700 py-3 font-bold text-white transition-colors hover:bg-green-800">
                        <Camera class="h-6 w-6" />
                        <span>Escanear QR Code</span>
                    </button>

                    <div class="space-y-3 pt-5">
                        <h2 class="text-sm font-semibold uppercase text-gray-500">Acesso Rápido</h2>
                        <div v-for="location in quickAccessLocations" :key="location.id"
                            @click="goToReport(location.id)"
                            class="flex cursor-pointer items-center gap-4 rounded-lg bg-gray-100 p-3 transition-colors hover:bg-gray-200">
                            <MapPin class="h-6 w-6 text-gray-600" />
                            <div>
                                <p class="font-bold text-gray-800">{{ location.name }}</p>
                                <p class="text-xs text-gray-500">
                                    {{ location.itemTypes }} tipos de itens - {{ location.openCalls }} chamado aberto
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-else class="flex flex-col items-center gap-6 text-center">
                    <button
                        class="flex w-full items-center justify-center gap-2 rounded-lg bg-green-800 py-3 font-bold text-white"
                        disabled>
                        <Camera class="h-6 w-6 animate-pulse" />
                        <span>Escaneando...</span>
                    </button>

                    <div class="w-full max-w-xs rounded-lg border-2 border-dashed border-gray-300 p-4">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg"
                            alt="QR Code" class="h-auto w-full" />
                    </div>

                    <BaseButton @click="cancelScan" variant="outlined">
                        Cancelar
                    </BaseButton>
                </div>
            </div>
        </div>
    </BaseLayout>
</template>