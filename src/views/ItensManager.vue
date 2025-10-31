<template>
  <BaseLayout>
    <div class="space-y-6">
      <header class="flex justify-between items-center">
        <div>
          <h1 class="text-2xl font-bold text-ponto-if-green">
            Itens do Local {{ localName }}
          </h1>
          <p class="text-gray-600">Gerencie os itens associados a este local</p>
        </div>

        <button
          @click="openAddItemModal"
          class="bg-[#1C5E27] text-white font-semibold py-2 px-4 rounded-lg hover:bg-[#154b1f] transition"
        >
          Adicionar Item
        </button>
      </header>

      <section>
        <div v-if="loading" class="text-gray-500 text-center py-10">
          Carregando itens...
        </div>

        <div
          v-else-if="itens.length === 0"
          class="text-gray-500 text-center py-10"
        >
          Nenhum item encontrado neste local.
        </div>

        <ul v-else class="space-y-3">
          <li
            v-for="item in itens"
            :key="item.id"
            class="p-4 bg-white shadow rounded-lg flex justify-between items-center"
          >
            <div>
              <p class="font-semibold text-gray-800">Código: {{ item.code }}</p>
              <p class="text-gray-700">Marca: {{ item.mark }}</p>
              <p class="text-gray-700">Modelo: {{ item.model }}</p>
              <p class="text-gray-700">Descrição: {{ item.description }}</p>
              <p class="text-sm text-gray-500">ID: {{ item.id }}</p>
            </div>

            <div class="flex items-center gap-2">
              <button
                class="text-gray-600 hover:text-gray-800 transition "
                @click="openEditItemModal(item)"
                title="Editar"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-pencil-line-icon lucide-pencil-line"
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
                title="Excluir"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-trash2-icon lucide-trash-2"
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
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import BaseLayout from "../components/BaseLayout.vue";
import ModalComponent from "../components/ModalComponent.vue";
import EnvironmentDAO from "../services/EnviromentalDAO";
import ComponentDAO from "../services/ComponentDAO";

const route = useRoute();
const localId = route.params.id;

const localName = ref("");
const itens = ref([]);
const loading = ref(true);
const isModalOpen = ref(false);
const isEditMode = ref(false);
const selectedItem = ref(null);

onMounted(async () => {
  await loadLocalInfo();
  await loadItens();
});

async function loadLocalInfo() {
  try {
    const local = await EnvironmentDAO.getById(localId);
    localName.value = local.name;
  } catch (error) {
    console.error("Erro ao carregar local:", error);
  }
}

async function loadItens() {
  try {
    itens.value = await ComponentDAO.getAll();
  } catch (error) {
    console.error("Erro ao carregar itens:", error);
  } finally {
    loading.value = false;
  }
}

function openAddItemModal() {
  isEditMode.value = false;
  selectedItem.value = null;
  isModalOpen.value = true;
}

function openEditItemModal(item) {
  isEditMode.value = true;
  selectedItem.value = item;
  isModalOpen.value = true;
}

function closeModal() {
  isModalOpen.value = false;
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
      });
    } else {
      await ComponentDAO.insert({
        ...formData,
        environmentId: localId,
      });
    }

    await loadItens();
  } catch (error) {
    console.error("Erro ao salvar item:", error);
  } finally {
    isModalOpen.value = false;
  }
}

async function deleteItem(itemId) {
  if (confirm("Excluir este item?")) {
    try {
      await ComponentDAO.delete(itemId);
      await loadItens();
    } catch (error) {
      console.error("Erro ao excluir item:", error);
    }
  }
}
</script>
