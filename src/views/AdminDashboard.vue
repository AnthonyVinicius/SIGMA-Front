<script setup>
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import BaseLayout from '../components/BaseLayout.vue'
import Actions from '../components/Actions.vue'
import ItensTabelaChamado from '../components/ItensTabelaChamado.vue'
import BaseChart from '../components/BaseChart.vue'
import { calls as mockCalls } from '../mock/MockDB'
import { TextAlignJustify, MapPin, Cog } from "lucide-vue-next"

// ✅ Estado reativo principal
const calls = ref([...mockCalls])
calls.value.forEach(c => c.showDropdown = false)

// ✅ Paleta de cores padronizada
const COLORS = {
  status: ["#3b82f6", "#f97316", "#10b981"],        // Azul, Laranja, Verde
  priority: ["#ef4444", "#f59e0b", "#10b981", "#6366f1"], // Vermelho, Laranja, Verde, Roxo
  location: ["#8b5cf6", "#ec4899", "#22d3ee", "#14b8a6"], // Roxo, Rosa, Ciano, Verde-água
}

// ✅ Função genérica para gerar gráficos
function gerarGrafico(campo, cores = []) {
  const contagem = calls.value.reduce((acc, c) => {
    acc[c[campo]] = (acc[c[campo]] || 0) + 1
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
        borderColor: "#ffffff", // dá contraste e separa melhor as fatias
      },
    ],
  }
}

// ✅ Computed reativos (recalculam ao alterar status)
const chamadosPorStatus = computed(() => gerarGrafico("status", COLORS.status))
const chamadosPorPrioridade = computed(() => gerarGrafico("priority", COLORS.priority))
const chamadosPorLocal = computed(() => gerarGrafico("location", COLORS.location))


// ✅ Lista dos chamados mais recentes
const recentCalls = computed(() =>
  [...calls.value]
    .sort(
      (a, b) =>
        new Date(b.date.split("/").reverse().join("-")) -
        new Date(a.date.split("/").reverse().join("-"))
    )
    .slice(0, 5)
)

// ✅ Função para atualizar o status de um chamado
function atualizarStatus(id, novoStatus) {
  const chamado = calls.value.find(c => c.id === id)
  if (chamado) {
    chamado.status = novoStatus
    chamado.showDropdown = false // fecha o dropdown após a alteração
  }
}

// ✅ Cards de ação do dashboard
const actions = [
  {
    icon: MapPin,
    title: "Gerenciar Locais",
    description: "Adicionar novos locais e gerar QR Code",
    color: "text-green-800",
    to: "/manageLocals",
  },
  {
    icon: Cog,
    title: "Tipos de Itens",
    description: "Gerenciar e cadastrar tipos de itens",
    color: "text-green-800",
    to: "/itensType",
  },
  {
    icon: TextAlignJustify,
    title: "Todos os Chamados",
    description: "Visualizar e gerenciar chamados",
    color: "text-green-800",
    to: "/allReports",
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

      <section class="flex flex-wrap justify-center gap-10">
        <div class="w-80 bg-white p-10 rounded-lg shadow-md flex flex-col items-center justify-center">
          <p class="text-lg font-semibold text-gray-700 text-center mb-2">Chamados Por Prioridade</p>
          <BaseChart :chart-data="chamadosPorPrioridade" chart-type="doughnut" class="w-full h-64" />
        </div>

        <div class="w-80 bg-white p-10 rounded-lg shadow-md flex flex-col items-center justify-center">
          <p class="text-lg font-semibold text-gray-700 text-center mb-2">Chamados Por Status</p>
          <BaseChart :chart-data="chamadosPorStatus" chart-type="doughnut" class="w-full h-64" />
        </div>

        <div class="w-80 bg-white p-10 rounded-lg shadow-md flex flex-col items-center justify-center">
          <p class="text-lg font-semibold text-gray-700 text-center mb-2">Chamados Por Local</p>
          <BaseChart :chart-data="chamadosPorLocal" chart-type="doughnut" class="w-full h-64" />
        </div>
      </section>


      <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <RouterLink v-for="action in actions" :key="action.title" :to="action.to">
          <Actions>
            <template #logo>
              <component :is="action.icon" :class="`${action.color} w-10 h-10`" />
            </template>
            <template #title>{{ action.title }}</template>
            <template #description>{{ action.description }}</template>
          </Actions>
        </RouterLink>
      </div>

      <!-- Últimos Chamados -->
      <section class="bg-white p-5 rounded-md shadow-sm">
        <div class="flex items-center mb-3">
          <h2 class="text-lg font-semibold">Últimos Chamados Assumidos</h2>
          <RouterLink to="/allReports" class="ml-auto text-green-800 hover:underline">Ver todos</RouterLink>
        </div>

        <div class="flex flex-col gap-6">
          <ItensTabelaChamado v-for="(chamado, i) in recentCalls" :key="chamado.id || i">
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
              <div class="relative inline-block text-left w-40">
                <!-- Botão do status atual -->
                <button
                  @click="chamado.showDropdown = !chamado.showDropdown"
                  class="inline-flex justify-between items-center w-full px-3 py-2 rounded-md border text-sm font-medium
                        transition-colors"
                  :class="{
                    'bg-red-100 text-red-700 border-red-300': chamado.status === 'Aberto',
                    'bg-yellow-100 text-yellow-700 border-yellow-300': chamado.status === 'Em Andamento',
                    'bg-green-100 text-green-700 border-green-300': chamado.status === 'Concluído'
                  }"
                >
                  {{ chamado.status }}
                  <svg class="ml-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <!-- Dropdown -->
                <div
                  v-show="chamado.showDropdown"
                  class="absolute mt-1 w-full bg-white border rounded-md shadow-lg z-10 overflow-hidden"
                >
                  <ul class="w-full">
                    <li
                      v-for="status in ['Aberto', 'Em Andamento', 'Concluído']"
                      :key="status"
                      @click="atualizarStatus(chamado.id, status)"
                      class="w-full px-3 py-0.5 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 hover:text-gray-900 truncate"
                    >
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