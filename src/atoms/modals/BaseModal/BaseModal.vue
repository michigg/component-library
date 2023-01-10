<template>
  <button @click="showModal">
    <slot name="open-modal">{{ openModalButtonLabel }}</slot>
  </button>
  <dialog
      ref="modal"
      class="modal"
      @click="backdropCloseModal"
  >
    <div class="modal-content" :class="$attrs.class">
      <slot/>
    </div>
  </dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { DomEvent } from '@vue/test-utils/dist/constants/dom-events'

defineProps<{
  openModalButtonLabel: string
}>()

const modal = ref<InstanceType<typeof HTMLDialogElement>>()
const backdropCloseModal = (event: DomEvent) => {
  if (event.target?.nodeName !== 'DIALOG') {
    return
  }
  if (modal.value == null) {
    return
  }
  closeModal()
}

const showModal = () => {
  modal.value?.showModal()
}
const closeModal = () => {
  modal.value?.close()
}
defineExpose({ closeModal })
</script>

<style scoped>
.modal {
  max-width: 60ch;
  background-color: var(--modal-bg-color-surface, var(--color-surface-1));
  border: none;
  border-radius: var(--radius-sm);
  padding: 0;
}

.modal .modal-content {
  padding: var(--space-sm);
}

.modal::backdrop {
  background-color: var(--modal-backdrop-bg-color, rgb(0 0 0 / .3));
  backdrop-filter: var(--modal-backdrop-filter, blur(10px));
}
</style>
