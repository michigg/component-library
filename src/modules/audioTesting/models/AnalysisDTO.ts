import { DTO } from './DTO'

export class AnalysisDTO {
  private readonly version = '1'
  readonly dtos: Array<DTO>

  constructor (dtos: Array<DTO> = []) {
    this.dtos = dtos
  }

  toJSON (): any {
    const json: { [index: string]: any } = {}
    for (const dto of this.dtos) {
      json[dto.jsonKey] = dto.toJSON()
    }
    json.version = this.version
    return json
  }
}
