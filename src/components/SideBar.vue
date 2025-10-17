<template>
    <aside
        :class="['flex h-screen flex-col overflow-y-auto border-r bg-white transition-all duration-300', isExpanded ? 'w-64 px-5 py-8' : 'w-20 items-center py-8 px-2']">
        <div :class="['flex items-center gap-x-3', isExpanded ? '' : 'justify-center']">
            <div class="bg-[#1C5E27] text-white p-2 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
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
            </div>
            <span v-show="isExpanded"
                class="text-xl font-bold text-gray-800 transition-opacity duration-200">Chamados</span>
        </div>

        <div class="mt-10 flex flex-1 flex-col justify-between">
            <nav :class="['-mx-3 space-y-3', isExpanded ? '' : 'flex flex-col items-center']">
                <router-link v-if=userAdm v-for="item in menuItemsUser" :key="item.label" :to="item.to"
                    :class="['flex transform items-center rounded-lg px-3 py-3 text-gray-600 transition-colors duration-300 hover:bg-[#1C5E27] hover:text-white', isExpanded ? '' : 'justify-center']">
                    <component :is="item.icon" class="h-6 w-6" />
                    <span v-show="isExpanded" class="mx-4 text-base font-medium whitespace-nowrap">{{ item.label
                        }}</span>
                </router-link>

                <router-link v-if=userAdm v-for="item in menuItemsAdmin" :key="item.label" :to="item.to"
                    :class="['flex transform items-center rounded-lg px-3 py-3 text-gray-600 transition-colors duration-300 hover:bg-[#1C5E27] hover:text-white', isExpanded ? '' : 'justify-center']">
                    <component :is="item.icon" class="h-6 w-6" />
                    <span v-show="isExpanded" class="mx-4 text-base font-medium whitespace-nowrap">{{ item.label
                        }}</span>
                </router-link>
            </nav>

            <div class="mt-6 border-t pt-4">
                <div :class="['flex w-full items-center', isExpanded ? 'gap-x-3' : 'justify-center']">
                    <img class="h-12 w-12 rounded-full object-cover flex-shrink-0" :src="usuario.avatarUrl"
                        :alt="usuario.nome" />

                    <div v-show="isExpanded" class="flex flex-grow items-center justify-between">
                        <div class="transition-opacity duration-200">
                            <h1 class="text-base font-semibold text-gray-700 whitespace-nowrap">{{ usuario.nome }}</h1>
                            <p v-if=userAdm class="text-sm text-gray-500">Administrador</p>
                            <p v-if=!userAdm class="text-sm text-gray-500"> Aluno</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </aside>
</template>

<script setup>
import { shallowRef } from 'vue';
import { ClipboardList, ShieldUser, LogOut, QrCode, MapPin, Cog, TextAlignJustify, Package } from 'lucide-vue-next';


const userAdm = true

defineProps({
    isExpanded: {
        type: Boolean,
        required: true,
    }
});

const menuItemsUser = shallowRef([
    { to: "/reportar", label: 'Reportar', icon: QrCode },
    { to: "/userDashboard", label: "Dashboard", icon: ClipboardList },
    { to: "/login", label: "Sair", icon: LogOut },
]);
const menuItemsAdmin = shallowRef([
   // { to: "/reportar", label: 'Reportar', icon: QrCode },
    { to: "/adminDashboard", label: "Dashboard", icon: ShieldUser },
    { to: "/allReports", label: "Chamados", icon: TextAlignJustify },
    { to: "/manageLocals", label: "Gerenciar Locais", icon: MapPin },
    { to: "/itensType", label: "Gerenciar Itens", icon: Package },
    //{ to: "/login", label: "Sair", icon: LogOut },
]);

const usuario = {
    nome: 'Ericlecio',
    avatarUrl: 'https://media.licdn.com/dms/image/v2/D4D03AQGO0jFnAufS3g/profile-displayphoto-shrink_200_200/B4DZdbRf0MGkAY-/0/1749583004054?e=2147483647&v=beta&t=2Znm62Yvxyf0vJ8VN2DSr3CpTg0QEtYDtvb-vfjQ3HE',
};
</script>


<style scoped>
.router-link-exact-active {
    background-color: #1C5E27;
    color: white;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
}

.router-link-exact-active:hover {
    background-color: #154b1f;
    color: white;
}
</style>