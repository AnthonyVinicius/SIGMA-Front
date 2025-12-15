<template>
  <BaseLayout>
    <div class="space-y-6 sm:space-y-10 px-4 sm:px-6 lg:px-8">
      <header
        class="flex flex-col sm:flex-row sm:items-center
               justify-between border-b pb-4 sm:pb-6 gap-3"
      >
        <div>
          <h1 class="text-2xl sm:text-3xl font-bold text-[#1C5E27]">
            Itens do Local {{ localName }}
          </h1>
          <p class="text-sm sm:text-base text-gray-600 mt-1">
            Gerencie os itens associados a este local
          </p>
        </div>

        <button
          @click="openAddItemModal"
          class="bg-[#1C5E27] hover:bg-[#174a20]
                 text-white font-semibold
                 py-2.5 px-4 sm:px-5
                 rounded-md flex items-center gap-2
                 transition-all text-sm shadow-sm
                 w-full sm:w-auto justify-center"
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
          Adicionar Item
        </button>
      </header>

      <section>
        <div
          v-if="loading"
          class="text-gray-500 text-center py-12 sm:py-16"
        >
          Carregando itens...
        </div>

        <div
          v-else-if="itens.length === 0"
          class="flex flex-col items-center justify-center py-12 sm:py-16"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-14 h-14 sm:w-16 sm:h-16 text-gray-300 mb-3"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 12h6m-3-3v6m9-9a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p class="text-gray-500 text-sm">
            Nenhum item encontrado neste local.
          </p>
        </div>

        <ul
          v-else
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          <li
            v-for="item in itens"
            :key="item.id"
            class="bg-white rounded-lg shadow-sm
                   hover:shadow-md transition-all
                   p-4 sm:p-5
                   flex flex-col justify-between"
          >
            <div class="space-y-1">
              <p class="font-semibold text-gray-800 text-base sm:text-lg">
                {{ item.code || 'Sem código' }}
              </p>
              <p class="text-gray-700 text-sm">
                <strong>Marca:</strong> {{ item.mark }}
              </p>
              <p class="text-gray-700 text-sm">
                <strong>Modelo:</strong> {{ item.model }}
              </p>
              <p class="text-gray-700 text-sm">
                <strong>Descrição:</strong> {{ item.description }}
              </p>
            </div>

            <div class="flex justify-end gap-4 mt-4">
              <button
                class="text-gray-600 hover:text-[#1C5E27] transition"
                @click="openEditItemModal(item)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M13 21h8" />
                  <path d="m15 5 4 4" />
                  <path
                    d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"
                  />
                </svg>
              </button>

              <button
                class="text-red-500 hover:text-red-700 transition"
                @click="deleteItem(item.id)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M10 11v6" />
                  <path d="M14 11v6" />
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                  <path d="M3 6h18" />
                  <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                </svg>
              </button>
            </div>
          </li>
        </ul>
      </section>

      <ModalComponent
        :isOpen="isModalOpen"
        :isEdit="isEditMode"
        :itemData="selectedItem"
        @close="closeModal"
        @submit="handleItemSubmit"
      />
    </div>
  </BaseLayout>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { useRoute } from "vue-router"
import BaseLayout from "../components/BaseLayout.vue"
import ModalComponent from "../components/ModalComponent.vue"
import EnvironmentDAO from "../services/EnviromentalDAO"
import ComponentDAO from "../services/ComponentDAO"

const route = useRoute()
const localId = route.params.id

const localName = ref("")
const itens = ref([])
const loading = ref(true)
const isModalOpen = ref(false)
const isEditMode = ref(false)
const selectedItem = ref(null)

onMounted(async () => {
  await loadLocalInfo()
  await loadItens()
})

async function loadLocalInfo() {
  try {
    const local = await EnvironmentDAO.getById(localId)
    localName.value = local.name
  } catch (error) {
    console.error("Erro ao carregar local:", error)
  }
}

async function loadItens() {
  try {
    itens.value = await EnvironmentDAO.getComponentsByEnviromentId(localId)
  } catch (error) {
    console.error("Erro ao carregar itens:", error)
  } finally {
    loading.value = false
  }
}

function openAddItemModal() {
  isEditMode.value = false
  selectedItem.value = null
  isModalOpen.value = true
}

function openEditItemModal(item) {
  isEditMode.value = true
  selectedItem.value = item
  isModalOpen.value = true
}

function closeModal() {
  isModalOpen.value = false
}

async function handleItemSubmit(formData) {
  try {
    if (isEditMode.value && formData.id) {
      await ComponentDAO.update(formData.id, {
        code: formData.code,
        mark: formData.mark,
        model: formData.model,
        description: formData.description,
        environmentId: localId,
      })
    } else {
      await ComponentDAO.insert({
        ...formData,
        environmentId: localId,
      })
    }
    await loadItens()
  } catch (error) {
    console.error("Erro ao salvar item:", error)
  } finally {
    isModalOpen.value = false
  }
}

async function deleteItem(itemId) {
  if (confirm("Excluir este item?")) {
    try {
      await ComponentDAO.delete(itemId)
      await loadItens()
    } catch (error) {
      console.error("Erro ao excluir item:", error)
    }
  }
}
</script>
