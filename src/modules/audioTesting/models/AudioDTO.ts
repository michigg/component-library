import { DTO } from './DTO'
import { AnalysisData } from '../../sensor/microphone/audioAnalysis/models/analysisData'

export class AudioDTO implements DTO {
  readonly version: string = '1'
  readonly jsonKey: string = 'audio'
  readonly durationSeconds: number
  readonly bufferSize: number
  readonly sampleRate: number
  readonly numberOfInputChannels: number
  readonly windowingFunction: string
  readonly frequencies: Array<number>
  readonly lowestPerceptibleFrequency: number
  readonly highestPerceptibleFrequency: number

  readonly startTimestamp: number
  readonly stopTimestamp: number
  readonly timestamps: Array<number>

  readonly amplitudeSpectrums: Array<Float32Array>
  // readonly dbs: Array<number>
  readonly dbas: Array<number>

  constructor (
    durationSeconds: number,
    sampleRate: number,
    bufferSize: number,
    numberOfInputChannels: number,
    windowingFunction: string,
    lowestPerceptibleFrequency: number,
    highestPerceptibleFrequency: number,
    frequencies: Array<number>,
    startTimestamp: number,
    stopTimestamp: number,
    timestamps: Array<number>,
    amplitudeSpectrums: Array<Float32Array>,
    // dbs: Array<number>,
    dbas: Array<number>
  ) {
    this.durationSeconds = durationSeconds
    this.sampleRate = sampleRate
    this.bufferSize = bufferSize
    this.numberOfInputChannels = numberOfInputChannels
    this.windowingFunction = windowingFunction
    this.lowestPerceptibleFrequency = lowestPerceptibleFrequency
    this.highestPerceptibleFrequency = highestPerceptibleFrequency
    this.frequencies = frequencies

    this.startTimestamp = startTimestamp
    this.stopTimestamp = stopTimestamp
    this.timestamps = timestamps

    this.amplitudeSpectrums = amplitudeSpectrums
    // this.dbs = dbs
    this.dbas = dbas
  }

  static fromAnalysisData (analysisData: AnalysisData): AudioDTO {
    return new AudioDTO(
      analysisData.config.durationSeconds,
      analysisData.config.sampleRate,
      analysisData.config.bufferSize,
      analysisData.config.numberOfInputChannels,
      analysisData.config.windowingFunction,
      analysisData.config.lowestPerceptibleFrequency,
      analysisData.config.highestPerceptibleFrequency,
      analysisData.config.frequencies,
      analysisData.getStartTimestamp(),
      analysisData.getStopTimestamp(),
      analysisData.timestamps,
      analysisData.getAmplitudeSpectrums(),
      // analysisData.getDBs(),
      analysisData.getDBAs()
    )
  }

  toJSON (): any {
    const jsonAmplitudeSpectrums = this.amplitudeSpectrums.map(arr => JSON.stringify(Array.from(arr)))
    return {
      version: this.version,
      durationSeconds: this.durationSeconds,
      sampleRate: this.sampleRate,
      bufferSize: this.bufferSize,
      numberOfInputChannels: this.numberOfInputChannels,
      windowingFunction: this.windowingFunction,
      lowestPerceptibleFrequency: this.lowestPerceptibleFrequency,
      highestPerceptibleFrequency: this.highestPerceptibleFrequency,
      frequencies: this.frequencies,
      startTimestamp: this.startTimestamp,
      stopTimestamp: this.stopTimestamp,
      timestamps: this.timestamps,
      amplitudeSpectrums: jsonAmplitudeSpectrums,
      // dbs: this.dbs,
      dbas: this.dbas
    }
  }
}
