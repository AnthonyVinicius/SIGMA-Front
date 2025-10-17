<template>
    <BaseLayout>
        <div class="space-y-8">
            <header class="flex">
                <div>
                    <h1 class="text-2xl font-bold text-ponto-if-green">Gerenciar Locais</h1>
                    <p class="text-gray-600">Adicione novos locais e gere QR Codes</p>
                </div>


                <button
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


            <section class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <LocalCard v-for="(local, i) in locais" :key="i" @delete="handleDelete" @edit="handleEdit"
                    @generateQr="handleQr">
                    <template #title>{{ local.nome }}</template>
                    <template #id>{{ local.id }}</template>

                    <template #items>
                        <span v-for="(item, index) in local.itens" :key="index"
                            class="bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-lg">
                            {{ item }}
                        </span>
                    </template>
                </LocalCard>
            </section>

        </div>
    </BaseLayout>
</template>

<script setup>
import BaseLayout from '../components/BaseLayout.vue';
import LocalCard from '../components/LocalCard.vue'
import { locais } from '../mock/MockDB';


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