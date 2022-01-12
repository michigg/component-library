import { Sensor } from '../sensor/Sensor'
import { AnalysisData } from '../sensor/microphone/audioAnalysis/models/analysisData'
import { DefineComponent } from 'vue'

export interface IInstruction {
    image: string,
    description: string
}

export interface ICalibrationMethod {
    readonly title: string
    readonly component: DefineComponent<any>

    getInstructions(): Array<IInstruction>

    checkPreConditions(sensor: Sensor): Promise<void> | never

    analyse(sensor: Sensor): Promise<AnalysisData> | never

    checkPostConditions(sensor: Sensor): Promise<void> | never

    calculateCalibration(analysisData: AnalysisData): Promise<any> | never
}
