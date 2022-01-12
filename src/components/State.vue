<script setup lang="ts">
const props = defineProps({
  inputDevice: MediaDeviceInfo,
  isRecording: Boolean,
  userCount: Number
})
</script>

<template>
  <div class="info">
    <ul class="list">
      <li class="list-element">
        <span>Nutzer</span>
        <span>{{ props.userCount }}</span>
      </li>
      <li class="list-element">
        <span>Status</span>
        <span v-if="props.inputDevice && !props.isRecording">Ready</span>
        <span v-else-if="props.isRecording">Recording...</span>
        <span v-else>Not Ready</span>
      </li>
    </ul>
  </div>
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
