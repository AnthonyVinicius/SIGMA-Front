<template>
  <div
    class="bg-white rounded-lg shadow-sm
           p-4 sm:py-8 sm:px-6
           w-full flex items-center
           gap-3 sm:gap-4"
  >
    <div class="flex-shrink-0">
      <slot name="logo" />
    </div>

    <div class="flex flex-col min-w-0">
      <h1 class="text-xs sm:text-sm font-semibold text-gray-700 truncate">
        <slot name="title" />
      </h1>
      <p class="text-2xl sm:text-4xl font-bold text-black leading-tight">
        <slot name="number" />
      </p>
    </div>
  </div>
</template>
