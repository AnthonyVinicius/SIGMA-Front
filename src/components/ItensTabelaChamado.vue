<script setup>
import { Calendar, Wrench, Flag } from 'lucide-vue-next'
</script>

<template>
  <div
    class="bg-white rounded-lg border border-gray-200
           px-4 sm:px-6 py-3 sm:py-4
           flex flex-col lg:flex-row
           lg:items-center lg:justify-between
           gap-3 lg:gap-0
           hover:shadow-md transition-shadow duration-200
           w-full"
  >
    <div class="flex items-start sm:items-center gap-3 sm:gap-4 min-w-0">
      <slot name="icon" />

      <div class="flex flex-col justify-center min-w-0">
        <h3 class="font-bold text-gray-800 leading-tight truncate text-sm sm:text-base">
          <slot name="title" />
        </h3>
        <p class="text-xs sm:text-sm text-gray-500 leading-snug truncate">
          Descrição:
          <slot name="description" />
        </p>
      </div>
    </div>

    <div
      class="flex flex-col sm:flex-row
             sm:items-center
             gap-3 sm:gap-6
             text-xs sm:text-sm
             text-gray-700
             w-full lg:w-auto"
    >
      <span class="text-gray-600 hidden md:inline whitespace-nowrap">
        • <slot name="location" />
      </span>

      <div class="flex items-center gap-2" title="Prioridade">
        <Wrench class="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
        <span class="bg-blue-600 w-2 h-2 rounded-full"></span>
        <span>
          <slot name="priority" />
        </span>
      </div>

      <div class="flex items-center gap-1.5" title="Contador">
        <Flag class="w-4 h-4 sm:w-5 sm:h-5 text-gray-800" />
        <span class="font-semibold">
          <slot name="counter" />
        </span>
      </div>

      <div class="flex items-center gap-2" title="Data de abertura">
        <Calendar class="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
        <span>
          <slot name="date" />
        </span>
      </div>

      <div
        class="font-semibold
               px-3 sm:px-4 py-1.5 sm:py-2
               rounded-md
               flex items-center justify-center
               gap-2
               hover:opacity-90 transition-colors duration-200
               whitespace-nowrap
               w-full sm:w-auto"
      >
        <slot name="status" />
      </div>
    </div>
  </div>
</template>
