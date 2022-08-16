<template>
  <Badge
    class="leading-4"
    data-test="badge"
  >
    <BaseIcon :icon-key="iconKey" />
  </Badge>
</template>

<script lang="ts" setup>

import BaseIcon from '@/atoms/BaseIcon/BaseIcon.vue'
import Badge from '@/atoms/Badge/Badge.vue'

defineProps<{ iconKey: string }>()
</script>
