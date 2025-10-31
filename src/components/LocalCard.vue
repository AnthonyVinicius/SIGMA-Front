<template>
    <div class="bg-white border border-gray-200 rounded-xl shadow-sm p-4 flex flex-col justify-between">
        <div class="flex justify-between items-start mb-2">
            <div>
                <h2 class="font-semibold text-gray-800">
                    <slot name="title" />
                </h2>
                <p class="text-xs text-gray-500">
                    ID:
                    <slot name="id" />
                </p>
            </div>

            <div class="flex items-center gap-2">
                <button class="text-red-500 hover:text-red-700 transition" @click="$emit('delete')" title="Excluir">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="lucide lucide-trash2-icon lucide-trash-2">
                        <path d="M10 11v6" />
                        <path d="M14 11v6" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                        <path d="M3 6h18" />
                        <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    </svg>
                </button>

                <button class="text-gray-600 hover:text-gray-800 transition" @click="$emit('edit')" title="Editar">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="lucide lucide-pencil-line-icon lucide-pencil-line">
                        <path d="M13 21h8" />
                        <path d="m15 5 4 4" />
                        <path
                            d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
                    </svg>
                </button>
            </div>
        </div>

        <div class="mb-3">
            <p class="text-sm text-gray-600 mb-1">Itens disponíveis:</p>
            <div class="flex flex-wrap gap-2">
                <slot name="items" />
            </div>
        </div>

        <button
            class="w-full bg-[#1C5E27] text-white font-semibold py-2.5 px-5 rounded-lg flex items-center gap-2 hover:bg-[#154b1f] transition-colors text-sm  justify-center"
            @click.stop="$emit('generateQr')">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="lucide lucide-qr-code-icon lucide-qr-code">
                <rect width="5" height="5" x="3" y="3" rx="1" />
                <rect width="5" height="5" x="16" y="3" rx="1" />
                <rect width="5" height="5" x="3" y="16" rx="1" />
                <path d="M21 16h-3a2 2 0 0 0-2 2v3" />
                <path d="M21 21v.01" />
                <path d="M12 7v3a2 2 0 0 1-2 2H7" />
                <path d="M3 12h.01" />
                <path d="M12 3h.01" />
                <path d="M12 16v.01" />
                <path d="M16 12h1" />
                <path d="M21 12v.01" />
                <path d="M12 21v-1" />
            </svg>
            <span>Gerar QR Code</span>
        </button>
    </div>
</template>

<script setup>
defineEmits(["delete", "edit", "generateQr"])
</script>
