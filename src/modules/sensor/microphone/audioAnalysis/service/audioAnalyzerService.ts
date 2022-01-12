// @ts-ignore
import Meyda, { MeydaAnalyzer, MeydaFeaturesObject } from 'meyda'
import { AnalysisData } from '../models/analysisData'
import { AudioCalculationService } from './audioCalculationService'
import { AnalysisConfig } from '../models/analysisConfig'

export class StatefulAudioDBAnalyzer {
  private analyzer: MeydaAnalyzer | undefined = undefined
  private readonly analyzerConfig: AnalysisConfig
  private readonly audioContext: AudioContext
  private readonly sourceNode: MediaStreamAudioSourceNode
  private readonly audioCalculationService: AudioCalculationService
  private store: AnalysisData = new AnalysisData()

  constructor (audioContext: AudioContext, sourceNode: MediaStreamAudioSourceNode, analyzerConfig: AnalysisConfig) {
    this.audioContext = audioContext
    this.sourceNode = sourceNode
    this.analyzerConfig = analyzerConfig
    this.audioCalculationService = new AudioCalculationService(
      analyzerConfig.sampleRate,
      analyzerConfig.bufferSize,
      analyzerConfig.lowestPerceptibleFrequency,
      analyzerConfig.highestPerceptibleFrequency
    )
  }

  private startAnalyzer () {
    console.info('[AudioDBAnalyzer]: Try to start analyzer')
    if (typeof Meyda === 'undefined') {
      console.error('[AudioDBAnalyzer]: Meyda could not be found! Have you included it?')
      return
    }
    try {
      // INIT store
      this.store = new AnalysisData(this.analyzerConfig)

      // START Analyze
      this.analyzer = Meyda.createMeydaAnalyzer({
        audioContext: this.audioContext,
        source: this.sourceNode,
        sampleRate: this.analyzerConfig.sampleRate,
        bufferSize: this.analyzerConfig.bufferSize,
        featureExtractors: ['amplitudeSpectrum'],
        callback: (features: MeydaFeaturesObject) => {
          const db = this.audioCalculationService.getDB(features.amplitudeSpectrum)
          const dba = this.audioCalculationService.getDBA(features.amplitudeSpectrum)
          // Excluded for performance reasons
          // this.store.addData(features.amplitudeSpectrum, db, dba)
        }
      })
      this.analyzer.start()
      console.info('[AudioDBAnalyzer]: Analyzer started')
    } catch (e) {
      console.error('[AudioDBAnalyzer]: Analyzer start failed', e)
    }
  }

  private stopAnalyzer () {
    console.info('[AudioDBAnalyzer]: Try to stop analyzer')
    if (!this.analyzer) {
      console.warn('[AudioDBAnalyzer]: No analyzer to stop found')
      return
    }
    try {
      this.analyzer.stop()
      console.info('[AudioDBAnalyzer]: ANALYZER STOP')
    } catch (e) {
      console.error('[AudioDBAnalyzer]: Analyzer stop failed', e)
    }
  }

  async analyze (durationSecondsOverride = 0): Promise<AnalysisData> {
    await this.startAnalyzer()
    const duration = durationSecondsOverride || this.analyzerConfig.durationSeconds
    const onAnalyzeStop = new Promise<void>((resolve) => {
      setTimeout(async () => {
        await this.stopAnalyzer()
        resolve()
      }, duration * 1000)
    })
    await onAnalyzeStop
    return this.store
  }
}
