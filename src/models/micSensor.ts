// https://developer.mozilla.org/en-US/docs/Web/API/MediaStream_Recording_API/Using_the_MediaStream_Recording_API

import { MediaDeviceType } from './mediaDeviceType'

export class MicSensor {
  private readonly CONTEXT: AudioContext
  private stream: MediaStream
  // @ts-ignore
  private recorder: MediaRecorder | undefined = undefined
  private source: MediaStreamAudioSourceNode | undefined = undefined
  private chunks: Array<Blob> = []
  public blob: Blob | undefined = undefined
  public audioURL: string = ''

  constructor () {
    this.CONTEXT = new AudioContext()
  }

  async isAvailable (): Promise<boolean> {
    const audioInputDevices: Array<MediaDeviceInfo> = await this.availableDevices()
    return Promise.resolve(audioInputDevices.length > 0)
  }

  async availableDevices (): Promise<Array<MediaDeviceInfo>> {
    if (!('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices)) {
      return Promise.resolve([])
    }
    const mediaDevices: Array<MediaDeviceInfo> = await navigator.mediaDevices.enumerateDevices()
    const audioInputDevices: Array<MediaDeviceInfo> = mediaDevices.filter((device: MediaDeviceInfo) => device.kind === MediaDeviceType.AUDIO)
    return Promise.resolve(audioInputDevices)
  }

  async getPermission (): Promise<boolean> {
    await navigator.mediaDevices.getUserMedia({ audio: true })
    // return await navigator.permissions.query({ name: 'microphone' })
    return Promise.resolve(true)
  }

  async activateInputDevice (deviceId: string): Promise<void> {
    if (this.stream) {
      await this.deactivateInputDevices()
    }
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({ audio: { deviceId } })
      this.source = this.CONTEXT.createMediaStreamSource(this.stream)
    } catch (e) {
      throw Error(`Cannot get Media device ${e}`)
    }
  }

  async deactivateInputDevices (): Promise<void> {
    this.stream.getAudioTracks().forEach(track => track.stop())
  }

  activateOutputDevice () {
    if (!this.source) {
      return
    }
    this.source.connect(this.CONTEXT.destination)
  }

  deactivateOutputDevice () {
    if (!this.source) {
      return
    }
    this.source.disconnect(this.CONTEXT.destination)
  }

  startRecording (): void {
    if (!this.source) {
      return
    }
    this.chunks = []
    // @ts-ignore
    this.recorder = new MediaRecorder(this.source.mediaStream, {
      audioBitsPerSecond : 128000,
      mimeType: 'audio/'
    })
    if (!this.recorder) {
      return
    }
    this.recorder.ondataavailable = (e: any) => {
      this.chunks.push(e.data)
    }
    this.recorder.start()
    console.log('RECORDER', this.recorder.mimeType, this.recorder.state, this.recorder.stream, this.recorder.audioBitsPerSecond)
  }

  async stopRecording (): Promise<Blob> {
    if (!this.source || !this.recorder) {
      return Promise.resolve(new Blob())
    }
    const onStop = new Promise((resolve) => {
      this.recorder.onstop = (e: any) => {
        resolve(e)
      }
    })
    this.recorder.stop()
    const e = await onStop
    this.chunks.push(e.data)
    const blob = new Blob(this.chunks, { 'type': 'audio/ogg; codecs=opus' })
    return Promise.resolve(blob)
  }

  async record (deviceId: string, duration: number): Promise<Blob> {
    await this.activateInputDevice(deviceId)
    await this.startRecording()
    const onRecStop = new Promise((resolve) => {
      setTimeout(async () => {
        const blob = await this.stopRecording()
        resolve(blob)
      }, duration)
    })
    return await onRecStop
  }
}
