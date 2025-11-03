<script setup>
import { ref, computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import BaseLayout from '../components/BaseLayout.vue'
import Actions from '../components/Actions.vue'
import ItensTabelaChamado from '../components/ItensTabelaChamado.vue'
import BaseChart from '../components/BaseChart.vue'
import { TextAlignJustify, MapPin } from "lucide-vue-next"
import TicketDAO from '../services/TicketsDAO'

const recentCalls = ref([])

const COLORS = {
  status: ["#3b82f6", "#f97316", "#10b981"],
  priority: ["#ef4444", "#f59e0b", "#10b981"],
  location: ["#8b5cf6", "#ec4899", "#22d3ee", "#14b8a6"],
}

function gerarGrafico(campo, cores = []) {
  if (!recentCalls.value.length) {
    return {
      labels: [],
      datasets: [
        {
          label: "Chamados",
          data: [],
          backgroundColor: [],
          borderWidth: 1,
          borderColor: "#ffffff",
        },
      ],
    }
  }

  const contagem = recentCalls.value.reduce((acc, c) => {
    let valorCampo
    if (campo === "location") valorCampo = c.environment?.name || "Desconhecido"
    else valorCampo = c[campo] || "Indefinido"
    acc[valorCampo] = (acc[valorCampo] || 0) + 1
    return acc
  }, {})

  return {
    labels: Object.keys(contagem),
    datasets: [
      {
        label: "Chamados",
        data: Object.values(contagem),
        backgroundColor: cores.slice(0, Object.keys(contagem).length),
        borderWidth: 1,
        borderColor: "#ffffff",
      },
    ],
  }
}

const chamadosPorStatus = computed(() => gerarGrafico("status", COLORS.status))
const chamadosPorPrioridade = computed(() => gerarGrafico("priority", COLORS.priority))
const chamadosPorLocal = computed(() => gerarGrafico("location", COLORS.location))

async function loadTickets() {
  try {
    recentCalls.value = await TicketDAO.getAll()
  } catch (error) {
    console.error(error)
  }
}

function atualizarStatus(id, novoStatus) {
  const chamado = recentCalls.value.find(c => c.id === id)
  if (chamado) {
    chamado.status = novoStatus
    chamado.showDropdown = false
  }
}

const actions = [
  {
    icon: MapPin,
    title: "Gerenciar Locais",
    description: "Adicionar novos locais e gerar QR Code",
    color: "text-green-800",
    to: "/manageLocals",
  },
  {
    icon: TextAlignJustify,
    title: "Todos os Chamados",
    description: "Visualizar e gerenciar chamados",
    color: "text-green-800",
    to: "/allReports",
  },
]

onMounted(async () => {
  await loadTickets()
})
</script>

<template>
  <BaseLayout>
    <div class="space-y-10">
      <header class="border-b pb-6">
        <h1 class="text-3xl font-bold text-[#1C5E27]">Painel do Administrador</h1>
        <p class="text-gray-600 mt-1">Gerencie e visualize os chamados do IFPE</p>
      </header>

      <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
        <div class="bg-white p-6 rounded-lg shadow-sm w-full max-w-sm flex flex-col items-center hover:shadow-md transition">
          <p class="text-lg font-semibold text-gray-800 mb-3 text-center">Chamados por Prioridade</p>
          <BaseChart :chart-data="chamadosPorPrioridade" chart-type="doughnut" class="w-64 h-64" />
        </div>
        <div class="bg-white p-6 rounded-lg shadow-sm w-full max-w-sm flex flex-col items-center hover:shadow-md transition">
          <p class="text-lg font-semibold text-gray-800 mb-3 text-center">Chamados por Status</p>
          <BaseChart :chart-data="chamadosPorStatus" chart-type="doughnut" class="w-64 h-64" />
        </div>
        <div class="bg-white p-6 rounded-lg shadow-sm w-full max-w-sm flex flex-col items-center hover:shadow-md transition">
          <p class="text-lg font-semibold text-gray-800 mb-3 text-center">Chamados por Local</p>
          <BaseChart :chart-data="chamadosPorLocal" chart-type="doughnut" class="w-64 h-64" />
        </div>
      </section>

      <section class="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <RouterLink v-for="action in actions" :key="action.title" :to="action.to" class="group">
          <Actions class="bg-white border rounded-lg shadow-sm hover:shadow-md transition transform hover:-translate-y-1">
            <template #logo>
              <component :is="action.icon" :class="`${action.color} w-10 h-10 group-hover:scale-110 transition-transform`" />
            </template>
            <template #title>
              <span class="text-gray-800 font-semibold">{{ action.title }}</span>
            </template>
            <template #description>
              <span class="text-gray-500 text-sm">{{ action.description }}</span>
            </template>
          </Actions>
        </RouterLink>
      </section>

      <section class="bg-white p-6 rounded-lg shadow-sm">
        <div class="flex items-center mb-4">
          <h2 class="text-lg font-semibold text-gray-800">Últimos Chamados Assumidos</h2>
          <RouterLink to="/allReports" class="ml-auto text-[#1C5E27] hover:underline text-sm font-medium">Ver todos</RouterLink>
        </div>

        <div v-if="recentCalls.length === 0" class="text-center py-6 text-gray-500">
          Nenhum chamado registrado recentemente.
        </div>

        <div v-else class="flex flex-col gap-5">
          <ItensTabelaChamado v-for="(chamado, i) in recentCalls" :key="chamado.id || i" class="border rounded-md p-3 shadow-sm hover:shadow-md transition">
            <template #icon>
              <component :is="chamado.icon" class="w-8 h-8 text-[#1C5E27]" />
            </template>
            <template #title>{{ chamado.title }}</template>
            <template #description>{{ chamado.description }}</template>
            <template #location>{{ chamado.environment?.name }}</template>
            <template #priority>{{ chamado.priority }}</template>
            <template #date>{{ chamado.createdAt }}</template>
            <template #status>
              <div class="relative inline-block text-left w-40">
                <button
                  @click="chamado.showDropdown = !chamado.showDropdown"
                  class="inline-flex justify-between items-center w-full px-3 py-2 rounded-md border text-sm font-medium transition-colors"
                  :class="{
                    'bg-red-100 text-red-700 border-red-300': chamado.status === 'Aberto',
                    'bg-yellow-100 text-yellow-700 border-yellow-300': chamado.status === 'Em Andamento',
                    'bg-green-100 text-green-700 border-green-300': chamado.status === 'Concluído'
                  }"
                >
                  {{ chamado.status }}
                  <svg class="ml-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div v-show="chamado.showDropdown" class="absolute mt-1 w-full bg-white border rounded-md shadow-lg z-10">
                  <ul>
                    <li v-for="status in ['Aberto', 'Em Andamento', 'Concluído']" :key="status" @click="atualizarStatus(chamado.id, status)" class="w-full px-3 py-1 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 transition">
                      {{ status }}
                    </li>
                  </ul>
                </div>
              </div>
            </template>
          </ItensTabelaChamado>
        </div>
      </section>
    </div>
  </BaseLayout>
</template>
