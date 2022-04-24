<template>
  <span class="badge">
    <slot />
  </span>
</template>

<script lang="ts" setup>
</script>

<style scoped>
.badge {
  border-radius: 1rem;
  background-color: var(--background-color, #000);
  color: var(--color, #fff);
  padding: .25rem .75rem;
}
</style>
