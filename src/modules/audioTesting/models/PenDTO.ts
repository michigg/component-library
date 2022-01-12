import { DTO } from './DTO'

export class PenDTO implements DTO {
  readonly version: string = '1'
  readonly jsonKey: string = 'pen'
  readonly penId: number
  readonly penBrand: string
  static readonly penBrands: Array<string> = [
    'UNKOWN_COLORED',
    'DATEV_GREEN'
  ]

  constructor (penId: number, penBrand: string) {
    this.penId = penId
    this.penBrand = penBrand
  }

  static fromJSON (json: { penId?: number, penBrand?: string }): PenDTO | undefined {
    if (!json || !json.penId || !json.penBrand) {
      return undefined
    }
    return new PenDTO(
      json.penId,
      json.penBrand
    )
  }

  toJSON (): any {
    return {
      version: this.version,
      penId: this.penId,
      penBrand: this.penBrand,
      penBrands: PenDTO.penBrands
    }
  }
}
