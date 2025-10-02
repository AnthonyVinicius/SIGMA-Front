<script setup>
import BaseLayout from '../components/BaseLayout.vue';
import BaseButton from '../components/BaseButton.vue';
</script>

<template>
    <BaseLayout>
        <div class="p-6">
            <h1 class="text-2xl font-bold text-ponto-if-green">Dashboard</h1>
            <p>Conteúdo da Dashboard</p>

            <!-- Teste dos botões -->
            <div class="flex gap-4">
                <BaseButton>Botão Padrão</BaseButton>
                <BaseButton variant="outlined">Botão Contornado</BaseButton>
            </div>
        </div>
    </BaseLayout>
</template>


<style scoped></style>