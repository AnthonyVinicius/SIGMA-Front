<script setup>
import Footer from './Footer.vue'
import NavBar from './Navbar.vue';
</script>

<template>
    <div class="page-container">
        <main class="content">
            <NavBar />
            <slot></slot>
            <Footer />
        </main>
    </div>
</template>

<style scoped></style>