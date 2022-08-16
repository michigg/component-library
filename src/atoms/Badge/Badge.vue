<template>
  <span class="badge">
    <slot />
  </span>
</template>

<script lang="ts" setup>
</script>

<style scoped>
.badge {
  background-color: var(--color-surface-badge, var(--color-primary));
  color: var(--color-badge, var(--color-text-button));

  font-size: var(--font-size-sm);
  font-weight: bold;

  padding: var(--space-xxs) var(--space-xs);
  border-radius: 1rem;
}
</style>
