<template>
    <BaseLayout>
        <div class="space-y-6">
            <header class="flex justify-between items-center">
                <div>
                    <h1 class="text-2xl font-bold text-ponto-if-green">
                        Itens do Local {{ localName || '(Carregando...)' }}
                    </h1>
                    <p class="text-gray-600">Gerencie os itens associados a este local</p>
                </div>

                <button @click="openAddItemModal"
                    class="bg-[#1C5E27] text-white font-semibold py-2 px-4 rounded-lg hover:bg-[#154b1f] transition">
                    Adicionar Item
                </button>
            </header>

            <section>
                <div v-if="loading" class="text-gray-500 text-center py-10">Carregando itens...</div>

                <div v-else-if="itens.length === 0" class="text-gray-500 text-center py-10">
                    Nenhum item encontrado neste local.
                </div>

                <ul v-else class="space-y-3">
                    <li v-for="item in itens" :key="item.id"
                        class="p-4 bg-white shadow rounded-lg flex justify-between items-center">
                        <div>
                            <p class="font-semibold text-gray-800">{{ item.nome }}</p>
                            <p class="text-sm text-gray-500">ID: {{ item.id }}</p>
                        </div>
                        <button @click="deleteItem(item.id)"
                            class="text-red-600 hover:text-red-800 transition text-sm">Excluir</button>
                    </li>
                </ul>
            </section>

            <ModalItem :isOpen="isModalOpen" @close="isModalOpen = false" @submit="handleItemSubmit" />
        </div>
    </BaseLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import BaseLayout from '../components/BaseLayout.vue';
import ModalItem from '../components/ModalComponent.vue';
import EnviromentalDAO from '../services/EnviromentalDAO';
import ComponentDAO from '../services/ComponentDAO'

const route = useRoute();
const localId = route.params.id;

const localName = ref('');
const itens = ref([]);
const loading = ref(true);
const isModalOpen = ref(false);

onMounted(async () => {
    await loadLocalInfo();
    await loadItens();
});

async function loadLocalInfo() {
    try {
        const local = await EnviromentalDAO.getById(localId);
        localName.value = local.name;
    } catch (error) {
        console.error("Erro ao carregar local:", error);
    }
}

async function loadItens() {
    try {
        itens.value = await ComponentDAO.getById(localId);
    } catch (error) {
        console.error("Erro ao carregar itens:", error);
    } finally {
        loading.value = false;
    }
}

function openAddItemModal() {
    isModalOpen.value = true;
}

async function handleItemSubmit(formData) {
    try {
        await itensService.createItem({
            ...formData,
            environmentId: localId
        });
        await loadItens();
    } catch (error) {
        console.error("Erro ao criar item:", error);
    } finally {
        isModalOpen.value = false;
    }
}

async function deleteItem(itemId) {
    if (confirm('Excluir este item?')) {
        await itensService.deleteItem(itemId);
        await loadItens();
    }
}
</script>
