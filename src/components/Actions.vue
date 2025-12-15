<template>
  <div
    class="bg-white rounded-lg border border-gray-200
           p-4 sm:p-6
           w-full text-center
           shadow-sm
           transition-all hover:shadow-md"
  >
    <div class="flex justify-center mb-2 sm:mb-3">
      <slot name="logo" />
    </div>

    <h1 class="text-base sm:text-lg font-semibold mb-1">
      <slot name="title" />
    </h1>

    <p class="text-gray-500 text-xs sm:text-sm">
      <slot name="description" />
    </p>
  </div>
</template>

