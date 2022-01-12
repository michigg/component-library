import { DTO } from './DTO'

export class LocalDTO implements DTO {
  readonly version: string = '1'
  readonly jsonKey: string = 'local'
  readonly deviceName: string
  readonly inputDeviceInfo: MediaDeviceInfo

  constructor (
    deviceName: string,
    inputDeviceInfo: MediaDeviceInfo
  ) {
    this.deviceName = deviceName
    this.inputDeviceInfo = inputDeviceInfo
  }

  toJSON (): any {
    return {
      version: this.version,
      deviceName: this.deviceName,
      inputDeviceInfo: this.inputDeviceInfo
    }
  }
}
