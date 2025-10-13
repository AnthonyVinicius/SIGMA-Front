<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import BaseLayout from '../components/BaseLayout.vue'
import Actions from '../components/Actions.vue'
import ItensTabelaChamado from '../components/ItensTabelaChamado.vue'
import BaseChart from '../components/BaseChart.vue'
import { calls } from '../mock/MockDB'
import { TextAlignJustify, MapPin, Cog } from "lucide-vue-next"

function gerarGrafico(campo, cores) {
  const contagem = calls.reduce((acc, c) => {
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
      },
    ],
  }
}

const chamadosPorStatus = computed(() =>
  gerarGrafico("status", ["#3b82f6", "#f97316", "#10b981"])
)
const chamadosPorPrioridade = computed(() =>
  gerarGrafico("priority", ["#ef4444", "#f59e0b", "#10b981", "#6366f1"])
)
const chamadosPorLocal = computed(() =>
  gerarGrafico("location", ["#8b5cf6", "#ec4899", "#22d3ee", "#14b8a6"])
)

const recentCalls = computed(() =>
  [...calls].sort(
    (a, b) =>
      new Date(b.date.split('/').reverse().join('-')) -
      new Date(a.date.split('/').reverse().join('-'))
  ).slice(0, 5)
)

const actions = [
  {
    icon: MapPin,
    title: "Gerenciar Locais",
    description: "Adicionar novos locais e gerar QR Code",
    color: "text-green-800",
  },
  {
    icon: Cog,
    title: "Tipos de Itens",
    description: "Gerenciar e cadastrar tipos de itens",
    color: "text-green-800",
  },
  {
    icon: TextAlignJustify,
    title: "Todos os Chamados",
    description: "Visualizar e gerenciar chamados",
    color: "text-green-800",
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

      <section>
        <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
          <Actions v-for="action in actions" :key="action.title">
            <template #logo>
              <component :is="action.icon" :class="`${action.color} w-10 h-10`" />
            </template>
            <template #title>{{ action.title }}</template>
            <template #description>{{ action.description }}</template>
          </Actions>
        </div>
      </section>

      <section class="bg-white p-5 rounded-md shadow-sm">
        <div class="flex items-center mb-3">
          <h2 class="text-lg font-semibold">Últimos Chamados Assumidos</h2>
          <RouterLink to="/" class="ml-auto text-green-800 hover:underline">Ver todos</RouterLink>
        </div>

        <div class="flex flex-col gap-3">
          <div class="flex flex-col gap-3">
            <ItensTabelaChamado v-for="(chamado, i) in calls" :key="i">
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
                <span v-if="chamado.status === 'Aberto'" class="bg-red-100 text-red-700 px-4 py-2 rounded-md">
                  {{ chamado.status }}
                </span>
                <span v-else-if="chamado.status === 'Em Andamento'"
                  class="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-md">
                  {{ chamado.status }}
                </span>
                <span v-else class="bg-green-100 text-green-700 px-4 py-2 rounded-md">
                  {{ chamado.status }}
                </span>
              </template>
            </ItensTabelaChamado>
          </div>
        </div>
      </section>
    </div>
  </BaseLayout>
</template>
