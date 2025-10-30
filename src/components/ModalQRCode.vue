<template>
    <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-[#f0f0f0]"
        @click.self="closeModal">
        <div class="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-xl font-bold text-gray-800">QR Code - {{ localNome }}</h2>
                <button @click="closeModal" class="text-gray-400 hover:text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M18 6 6 18" />
                        <path d="m6 6 12 12" />
                    </svg>
                </button>
            </div>

            <div class="flex flex-col items-center space-y-4">
                <div class="bg-gray-50 p-4 rounded-lg">
                    <canvas ref="qrcodeCanvas"></canvas>
                </div>

                <p class="text-sm text-gray-600 text-center">
                    ID: {{ localId }}
                </p>

                <button @click="downloadQRCode"
                    class="w-full bg-[#1C5E27] text-white font-semibold py-2.5 px-5 rounded-lg hover:bg-[#154b1f] transition-colors flex items-center justify-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" x2="12" y1="15" y2="3" />
                    </svg>
                    Baixar QR Code
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue';
import QRCode from 'qrcode';

const props = defineProps({
    isOpen: Boolean,
    localId: String,
    localNome: String
});

const emit = defineEmits(['close']);

const qrcodeCanvas = ref(null);

watch(() => props.isOpen, async (isOpen) => {
    if (isOpen && props.localId) {
        await nextTick();
        generateQRCode();
    }
});

async function generateQRCode() {
    if (!qrcodeCanvas.value) return;

    try {
        await QRCode.toCanvas(qrcodeCanvas.value, props.localId, {
            width: 256,
            margin: 2,
            color: {
                dark: '#1C5E27',
                light: '#FFFFFF'
            }
        });
    } catch (error) {
        console.error('Erro ao gerar QR Code:', error);
    }
}

function closeModal() {
    emit('close');
}

function downloadQRCode() {
    if (!qrcodeCanvas.value) return;

    const link = document.createElement('a');
    link.download = `qrcode-${props.localNome}.png`;
    link.href = qrcodeCanvas.value.toDataURL();
    link.click();
}
</script>
