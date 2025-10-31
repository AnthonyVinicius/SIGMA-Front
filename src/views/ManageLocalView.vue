<template>
    <BaseLayout>
        <div class="space-y-8">
            <header class="flex flex-col sm:flex-row sm:items-center justify-between">
                <div class="mb-4 sm:mb-0">
                    <h1 class="text-2xl font-bold text-ponto-if-green">Gerenciar Locais</h1>
                    <p class="text-gray-600">Adicione novos locais e gere QR Codes</p>
                </div>

                <div class="flex items-center gap-4">
                    <select v-model="selectedCategory"
                        class="block w-full md:w-64 px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:border-green-500 focus:ring-green-500"
                        aria-label="Selecionar categoria">
                        <option value="">Todas as Categorias</option>
                        <option v-for="category in uniqueCategories" :key="category" :value="category">
                            {{ category }}
                        </option>
                    </select>

                    <button @click="openCreateModal"
                        class="bg-[#1C5E27] text-white font-semibold py-2.5 px-5 rounded-lg flex items-center gap-2 hover:bg-[#154b1f] transition-colors text-sm flex-shrink-0"
                        aria-label="Adicionar novo local">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="lucide lucide-plus-icon lucide-plus">
                            <path d="M5 12h14" />
                            <path d="M12 5v14" />
                        </svg>
                        Novo Local
                    </button>
                </div>
            </header>

            <section class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <LocalCard v-for="local in filteredLocais" :key="local.id" @click="openLocalItems(local.id)"
                    @delete="handleDelete(local.id)" @edit="openEditModal(local)" @generateQr="openQrModal(local)">
                    <template #title>{{ local.name }}</template>
                    <template #id>{{ local.id }}</template>

                    <template #items>
                        <span v-if="local.category"
                            class="bg-gray-200 text-gray-700 text-xs font-medium px-3 py-1 rounded-lg mr-1 mb-1 whitespace-nowrap">
                            {{ formatCategory(local.category) }}
                        </span>

                        <span v-for="itemId in (local.itensIds || [])" :key="'item-' + itemId"
                            class="bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-lg mr-1 mb-1 whitespace-nowrap">
                            {{ getItemNome(itemId) }}
                        </span>
                    </template>
                </LocalCard>
            </section>


            <p v-if="filteredLocais.length === 0" class="text-center text-gray-500 mt-10">
                Nenhum local encontrado nesta categoria.
            </p>
        </div>

        <ModalEnviromental :isOpen="isModalOpen" :localData="selectedLocal" :isEdit="isEditMode" :itens="itens"
            @close="closeModal" @submit="handleSubmit" />

        <ModalQRCode :isOpen="isQRModalOpen" :localId="qrLocalId" :localNome="qrLocalNome" @close="closeQRModal" />
    </BaseLayout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import BaseLayout from '../components/BaseLayout.vue';
import LocalCard from '../components/LocalCard.vue';
import ModalEnviromental from '../components/ModalEnviromental.vue';
import ModalQRCode from '../components/ModalQRCode.vue';
import EnviromentalDAO from '../services/EnviromentalDAO';
import { useRouter } from 'vue-router';
const router = useRouter();

function openLocalItems(localId) {
    router.push(`/locais/${localId}/itens`);
}

const locais = ref([]);
const itens = ref([]);
const selectedCategory = ref('');
const isModalOpen = ref(false);
const isEditMode = ref(false);
const selectedLocal = ref(null);
const isQRModalOpen = ref(false);
const qrLocalId = ref('');
const qrLocalNome = ref('');

onMounted(loadData);

async function loadData() {
    try {
        const [dataLocais] = await Promise.all([
            EnviromentalDAO.getAll(),
        ]);

        locais.value = dataLocais.map(l => ({
            ...l,
            name: l.name || 'Sem nome',
            category: l.category || null,
            itensIds: l.itensIds || []
        }));

    } catch (error) {
        console.error('Erro ao carregar dados:', error);
        alert('Erro ao carregar dados.');
    }
}

function getItemNome(itemId) {
    const item = itens.value.find(i => i.id === itemId);
    return item ? item.nome : 'Item não encontrado';
}

function formatCategory(category) {
    if (typeof category === 'string') return category;
    if (category?.name) return category.name;
    return 'Sem categoria';
}

const uniqueCategories = computed(() => {
    const allCategories = locais.value.map(local => formatCategory(local.category));
    return [...new Set(allCategories.filter(Boolean))].sort();
});

const filteredLocais = computed(() => {
    if (!selectedCategory.value) return locais.value;
    return locais.value.filter(local => formatCategory(local.category) === selectedCategory.value);
});

async function handleSubmit(formData) {
    if (isEditMode.value && selectedLocal.value?.id) {
        await updateLocal(selectedLocal.value.id, formData);
    } else {
        await createLocal(formData);
    }

    closeModal();
    await loadData();
}

async function createLocal(formData) {
    try {
        await EnviromentalDAO.insert(formData);
    } catch (error) {
        console.error("Erro ao criar local:", error);
        alert("Erro ao criar local.");
    }
}

async function updateLocal(id, formData) {
    try {
        await EnviromentalDAO.update(id, formData);
    } catch (error) {
        console.error("Erro ao atualizar local:", error);
        alert("Erro ao atualizar local.");
    }
}

async function handleDelete(localId) {
    if (confirm('Tem certeza que deseja excluir este local?')) {
        try {
            await EnviromentalDAO.delete(localId);
            locais.value = locais.value.filter(l => l.id !== localId);
        } catch (error) {
            console.error('Erro ao excluir local:', error);
            alert('Erro ao excluir local.');
        }
    }
}

function openCreateModal() {
    isEditMode.value = false;
    selectedLocal.value = null;
    isModalOpen.value = true;
}

function openEditModal(local) {
    isEditMode.value = true;
    selectedLocal.value = local;
    isModalOpen.value = true;
}

function closeModal() {
    isModalOpen.value = false;
}

function openQrModal(local) {
    qrLocalId.value = local.id;
    qrLocalNome.value = local.name;
    isQRModalOpen.value = true;
}

function closeQRModal() {
    isQRModalOpen.value = false;
    qrLocalId.value = '';
    qrLocalNome.value = '';
}
</script>

