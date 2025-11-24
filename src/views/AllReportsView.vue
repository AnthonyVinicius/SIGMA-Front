<template>
  <BaseLayout>
    <div class="space-y-8">
      <header class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
        <div>
          <h1 class="text-2xl font-bold text-ponto-if-green">Todos Chamados</h1>
          <p class="text-gray-600">Gerencie os chamados</p>
        </div>
      </header>

      <section class="flex flex-col gap-4">
        <ItensTabelaChamado v-for="(chamado, i) in calls" :key="chamado.id || i"
          class="bg-white shadow-sm rounded-md p-4 hover:shadow-md transition-shadow">
          <template #title>{{ chamado.component?.description }}</template>
          <template #description>{{ chamado.description }}</template>
          <template #location>{{ chamado.environment?.name }}</template>
          <template #priority>{{ chamado.priority }}</template>
          <template #counter>{{ chamado.counter }}</template>
          <template #date>{{ formatarData(chamado.createdAt) }}</template>

          <template #problemType>
            {{ translateProblemType(chamado.problemType) }}
          </template>

          <template #problemTypeControl>
            <div class="relative inline-block text-left w-40">
              <button @click="toggleTypeDropdown(chamado)"
                class="inline-flex justify-between items-center w-full px-3 py-2 rounded-md border text-sm font-medium transition-colors"
                :class="{
                  'bg-purple-100 text-purple-700 border-purple-300': chamado.problemType === 'HARDWARE',
                  'bg-indigo-100 text-indigo-700 border-indigo-300': chamado.problemType === 'SOFTWARE',
                  'bg-cyan-100 text-cyan-700 border-cyan-300': chamado.problemType === 'NETWORK',
                  'bg-orange-100 text-orange-700 border-orange-300': chamado.problemType === 'OTHER'
                }">
                {{ translateProblemType(chamado.problemType) }}
                <svg class="ml-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div v-show="chamado.showTypeDropdown"
                class="absolute right-0 mt-1 w-full bg-white border rounded-md shadow-lg z-10 overflow-hidden">
                <ul class="w-full">
                  <li v-for="type in problemTypes" :key="type"
                    @click="atualizarTipoProblema(chamado, type); chamado.showTypeDropdown = false"
                    class="w-full px-3 py-1 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 hover:text-gray-900 truncate">
                    {{ translateProblemType(type) }}
                  </li>
                </ul>
              </div>
            </div>
          </template>
          
          <template #status>
            <div class="relative inline-block text-left w-40">
              <button @click="toggleDropdown(chamado)"
                class="inline-flex justify-between items-center w-full px-3 py-2 rounded-md border text-sm font-medium transition-colors"
                :class="{
                  'bg-red-100 text-red-700 border-red-300': chamado.status === 'OPEN',
                  'bg-yellow-100 text-yellow-700 border-yellow-300': chamado.status === 'IN_PROGRESS',
                  'bg-orange-100 text-orange-700 border-orange-300': chamado.status === 'PENDING',
                  'bg-green-100 text-green-700 border-green-300': chamado.status === 'RESOLVED',
                  'bg-gray-100 text-gray-700 border-gray-300': chamado.status === 'CLOSED'
                }">
                {{ chamado.status }}
                <svg class="ml-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div v-show="chamado.showDropdown"
                class="absolute mt-1 w-full bg-white border rounded-md shadow-lg z-10 overflow-hidden">
                <ul class="w-full">
                  <li v-for="status in ['OPEN', 'IN_PROGRESS', 'PENDING', 'RESOLVED', 'CLOSED']" :key="status"
                    @click="atualizarStatus(chamado, status); chamado.showDropdown = false"
                    class="w-full px-3 py-1 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 hover:text-gray-900 truncate">
                    {{ status }}
                  </li>
                </ul>
              </div>
            </div>
          </template>
        </ItensTabelaChamado>
      </section>
    </div>
  </BaseLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import TicketsDAO from '../services/TicketsDAO'
import BaseLayout from '../components/BaseLayout.vue'
import ItensTabelaChamado from '../components/ItensTabelaChamado.vue'

const calls = ref([])

const problemTypes = ["HARDWARE", "SOFTWARE", "NETWORK", "OTHER"];
const problemTypeTranslations = {
  HARDWARE: 'Hardware',
  SOFTWARE: 'Software',
  NETWORK: 'Rede',
  OTHER: 'Outro'
};

async function loadTickets() {
  try {
    const data = await TicketsDAO.getAll();
    calls.value = data.map(c => ({ 
      ...c, 
      showDropdown: false,
      showTypeDropdown: false
    }));
  } catch (error) {
    console.error('Error loading tickets:', error)
  }
}

function translateProblemType(type) {
  return problemTypeTranslations[type] || type;
}

async function atualizarTipoProblema(chamado, novoTipo) {
  try {
    const payload = {
      description: chamado.description,
      status: chamado.status,
      priority: chamado.priority,
      problemType: novoTipo,
      componentId: chamado.component?.id,
      environmentId: chamado.environment?.id,
      createdById: chamado.createdBy?.id,
      ticketFile: []
    };

    await TicketsDAO.update(chamado.id, payload);
    chamado.problemType = novoTipo;
    alert(`Tipo de problema atualizado para ${translateProblemType(novoTipo)}!`);
  } catch (error) {
    console.error('Error updating problem type:', error);
    alert('Erro ao atualizar tipo de problema.');
  }
}

async function atualizarStatus(chamado, novoStatus) {
  try {
    const payload = {
      description: chamado.description,
      status: novoStatus,
      priority: chamado.priority,
      problemType: chamado.problemType,
      componentId: chamado.component?.id,
      environmentId: chamado.environment?.id,
      createdById: chamado.createdBy?.id,
      ticketFile: []
    };

    console.log(payload)
    await TicketsDAO.update(chamado.id, payload);
    chamado.status = novoStatus;
  } catch (error) {
    console.error('Error updating status:', error);
  }
}

function toggleTypeDropdown(chamado) {
  calls.value.forEach(c => c.showTypeDropdown = false);
  chamado.showTypeDropdown = !chamado.showTypeDropdown;
  chamado.showDropdown = false;
}

function toggleDropdown(chamado) {
  calls.value.forEach(c => (c.showDropdown = false));
  chamado.showDropdown = !chamado.showDropdown;
  chamado.showTypeDropdown = false;
}

function formatarData(isoString) {
  if (!isoString) return ''
  const data = new Date(isoString)
  const dia = String(data.getDate()).padStart(2, '0')
  const mes = String(data.getMonth() + 1).padStart(2, '0')
  const ano = String(data.getFullYear()).slice(-2)
  return `${dia}/${mes}/${ano}`
}

onMounted(async () => {
  await loadTickets()
})
</script>
