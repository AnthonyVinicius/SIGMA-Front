<template>
    <footer class="footer">
        <div class="container">
            <div class="footer-grid">
                <!-- Logo -->
                <div class="footer-logo">
                    <h3 class="footer-title">
                        <svg class="footer-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Sigma
                    </h3>
                    <p class="footer-desc">
                        Sistema Integrado de Gestão de Manutenção e Ambiente<br>
                        IFPE - Campus Palmares
                    </p>
                </div>

                <!-- Navegação -->
                <div>
                    <h4 class="footer-subtitle">Navegação</h4>
                    <ul class="footer-list">
                        <li v-for="link in quickLinks" :key="link.name">
                            <a :href="link.href" class="footer-link">
                                {{ link.name }}
                            </a>
                        </li>
                    </ul>
                </div>

                <!-- Contato -->
                <div>
                    <h4 class="footer-subtitle">Contato</h4>
                    <div class="footer-contact">
                        <p>Av. José Pretestato de Santana<br>Palmares - PE, 55540-000</p>
                        <p>Email: contato@ifpe.edu.br</p>
                        <p>Telefone: (81) 1234-5678</p>
                    </div>
                </div>

                <!-- Redes sociais -->
                <div>
                    <h4 class="footer-subtitle">Siga-nos</h4>
                    <div class="footer-social-row">
                        <a v-for="social in socialLinks" :key="social.name" :href="social.href" target="_blank"
                            rel="noopener noreferrer" class="footer-social-link">
                            <span class="sr-only">{{ social.name }}</span>
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path :d="social.iconPath" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>

            <!-- Copy -->
            <div class="footer-bottom">
                <p>&copy; {{ currentYear }} Sigma - IFPE Campus Palmares. Todos os direitos reservados.</p>
            </div>
        </div>
    </footer>
</template>

<script setup>
import { ref } from 'vue'

const currentYear = ref(new Date().getFullYear())

const quickLinks = [
    { name: 'Início', href: '#' },
    { name: 'Dashboard', href: '#' },
    { name: 'Suporte', href: '#' },
    { name: 'Política de Privacidade', href: '#' }
]

const socialLinks = [
    {
        name: 'Facebook',
        href: '#',
        iconPath: "M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v7.005A9.953 9.953 0 0022 12z"
    },
    {
        name: 'Instagram',
        href: '#',
        iconPath: "M7.5 2h9A5.5 5.5 0 0122 7.5v9A5.5 5.5 0 0116.5 22h-9A5.5 5.5 0 012 16.5v-9A5.5 5.5 0 017.5 2zm0 2A3.5 3.5 0 004 7.5v9A3.5 3.5 0 007.5 20h9a3.5 3.5 0 003.5-3.5v-9A3.5 3.5 0 0016.5 4h-9zm4.5 3a5 5 0 110 10 5 5 0 010-10zm0 2a3 3 0 100 6 3 3 0 000-6zm5.25-2.25a1.25 1.25 0 11-2.5 0 1.25 1.25 0 012.5 0z"
    },
    {
        name: 'Twitter',
        href: '#',
        iconPath: "M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"
    }
]
</script>

<style scoped>
footer.footer {
    background-color: #f9fafb;
    color: #374151;
    width: 100%;
    padding: 3rem 1.5rem 1.5rem;
    border-top: 3px solid #1C5E27;
}

footer .container {
    max-width: 1280px;
    margin: 0 auto;
}

footer .footer-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2.5rem;
}

@media (min-width: 768px) {
    footer .footer-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (min-width: 1024px) {
    footer .footer-grid {
        grid-template-columns: repeat(4, 1fr);
    }
}

footer .footer-title {
    display: flex;
    align-items: center;
    font-size: 1.75rem;
    font-weight: bold;
    color: #1C5E27;
}

footer .footer-icon {
    width: 1.75rem;
    height: 1.75rem;
    margin-right: 0.5rem;
}

footer .footer-desc {
    color: #4b5563;
    line-height: 1.6;
    margin-top: 0.5rem;
    font-size: 0.95rem;
}

footer .footer-subtitle {
    font-weight: 600;
    text-transform: uppercase;
    margin-bottom: 1.25rem;
    color: #1C5E27;
    font-size: 0.95rem;
    letter-spacing: 0.05em;
}

footer .footer-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

footer .footer-link {
    display: block;
    padding: 0.4rem 0;
    color: #374151;
    text-decoration: none;
    font-size: 0.95rem;
    transition: color 0.3s ease;
}

footer .footer-link:hover {
    color: #1C5E27;
}

footer .footer-contact p {
    color: #4b5563;
    margin-bottom: 0.5rem;
    font-size: 0.95rem;
}

footer .footer-social-row {
    display: flex;
    gap: 0.75rem;
}

footer .footer-social-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 42px;
    height: 42px;
    border-radius: 50%;
    background-color: rgba(17, 24, 39, 0.05);
    transition: all 0.3s;
}

footer .footer-social-link:hover {
    transform: translateY(-3px);
    background-color: rgba(28, 94, 39, 0.15);
    color: #1C5E27;
}

footer .footer-bottom {
    border-top: 1px solid rgba(229, 231, 235, 0.6);
    padding-top: 1rem;
    text-align: center;
    font-size: 0.85rem;
    color: #6b7280;
    margin-top: 2rem;
}
</style>
