<template>
    <BaseLayout>
        <div class="space-y-8">
            <header class="flex items-start">
                <div>
                    <h1 class="text-2xl font-bold text-ponto-if-green">Gerenciar Locais</h1>
                    <p class="text-gray-600">Adicione novos locais e gere QR Codes</p>
                </div>

                <button @click="openAddModal"
                    class="bg-[#1C5E27] text-white font-semibold py-2.5 px-5 rounded-lg flex items-center gap-2 hover:bg-[#154b1f] transition-colors text-sm ms-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="lucide lucide-plus-icon lucide-plus">
                        <path d="M5 12h14" />
                        <path d="M12 5v14" />
                    </svg>
                    Novo Local
                </button>
            </header>

            <div v-if="categorias.length > 0" class="flex gap-2 flex-wrap">
                <button @click="filtroCategoria = null" :class="[
                    'px-4 py-2 rounded-lg text-sm font-medium transition',
                    filtroCategoria === null
                        ? 'bg-[#1C5E27] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                ]">
                    Todas
                </button>
                <button v-for="categoria in categorias" :key="categoria" @click="filtroCategoria = categoria" :class="[
                    'px-4 py-2 rounded-lg text-sm font-medium transition',
                    filtroCategoria === categoria
                        ? 'bg-[#1C5E27] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                ]">
                    {{ categoria }}
                </button>
            </div>

            <section class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <LocalCard v-for="local in locaisFiltrados" :key="local.id" @delete="handleDelete(local.id)"
                    @edit="handleEdit(local)" @generateQr="handleQr(local)">
                    <template #title>{{ local.nome }}</template>
                    <template #id>{{ local.id }}</template>

                    <template #items>
                        <span v-for="item in getItensByLocal(local.id)" :key="item.id"
                            class="bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-lg">
                            {{ item.nome }}
                        </span>
                    </template>
                </LocalCard>
            </section>
        </div>

        <ModalLocal :isOpen="isModalOpen" :localData="selectedLocal" :isEdit="isEditMode" @close="closeModal"
            @submit="handleSubmit" />

        <ModalQRCode :isOpen="isQRModalOpen" :localId="qrLocalId" :localNome="qrLocalNome" @close="closeQRModal" />
    </BaseLayout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import BaseLayout from '../components/BaseLayout.vue';
import LocalCard from '../components/LocalCard.vue';
import ModalLocal from '../components/ModalLocal.vue';
import ModalQRCode from '../components/ModalQRCode.vue';
import locaisService from '../services/locaisService';
import itensService from '../services/itensService';

const locais = ref([]);
const itens = ref([]);
const categorias = ref([]);
const filtroCategoria = ref(null);

const isModalOpen = ref(false);
const isEditMode = ref(false);
const selectedLocal = ref(null);

const isQRModalOpen = ref(false);
const qrLocalId = ref('');
const qrLocalNome = ref('');

const locaisFiltrados = computed(() => {
    if (!filtroCategoria.value) {
        return locais.value;
    }
    return locais.value.filter(local => local.categoria === filtroCategoria.value);
});

onMounted(async () => {
    await loadData();
});

async function loadData() {
    try {
        locais.value = await locaisService.getAllLocais();
        itens.value = await itensService.getAllItens();
        categorias.value = await locaisService.getCategorias();
    } catch (error) {
        console.error('Erro ao carregar dados:', error);
    }
}

function getItensByLocal(localId) {
    return itens.value.filter(item => item.localId === localId);
}

function openAddModal() {
    isEditMode.value = false;
    selectedLocal.value = null;
    isModalOpen.value = true;
}

function handleEdit(local) {
    isEditMode.value = true;
    selectedLocal.value = { ...local };
    isModalOpen.value = true;
}

function closeModal() {
    isModalOpen.value = false;
    selectedLocal.value = null;
}

async function handleSubmit(formData) {
    try {
        if (isEditMode.value && selectedLocal.value) {
            await locaisService.updateLocal(selectedLocal.value.id, formData);
        } else {
            await locaisService.createLocal(formData);
        }
        await loadData();
    } catch (error) {
        console.error('Erro ao salvar local:', error);
    }
}

async function handleDelete(localId) {
    if (confirm('Tem certeza que deseja excluir este local?')) {
        try {
            await locaisService.deleteLocal(localId);
            await loadData();
        } catch (error) {
            console.error('Erro ao excluir local:', error);
        }
    }
}

function handleQr(local) {
    qrLocalId.value = local.id;
    qrLocalNome.value = local.nome;
    isQRModalOpen.value = true;
}

function closeQRModal() {
    isQRModalOpen.value = false;
    qrLocalId.value = '';
    qrLocalNome.value = '';
}
</script>