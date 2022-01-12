import { onMounted, ref } from 'vue'
import { MicSensor } from '../models/micSensor'

export function useAudioSelect (mic: MicSensor) {
  let availableDevices = ref<Array<MediaDeviceInfo>>([])
  let audioDevice = ref<MediaDeviceInfo | undefined>(undefined)

  onMounted(async () => {
    await mic.getPermission()
    availableDevices.value = await mic.availableDevices()
    if (availableDevices.value.length > 0) {
      audioDevice.value = availableDevices.value[0]
    }
    console.log('MOUNTED FINISHED')
  })
  return {
    availableDevices,
    audioDevice
  }
}
