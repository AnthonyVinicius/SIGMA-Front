<template>
  <div
    v-if="isMobile && isDrawerOpen"
    class="fixed inset-0 bg-black/40 z-40"
    @click="closeDrawer"
  />

  <aside
    :class="[
      'h-screen bg-white border-r transition-all duration-300 z-50',

      isMobile
        ? [
            'fixed top-0 left-0',
            isDrawerOpen ? 'translate-x-0 w-64 px-5 py-8' : '-translate-x-full w-64'
          ]

        : [
            'static',
            isExpanded ? 'w-64 px-5 py-8' : 'w-20 px-2 py-8 items-center'
          ]
    ]"
  >
    <div
      :class="[
        'flex items-center gap-x-3',
        isExpanded || isMobile ? '' : 'justify-center'
      ]"
    >
      <div class="bg-[#1C5E27] text-white p-2 rounded-lg">
        <QrCode class="w-6 h-6" />
      </div>

      <span
        v-show="isExpanded || isMobile"
        class="text-xl font-bold text-gray-800 whitespace-nowrap"
      >
        Chamados
      </span>
    </div>

    <div class="mt-10 flex flex-1 flex-col justify-between">
      <nav
        :class="[
          '-mx-3 space-y-3',
          isExpanded || isMobile ? '' : 'flex flex-col items-center'
        ]"
      >
        <router-link
          v-for="item in currentMenu"
          :key="item.label"
          :to="item.to"
          @click="isMobile && closeDrawer()"
          class="flex items-center rounded-lg px-3 py-3
                 text-gray-600 hover:bg-[#1C5E27]
                 hover:text-white transition-colors"
        >
          <component :is="item.icon" class="h-6 w-6" />
          <span
            v-show="isExpanded || isMobile"
            class="mx-4 text-base font-medium whitespace-nowrap"
          >
            {{ item.label }}
          </span>
        </router-link>
      </nav>

      <div class="mt-6 border-t pt-4">
        <button
          @click="logout"
          class="flex w-full items-center rounded-lg px-3 py-3
                 text-gray-600 hover:bg-red-600
                 hover:text-white transition-colors"
          :class="isExpanded || isMobile ? '' : 'justify-center'"
        >
          <LogOut class="h-6 w-6" />
          <span
            v-show="isExpanded || isMobile"
            class="mx-4 whitespace-nowrap"
          >
            Sair
          </span>
        </button>

        <div
          v-show="isExpanded || isMobile"
          class="mt-4 border-t pt-4"
        >
          <p class="font-semibold text-gray-700 truncate">
            {{ usuarioNome }}
          </p>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useUserStore } from '../stores/user'
import {
  ClipboardList,
  ShieldUser,
  LogOut,
  QrCode,
  MapPin,
  TextAlignJustify
} from 'lucide-vue-next'
import { useRouter } from 'vue-router'

defineProps({
  isExpanded: { type: Boolean, required: true }
})

const router = useRouter()
const userStore = useUserStore()

const isMobile = ref(false)
const isDrawerOpen = ref(false)

function checkScreen() {
  isMobile.value = window.innerWidth < 640
  if (!isMobile.value) {
    isDrawerOpen.value = false
  }
}

onMounted(() => {
  checkScreen()
  window.addEventListener('resize', checkScreen)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkScreen)
})

defineExpose({
  toggleMobileDrawer() {
    if (isMobile.value) {
      isDrawerOpen.value = !isDrawerOpen.value
    }
  }
})

function closeDrawer() {
  isDrawerOpen.value = false
}

const menuItemsUser = [
  { to: '/userDashboard', label: 'Dashboard', icon: ClipboardList },
  { to: '/reportar', label: 'Reportar', icon: QrCode }
]

const menuItemsAdmin = [
  { to: '/adminDashboard', label: 'Dashboard', icon: ShieldUser },
  { to: '/allReports', label: 'Chamados', icon: TextAlignJustify },
  { to: '/manageLocals', label: 'Gerenciar Locais', icon: MapPin }
]

const currentMenu = computed(() =>
  userStore.role === 'ADMIN' ? menuItemsAdmin : menuItemsUser
)

const usuarioNome = computed(() => userStore.name ?? 'Usuário')

function logout() {
  userStore.logout()
  router.push('/login')
}
</script>



<style scoped>
.router-link-exact-active {
  background-color: #1c5e27;
  color: white;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1),
              0 2px 4px -2px rgb(0 0 0 / 0.1);
}
.router-link-exact-active:hover {
  background-color: #154b1f;
  color: white;
}
</style>
