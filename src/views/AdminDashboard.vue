<script setup>
import { MapPin, TextAlignJustify, Cog, Hand, CircleAlert } from 'lucide-vue-next'
import BaseLayout from '../components/BaseLayout.vue'
import Actions from '../components/Actions.vue'
import ItensTabelaChamado from '../components/ItensTabelaChamado.vue'


const adminActions = [
    {
        icon: MapPin,
        title: 'Gerenciar Locais',
        description: 'Adicionar novos locais e gerar QR Code',
        color: 'text-green-800'
    },
    {
        icon: Cog,
        title: 'Tipos de Itens',
        description: 'Gerenciar e cadastrar tipos de itens',
        color: 'text-green-800'
    },
    {
        icon: TextAlignJustify,
        title: 'Todos os Chamados',
        description: 'Visualizar e gerenciar chamados',
        color: 'text-green-800'
    }
]

const recentCalls = [
    {
        id: 1,
        icon: Hand,
        title: 'Secador de mãos',
        description: 'Não liga',
        location: 'Banheiro 2º Andar',
        priority: 'Normal',
        priorityIcon: Wrench, // Passando o ícone de prioridade
        status: 'aberto', // O status pode ser usado para a lógica do dropdown
        counter: 15,
        date: '21/08/2025',
    },
]
</script>

<template>
    <BaseLayout>
        <div class="space-y-8">
            <header>
                <h1 class="text-2xl font-bold text-ponto-if-green">Dashboard do Administrador</h1>
                <p class="text-gray-600">Bem-vindo ao sistema de manutenção do IFPE</p>
            </header>

            <section>
                <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
                    <Actions v-for="action in adminActions" :key="action.title">
                        <template #logo>
                            <component :is="action.icon" class="" :class="`${action.color} w-10 h-10`" />
                        </template>
                        <template #title>{{ action.title }}</template>
                        <template #description>{{ action.description }}</template>
                    </Actions>
                </div>
            </section>

            <div class=" bg-white p-5 rounded-md shadow-sm">
                <div class="flex items-center mb-3">
                    <h2 class="text-lg font-semibold">Ultimos Chamados Assumidos</h2>
                    <RouterLink to="/" class="ml-auto text-green-800 hover:underline">Ver todos</RouterLink>
                </div>

               <div class="flex flex-col gap-3">
    <ItensTabelaChamado v-for="chamado in recentCalls" :key="chamado.id" :item="chamado" />
</div>
            </div>
        </div>
    </BaseLayout>
</template>
