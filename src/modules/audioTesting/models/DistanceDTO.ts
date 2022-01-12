import { DTO } from './DTO'

export class DistanceDTO implements DTO {
  readonly version: string = '1'
  readonly jsonKey: string = 'distance'
  readonly distanceKey: string
  static readonly distanceKeys: Array<string> = [
    '50cm',
    '0m',
    'CREDIT_H',
    'CREDIT_V',
    'A4_H',
    'A4_V',
    'SMALL_PERSON_SHOULDER_MAX',
    'MEDIUM_PERSON_SHOULDER_MAX',
    'SMALL_PERSON_ARM_MAX',
    'MEDIUM_PERSON_ARM_MAX'
  ]

  constructor (distanceKey: string) {
    this.distanceKey = distanceKey
  }

  static fromJSON (json: { distanceKey?: string }): DistanceDTO | undefined {
    if (!json || !json.distanceKey) {
      return undefined
    }
    return new DistanceDTO(
      json.distanceKey
    )
  }

  toJSON (): any {
    return {
      version: this.version,
      distanceKey: this.distanceKey,
      distanceKeys: DistanceDTO.distanceKeys
    }
  }
}
