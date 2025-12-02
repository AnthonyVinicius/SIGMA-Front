<template>
  <aside :class="[
    'flex h-screen flex-col overflow-y-auto border-r bg-white transition-all duration-300',
    isExpanded ? 'w-64 px-5 py-8' : 'w-20 items-center py-8 px-2'
  ]">
    <div :class="['flex items-center gap-x-3', isExpanded ? '' : 'justify-center']">
      <div class="bg-[#1C5E27] text-white p-2 rounded-lg">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor"
          stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-qr-code">
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
      </div>
      <span v-show="isExpanded" class="text-xl font-bold text-gray-800 whitespace-nowrap">Chamados</span>
    </div>

    <div class="mt-10 flex flex-1 flex-col justify-between">
      <nav :class="['-mx-3 space-y-3', isExpanded ? '' : 'flex flex-col items-center']">
        <router-link v-for="item in currentMenu" :key="item.label" :to="item.to" :title="!isExpanded ? item.label : ''"
          :class="[
            'flex items-center rounded-lg px-3 py-3 text-gray-600 hover:bg-[#1C5E27] hover:text-white transition-colors',
            isExpanded ? '' : 'justify-center'
          ]">
          <component :is="item.icon" class="h-6 w-6" />
          <span v-show="isExpanded" class="mx-4 text-base font-medium whitespace-nowrap">{{ item.label }}</span>
        </router-link>
      </nav>

      <div class="mt-6 border-t pt-4">
        <div :class="['flex items-center', isExpanded ? 'gap-x-3' : 'justify-center']">
          <button @click="logout" :title="!isExpanded ? 'Sair' : ''"
            class="flex w-full items-center rounded-lg px-3 py-3 text-gray-600 hover:bg-red-600 hover:text-white transition-colors"
            :class="isExpanded ? '' : 'justify-center'">
            <LogOut class="h-6 w-6" />
            <span v-show="isExpanded" class="mx-4 text-base font-medium whitespace-nowrap">Sair</span>
          </button>
        </div>

        <div v-show="isExpanded" class="flex flex-col gap-3 mt-4 border-t pt-4">
          <h1 class="text-base font-semibold text-gray-700 whitespace-nowrap">{{ usuarioNome }}</h1>
        </div>
      </div>
    </div>
  </aside>
</template>


<script setup>
import { computed } from 'vue'
import { useUserStore } from '../stores/user'
import { ClipboardList, ShieldUser, LogOut, QrCode, MapPin, TextAlignJustify } from 'lucide-vue-next'
import { useRouter } from 'vue-router'

defineProps({
  isExpanded: { type: Boolean, required: true }
})

const router = useRouter()
const userStore = useUserStore()

const menuItemsUser = [
  { to: '/userDashboard', label: 'Dashboard', icon: ClipboardList },
  { to: '/reportar', label: 'Reportar', icon: QrCode },
]

const menuItemsAdmin = [
  { to: '/adminDashboard', label: 'Dashboard', icon: ShieldUser },
  { to: '/allReports', label: 'Chamados', icon: TextAlignJustify },
  { to: '/manageLocals', label: 'Gerenciar Locais', icon: MapPin }
]

const currentMenu = computed(() => {
  return userStore.role === "ADMIN"
    ? menuItemsAdmin
    : menuItemsUser
})

const usuarioNome = computed(() => userStore.name ?? "Usuário")

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
