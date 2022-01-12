import { ref } from 'vue'
import { Ref } from '@vue/reactivity'
import { MicSensor } from '../models/micSensor'

export function useRecord (socket: any, mic: MicSensor, deviceName: Ref<string>, inputDevice: Ref<MediaDeviceInfo>): { isRecording: Ref<boolean>, duration: Ref<number>, blob: Ref<Blob | undefined>, localRecord: Function, startRecord: Function, getObjectURLFromBlob: Function } {
  const isRecording = ref<boolean>(false)
  const duration = ref<number>(1000)
  const blob = ref<Blob>(new Blob())

  const localRecord = async (deviceId: string, duration: number) => {
    console.info('RECORD: Start Local Recording: DeviceID,Duration: ', deviceId, duration)
    isRecording.value = true
    try {
      blob.value = await mic.record(deviceId, duration)
      console.info('RECORD: Finished Local Recording: DeviceID,Duration: ', deviceId, duration)
      return blob.value
    } catch (e) {
      console.log(e)
    } finally {
      isRecording.value = false
    }
  }

  socket.on('start_record', async (data: { duration: number }) => {
    console.info('RECORD: Start Remote Recording: Duration: ', data.duration)
    await localRecord(inputDevice.value.deviceId, data.duration)
    const result = {
      deviceName: deviceName.value,
      blob: blob.value
    }
    socket.emit('finished_record', result)
  })

  const startRecord = () => {
    console.info('RECORD: Send Start Broadcast: Duration: ', duration.value)
    socket.emit('start_record', { duration: duration.value })
  }

  const getObjectURLFromBlob = (blob: Blob) => {
    return window.URL.createObjectURL(blob)
  }

  return {
    isRecording,
    duration,
    blob,
    localRecord,
    startRecord,
    getObjectURLFromBlob,
  }
}
