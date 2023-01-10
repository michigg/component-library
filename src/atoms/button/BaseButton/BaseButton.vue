<template>
  <button 
    v-bind="$attrs" 
    :class="{active, busy}"
    :disabled="disabled || busy"
  >
    <slot />
  </button>
</template>
<script lang="ts" setup>
withDefaults(
  defineProps<{ 
    active?: boolean, 
    busy?: boolean,
    disabled: boolean
  }>(),
  { active: false, busy: false, disabled: false }
)
</script>
<style scoped>
button {
  --_button-color-surface: var(--button-color-surface, var(--color-surface-button));
  --_button-color-surface-disabled: var(--button-color-surface-disabled, var(--color-primary-500-disabled));
  --_button-color-loading-indicator: var(--button-color-loading-indicator, var(--color-primary-400));
  --_button-color-text: var(--button-color-text, var(--color-text-button));
}

button {
  position: relative;
  background-color: var(--_button-color-surface);
  color: var(--_button-color-text);
  padding: 0.5rem 1rem;
  border: none;
  border-radius: var(--radius-md);
  flex-grow: 1;
  cursor: pointer;
  font-weight: bold;
  transition: box-shadow 150ms ease-out;
}

button:hover:not([disabled]),
button:active:not([disabled]),
button.active:not([disabled]) {
  box-shadow: var(--shadow-inset-md);
}

button[disabled] {
  cursor: unset;
  background-color: var(--_button-color-surface-disabled);
}

button.busy {
  background-size: 200% 100%;
  background-image: linear-gradient(90deg, var(--_button-color-surface-disabled) 40%, var(--_button-color-surface) 50%, var(--_button-color-surface-disabled) 60%);
  animation: busyGradient 1.5s linear infinite;
}

@keyframes busyGradient {
  0% {
    background-position: 100% 50%;
  }
  100% {
    background-position: -100% 50%;
  }
}
</style>
