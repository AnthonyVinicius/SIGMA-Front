<script setup>
import { defineProps } from 'vue';
import { Calendar, Wrench, Flag, ChevronDown } from 'lucide-vue-next';

// Define as propriedades que o componente aceita
defineProps({
  // Exemplo: { icon: Hand, title: 'Secador de mãos', ... }
  item: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="bg-white rounded-lg border border-gray-200 p-4 flex items-center justify-between hover:shadow-md transition-shadow duration-200 w-full">
    <div class="flex items-center gap-4">
      <component :is="item.icon" class="w-8 h-8 text-green-700 flex-shrink-0" />
      <div>
        <h3 class="font-bold text-gray-800">{{ item.title }}</h3>
        <p class="text-sm text-gray-500">Descrição: {{ item.description }}</p>
      </div>
    </div>

    <div class="flex items-center gap-6 text-sm text-gray-700">
      <span class="text-gray-600 hidden md:inline">• {{ item.location }}</span>

      <div class="flex items-center gap-2" title="Prioridade">
        <Wrench class="w-5 h-5 text-blue-600" />
        <span class="bg-blue-600 w-2 h-2 rounded-full"></span>
        <span>{{ item.priority }}</span>
      </div>

      <button class="bg-green-100 text-green-800 font-semibold px-4 py-2 rounded-md flex items-center gap-2 hover:bg-green-200 transition-colors duration-200">
        Status
        <ChevronDown class="w-4 h-4" />
      </button>

      <div class="flex items-center gap-1.5" title="Contador">
        <Flag class="w-5 h-5 text-gray-800" />
        <span class="font-semibold">{{ item.counter }}</span>
      </div>

      <div class="flex items-center gap-2" title="Data de abertura">
        <Calendar class="w-5 h-5 text-gray-600" />
        <span>{{ item.date }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>