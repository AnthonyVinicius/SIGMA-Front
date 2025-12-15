```vue
<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50
           flex items-center justify-center
           bg-black/40
           px-3 sm:px-0"
    @click.self="closeModal"
  >
    <div
      class="bg-white rounded-xl shadow-lg
             w-full max-w-lg
             p-4 sm:p-6"
    >
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-lg sm:text-xl font-bold text-gray-800">
          {{ isEdit ? "Editar Local" : "Novo Local" }}
        </h2>

        <button
          @click="closeModal"
          class="text-gray-400 hover:text-gray-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-3 sm:space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Nome do Local
          </label>
          <input
            v-model="formData.name"
            type="text"
            required
            placeholder="Ex: Sala 101"
            class="w-full px-3 py-2 text-sm
                   border border-gray-300 rounded-lg
                   focus:outline-none focus:ring-2 focus:ring-[#1C5E27]"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Bloco
          </label>
          <input
            v-model="formData.block"
            type="text"
            required
            placeholder="Ex: Bloco C"
            class="w-full px-3 py-2 text-sm
                   border border-gray-300 rounded-lg
                   focus:outline-none focus:ring-2 focus:ring-[#1C5E27]"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Categoria
          </label>
          <select
            v-model="formData.category"
            required
            class="w-full px-3 py-2 text-sm
                   border border-gray-300 rounded-lg
                   text-gray-700
                   focus:outline-none focus:ring-2 focus:ring-[#1C5E27]"
          >
            <option disabled value="">Selecione a Categoria</option>
            <option
              v-for="category in categories"
              :key="category"
              :value="category"
            >
              {{ translateCategory(category) }}
            </option>
          </select>
        </div>

        <div
          class="flex flex-col-reverse sm:flex-row
                 gap-2 sm:gap-3
                 justify-end pt-2"
        >
          <button
            type="button"
            @click="closeModal"
            class="w-full sm:w-auto
                   px-4 py-2
                   border border-gray-300
                   rounded-lg text-gray-700
                   hover:bg-gray-50 transition"
          >
            Cancelar
          </button>

          <button
            type="submit"
            class="w-full sm:w-auto
                   px-4 py-2
                   bg-[#1C5E27] text-white
                   rounded-lg
                   hover:bg-[#154b1f] transition"
          >
            {{ isEdit ? "Salvar Alterações" : "Adicionar Local" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
```


<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  isOpen: Boolean,
  localData: Object,
  isEdit: Boolean,
  presetEnvironmentId: String,
});

const emit = defineEmits(["close", "submit"]);

const categories = ref([
  "ROOM",
  "LIBRARY",
  "LABORATORY",
  "OFFICE",
  "COMMON_AREA",
  "BATHROOMS",
  "OUTDOORS",
  "OTHER",
]);

const categoryTranslations = {
  ROOM: "Sala",
  LIBRARY: "Biblioteca",
  LABORATORY: "Laboratório",
  OFFICE: "Escritório",
  COMMON_AREA: "Área Comum",
  BATHROOMS: "Banheiros",
  OUTDOORS: "Área Externa",
  OTHER: "Outro",
};

const formData = ref({
  id: null,
  name: "",
  block: "",
  category: "",
  environmentParentId: "",
});

function translateCategory(englishCategory) {
  if (!englishCategory) return "";
  return categoryTranslations[englishCategory] || englishCategory;
}

watch(
  () => props.localData,
  (newData) => {
    if (newData) {
      formData.value = {
        id: newData.id || null,
        name: newData.name || "",
        block: newData.block || "",
        category: newData.category || "",
        environmentParentId: props.presetEnvironmentId || "",
      };
    } else {
      resetForm();
    }
  },
  { immediate: true }
);

function resetForm() {
  formData.value = {
    id: null,
    name: "",
    block: "",
    category: "",
    environmentParentId: props.presetEnvironmentId || "",
  };
}

function closeModal() {
  emit("close");
}

function handleSubmit() {
  emit("submit", { ...formData.value });
}
</script>
