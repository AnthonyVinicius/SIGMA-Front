<script setup>
import BaseLayout from '../components/BaseLayout.vue';
import BaseButton from '../components/BaseButton.vue';
import LayoutChamado from '../components/LayoutChamado.vue';
import StatusChamado from '../components/StatusChamado.vue';
import andamento from '../img/Andamento.png'
import finalizado from '../img/Finalizado.png'
import pendente from '../img/Pendente.png'
import qrcode from '../img/QRcode.png'
import menu from '../img/Menu.png'
</script>

<template>
    <BaseLayout>
        <div class="p-6">
            <h1 class="text-2xl font-bold text-ponto-if-green">Dashboard do Usuário</h1>
            <p>Bem-vindo ao sistema de manutenção do IFPE</p>

            <div class="flex gap-10 justify-center mb-5 mt-5">
                <StatusChamado>
                    <template #logo>
                        <img class="w-15"
                            :src= pendente alt="">
                    </template>
                    <template #title>
                        Chamado em Andamento
                    </template>
                    <template #number>
                        5
                    </template>
                </StatusChamado>
                <StatusChamado>
                    <template #logo>
                        <img class="w-15"
                            :src=andamento alt="">
                    </template>
                    <template #title>
                        Chamado em Andamento
                    </template>
                    <template #number>
                        5
                    </template>
                </StatusChamado>
                <StatusChamado>
                    <template #logo>
                        <img class="w-15"
                            :src=finalizado alt="">
                    </template>
                    <template #title>
                        Chamado em Andamento
                    </template>
                    <template #number>
                        5
                    </template>
                </StatusChamado>
            </div>
            <div class="flex gap-10 justify-center">
                <LayoutChamado>
                    <template #logo>
                        <img class="w-10" :src=qrcode
                            alt="">
                    </template>
                    <template #title>
                        Escanear QR Code
                    </template>
                    <template #description>
                        Escaneie o QR Code de um local para reportar um problema
                    </template>
                </LayoutChamado>

                <LayoutChamado>
                    <template #logo>
                        <img class="w-10" :src=menu
                            alt="">
                    </template>
                    <template #title>
                        Meus Chamados
                    </template>
                    <template #description>
                        Visualize o status dos seus chamados abertos
                    </template>
                </LayoutChamado>
            </div>

            <div class="flex gap-4">
                <BaseButton>Botão Padrão</BaseButton>
                <BaseButton variant="outlined">Botão Contornado</BaseButton>
            </div>
        </div>
    </BaseLayout>
</template>


<style scoped></style>