import { AnalysisData } from '../../../sensor/microphone/audioAnalysis/models/analysisData'
import { ICalibrationMethod, IInstruction } from '../../ICalibrationMethod'
import { AnalysisConfig } from '../../../sensor/microphone/audioAnalysis/models/analysisConfig'
import { Sensor } from '../../../sensor/Sensor'
import { MicSensor } from '../../../sensor/microphone/Sensor'
import { MicAnalyzer } from '../../../sensor/microphone/audioAnalysis/service/MicAnalyzer'
import { CalibrationError } from '../../exceptions'
import View from './CalibrationMethodFish.vue'
import { markRaw } from 'vue'

export class CalibrationMethodFish implements ICalibrationMethod {
  readonly title: string = 'Fischkalibrierung'
  readonly component: any = markRaw(View)
  static readonly analysisConfig = new AnalysisConfig(
    2,
    44100,
    8192
  )

  getInstructions (): Array<IInstruction> {
    return FrogCalibrationConfig.instructions
  }

  async analyse (sensor: Sensor): Promise<AnalysisData> {
    const micSensor = sensor as MicSensor
    const analyzer = new MicAnalyzer(micSensor)
    const analysisData = await analyzer.analyze(FrogCalibrationConfig.analysis.durationInSeconds)
    return Promise.resolve(analysisData)
  }

  async calculateCalibration (analysisData: AnalysisData): Promise<any> {
    const maxMeasuredDBA = Math.max(...analysisData.getDBAs())
    const maxReferenceDBA = 60

    return Promise.resolve(maxReferenceDBA - maxMeasuredDBA)
  }

  async checkPostConditions (sensor: Sensor): Promise<void> {
    return Promise.resolve()
  }

  async checkPreConditions (sensor: Sensor): Promise<void> {
    const micSensor = sensor as MicSensor
    const analyzer = new MicAnalyzer(micSensor)
    const analysisData = await analyzer.analyze(FrogCalibrationConfig.preConditions.durationInSeconds)
    const maxMeasuredDBA = Math.max(...analysisData.getDBAs().slice(2))
    const isBelowMaximalBackgroundNoise = maxMeasuredDBA < FrogCalibrationConfig.preConditions.maximalBackgroundNoise
    console.log('IS BELOW MAXiMAL BACkGROUND NOISE', ...analysisData.getDBAs())
    console.log('IS BELOW MAXiMAL BACkGROUND NOISE', isBelowMaximalBackgroundNoise, FrogCalibrationConfig.preConditions.maximalBackgroundNoise, maxMeasuredDBA)
    if (!isBelowMaximalBackgroundNoise) {
      throw new CalibrationError('Hintergrundrauschen ist zu hoch!')
    }
  }
}

const FrogCalibrationConfig = {
  preConditions: {
    durationInSeconds: 2,
    maximalBackgroundNoise: 30
  },
  analysis: {
    durationInSeconds: 3
  },
  postConditions: {},
  instructions: [
    {
      image: 'https://via.placeholder.com/600x300/000000/FFFFFF/?text=InstructionStep',
      description: 'Bitte halten Sie Ihren Frosch genauso wie auf dem Bild zu sehen in Ihrer Hand.'
    },
    {
      image: 'https://via.placeholder.com/600x300/000000/FFFFFF/?text=InstructionStep',
      description: 'Wenn Sie bereit sind drücken Sie auf den Button mit der Aufschrift kalibrieren. Das Smartphone prüft dann, ob Ihre Umgebung passend ist, um eine Kallibrierung durchzuführen. Ist das der Fall erscheint ein Countdown. Während dieser Phase betätigen Sie den Frosch mehrmals direkt vor dem Smartphone Microfon.'
    },
    {
      image: 'https://via.placeholder.com/600x300/000000/FFFFFF/?text=InstructionStep',
      description: 'Wenn der Button Grün leuchtet haben Sie die Kalibrierung erfolgreich abgeschlossen. Falls nicht, können Sie es ein weiteres Mal probieren und beachten Sie die Anweisungen auf dem Bildschirm.'
    }
  ]
}
