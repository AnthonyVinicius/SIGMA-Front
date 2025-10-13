<script setup>
import { RouterLink } from 'vue-router'
import { adminActions, recentCalls, chamadosPorStatus, chamadosPorPrioridade, chamadosPorLocal } from '../mock/MockDB'
import BaseLayout from '../components/BaseLayout.vue'
import Actions from '../components/Actions.vue'
import ItensTabelaChamado from '../components/ItensTabelaChamado.vue'
import BaseChart from '../components/BaseChart.vue'
</script>

<template>
  <BaseLayout>
    <div class="space-y-8">
      <header>
        <h1 class="text-2xl font-bold text-ponto-if-green">Dashboard do Administrador</h1>
        <p class="text-gray-600">Bem-vindo ao sistema de manutenção do IFPE</p>
      </header>

      <section class="flex flex-wrap justify-center gap-30">
        <div class="w-90 h-90 bg-white p-10 rounded-lg shadow-md flex flex-col items-center justify-center">
          <p class="text-lg font-semibold text-gray-700 text-center mb-2">Chamados Por Prioridade</p>
          <BaseChart :chart-data="chamadosPorPrioridade" chart-type="doughnut" class="w-full h-64" />
        </div>

        <div class="w-90 h-90 bg-white p-10 rounded-lg shadow-md flex flex-col items-center justify-center">
          <p class="text-lg font-semibold text-gray-700 text-center mb-2">Chamados Por Status</p>
          <BaseChart :chart-data="chamadosPorStatus" chart-type="doughnut" class="w-full h-64" />
        </div>

        <div class="w-90 h-90 bg-white p-10 rounded-lg shadow-md flex flex-col items-center justify-center">
          <p class="text-lg font-semibold text-gray-700 text-center mb-2">Chamados Por Local</p>
          <BaseChart :chart-data="chamadosPorLocal" chart-type="doughnut" class="w-full h-64" />
        </div>
      </section>

      <section>
        <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
          <Actions v-for="action in adminActions" :key="action.title">
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
          <ItensTabelaChamado v-for="chamado in recentCalls" :key="chamado.id" :item="chamado" />
        </div>
      </section>
    </div>
  </BaseLayout>
</template>
