<template>
  <button
    :class="['base-button', variant]"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: "BaseButton",
  props: {
    variant: {
      type: String,
      default: "filled", // opções: "filled" ou "outlined"
    },
  },
};
</script>

<style scoped>
.base-button {
  font-family: 'Roboto Slab', serif;
  border-radius: 6px;
  padding: 13px 11px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
}

/* Botão preenchido */
.base-button.filled {
  background-color: #1C5E27;
  color: white;
  border: none;
}

.base-button.filled:hover {
  background-color: #174d20;
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

/* Botão contornado */
.base-button.outlined {
  background-color: transparent;
  color: #1C5E27;
  border: 2px solid #1C5E27;
}

.base-button.outlined:hover {
  background-color: #eaf4ec;
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}
</style>
