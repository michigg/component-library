<template>
  <i
    :class="['bi', iconKey]"
    :aria-hidden="true"
    data-test="icon"
  ></i>
</template>

<script lang="ts" setup>
defineProps<{
  /**
   * To display icons this library uses bootstrap icons. The icon keys are bootstrap icon classes starting with bi-*.
   * See the following page for available icons {@link https://icons.getbootstrap.com/#icons}.
   */
  iconKey: string
}>()
</script>
<style scoped>
@import "bootstrap-icons/font/bootstrap-icons.css";
</style>
