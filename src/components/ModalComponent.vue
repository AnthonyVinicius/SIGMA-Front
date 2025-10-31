<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 flex items-center justify-center bg-[#f0f0f0]"
    @click.self="closeModal"
  >
    <div class="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-bold text-gray-800">
          {{ isEdit ? "Editar Item" : "Novo Item" }}
        </h2>
        <button @click="closeModal" class="text-gray-400 hover:text-gray-600">
          ✕
        </button>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Código</label>
          <input
            v-model="formData.code"
            type="text"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1C5E27] shadow-sm"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Marca</label>
          <input
            v-model="formData.mark"
            type="text"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1C5E27] shadow-sm"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Modelo</label>
          <input
            v-model="formData.model"
            type="text"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1C5E27] shadow-sm"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Descrição</label>
          <input
            v-model="formData.description"
            type="text"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1C5E27] shadow-sm"
          />
        </div>

        <div class="flex gap-3 justify-end pt-2">
          <button
            type="button"
            @click="closeModal"
            class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
          >
            Cancelar
          </button>
          <button
            type="submit"
            class="px-4 py-2 bg-[#1C5E27] text-white rounded-lg hover:bg-[#154b1f] transition"
          >
            {{ isEdit ? "Salvar Alterações" : "Adicionar Item" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  isOpen: Boolean,
  itemData: Object,
  isEdit: Boolean,
});

const emit = defineEmits(["close", "submit"]);

const formData = ref({
  id: null,
  code: "",
  mark: "",
  model: "",
  description: "",
});

watch(
  () => props.itemData,
  (newData) => {
    if (newData) {
      formData.value = {
        id: newData.id || null,
        code: newData.code || "",
        mark: newData.mark || "",
        model: newData.model || "",
        description: newData.description || "",
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
    code: "",
    mark: "",
    model: "",
    description: "",
  };
}

function closeModal() {
  emit("close");
}

function handleSubmit() {
  emit("submit", { ...formData.value });
}
</script>
