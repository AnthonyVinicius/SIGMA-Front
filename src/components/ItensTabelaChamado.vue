<script setup>
import { Calendar1 } from 'lucide-vue-next'
</script>

<template>
    <div class="bg-gray-100 rounded-lg shadow-sm py-8 px-4 flex items-center justify-between">
        <div class="flex items-start gap-3 w-1/3">
            <div class="mt-1">
                <slot name="logo" />
            </div>

            <div class="gap-5 flex flex-col">
                <h1 class="text-sm font-semibold flex items-center gap-2">
                    <slot name="title" />
                </h1>

                <p class="text-xs">
                    Descrição:
                    <slot name="description" />
                </p>
            </div>
        </div>

        <div class="flex items-center gap-2 text-sm  w-1/3 justify-center">
            <slot name="location" />
            <slot name="status" />
        </div>

        <div class="flex items-center justify-end gap-5 w-1/3 text-sm ">
            <div class="flex items-center gap-1">
                <Calendar1 class="w-4 h-4 text-green-800" />
                <slot name="date" />
            </div>
        </div>
    </div>
</template>
