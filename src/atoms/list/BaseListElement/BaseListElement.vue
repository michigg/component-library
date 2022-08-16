<template>
  <li class="base-list-element">
    <slot />
  </li>
</template>

<script lang="ts" setup>
/**
 * Use this component only inside a <code>BaseList.vue</code> component.
 */
</script>
<style scoped>
.base-list-element {
  padding: var(--space-xs) var(--space-sm);
  box-shadow: var(--shadow-sm);
  border-radius: var(--radius-sm);
  appearance: none;
  list-style: none;
}
</style>
