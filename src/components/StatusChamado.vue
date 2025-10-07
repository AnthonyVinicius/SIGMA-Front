<script setup>

</script>

<template>

    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 w-full max-w-sm flex">
        <div class="flex justify-center me-3">
            <slot name="logo" />
        </div>
        <div class="flex flex-col">
            <h1 class="text-sm font-semibold text-gray-700">
                <slot name="title" />
            </h1>

            <p class="text-4xl font-bold text-black">
                <slot name="number" />
            </p>
        </div>
    </div>

</template>