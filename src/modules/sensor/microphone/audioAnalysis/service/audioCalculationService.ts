const LOWEST_AUDIBLE_FREQUENCY = 20
const HIGHEST_AUDIBLE_FREQUENCY = 20000 // 70000
const AUDITORY_THRESHOLD = 0.00002 // Auditory Threshold 0.00002 Pa
const PAIN_THRESHOLD = 200 // Pain Threshold 200 Pa

export class AudioCalculationService {
  private readonly lowestAudibleBin: number
  private readonly highestAudibleBin: number
  private readonly aWeights: Array<number>

  constructor (
    sampleRate: number,
    bufferSize: number,
    lowestaudiblefrequency = LOWEST_AUDIBLE_FREQUENCY,
    highestAudibleFrequency = HIGHEST_AUDIBLE_FREQUENCY
  ) {
    this.lowestAudibleBin = AudioCalculationService.getLowestAudibleBin(sampleRate, bufferSize, lowestaudiblefrequency)
    this.highestAudibleBin = AudioCalculationService.getHighestAudibleBin(sampleRate, bufferSize, highestAudibleFrequency)
    const frequencies = AudioCalculationService.calcFrequencies(sampleRate, bufferSize)
    const weightings = AudioCalculationService.calcAWeightings(frequencies)
    this.aWeights = <Array<number>> this.getAudibleBins(weightings)
    console.log('BINS', this.lowestAudibleBin, this.highestAudibleBin)
  }

  static getLowestAudibleBin (sampleRate: number, bufferSize: number, lowestAudibleFrequency = LOWEST_AUDIBLE_FREQUENCY): number {
    const calculatedLowestAudibleBin = lowestAudibleFrequency / AudioCalculationService.getFrequencyResolution(sampleRate, bufferSize)
    const lowestAudibleBin = Math.floor(calculatedLowestAudibleBin)
    if (lowestAudibleBin !== calculatedLowestAudibleBin) {
      return lowestAudibleBin + 1
    }
    return lowestAudibleBin
  }

  static getHighestAudibleBin (sampleRate: number, bufferSize: number, highestAudibleFrequency = HIGHEST_AUDIBLE_FREQUENCY): number {
    return Math.trunc(highestAudibleFrequency / AudioCalculationService.getFrequencyResolution(sampleRate, bufferSize))
  }

  private getAudibleBins (input: Array<number> | Float32Array): Array<number> | Float32Array {
    return input.slice(this.lowestAudibleBin, this.highestAudibleBin + 1)
  }

  static calcAWeighting (frequency: number): number {
    // 12194^2 * f^4
    const numerator = (12200 ** 2) * (frequency ** 4)
    // (f^2 + 20.6^2) * sqrt((f^2 * 107.7^2) (f^2 * 737.9^2) (f^2 * 12194^2))
    const denominator =
      ((frequency ** 2) + (20.6 ** 2)) *
      ((frequency ** 2) + (12200 ** 2)) *
      Math.sqrt((frequency ** 2) + (107.7 ** 2)) *
      Math.sqrt((frequency ** 2) + (737.9 ** 2))
    const a = (numerator / denominator)
    const aWeight = 20 * Math.log10(a) + 2
    return +(aWeight).toFixed(4)
  }

  static calcAWeightings (frequencies: Array<number>): Array<number> {
    const weights = []
    for (const frequency of frequencies) {
      weights.push(AudioCalculationService.calcAWeighting(frequency))
    }
    return weights
  }

  static getFrequencyResolution (sampleRate: number, bufferSize: number): number {
    return +(sampleRate / bufferSize).toFixed(4)
  }

  static calcFrequency (binIndex: number, sampleRate: number, bufferSize: number): number {
    return +(binIndex * AudioCalculationService.getFrequencyResolution(sampleRate, bufferSize)).toFixed(4)
  }

  static calcFrequencies (sampleRate: number, bufferSize: number): Array<number> {
    const frequencies = []
    for (let i = 0; i < bufferSize / 2; i++) {
      frequencies.push(AudioCalculationService.calcFrequency(i, sampleRate, bufferSize))
    }
    return frequencies
  }

  static toDB (magnitude: number): number {
    const poweredRef = AUDITORY_THRESHOLD ** 2
    const poweredMagnitude = magnitude ** 2
    const db = 10.0 * Math.log10(poweredMagnitude / poweredRef)
    return db
  }

  static toDBAWithFrequency (magnitude: number, frequency: number): number {
    return AudioCalculationService.calcDBAWithWeighting(magnitude, AudioCalculationService.calcAWeighting(frequency))
  }

  static calcDBAWithWeighting (magnitude: number, aWeighting: number): number {
    const db = AudioCalculationService.toDB(magnitude)
    const dba = db + aWeighting
    // return dba < 0 ? 0 : +(dba.toFixed(2))
    return +dba.toFixed(2)
  }

  static getSpectrumDBs (spectrum: Float32Array | Array<number>): Array<number> {
    const dbs = []
    for (let i = 0; i < spectrum.length; i++) {
      dbs.push(AudioCalculationService.toDB(spectrum[i]))
    }
    return dbs
  }

  static spectrumToDB (spectrum: Float32Array): number {
    return AudioCalculationService.calcRMS(AudioCalculationService.getSpectrumDBs(spectrum))
  }

  static calcRMS (input: Array<number>): number {
    const sum = input.reduce((pv, cv) => pv + cv ** 2, 0)
    return Math.sqrt(sum / input.length)
  }

  static getSpectrumDBAs (spectrum: Float32Array, frequencies: Array<number>): Array<number> {
    const dbas = []
    for (let i = 0; i < spectrum.length; i++) {
      dbas.push(AudioCalculationService.toDBAWithFrequency(spectrum[i], frequencies[i]))
    }
    return dbas
  }

  static getDBA (spectrum: Float32Array, frequencies: Array<number>): number {
    const dbas = AudioCalculationService.getSpectrumDBAs(spectrum, frequencies)
    return AudioCalculationService.calcRMS(dbas)
  }

  static getMaxDBA (spectrum: Float32Array, frequencies: Array<number>): number {
    const dbas = AudioCalculationService.getSpectrumDBAs(spectrum, frequencies)
    return Math.max(...dbas)
  }

  getDBA (spectrum: Float32Array) {
    const dbas = this.getSpectrumDBAs(spectrum)
    return +(AudioCalculationService.calcRMS(dbas).toFixed(2))
  }

  private getSpectrumDBAs (spectrum: Float32Array): Array<number> {
    const audibleSpectrum = this.getAudibleBins(spectrum)
    const dbas = []
    for (let i = 0; i < audibleSpectrum.length; i++) {
      dbas.push(AudioCalculationService.calcDBAWithWeighting(audibleSpectrum[i], this.aWeights[i]))
    }
    return dbas
  }

  getDB (spectrum: Float32Array | Array<number>) {
    const audibleSpectrum = this.getAudibleBins(spectrum)
    const dba = AudioCalculationService.getSpectrumDBs(audibleSpectrum)
    return +(AudioCalculationService.calcRMS(dba).toFixed(2))
  }
}
