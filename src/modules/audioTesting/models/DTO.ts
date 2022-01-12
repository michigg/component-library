export interface DTO {
  readonly version: string
  readonly jsonKey: string,

  toJSON (): any
}
