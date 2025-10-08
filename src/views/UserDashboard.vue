<script setup>
import {
    Hand,
    CircleAlert,
    Clock,
    CircleCheck,
    QrCode,
    TextAlignJustify,
} from 'lucide-vue-next'

import BaseLayout from '../components/BaseLayout.vue'
import Actions from '../components/Actions.vue'
import StatusChamado from '../components/StatusChamado.vue'
import ItensTabelaChamado from '../components/ItensTabelaChamado.vue'

const statusList = [
    { icon: CircleAlert, title: 'Chamado em Aberto', count: 5, color: 'text-red-500' },
    { icon: Clock, title: 'Chamado em Andamento', count: 5, color: 'text-yellow-500' },
    { icon: CircleCheck, title: 'Chamado Finalizado', count: 5, color: 'text-green-500' },
]


const quickActions = [
    {
        icon: QrCode,
        title: 'Escanear QR Code',
        description: 'Escaneie o QR Code de um local para reportar um problema',
        color: 'text-green-800',
    },
    {
        icon: TextAlignJustify,
        title: 'Meus Chamados',
        description: 'Visualize o status dos seus chamados abertos',
        color: 'text-green-800',
    },
]

const recentCalls = [
    {
        icon: Hand,
        title: 'Secador de mãos',
        description: 'Não liga',
        location: 'Banheiro 2º Andar',
        statusIcon: CircleAlert,
        statusColor: 'text-red-500',
        date: '21/08/2025',
    },
]
</script>

<template>
    <BaseLayout>
        <div class="space-y-8">
            <div>
                <h1 class="text-2xl font-bold text-ponto-if-green">Dashboard do Usuário</h1>
                <p class="text-gray-600">Bem-vindo ao sistema de manutenção do IFPE</p>
            </div>

            <div class="flex gap-10 justify-center">
                <StatusChamado v-for="status in statusList" :key="status.title">
                    <template #logo>
                        <component :is="status.icon" :class="`${status.color} w-20 h-20`" />
                    </template>
                    <template #title>{{ status.title }}</template>
                    <template #number>{{ status.count }}</template>
                </StatusChamado>
            </div>

            <div class="flex gap-10 justify-center">
                <Actions v-for="action in quickActions" :key="action.title">
                    <template #logo>
                        <component :is="action.icon" :class="`${action.color} w-10 h-10`" />
                    </template>
                    <template #title>{{ action.title }}</template>
                    <template #description>{{ action.description }}</template>
                </Actions>
            </div>

            <div class=" bg-white p-5 rounded-md shadow-sm">
                <div class="flex items-center mb-3">
                    <h2 class="text-lg font-semibold">Meus Chamados Recentes</h2>
                    <RouterLink to="/" class="ml-auto text-green-800 hover:underline">Ver todos</RouterLink>
                </div>

                <div class="flex flex-col gap-2">
                    <ItensTabelaChamado v-for="chamado in recentCalls" :key="chamado.title">
                        <template #logo>
                            <component :is="chamado.icon" class="text-green-800" />
                        </template>
                        <template #title>{{ chamado.title }}</template>
                        <template #description>{{ chamado.description }}</template>
                        <template #location>{{ chamado.location }}</template>
                        <template #status>
                            <component :is="chamado.statusIcon" :class="chamado.statusColor" />
                        </template>
                        <template #date>{{ chamado.date }}</template>
                    </ItensTabelaChamado>
                </div>
            </div>
        </div>
    </BaseLayout>
</template>
