<template>
  <BaseCard
    :title="title"
    class="info-box"
  >
    <slot />
  </BaseCard>
</template>
<script lang="ts" setup>

import BaseCard from '@/atoms/cards/BaseCard/BaseCard.vue'

defineProps<{ title: string }>()
</script>
<style scoped>
.info-box {
  padding: 0.5rem 1rem;
  background-color: var(--color-info);
  border-radius: var(--card-radius);
}

.info-box h2 {
  font-size: 1.3rem;
}
</style>
