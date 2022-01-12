<script setup lang="ts">
import { ref, watch } from 'vue'
import { MicSensor } from '../models/micSensor'
import { useAudioSelect } from '../composables/useAudioSelect'
import { io } from 'socket.io-client'
import { useSocketUserCount } from '../composables/useSocketUserCount'
import { useSocketConnectionState } from '../composables/useSocketConnectionState'
import { useRecord } from '../composables/useRecord'
import State from './State.vue'

const mic = new MicSensor()
const deviceName = ref<string>('Default')
const socket = io('http://localhost:5000')

const {
  availableDevices,
  audioDevice
} = useAudioSelect(mic)

const { userCount } = useSocketUserCount(socket)
const {
  isConnected,
  socketId
} = useSocketConnectionState(socket)
const {
  isRecording,
  duration,
  blob,
  localRecord,
  startRecord,
  getObjectURLFromBlob,
} = useRecord(socket, mic, deviceName, audioDevice)

const result = ref<string>('')
watch(blob, (newValue) => {
  result.value = getObjectURLFromBlob(newValue)
})

</script>

<template>
  <h1>Audio</h1>
  {{ blob.size }}
  <State :input-device="audioDevice" :is-recording="isRecording" :user-count="userCount"/>
  <div class="config">
    <h2>Configuration</h2>
    <div class="input-group">
      <label for="input-device-name">Device Name:</label>
      <input id="input-device-name" v-model="deviceName" type="text">
    </div>
    <div class="input-group">
      <label for="input-duration">Duration (in ms):</label>
      <input id="input-duration" v-model="duration" type="number" step="1000">
    </div>
    <div class="input-group">
      <label for="input-device-select">Input Device:</label>
      <select id="input-device-select" v-model="audioDevice">
        <option v-for="device in availableDevices" :key="device.deviceId" :value="device">{{ device.label }}</option>
      </select>
    </div>
  </div>
  <div class="actions">
    <h2>Actions</h2>
    <button @click="localRecord(audioDevice.deviceId, duration)">Start Recording {{ duration / 1000 }}s Locally</button>
    <button @click="startRecord()">Start Recording {{ duration / 1000 }}s On All Devices</button>
  </div>
  <div class="results">
    <h2>Results</h2>
    <audio controls v-if="result" :src="result"></audio>
    <div v-else>No Results available</div>
  </div>
</template>

<style scoped>
.config, .results, .actions {
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem 2rem;
  background-color: hsl(40, 100%, 50%);
}

.config .input-group {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.config .input-group input, .config .input-group select {
  height: 35px;
  flex: 1 0 100px;
  max-width: 250px;
}

.config {
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem 2rem;
  background-color: hsl(40, 100%, 50%);
}

.actions {
  background-color: hsl(180, 100%, 40%);
}

.results {
  background-color: hsl(150, 100%, 40%);
}
</style>
