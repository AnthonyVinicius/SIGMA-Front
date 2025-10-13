<template>
    <nav class="sticky top-0 z-50 transition-all duration-300" :class="{
        'bg-white/80 backdrop-blur-md border-b border-gray-200': !isScrolled,
        'bg-white shadow-md': isScrolled
    }">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-20">
                <div class="flex-shrink-0">
                    <router-link to="/" class="flex items-center">
                        <img class="h-32 w-auto transition-all duration-300" src="../img/sigma.png" alt="Logo Sigma" />
                    </router-link>
                </div>

                <div class="hidden md:flex items-center space-x-4">
                    <router-link v-for="link in navLinks" :key="link.to" :to="link.to" class="nav-link">
                        {{ link.label }}
                    </router-link>
                </div>

                <div class="flex items-center">
                    <div v-if="usuarioLogado" class="relative">
                        <button @click="isProfileOpen = !isProfileOpen"
                            class="flex items-center space-x-3 focus:outline-none p-1 rounded-full hover:bg-gray-200/60 transition-colors duration-300">
                            <span class="text-gray-700 font-medium hidden sm:block">{{
                                usuarioLogado.nome
                                }}</span>
                            <img class="h-10 w-10 rounded-full object-cover ring-2 ring-transparent group-focus:ring-[#1C5E27] transition-all"
                                :src="usuarioLogado.avatarUrl" alt="Avatar" />
                        </button>

                        <Transition name="dropdown">
                            <div v-if="isProfileOpen"
                                class="absolute right-0 mt-3 w-60 bg-white rounded-xl shadow-lg z-20 border border-gray-100 origin-top-right overflow-hidden">
                                <div class="px-4 py-3">
                                    <p class="text-sm font-semibold text-gray-900 truncate">
                                        Bem-vindo, {{ usuarioLogado.nome }}
                                    </p>
                                </div>

                                <div class="border-t border-gray-100"></div>

                                <div class="menu-item">
                                    <router-link to="/perfil" @click="isProfileOpen = false" class="menu-link">
                                        <svg class="w-5 h-5 mr-3 text-gray-500 group-hover:text-[#1C5E27]" fill="none"
                                            stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        <span>Meu Perfil</span>
                                    </router-link>
                                </div>

                                <div class="border-t border-gray-100"></div>

                                <div class="menu-item">
                                    <a href="#" @click.prevent="logout" class="menu-link text-red-600 hover:bg-red-50">
                                        <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                        </svg>
                                        <span>Sair</span>
                                    </a>
                                </div>
                            </div>
                        </Transition>
                    </div>

                    <div v-else>
                        <router-link to="/login" class="login-btn">
                            <span>Login</span>
                            <svg class="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1"
                                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </router-link>
                    </div>

                    <div class="ml-4 md:hidden">
                        <button @click="toggleMobileMenu" aria-label="Abrir menu"
                            class="relative h-8 w-8 flex items-center justify-center focus:outline-none">
                            <div class="w-6 h-6 flex justify-center items-center">
                                <div class="absolute w-5 transform transition duration-300 ease-in-out">
                                    <span class="absolute h-0.5 w-5 bg-gray-800 transform transition-all duration-300"
                                        :class="isMobileMenuOpen ? 'rotate-45' : '-translate-y-1.5'"></span>
                                    <span class="absolute h-0.5 bg-gray-800 transform transition-all duration-300"
                                        :class="isMobileMenuOpen ? 'w-0 opacity-0' : 'w-5'"></span>
                                    <span class="absolute h-0.5 w-5 bg-gray-800 transform transition-all duration-300"
                                        :class="isMobileMenuOpen ? '-rotate-45' : 'translate-y-1.5'"></span>
                                </div>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <Transition name="slide-fade">
            <div v-if="isMobileMenuOpen" class="md:hidden fixed inset-0 top-20 bg-white/95 backdrop-blur-xl z-40">
                <div class="pt-8 px-4 space-y-2">
                    <router-link v-for="link in navLinks" :key="link.to" :to="link.to" @click="toggleMobileMenu"
                        class="mobile-nav-link">
                        {{ link.label }}
                    </router-link>
                </div>
            </div>
        </Transition>
    </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const isMobileMenuOpen = ref(false);
const isProfileOpen = ref(false);
const isScrolled = ref(false);

const usuarioLogado = ref({
    nome: "Administrador",
    avatarUrl:
        "https://ui-avatars.com/api/?name=Admin&background=1C5E27&color=fff",
});

const navLinks = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/adminDashboard", label: "AdminDashboard" },
    { to: "/test", label: "TestComponents" },
    { to: "/login", label: "Login" },
    { to: "/reportar", label: " Reportar" },
];

const logout = () => {
    console.log("Usuário deslogado!");
    usuarioLogado.value = null;
    isProfileOpen.value = false;
};

const toggleMobileMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value;
    document.body.style.overflow = isMobileMenuOpen.value ? "hidden" : "";
};

const handleScroll = () => {
    isScrolled.value = window.scrollY > 10;
};

onMounted(() => {
    window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll);
    document.body.style.overflow = "";
});
</script>

<style scoped>
.nav-link {
    position: relative;
    padding: 8px 14px;
    font-weight: 500;
    color: #374151;
    text-decoration: none;
    border-radius: 8px;
    transition: color 0.3s ease, background 0.3s ease;
}

.nav-link:hover {
    color: #1c5e27;
    background-color: rgba(229, 231, 235, 0.5);
}

.nav-link::after {
    content: "";
    position: absolute;
    width: calc(100% - 28px);
    left: 14px;
    height: 2px;
    bottom: 4px;
    background-color: #1c5e27;
    transform: scaleX(0);
    transform-origin: bottom center;
    transition: transform 0.3s ease-out;
}

.nav-link:hover::after,
.router-link-exact-active::after {
    transform: scaleX(1);
}

.router-link-exact-active {
    color: #1c5e27;
    font-weight: 600;
}

/* Mobile */
.mobile-nav-link {
    display: block;
    width: 100%;
    text-align: left;
    padding: 12px 16px;
    border-radius: 8px;
    font-size: 1.1rem;
    font-weight: 500;
    color: #374151;
    transition: background 0.3s ease, color 0.3s ease;
}

.mobile-nav-link:hover {
    background-color: #f3f4f6;
    color: #1c5e27;
}

.mobile-nav-link.router-link-exact-active {
    background-color: #f0fdf4;
    color: #1c5e27;
}

.menu-item {
    padding: 6px 0;
}

.menu-link {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 10px 14px;
    font-size: 0.9rem;
    color: #374151;
    border-radius: 8px;
    transition: all 0.2s ease;
}

.menu-link:hover {
    background-color: #f3f4f6;
    color: #1c5e27;
}

.login-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #1c5e27;
    color: white;
    padding: 10px 20px;
    border-radius: 8px;
    font-weight: 600;
    transition: all 0.3s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.login-btn:hover {
    background: #154b1f;
    transform: translateY(-1px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
}

.dropdown-enter-active {
    transition: all 0.2s ease-out;
}

.dropdown-leave-active {
    transition: all 0.2s ease-in;
}

.dropdown-enter-from,
.dropdown-leave-to {
    opacity: 0;
    transform: translateY(-10px) scale(0.95);
}

.slide-fade-enter-active,
.slide-fade-leave-active {
    transition: all 0.35s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateY(-20px);
    opacity: 0;
}
</style>
