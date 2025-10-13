<script setup>
import BaseLayout from '../components/BaseLayout.vue'
import Actions from '../components/Actions.vue'
import StatusChamado from '../components/StatusChamado.vue'
import ItensTabelaChamado from '../components/ItensTabelaChamado.vue'
import { statusList, recentCalls } from '../mock/MockDB'
import { QrCode, TextAlignJustify } from 'lucide-vue-next'


const quickActions = [
    {
        id: 1,
        icon: QrCode,
        title: 'Escanear QR Code',
        description: 'Escaneie o QR Code de um local para reportar um problema',
        color: 'text-green-800',
    },
    {
        id: 2,
        icon: TextAlignJustify,
        title: 'Meus Chamados',
        description: 'Visualize o status dos seus chamados abertos',
        color: 'text-green-800',
    },
]

</script>

<template>
    <BaseLayout>
        <div class="container mx-auto space-y-8 px-4">
            <div>
                <h1 class="text-2xl font-bold text-ponto-if-green">Dashboard do Usuário</h1>
                <p class="text-gray-600">Bem-vindo ao sistema de manutenção do IFPE</p>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatusChamado v-for="status in statusList" :key="status.title"
                    class="bg-white rounded-md shadow-sm p-4">
                    <template #logo>
                        <component :is="status.icon" :class="`${status.color} w-14 h-14 mb-2`" />
                    </template>
                    <template #title>{{ status.title }}</template>
                    <template #number>{{ status.count }}</template>
                </StatusChamado>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Actions v-for="action in quickActions" :key="action.title"
                    class="flex flex-col items-center text-center bg-white rounded-md shadow-sm p-6">
                    <template #logo>
                        <component :is="action.icon" :class="`${action.color} w-10 h-10 mb-3`" />
                    </template>
                    <template #title>{{ action.title }}</template>
                    <template #description>{{ action.description }}</template>
                </Actions>
            </div>

            <div class="bg-white p-5 rounded-md shadow-sm">
                <div class="flex items-center mb-3">
                    <h2 class="text-lg font-semibold">Meus Chamados Recentes</h2>
                    <RouterLink to="/" class="ml-auto text-green-800 hover:underline">
                        Ver todos
                    </RouterLink>
                </div>

               <div class="flex flex-col gap-3">
    <ItensTabelaChamado v-for="chamado in recentCalls" :key="chamado.id" :item="chamado" />
</div>
            </div>
        </div>
    </BaseLayout>
</template>
