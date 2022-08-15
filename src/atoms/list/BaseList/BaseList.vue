<template>
  <ul class="base-list">
    <slot />
  </ul>
</template>
<style scoped>
.base-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
  margin: 0;
  padding: 0;
}
</style>
