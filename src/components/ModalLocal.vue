<template>
    <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        @click.self="closeModal">
        <div class="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
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
                    <input v-model="formData.nome" type="text" required
                        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1C5E27]"
                        placeholder="Ex: Sala 101">
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
                    <select v-model="formData.categoria" required
                        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1C5E27]">
                        <option value="">Selecione uma categoria</option>
                        <option value="Administrativo">Administrativo</option>
                        <option value="Laboratório">Laboratório</option>
                        <option value="Acadêmico">Acadêmico</option>
                        <option value="Infraestrutura">Infraestrutura</option>
                        <option value="Alimentação">Alimentação</option>
                        <option value="Eventos">Eventos</option>
                    </select>
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                    <textarea v-model="formData.descricao" rows="3"
                        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1C5E27]"
                        placeholder="Descreva o local"></textarea>
                </div>

                <div class="flex gap-3 justify-end pt-2">
                    <button type="button" @click="closeModal"
                        class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition">
                        Cancelar
                    </button>
                    <button type="submit"
                        class="px-4 py-2 bg-[#1C5E27] text-white rounded-lg hover:bg-[#154b1f] transition">
                        {{ isEdit ? 'Salvar' : 'Adicionar' }}
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
    isEdit: Boolean
});

const emit = defineEmits(['close', 'submit']);

const formData = ref({
    nome: '',
    categoria: '',
    descricao: ''
});

watch(() => props.localData, (newData) => {
    if (newData) {
        formData.value = { ...newData };
    }
}, { immediate: true });

watch(() => props.isOpen, (isOpen) => {
    if (!isOpen) {
        formData.value = {
            nome: '',
            categoria: '',
            descricao: ''
        };
    }
});

function closeModal() {
    emit('close');
}

function handleSubmit() {
    emit('submit', { ...formData.value });
    closeModal();
}
</script>
