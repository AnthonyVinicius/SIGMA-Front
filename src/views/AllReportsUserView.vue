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

          <template #status>
            <div
              class="inline-flex justify-center items-center px-3 py-2 rounded-md border text-sm font-medium w-40 text-center"
              :class="{
                'bg-red-100 text-red-700 border-red-300': chamado.status === 'OPEN',
                'bg-yellow-100 text-yellow-700 border-yellow-300': chamado.status === 'IN_PROGRESS',
                'bg-orange-100 text-orange-700 border-orange-300': chamado.status === 'PENDING',
                'bg-green-100 text-green-700 border-green-300': chamado.status === 'RESOLVED',
                'bg-gray-100 text-gray-700 border-gray-300': chamado.status === 'CLOSED'
              }">
              {{ chamado.status }}
            </div>
          </template>
        </ItensTabelaChamado>
      </section>
    </div>
  </BaseLayout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import TicketsDAO from "../services/TicketsDAO";
import BaseLayout from "../components/BaseLayout.vue";
import ItensTabelaChamado from "../components/ItensTabelaChamado.vue";

const calls = ref([]);

async function loadTickets() {
  try {
    calls.value = await TicketsDAO.getAll();
  } catch (error) {
    console.error("Error loading tickets:", error);
  }
}

function formatarData(isoString) {
  if (!isoString) return "";
  const data = new Date(isoString);
  const dia = String(data.getDate()).padStart(2, "0");
  const mes = String(data.getMonth() + 1).padStart(2, "0");
  const ano = String(data.getFullYear()).slice(-2);
  return `${dia}/${mes}/${ano}`;
}

onMounted(async () => {
  await loadTickets();
});
</script>
