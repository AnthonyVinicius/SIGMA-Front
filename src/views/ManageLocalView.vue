<template>
    <BaseLayout>
        <div class="space-y-8">
            <header class="flex flex-col sm:flex-row sm:items-center justify-between">
                <div class="mb-4 sm:mb-0">
                    <h1 class="text-2xl font-bold text-ponto-if-green">Gerenciar Locais</h1>
                    <p class="text-gray-600">Adicione novos locais e gere QR Codes</p>
                </div>

                <div class="flex items-center gap-4">
                    <div class="flex items-center">
                        <select v-model="selectedCategory" id="filter-category"
                            class="block w-full md:w-64 px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:border-green-500 focus:ring-green-500">
                            <option value="">Todas as Categorias</option>
                            <option v-for="category in uniqueCategories" :key="category" :value="category">
                                {{ category }}
                            </option>
                        </select>
                    </div>


                    <button
                        class="bg-[#1C5E27] text-white font-semibold py-2.5 px-5 rounded-lg flex items-center gap-2 hover:bg-[#154b1f] transition-colors text-sm flex-shrink-0">
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
                <LocalCard v-for="(local, i) in filteredLocais" :key="local.id || i" @delete="handleDelete" @edit="handleEdit"
                    @generateQr="handleQr">
                    <template #title>{{ local.nome }}</template>
                    <template #id>{{ local.id }}</template>

                    <template #items>
                        <span v-for="(category, index) in local.category" :key="'cat-' + index"
                            class="bg-gray-200 text-gray-700 text-xs font-medium px-3 py-1 rounded-lg mr-1 mb-1 whitespace-nowrap">
                            {{ category }}
                        </span>
                        <span v-for="(item, index) in local.itens" :key="'item-' + index"
                            class="bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-lg mr-1 mb-1 whitespace-nowrap">
                            {{ item }}
                        </span>
                    </template>
                </LocalCard>
            </section>
            
            <p v-if="filteredLocais.length === 0" class="text-center text-gray-500 mt-10">
                Nenhum local encontrado nesta categoria.
            </p>

        </div>
    </BaseLayout>
</template>

<script setup>
import { ref, computed } from 'vue';
import BaseLayout from '../components/BaseLayout.vue';
import LocalCard from '../components/LocalCard.vue'
import { locais } from '../mock/MockDB';

// Cópia da lista de mock para reatividade interna
const listaLocais = ref([...locais]);

// Estado para a categoria selecionada no filtro
const selectedCategory = ref('');

// 1. Geração da lista de categorias únicas
const uniqueCategories = computed(() => {
    // Pega todas as categorias de todos os locais e as achata em um único array (flatMap)
    const allCategories = listaLocais.value.flatMap(local => local.category || []); 
    // Remove duplicadas usando Set e retorna a lista ordenada
    return [...new Set(allCategories)].sort();
});

// 2. Lógica do filtro para array de categorias
const filteredLocais = computed(() => {
    if (!selectedCategory.value) {
        // Se nenhuma categoria estiver selecionada, retorna todos os locais
        return listaLocais.value;
    }
    
    // Filtra os locais verificando se a categoria selecionada está incluída no array 'category' do local.
    return listaLocais.value.filter(local => {
        // Garante que local.category é um array e verifica se inclui a categoria selecionada
        const categories = Array.isArray(local.category) ? local.category : [];
        return categories.includes(selectedCategory.value);
    });
});

// Funções de ação (Mantidas como no original)
function handleDelete() {
    console.log('Excluir local')
}
function handleEdit() {
    console.log('Editar local')
}
function handleQr() {
    console.log('Gerar QR Code')
}
</script>