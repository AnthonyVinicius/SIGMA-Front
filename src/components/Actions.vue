<template>
    <div
        class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 w-full text-center transition-all hover:shadow-md">
        <div class="flex justify-center mb-3">
            <slot name="logo" />
        </div>

        <h1 class="text-lg font-semibold mb-1">
            <slot name="title" />
        </h1>

        <p class="text-gray-500 text-sm">
            <slot name="description" />
        </p>
    </div>
</template>
