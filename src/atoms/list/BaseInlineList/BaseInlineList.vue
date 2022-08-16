<template>
  <BaseList class="base-inline-list">
    <slot/>
  </BaseList>
</template>
<script lang="ts" setup>
import BaseList from '@/atoms/list/BaseList/BaseList.vue'
</script>
<style scoped>
.base-inline-list {
  --direction: 'row'
}
</style>
