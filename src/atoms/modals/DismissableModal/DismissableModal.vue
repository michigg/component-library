<template>
  <BaseModal
      class="dismissible-modal"
      :open-modal-button-label="openModalButtonLabel"
      ref="baseModal"
  >
    <template #open-modal>
      <slot name="open-modal"/>
    </template>
    <template #default>
      <button
          class="dismiss-button"
          @click="closeModal"
      >
        <BaseIcon icon-key="bi-x"/>
      </button>
      <slot/>
    </template>
  </BaseModal>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import BaseModal from '@/atoms/modals/BaseModal/BaseModal.vue'
import BaseIcon from '@/atoms/BaseIcon/BaseIcon.vue'

defineProps<{
  openModalButtonLabel: string
}>()

const baseModal = ref<InstanceType<typeof BaseModal>>()

const closeModal = () => {
  baseModal.value?.closeModal()
}
</script>

<style scoped>
:deep(.dismissible-modal) {
  color: red !important;
  background-color: black;
}

:deep(.modal-content) {
  color: red !important;
  background-color: black;
}

.dismiss-button {
  border: none;
  border-radius: 100%;
  background-color: var(--color-surface-2);
  font-size: 1.4rem;
  width: 32px;
  height: 32px;
  cursor: pointer;
}
</style>
