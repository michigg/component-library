import { SensorKey } from './sensorKeys'

export interface Sensor {
  readonly key: SensorKey
  isAvailable: boolean
  isActive: boolean
  isCalibrated: boolean

  checkAvailability (): Promise<void>

  clone (): Sensor
}
