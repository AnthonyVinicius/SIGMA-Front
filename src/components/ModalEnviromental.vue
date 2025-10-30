<template>
    <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-[#f0f0f0]"
        @click.self="closeModal">
        <div class="bg-white rounded-xl shadow-lg w-full max-w-lg p-6">
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-xl font-bold text-gray-800">{{ isEdit ? 'Editar Local' : 'Novo Local' }}</h2>
                <button @click="closeModal" class="text-gray-400 hover:text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M18 6 6 18" />
                        <path d="m6 6 12 12" />
                    </svg>
                </button>
            </div>

            <form @submit.prevent="handleSubmit" class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Nome do Local</label>
                    <input v-model="formData.name" type="text" required
                        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1C5E27] shadow-sm"
                        placeholder="Ex: Sala 101">

                    <label class="block text-sm font-medium text-gray-700 mb-1 mt-3">Bloco</label>
                    <input v-model="formData.block" type="text" required
                        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1C5E27] shadow-sm"
                        placeholder="Ex: Bloco C">

                    <label class="block text-sm font-medium text-gray-700 mb-1 mt-3">Categoria</label>
                    <select id="category" v-model="formData.category"
                        class="w-full px-3 py-2 border border-gray-300 text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1C5E27] shadow-sm"
                        required>
                        <option disabled value="">Selecione a Categoria</option>
                        <option v-for="category in categories" :key="category" :value="category" class="text-gray-700">
                            {{ category }}
                        </option>
                    </select>
                </div>

                <div class="flex gap-3 justify-end pt-2">
                    <button type="button" @click="closeModal"
                        class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition">
                        Cancelar
                    </button>
                    <button type="submit"
                        class="px-4 py-2 bg-[#1C5E27] text-white rounded-lg hover:bg-[#154b1f] transition">
                        {{ isEdit ? 'Salvar Alterações' : 'Adicionar Local' }}
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
    isOpen: Boolean,
    localData: Object,
    isEdit: Boolean,
    presetEnvironmentId: String
});

const emit = defineEmits(['close', 'submit']);

const categories = ref([
    "ROOM",
    "LIBRARY",
    "LABORATORY",
    "OFFICE",
    "COMMON_AREA",
    "BATHROOMS",
    "OUTDOORS",
    "OTHER"
]);

const formData = ref({
    id: null,
    name: '',
    block: '',
    category: '',
    environmentParentId: '' 
});

watch(
    () => props.localData,
    (newData) => {
        if (newData) {
            formData.value = {
                id: newData.id || null,
                name: newData.name || '',
                block: newData.block || '',
                category: newData.category || '',
                environmentParentId: props.presetEnvironmentId || ''
            };
        } else {
            resetForm();
        }
    },
    { immediate: true }
);

function resetForm() {
    formData.value = {
        id: null,
        name: '',
        block: '',
        category: '',
        environmentParentId: props.presetEnvironmentId || ''
    };
}

function closeModal() {
    emit('close');
}

function handleSubmit() {
    console.log("Novo local com vínculo:", formData.value.environmentParentId);
    emit('submit', { ...formData.value });
}
</script>
