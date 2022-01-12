<script setup lang="ts">

// eslint-disable-next-line no-undef
const props = defineProps({
  inputDevice: MediaDeviceInfo,
  isRecording: Boolean,
  isReady: Boolean,
  userCount: Number
})
</script>

<template>
  <ul class="list">
    <li class="list-element">
      <span>Nutzer</span>
      <span>{{ userCount }}</span>
    </li>
    <li class="list-element">
      <span>Status</span>
      <span v-if="isReady">Ready</span>
      <span v-else-if="isRecording">Recording...</span>
      <span v-else class="danger">Not Ready</span>
    </li>
  </ul>
</template>

<style scoped>
.info {
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem 2rem;
  background-color: hsl(40, 100%, 50%);
}

.info {
  background-color: hsl(180, 100%, 40%);
}

.list {
  width: 100%;
  list-style: none;
  padding: 0;
}

.list-element {
  display: flex;
  justify-content: space-between;
}
</style>
