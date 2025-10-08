<script setup>
import Footer from './Footer.vue'
import NavBar from './Navbar.vue'
</script>

<template>
    <div class="page-container">
        <main class="content">
            <NavBar />
            <div class="px-20 py-10">
                <slot></slot>
            </div>
            <Footer></Footer>
        </main>
    </div>
</template>

<style scoped></style>