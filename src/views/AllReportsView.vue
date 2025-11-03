<template>
  <BaseLayout>
    <div class="space-y-8">
      <!-- Cabeçalho -->
      <header class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
        <div>
          <h1 class="text-2xl font-bold text-ponto-if-green">Todos os Chamados</h1>
          <p class="text-gray-600">Visualize todos os chamados registrados</p>
        </div>
      </header>

      <!-- Lista de Chamados -->
      <section class="flex flex-col gap-4">
        <ItensTabelaChamado
          v-for="(chamado, i) in calls"
          :key="chamado.id || i"
          class="bg-white shadow-sm rounded-md p-4 hover:shadow-md transition-shadow"
        >
          <template #icon>
            <component :is="chamado.icon" class="w-8 h-8 text-green-700" />
          </template>

          <template #title>
            <span class="font-semibold text-gray-800">{{ chamado.title }}</span>
          </template>

          <template #description>
            <span class="text-gray-600">{{ chamado.description }}</span>
          </template>

          <template #location>
            <span class="text-gray-500 text-sm">{{ chamado.location }}</span>
          </template>

          <template #priority>
            <span class="text-sm font-medium text-gray-700">{{ chamado.priority }}</span>
          </template>

          <template #counter>
            <span class="text-sm text-gray-600">{{ chamado.counter }}</span>
          </template>

          <template #date>
            <span class="text-sm text-gray-500">{{ chamado.date }}</span>
          </template>

          <template #status>
            <div class="relative inline-block text-left w-40">
              <!-- Botão do status atual -->
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

              <!-- Dropdown de Status -->
              <div
                v-show="chamado.showDropdown"
                class="absolute mt-1 w-full bg-white border rounded-md shadow-lg z-10 overflow-hidden"
              >
                <ul class="w-full">
                  <li
                    v-for="status in ['Aberto', 'Em Andamento', 'Concluído']"
                    :key="status"
                    @click="atualizarStatus(chamado.id, status); chamado.showDropdown = false"
                    class="w-full px-3 py-0.5 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 hover:text-gray-900 truncate"
                  >
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
const carregando = ref(false)

async function carregarChamados() {
  try {
    carregando.value = true
    const data = await TicketsDAO.getAll()

    calls.value = data.map(ticket => ({
      id: ticket.id,
      title: ticket.title,
      description: ticket.description,
      priority: ticket.priority,
      location: ticket.location,
      date: ticket.createdAt || ticket.date,
      status: ticket.status,
      showDropdown: false
    }))

  } finally {
    carregando.value = false
  }
}

async function atualizarStatus(id, novoStatus) {
  await TicketsDAO.atualizar(id, { status: novoStatus })
  await carregarChamados() 
}

onMounted(() => carregarChamados())
</script>
