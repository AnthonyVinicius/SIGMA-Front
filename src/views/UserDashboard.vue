<script setup>
import { computed, onMounted, ref } from 'vue'
import BaseLayout from '../components/BaseLayout.vue'
import Actions from '../components/Actions.vue'
import StatusChamado from '../components/StatusChamado.vue'
import ItensTabelaChamado from '../components/ItensTabelaChamado.vue'
import { CircleAlert, Clock, CircleCheck, QrCode, TextAlignJustify } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'
import TicketsDAO from '../services/TicketsDAO'

const recentCalls = ref([])

async function loadTickets() {
    try {
        const response = await TicketsDAO.myTickets();
        recentCalls.value = response.data;
    } catch (error) {
        console.error(error);
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
        to: '/reportar',
    },
    {
        id: 2,
        icon: TextAlignJustify,
        title: 'Meus Chamados',
        description: 'Visualize o status dos seus chamados abertos',
        color: 'text-green-800',
        to: '/AllReportsUser',
    },
]

const totalAbertos = computed(() =>
    recentCalls.value.filter(c => c.status === 'OPEN').length
)
const totalAndamento = computed(() =>
    recentCalls.value.filter(c => c.status === 'IN_PROGRESS' || c.status === 'PENDING').length
)
const totalResolvidos = computed(() =>
    recentCalls.value.filter(c => c.status === 'RESOLVED').length
)
const totalFechados = computed(() =>
    recentCalls.value.filter(c => c.status === 'CLOSED').length
)

function labelStatus(status) {
    const map = {
        OPEN: 'Aberto',
        IN_PROGRESS: 'Em Andamento',
        PENDING: 'Pendente',
        RESOLVED: 'Resolvido',
        CLOSED: 'Fechado',
    }
    return map[status] || status
}

onMounted(async () => {
    await loadTickets()
})
</script>

<template>
  <BaseLayout>
    <div class="container mx-auto space-y-6 sm:space-y-8 px-4 sm:px-6 lg:px-8">
      <header class="border-b pb-4 sm:pb-6">
        <h1 class="text-2xl sm:text-3xl font-bold text-[#1C5E27]">
          Painel do Usuário
        </h1>
        <p class="text-gray-600 mt-1 text-sm sm:text-base">
          Acompanhe o status dos seus chamados
        </p>
      </header>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatusChamado class="bg-white rounded-md shadow-sm p-4">
          <template #logo>
            <CircleAlert class="text-red-500 w-10 h-10 sm:w-14 sm:h-14 mb-2" />
          </template>
          <template #title>Aberto</template>
          <template #number>{{ totalAbertos }}</template>
        </StatusChamado>

        <StatusChamado class="bg-white rounded-md shadow-sm p-4">
          <template #logo>
            <Clock class="text-yellow-500 w-10 h-10 sm:w-14 sm:h-14 mb-2" />
          </template>
          <template #title>Em Andamento / Pendente</template>
          <template #number>{{ totalAndamento }}</template>
        </StatusChamado>

        <StatusChamado class="bg-white rounded-md shadow-sm p-4">
          <template #logo>
            <CircleCheck class="text-green-500 w-10 h-10 sm:w-14 sm:h-14 mb-2" />
          </template>
          <template #title>Resolvido</template>
          <template #number>{{ totalResolvidos }}</template>
        </StatusChamado>

        <StatusChamado class="bg-white rounded-md shadow-sm p-4">
          <template #logo>
            <CircleCheck class="text-gray-500 w-10 h-10 sm:w-14 sm:h-14 mb-2" />
          </template>
          <template #title>Fechado</template>
          <template #number>{{ totalFechados }}</template>
        </StatusChamado>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <RouterLink
          v-for="action in actions"
          :key="action.title"
          :to="action.to"
        >
          <Actions
            class="bg-white border rounded-lg shadow-sm
                   hover:shadow-md transition
                   transform hover:-translate-y-1"
          >
            <template #logo>
              <component
                :is="action.icon"
                :class="`${action.color} w-8 h-8 sm:w-10 sm:h-10`"
              />
            </template>
            <template #title>{{ action.title }}</template>
            <template #description>{{ action.description }}</template>
          </Actions>
        </RouterLink>
      </div>

      <div class="bg-white p-4 sm:p-5 rounded-md shadow-sm">
        <div class="flex flex-col sm:flex-row sm:items-center mb-3 gap-2">
          <h2 class="text-base sm:text-lg font-semibold">
            Meus Chamados Recentes
          </h2>
          <RouterLink
            to="/AllReportsUser"
            class="sm:ml-auto text-green-800 hover:underline text-sm sm:text-base"
          >
            Ver todos
          </RouterLink>
        </div>

        <div class="flex flex-col gap-3">
          <ItensTabelaChamado
            v-for="(chamado, i) in recentCalls"
            :key="chamado.id || i"
          >
            <template #title>{{ chamado.component?.description }}</template>
            <template #description>{{ chamado.description }}</template>
            <template #location>{{ chamado.environment?.name }}</template>
            <template #priority>{{ chamado.priority }}</template>
            <template #counter>{{ chamado.counter }}</template>
            <template #date>{{ formatarData(chamado.createdAt) }}</template>

            <template #status>
              <span
                class="inline-block w-full sm:w-32 text-center
                       px-2 py-1.5 rounded-md font-medium text-xs sm:text-sm"
                :class="{
                  'bg-red-100 text-red-700': chamado.status === 'OPEN',
                  'bg-yellow-100 text-yellow-700':
                    chamado.status === 'IN_PROGRESS' ||
                    chamado.status === 'PENDING',
                  'bg-green-100 text-green-700':
                    chamado.status === 'RESOLVED',
                  'bg-gray-200 text-gray-700':
                    chamado.status === 'CLOSED',
                }"
              >
                {{ labelStatus(chamado.status) }}
              </span>
            </template>
          </ItensTabelaChamado>

          <div
            v-if="recentCalls.length === 0"
            class="text-center text-gray-500 py-6 text-sm sm:text-base"
          >
            Nenhum chamado encontrado.
          </div>
        </div>
      </div>
    </div>
  </BaseLayout>
</template>

