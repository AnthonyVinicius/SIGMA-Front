```vue
<script setup>
import { computed, onMounted, ref } from 'vue'
import BaseLayout from '../components/BaseLayout.vue'
import Actions from '../components/Actions.vue'
import StatusChamado from '../components/StatusChamado.vue'
import ItensTabelaChamado from '../components/ItensTabelaChamado.vue'
import { calls } from '../mock/MockDB'
import { CircleAlert, Clock, CircleCheck, QrCode, TextAlignJustify } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'
import TicketsDAO from '../services/TicketsDAO'

const totalAbertos = computed(() => calls.filter(c => c.status === 'Aberto').length)
const totalAndamento = computed(() => calls.filter(c => c.status === 'Em Andamento').length)
const totalConcluidos = computed(() => calls.filter(c => c.status === 'Concluído').length)
const recentCalls = ref([])

async function loadTickets() {
    try {
        recentCalls.value = await TicketsDAO.getAll()
    } catch (error) {
        console.error(error)
    }
}

function formatarData(isoString) {
    if (!isoString) return ''
    const data = new Date(isoString)
    const dia = String(data.getDate()).padStart(2, '0')
    const mes = String(data.getMonth() + 1).padStart(2, '0')
    const ano = String(data.getFullYear()).slice(-2)
    return `${dia}/${mes}/${ano}`
}

const actions = [
    {
        id: 1,
        icon: QrCode,
        title: 'Escanear QR Code',
        description: 'Escaneie o QR Code de um local para reportar um problema',
        color: 'text-green-800',
        to: "/reportar",
    },
    {
        id: 2,
        icon: TextAlignJustify,
        title: 'Meus Chamados',
        description: 'Visualize o status dos seus chamados abertos',
        color: 'text-green-800',
        to: "/allReports"
    },
]

onMounted(async () => {
    await loadTickets()
})
</script>

<template>
    <BaseLayout>
        <div class="container mx-auto space-y-8 px-4">
            <header class="border-b pb-6">
                <h1 class="text-3xl font-bold text-[#1C5E27]">Painel do Usuário</h1>
                <p class="text-gray-600 mt-1">Acompanhe o status dos seus chamados</p>
            </header>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatusChamado v-if="totalAbertos > 0" class="bg-white rounded-md shadow-sm p-4">
                    <template #logo>
                        <CircleAlert class="text-red-500 w-14 h-14 mb-2" />
                    </template>
                    <template #title>Chamados Abertos</template>
                    <template #number>{{ totalAbertos }}</template>
                </StatusChamado>

                <StatusChamado v-if="totalAndamento > 0" class="bg-white rounded-md shadow-sm p-4">
                    <template #logo>
                        <Clock class="text-yellow-500 w-14 h-14 mb-2" />
                    </template>
                    <template #title>Em Andamento</template>
                    <template #number>{{ totalAndamento }}</template>
                </StatusChamado>

                <StatusChamado v-if="totalConcluidos > 0" class="bg-white rounded-md shadow-sm p-4">
                    <template #logo>
                        <CircleCheck class="text-green-500 w-14 h-14 mb-2" />
                    </template>
                    <template #title>Concluídos</template>
                    <template #number>{{ totalConcluidos }}</template>
                </StatusChamado>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <RouterLink v-for="action in actions" :key="action.title" :to="action.to">
                    <Actions
                        class="bg-white border rounded-lg shadow-sm hover:shadow-md transition transform hover:-translate-y-1">
                        <template #logo>
                            <component :is="action.icon" :class="`${action.color} w-10 h-10`" />
                        </template>
                        <template #title>{{ action.title }}</template>
                        <template #description>{{ action.description }}</template>
                    </Actions>
                </RouterLink>
            </div>

            <div class="bg-white p-5 rounded-md shadow-sm">
                <div class="flex items-center mb-3">
                    <h2 class="text-lg font-semibold">Meus Chamados Recentes</h2>
                    <RouterLink to="/allReports" class="ml-auto text-green-800 hover:underline">Ver todos</RouterLink>
                </div>

                <div class="flex flex-col gap-3">
                    <div class="flex flex-col gap-3">
                        <ItensTabelaChamado v-for="(chamado, i) in recentCalls" :key="chamado.id || i">
                      
                            <template #title>{{ chamado.component.description }}</template>
                            <template #description>{{ chamado.description }}</template>
                            <template #location>{{ chamado.environment.name }}</template>
                            <template #priority>{{ chamado.priority }}</template>
                            <template #counter>{{ chamado.counter }}</template>
                            <template #date>{{ formatarData(chamado.createdAt) }}</template>

                            <template #status>
                                <span class="inline-block w-32 text-center px-2 py-1.5 rounded-md font-medium text-sm"
                                    :class="{
                                        'bg-red-100 text-red-700': chamado.status === 'Aberto',
                                        'bg-yellow-100 text-yellow-700': chamado.status === 'Em Andamento',
                                        'bg-green-100 text-green-700': chamado.status === 'Concluído'
                                    }">
                                    {{ chamado.status }}
                                </span>
                            </template>
                        </ItensTabelaChamado>
                    </div>
                </div>
            </div>
        </div>
    </BaseLayout>
</template>
```
