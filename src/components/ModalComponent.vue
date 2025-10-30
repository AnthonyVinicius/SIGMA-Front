<template>
    <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-[#f0f0f0]"
        @click.self="closeModal">
        <div class="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-xl font-bold text-gray-800">{{ isEdit ? 'Editar Item' : 'Detalhes do Item' }}</h2>
                <button @click="closeModal" class="text-gray-400 hover:text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M18 6 6 18" />
                        <path d="m6 6 12 12" />
                    </svg>
                </button>
            </div>

            <div class="space-y-4">
                <div>
                    <p class="text-gray-800"><strong>Nome:</strong> {{ itemData.nome }}</p>
                    <p class="text-gray-800"><strong>Tipo:</strong> {{ itemData.tipo || '—' }}</p>
                    <p class="text-gray-800"><strong>Local ID:</strong> {{ itemData.environmentId || 'Nenhum' }}</p>
                </div>

                <div class="flex gap-3 justify-end pt-2">
                    <button @click="openLocalModal"
                        class="px-4 py-2 bg-[#1C5E27] text-white rounded-lg hover:bg-[#154b1f] transition">
                        Cadastrar Novo Local
                    </button>

                    <button type="button" @click="closeModal"
                        class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition">
                        Fechar
                    </button>
                </div>
            </div>
        </div>

        <ModalLocal v-if="isLocalModalOpen" :isOpen="isLocalModalOpen" :presetEnvironmentId="itemData.environmentId"
            @close="isLocalModalOpen = false" @submit="handleLocalSubmit" />
    </div>
</template>

<script setup>
import { ref } from 'vue';
import ModalLocal from './ModalEnviromental.vue';

const props = defineProps({
    isOpen: Boolean,
    itemData: Object,
    isEdit: Boolean
});

const emit = defineEmits(['close', 'submit']);

const isLocalModalOpen = ref(false);

function closeModal() {
    emit('close');
}

function openLocalModal() {
    isLocalModalOpen.value = true;
}

function handleLocalSubmit(localData) {
    console.log("Novo local cadastrado com ID relacionado:", props.itemData.environmentId);
    console.log(localData);
    isLocalModalOpen.value = false;
}
</script>
