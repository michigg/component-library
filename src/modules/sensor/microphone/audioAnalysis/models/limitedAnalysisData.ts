// @ts-ignore
import Meyda, { MeydaAnalyzer, MeydaFeaturesObject } from 'meyda'
import { AnalysisData } from './analysisData'
import { AnalysisConfig } from './analysisConfig'
import { reduceArrayToSize } from '../../../../base/array'

/**
 * Used for live analysis
 * the limit defines how many entries shall be saved. Uses FILO pattern.
 */
export class LimitedAnalysisData extends AnalysisData {
  private readonly limitEntries: number = -1

  constructor (
    limitEntries: number,
    analysisConfig: AnalysisConfig = new AnalysisConfig()
  ) {
    super(analysisConfig)
    this.limitEntries = limitEntries
  }

  // public addData (spectrum: Float32Array, db: number, dba: number) {
  public addData (spectrum: Float32Array, dba: number) {
    // Excluded for performance reasons
    // super.addData(spectrum, db, dba)
    this.applyLimit()
  }

  applyLimit () {
    if (this.limitEntries <= 0) {
      return
    }
    reduceArrayToSize(super.amplitudeSpectrums, this.limitEntries)
    reduceArrayToSize(this.timestamps, this.limitEntries)
    // Excluded for performance reasons
    // reduceArrayToSize(this.dbs, this.limitEntries)
  }

  toString () {
    return `${super.toString()}\nEntries Limit: ${this.limitEntries}`
  }
}
