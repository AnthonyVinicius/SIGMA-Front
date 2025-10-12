<script setup>
import { MapPin, TextAlignJustify, Cog, Hand, CircleAlert } from 'lucide-vue-next'
import BaseLayout from '../components/BaseLayout.vue'
import Actions from '../components/Actions.vue'
import ItensTabelaChamado from '../components/ItensTabelaChamado.vue'
import BaseChart from '../components/BaseChart.vue';
import { ref, onMounted } from 'vue';
//import apiService from '../services/apiService';

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
        icon: Hand,
        title: 'Secador de mãos',
        description: 'Não liga',
        location: 'Banheiro 2º Andar',
        statusIcon: CircleAlert,
        statusColor: 'text-red-500',
        date: '21/08/2025',
    },
]

// Dados dos gráficos
//const chamadosPorPrioridade = ref({ labels: [], datasets: [] });
//const chamadosPorStatus = ref({ labels: [], datasets: [] });
//const chamadosPorLocal = ref({ labels: [], datasets: [] });

// Dados de exemplo para os gráficos
const chamadosPorPrioridade = ref({
    labels: ['Alta', 'Média', 'Baixa'],
    datasets: [{
        label: 'Chamados',
        data: [8, 12, 5],
        backgroundColor: ['#ef4444', '#f59e0b', '#10b981']
    }]
});

const chamadosPorStatus = ref({
    labels: ['Aberto', 'Em Andamento', 'Concluído'],
    datasets: [{
        label: 'Chamados',
        data: [10, 7, 8],
        backgroundColor: ['#3b82f6','#f97316','#10b981']
    }]
});

const chamadosPorLocal = ref({
    labels: ['Lab. Informática', 'Biblioteca', 'Banheiros'],
    datasets: [{
        label: 'Chamados',
        data: [6, 4, 15],
        backgroundColor: ['#8b5cf6','#ec4899','#22d3ee']
    }]
});

// Carrega os dados dos gráficos da API
//onMounted(async () => {
//    try {
//        const response = await apiService.get('/chamados/dashboard');
        // Exemplo de retorno esperado:
        // { prioridade: { labels: [...], data: [...] }, status: {...}, local: {...} }

//        chamadosPorPrioridade.value = {
//            labels: response.prioridade.labels,
//            datasets: [{
//                label: 'Chamados',
//                data: response.prioridade.data,
//                backgroundColor: ['#1C5E27','#f59e0b','#ef4444']
//            }]
//        };

//        chamadosPorStatus.value = {
//            labels: response.status.labels,
//            datasets: [{
//                label: 'Chamados',
//                data: response.status.data,
//                backgroundColor: ['#3b82f6','#f97316','#10b981']
//            }]
//        };

//        chamadosPorLocal.value = {
//            labels: response.local.labels,
//            datasets: [{
//                label: 'Chamados',
//                data: response.local.data,
//                backgroundColor: ['#8b5cf6','#ec4899','#22d3ee']
//            }]
//        };

//    } catch (error) {
//        console.error('Erro ao carregar dados do dashboard', error);
//  }
//});
</script>

<template>
  <BaseLayout>
    <div class="space-y-8">

      <!-- Cabeçalho -->
      <header>
        <h1 class="text-2xl font-bold text-ponto-if-green">Dashboard do Administrador</h1>
        <p class="text-gray-600">Bem-vindo ao sistema de manutenção do IFPE</p>
      </header>

<!-- Gráficos centralizados -->
<section class="flex flex-wrap justify-center gap-59">
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

      <!-- Cards de ações -->
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

      <!-- Últimos chamados -->
      <div class="bg-white p-5 rounded-md shadow-sm">
        <div class="flex items-center mb-3">
          <h2 class="text-lg font-semibold">Últimos Chamados Assumidos</h2>
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