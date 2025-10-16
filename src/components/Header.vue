<template>
    <header class="relative bg-white shadow-sm p-4 flex items-center justify-between h-20">

        <div>
            <button @click="toggle" class="p-2 rounded-full hover:bg-gray-200 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>
        </div>

        <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <img src="../img/sigma.png" alt="Logo Ponto IF" class="h-10" />
        </div>

        <div>
        </div>

    </header>
</template>

<script setup>
const emit = defineEmits(['toggle-sidebar']);

function toggle() {
    emit('toggle-sidebar');
}
</script>

<style scoped></style>