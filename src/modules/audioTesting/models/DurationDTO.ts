import { DTO } from './DTO'

export class DurationDTO implements DTO {
  readonly version: string = '1'
  static KEY = 'duration'
  readonly jsonKey: string = DurationDTO.KEY
  readonly durationInSeconds: number

  constructor (duration: number) {
    this.durationInSeconds = duration
  }

  static fromJSON (json: { durationInSeconds?: number }): DurationDTO | undefined {
    if (!json || !json.durationInSeconds) {
      return undefined
    }
    return new DurationDTO(
      json.durationInSeconds
    )
  }

  toJSON (): any {
    return {
      version: this.version,
      durationInSeconds: this.durationInSeconds
    }
  }
}
