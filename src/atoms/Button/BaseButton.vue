<template>
  <button v-bind="$attrs" :class="[active ? 'active' : '']">
    <slot />
  </button>
</template>
<script lang="ts" setup>
withDefaults(
  defineProps<{ active?: boolean }>(),
  { active: false }
)
</script>
<style scoped>
button {
  background-color: var(--color-surface-button);
  color: var(--color-text-button);
  padding: 0.5rem 1rem;
  border: none;
  border-radius: var(--radius-md);
  flex-grow: 1;
  cursor: pointer;
  font-weight: bold;
  transition: box-shadow 150ms ease-out;
}

button:hover, 
button:active, 
button.active {
  box-shadow: var(--shadow-inset-md);
}
</style>
