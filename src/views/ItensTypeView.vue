<template>
    <BaseLayout>
        <div class="space-y-8">
            <header class="flex items-start">
                <div>
                    <h1 class="text-2xl font-bold text-ponto-if-green">Gerenciar Itens</h1>
                    <p class="text-gray-600">Adicione e gerencie itens dos locais</p>
                </div>

                <button @click="openAddModal"
                    class="bg-[#1C5E27] text-white font-semibold py-2.5 px-5 rounded-lg flex items-center gap-2 hover:bg-[#154b1f] transition-colors text-sm ms-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="lucide lucide-plus-icon lucide-plus">
                        <path d="M5 12h14" />
                        <path d="M12 5v14" />
                    </svg>
                    Novo Item
                </button>
            </header>

            <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div class="overflow-x-auto">
                    <table class="w-full">
                        <thead class="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Nome
                                </th>
                                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Ações
                                </th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            <tr v-for="item in itens" :key="item.id" class="hover:bg-gray-50 transition">
                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {{ item.nome }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <div class="flex items-center justify-end gap-2">
                                        <button @click="handleEdit(item)"
                                            class="text-gray-600 hover:text-gray-800 transition" title="Editar">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                                                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                                stroke-linecap="round" stroke-linejoin="round">
                                                <path d="M13 21h8" />
                                                <path d="m15 5 4 4" />
                                                <path
                                                    d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
                                            </svg>
                                        </button>
                                        <button @click="handleDelete(item.id)"
                                            class="text-red-500 hover:text-red-700 transition" title="Excluir">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                                                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                                stroke-linecap="round" stroke-linejoin="round">
                                                <path d="M10 11v6" />
                                                <path d="M14 11v6" />
                                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                                                <path d="M3 6h18" />
                                                <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                            </svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <ModalItem :isOpen="isModalOpen" :itemData="selectedItem" :isEdit="isEditMode" @close="closeModal"
            @submit="handleSubmit" />
    </BaseLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import BaseLayout from '../components/BaseLayout.vue';
import ModalItem from '../components/ModalItem.vue';
import itensService from '../services/itensService';

const itens = ref([]);

const isModalOpen = ref(false);
const isEditMode = ref(false);
const selectedItem = ref(null);

onMounted(async () => {
    await loadData();
});

async function loadData() {
    try {
        itens.value = await itensService.getAllItens();
    } catch (error) {
        console.error('Erro ao carregar dados:', error);
    }
}

function openAddModal() {
    isEditMode.value = false;
    selectedItem.value = null;
    isModalOpen.value = true;
}

function handleEdit(item) {
    isEditMode.value = true;
    selectedItem.value = { ...item };
    isModalOpen.value = true;
}

function closeModal() {
    isModalOpen.value = false;
    selectedItem.value = null;
}

async function handleSubmit(formData) {
    try {
        if (isEditMode.value && selectedItem.value) {
            await itensService.updateItem(selectedItem.value.id, formData);
        } else {
            await itensService.createItem(formData);
        }
        await loadData();
    } catch (error) {
        console.error('Erro ao salvar item:', error);
    }
}

async function handleDelete(itemId) {
    if (confirm('Tem certeza que deseja excluir este item?')) {
        try {
            await itensService.deleteItem(itemId);
            await loadData();
        } catch (error) {
            console.error('Erro ao excluir item:', error);
        }
    }
}
</script>