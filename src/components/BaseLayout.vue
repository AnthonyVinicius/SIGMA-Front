<script setup>
import { ref } from 'vue'
import Sidebar from '../components/SideBar.vue'
import Header from '../components/Header.vue'

const isSidebarExpanded = ref(true)

const toggleSidebar = () => {
    isSidebarExpanded.value = !isSidebarExpanded.value
}
</script>

<template>
    <div class="flex h-screen bg-gray-100">
        <Sidebar :is-expanded="isSidebarExpanded" />

        <div class="flex flex-1 flex-col overflow-hidden relative">
            <Header @toggle-sidebar="toggleSidebar" />

            

            <main class="flex-1 overflow-y-auto p-6 md:p-8">
                <slot></slot>
            </main>
        </div>
    </div>
</template>