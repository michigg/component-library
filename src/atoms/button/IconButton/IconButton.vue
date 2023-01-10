<template>
  <BaseButton 
    :active="active"
    :busy="busy"
    :disabled="disabled"
    v-bind="$attrs" 
    class="icon-button"
  >
    <slot name="icon" v-if="!busy"/>
    <div class="busy-icon" v-else>
      <BaseIcon icon-key="bi-arrow-repeat"/>
    </div>
    <slot />
  </BaseButton>
</template>
<script lang="ts" setup>
import { BaseIcon } from "@/atoms";
import BaseButton from "../BaseButton/BaseButton.vue"

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
.icon-button {
  display: flex;
  gap: var(--space-sm)
}
.icon-button.busy {
  background-position-x: 150%;
  animation: unset;
}
</style>
