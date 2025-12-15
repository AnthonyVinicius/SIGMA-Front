<script setup>
import { ref } from 'vue'
import Sidebar from '../components/SideBar.vue'
import Header from '../components/Header.vue'

const isSidebarExpanded = ref(true)
const sidebarRef = ref(null)

function toggleSidebar() {
  if (window.innerWidth < 640) {
    sidebarRef.value?.toggleMobileDrawer()
  } else {
    isSidebarExpanded.value = !isSidebarExpanded.value
  }
}
</script>

<template>
  <div class="flex h-screen bg-gray-100">
    <Sidebar
      ref="sidebarRef"
      :is-expanded="isSidebarExpanded"
    />

    <div class="flex flex-1 flex-col overflow-hidden relative">
      <Header @toggle-sidebar="toggleSidebar" />

      <main class="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
        <slot />
      </main>
    </div>
  </div>
</template>
