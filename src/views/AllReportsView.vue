<template>
    <BaseLayout>
        <div class="space-y-8">
            <header class="flex items-center justify-between">
                <div>
                    <h1 class="text-2xl font-bold text-ponto-if-green">Todos os Chamados</h1>
                    <p class="text-gray-600">Visualize todos os chamados registrados</p>
                </div>
            </header>

            <section class="flex flex-col gap-4">
                <ItensTabelaChamado v-for="(chamado, i) in calls" :key="chamado.id || i">
                    <template #icon>
                        <component :is="chamado.icon" class="w-8 h-8 text-green-700" />
                    </template>

                    <template #title>{{ chamado.title }}</template>
                    <template #description>{{ chamado.description }}</template>
                    <template #location>{{ chamado.location }}</template>
                    <template #priority>{{ chamado.priority }}</template>
                    <template #counter>{{ chamado.counter }}</template>
                    <template #date>{{ chamado.date }}</template>

                    <template #status>
                        <span v-if="chamado.status === 'Aberto'"
                            class="bg-red-100 text-red-700 px-4 py-1.5 rounded-md font-medium text-sm">
                            {{ chamado.status }}
                        </span>
                        <span v-else-if="chamado.status === 'Em Andamento'"
                            class="bg-yellow-100 text-yellow-700 px-4 py-1.5 rounded-md font-medium text-sm">
                            {{ chamado.status }}
                        </span>
                        <span v-else class="bg-green-100 text-green-700 px-4 py-1.5 rounded-md font-medium text-sm">
                            {{ chamado.status }}
                        </span>
                    </template>
                </ItensTabelaChamado>
            </section>
        </div>
    </BaseLayout>
</template>

<script setup>
import BaseLayout from "../components/BaseLayout.vue";
import { calls } from "../mock/MockDB";
import ItensTabelaChamado from '../components/ItensTabelaChamado.vue'

</script>
