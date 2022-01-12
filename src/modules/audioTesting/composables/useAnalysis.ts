import { ref } from 'vue'
import { Ref } from '@vue/reactivity'
import { MicSensor } from '../../sensor/microphone/Sensor'
import { MicAnalyzer } from '../../sensor/microphone/audioAnalysis/service/MicAnalyzer'
import { AnalysisDTO } from '../models/AnalysisDTO'
import { AudioDTO } from '../models/AudioDTO'
import { Socket } from 'socket.io-client'
import { DTO } from '../models/DTO'
import { BaseDTO } from '../models/BaseDTO'
import { DistanceDTO } from '../models/DistanceDTO'
import { FrogDTO } from '../models/FrogDTO'
import { Results } from '../models/Results'
import { DurationDTO } from '../models/DurationDTO'
import { WhiteNoisePresetsDTO } from '../models/WhiteNoisePresetsDTO'
import { LocalDTO } from '../models/LocalDTO'
import { PenDTO } from '../models/PenDTO'
import { ClickDTO } from '../models/ClickDTO'

export function useAnalysis (socket: Socket): {
  isMaster: Ref<boolean>,
  shallMasterRecorded: Ref<boolean>,
  isAnalysing: Ref<boolean>,
  results: Ref<Results>,
  startLocalAnalyse: any,
  startRemoteAnalyse: any,
  submit: any,
  micSensor: Ref<MicSensor>,
  deviceName: Ref<string>,
  inputDeviceInfo: Ref<{ label: string, value: MediaDeviceInfo } | undefined>
} {
  const isMaster = ref<boolean>(false)
  const shallMasterRecorded = ref<boolean>(false)
  const isAnalysing = ref<boolean>(false)
  const micSensor = ref<MicSensor>(new MicSensor())
  const micAnalyzer = new MicAnalyzer(micSensor.value)

  const deviceName = ref<string>('')
  const inputDeviceInfo = ref<{ label: string, value: MediaDeviceInfo } | undefined>(undefined)

  const results = ref<Results>(new Results('', [], []))

  const startLocalAnalyse = async (durationInSeconds: number, dtos: Array<DTO>): Promise<AnalysisDTO> => {
    isAnalysing.value = true
    if (!inputDeviceInfo.value) {
      console.error('[SOCKET]: [startLocalAnalyse]: Missing input device. Abort!')
      throw Error('[SOCKET]: [startLocalAnalyse]: Missing input device. Abort!')
    }
    const localData = new LocalDTO(
      deviceName.value,
      inputDeviceInfo.value.value
    )
    const analysisData = await micAnalyzer.analyze(durationInSeconds, inputDeviceInfo.value.value)
    isAnalysing.value = false
    const audioDTO = AudioDTO.fromAnalysisData(analysisData)
    const mainDTO = new AnalysisDTO([audioDTO, localData, ...dtos])
    console.log('AUDIO DTO', mainDTO)
    return mainDTO
  }

  socket.on('start_measurement', async (
    data: { [key: string]: any }) => {
    const durationDTO = DurationDTO.fromJSON(data[DurationDTO.KEY])
    if (!durationDTO) {
      console.error(`[SOCKET]: [start_measurement]: Cannot start analysis. Duration is missing. ${data}`)
      return
    }
    const newDTOs = [
      BaseDTO.fromJSON(data.base) as DTO,
      DistanceDTO.fromJSON(data.distance) as DTO,
      FrogDTO.fromJSON(data.frog) as DTO,
      WhiteNoisePresetsDTO.fromJSON(data.noisePreset) as DTO,
      ClickDTO.fromJSON(data.clickCount) as DTO,
      PenDTO.fromJSON(data.pen) as DTO
    ]
    const dtos = newDTOs.filter(dto => !!dto)
    console.info(`[SOCKET]: [start_measurement]: Record requested: ${dtos.toString()}`)
    if (isMaster.value && !shallMasterRecorded.value) {
      console.info('[SOCKET]: [start_measurement]: Master will not be recorded.')
      return
    }
    const analysisDTO = await startLocalAnalyse(durationDTO.durationInSeconds, dtos)
    console.info('[SOCKET]: [start_measurement]: Try send record! ', analysisDTO.toJSON())
    socket.emit('finished_analysis', analysisDTO.toJSON())
  })

  socket.on('update_directory', async ({
    analysisTitle,
    fileNames: newFileNames,
    filePaths: newFilePaths
  }: {
    analysisTitle: string
    fileNames: Array<string>
    filePaths: Array<string>
  }) => {
    console.debug('[SOCKET]: [update_directory]: ', analysisTitle, newFileNames, newFilePaths)
    results.value = new Results(analysisTitle, newFileNames, newFilePaths)
  })

  const startRemoteAnalyse = (config: Array<DTO>) => {
    const data = new AnalysisDTO(config).toJSON()
    console.info('[SOCKET]: [startRecord]: Send Start Broadcast: ', data)
    socket.emit('start_analysis', data)
  }

  const submit = (form: any) => {
    const newDTOs = [
      BaseDTO.fromJSON(form) as DTO,
      DistanceDTO.fromJSON(form) as DTO,
      FrogDTO.fromJSON(form) as DTO,
      DurationDTO.fromJSON(form) as DTO,
      WhiteNoisePresetsDTO.fromJSON(form) as DTO,
      ClickDTO.fromJSON(form) as DTO,
      PenDTO.fromJSON(form) as DTO
    ]
    console.log('DATA', form.testId)
    console.log('TEST', newDTOs)
    const dtos = newDTOs.filter(dto => !!dto)
    startRemoteAnalyse(dtos)
  }

  return {
    isMaster,
    shallMasterRecorded,
    isAnalysing,
    results,
    startLocalAnalyse,
    startRemoteAnalyse,
    submit,
    micSensor,
    deviceName,
    inputDeviceInfo
  }
}
