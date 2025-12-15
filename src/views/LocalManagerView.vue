<template>
  <BaseLayout>
    <div class="space-y-6 sm:space-y-10 px-4 sm:px-6 lg:px-8">
      <header
        class="flex flex-col sm:flex-row sm:items-center
               justify-between border-b pb-4 sm:pb-6 gap-4"
      >
        <div>
          <h1 class="text-2xl sm:text-3xl font-bold text-[#1C5E27]">
            Gerenciar Locais
          </h1>
          <p class="text-sm sm:text-base text-gray-600 mt-1">
            Adicione novos locais e gere QR Codes
          </p>
        </div>

        <div
          class="flex flex-col sm:flex-row
                 gap-3 sm:gap-4
                 w-full sm:w-auto"
        >
          <select
            v-model="selectedCategory"
            class="w-full sm:w-64
                   px-4 py-2
                   bg-white border border-gray-300
                   rounded-md shadow-sm
                   focus:border-[#1C5E27] focus:ring-[#1C5E27]
                   text-sm"
          >
            <option value="">Todas as Categorias</option>
            <option
              v-for="category in uniqueCategories"
              :key="category"
              :value="category"
            >
              {{ category }}
            </option>
          </select>

          <button
            @click="openCreateModal"
            class="bg-[#1C5E27] hover:bg-[#174a20]
                   text-white font-semibold
                   py-2 px-5 rounded-md
                   flex items-center justify-center gap-2
                   transition-all text-sm shadow-sm
                   w-full sm:w-auto"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M5 12h14" />
              <path d="M12 5v14" />
            </svg>
            Novo Local
          </button>
        </div>
      </header>

      <section
        class="grid gap-4 sm:gap-6
               grid-cols-1 sm:grid-cols-2
               lg:grid-cols-3 xl:grid-cols-4"
      >
        <LocalCard
          v-for="local in filteredLocais"
          :key="local.id"
          class="transition-transform
                 hover:-translate-y-1 hover:shadow-md"
          @click="openLocalItems(local.id)"
          @delete="handleDelete(local.id)"
          @edit="openEditModal(local)"
          @generateQr="openQrModal(local)"
        >
          <template #title>{{ local.name }}</template>

          <template #items>
            <span
              v-if="local.category"
              class="bg-gray-100 text-gray-700
                     text-xs font-medium
                     px-3 py-1 rounded-md
                     mr-1 mb-1 whitespace-nowrap
                     border border-gray-200"
            >
              {{ formatCategory(local.category) }}
            </span>

            <span
              v-for="itemId in (local.itensIds || [])"
              :key="'item-' + itemId"
              class="bg-green-100 text-green-800
                     text-xs font-medium
                     px-3 py-1 rounded-md
                     mr-1 mb-1 whitespace-nowrap
                     border border-green-200"
            >
              {{ getItemNome(itemId) }}
            </span>
          </template>
        </LocalCard>
      </section>

      <div
        v-if="filteredLocais.length === 0"
        class="flex flex-col items-center justify-center
               py-12 sm:py-16"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-14 h-14 sm:w-16 sm:h-16
                 text-gray-300 mb-3"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M8.25 9V5.25A2.25 2.25 0 0110.5 3h3a2.25 2.25 0 012.25 2.25V9m-9 12h9.75A2.25 2.25 0 0021 18.75V9.75A2.25 2.25 0 0018.75 7.5H5.25A2.25 2.25 0 003 9.75v9A2.25 2.25 0 005.25 21z"
          />
        </svg>
        <p class="text-gray-500 text-sm">
          Nenhum local encontrado nesta categoria.
        </p>
      </div>
    </div>

    <ModalEnviromental
      :isOpen="isModalOpen"
      :localData="selectedLocal"
      :isEdit="isEditMode"
      :itens="itens"
      @close="closeModal"
      @submit="handleSubmit"
    />

    <ModalQRCode
      :isOpen="isQRModalOpen"
      :localId="qrLocalId"
      :localNome="qrLocalNome"
      @close="closeQRModal"
    />
  </BaseLayout>
</template>


<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import BaseLayout from '../components/BaseLayout.vue'
import LocalCard from '../components/LocalCard.vue'
import ModalEnviromental from '../components/ModalEnviromental.vue'
import ModalQRCode from '../components/ModalQRCode.vue'
import EnviromentalDAO from '../services/EnviromentalDAO'

const router = useRouter()

function openLocalItems(localId) {
  router.push(`/locais/${localId}/itens`)
}

const locais = ref([])
const itens = ref([])
const selectedCategory = ref('')
const isModalOpen = ref(false)
const isEditMode = ref(false)
const selectedLocal = ref(null)
const isQRModalOpen = ref(false)
const qrLocalId = ref('')
const qrLocalNome = ref('')

onMounted(loadData)

async function loadData() {
  try {
    const [dataLocais] = await Promise.all([EnviromentalDAO.getAll()])
    locais.value = dataLocais.map(l => ({
      ...l,
      name: l.name || 'Sem nome',
      category: l.category || null,
      itensIds: l.itensIds || []
    }))
  } catch (error) {
    console.error('Erro ao carregar dados:', error)
    alert('Erro ao carregar dados.')
  }
}

function getItemNome(itemId) {
  const item = itens.value.find(i => i.id === itemId)
  return item ? item.nome : 'Item não encontrado'
}

function formatCategory(category) {
  if (typeof category === 'string') return category
  if (category?.name) return category.name
  return 'Sem categoria'
}

const uniqueCategories = computed(() => {
  const allCategories = locais.value.map(local => formatCategory(local.category))
  return [...new Set(allCategories.filter(Boolean))].sort()
})

const filteredLocais = computed(() => {
  if (!selectedCategory.value) return locais.value
  return locais.value.filter(local => formatCategory(local.category) === selectedCategory.value)
})

async function handleSubmit(formData) {
  if (isEditMode.value && selectedLocal.value?.id) {
    await updateLocal(selectedLocal.value.id, formData)
  } else {
    await createLocal(formData)
  }
  closeModal()
  await loadData()
}

async function createLocal(formData) {
  try {
    await EnviromentalDAO.insert(formData)
  } catch (error) {
    console.error('Erro ao criar local:', error)
    alert('Erro ao criar local.')
  }
}

async function updateLocal(id, formData) {
  try {
    await EnviromentalDAO.update(id, formData)
  } catch (error) {
    console.error('Erro ao atualizar local:', error)
    alert('Erro ao atualizar local.')
  }
}

async function handleDelete(localId) {
  if (confirm('Tem certeza que deseja excluir este local?')) {
    try {
      await EnviromentalDAO.delete(localId)
      locais.value = locais.value.filter(l => l.id !== localId)
    } catch (error) {
      console.error('Erro ao excluir local:', error)
      alert('Erro ao excluir local.')
    }
  }
}

function openCreateModal() {
  isEditMode.value = false
  selectedLocal.value = null
  isModalOpen.value = true
}

function openEditModal(local) {
  isEditMode.value = true
  selectedLocal.value = local
  isModalOpen.value = true
}

function closeModal() {
  isModalOpen.value = false
}

function openQrModal(local) {
  qrLocalId.value = local.id
  qrLocalNome.value = local.name
  isQRModalOpen.value = true
}

function closeQRModal() {
  isQRModalOpen.value = false
  qrLocalId.value = ''
  qrLocalNome.value = ''
}
</script>
