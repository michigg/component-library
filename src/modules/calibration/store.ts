import { Commit } from 'vuex'
import { CalibrationStatus } from './calibrationStatus'
import { Sensor } from '../sensor/Sensor'
import { ICalibrationMethod, IInstruction } from './ICalibrationMethod'
import { SensorKey } from '../sensor/sensorKeys'
import { CalibrationMethodFrog } from './microphone/frog/CalibrationMethodFrog'
import { CalibrationMethodFish } from './microphone/fish/CalibrationMethodFish'
import { CalibrationError } from './exceptions'

interface CalibrationStoreState {
    calibrationData: any,
    status: CalibrationStatus,
    sensor: Sensor | undefined,
    calibrationMethod: ICalibrationMethod | undefined,
    calibrationMethods: Map<SensorKey, Array<ICalibrationMethod>>
    calibrationError: CalibrationError | undefined
}

export const INIT = 'INIT'
export const SET_CALIBRATION_STATUS = 'SET_CALIBRATION_STATUS'
export const SET_CALIBRATION_DATA = 'SET_CALIBRATION_DATA'
export const SET_CALIBRATION_ERROR = 'SET_CALIBRATION_ERROR'

export const calibrationStore = {
  namespaced: true,
  state (): CalibrationStoreState {
    return {
      calibrationData: undefined,
      sensor: undefined,
      status: CalibrationStatus.INIT,
      calibrationMethod: undefined,
      calibrationMethods: new Map<SensorKey, Array<ICalibrationMethod>>([
        [SensorKey.MIC, [new CalibrationMethodFrog(), new CalibrationMethodFish()]]
      ]),
      calibrationError: undefined
    }
  },
  getters: {
    getCalibrationData: (state: CalibrationStoreState): number | undefined => state.calibrationData,
    getCalibrationStateDescription: (state: CalibrationStoreState) => {
      switch (state.status) {
        case CalibrationStatus.INIT:
          return 'Starte Kalibrierung'
        case CalibrationStatus.CHECK_PRE_CONDITION:
          return 'Überprüfe Vorbedingungen'
        case CalibrationStatus.RECORD:
          return 'Aufnahme... '
        case CalibrationStatus.CHECK_POST_CONDITION:
          return 'Überprüfe Nachbedingungen'
        case CalibrationStatus.CALC_CALIBRATION_VALUE:
          return 'Berechne Kalibrierungswert'
        case CalibrationStatus.DONE_SUCCESS:
          return 'Kalibrierung erfolgreich'
        case CalibrationStatus.DONE_FAILURE:
          return 'Kalibrierung fehlgeschlagen'
      }
    },
    isBusy: (state: CalibrationStoreState): boolean => {
      return state.status !== CalibrationStatus.INIT &&
                state.status !== CalibrationStatus.DONE_SUCCESS &&
                state.status !== CalibrationStatus.DONE_FAILURE
    },
    isSuccess: (state: CalibrationStoreState): boolean => state.status === CalibrationStatus.DONE_SUCCESS,
    isFailure: (state: CalibrationStoreState): boolean => state.status === CalibrationStatus.DONE_FAILURE,
    getCalibrationError: (state: CalibrationStoreState) => state.calibrationError,
    getCalibrationComponent: (state: CalibrationStoreState) => state.calibrationMethod?.component,
    getCalibrationMethodInstructions: (state: CalibrationStoreState): Array<IInstruction> | undefined => state.calibrationMethod?.getInstructions(),
    getCalibrationMethodsByKey: (state: CalibrationStoreState) => (sensorKey: SensorKey) => state.calibrationMethods.get(sensorKey)
  },
  mutations: {
    [INIT] (state: CalibrationStoreState, {
      sensor,
      calibrationMethod
    }: { sensor: Sensor, calibrationMethod: ICalibrationMethod }) {
      console.log(sensor, calibrationMethod)
      state.sensor = sensor
      state.calibrationMethod = calibrationMethod
      state.status = CalibrationStatus.INIT
    },
    [SET_CALIBRATION_DATA] (state: CalibrationStoreState, value: any) {
      state.calibrationData = value
    },
    [SET_CALIBRATION_STATUS] (state: CalibrationStoreState, newState: CalibrationStatus) {
      state.status = newState
    },
    [SET_CALIBRATION_ERROR] (state: CalibrationStoreState, error: CalibrationError) {
      state.calibrationError = error
    }
  },
  actions: {
    init ({ commit }: { commit: Commit }, {
      sensor,
      calibrationMethod
    }: { sensor: Sensor, calibrationMethod: ICalibrationMethod }) {
      console.log(sensor, calibrationMethod)
      commit(INIT, { sensor, calibrationMethod })
    },
    async calibrate ({
      state,
      commit
    }: { state: CalibrationStoreState, commit: Commit }
    ) {
      if (!state.calibrationMethod || !state.sensor) {
        // TODO: error handling
        return
      }
      const calibrationMethod = state.calibrationMethod
      const sensor = state.sensor.clone()
      try {
        console.log('Sensor', sensor)
        console.log('Method', calibrationMethod)
        commit(SET_CALIBRATION_ERROR, undefined)
        commit(SET_CALIBRATION_STATUS, CalibrationStatus.CHECK_PRE_CONDITION)
        await calibrationMethod.checkPreConditions(sensor)
        commit(SET_CALIBRATION_STATUS, CalibrationStatus.RECORD)
        const analysisData = await calibrationMethod.analyse(sensor)
        commit(SET_CALIBRATION_STATUS, CalibrationStatus.CHECK_POST_CONDITION)
        await calibrationMethod.checkPostConditions(sensor)
        commit(SET_CALIBRATION_STATUS, CalibrationStatus.CALC_CALIBRATION_VALUE)
        const calibrationData = await calibrationMethod.calculateCalibration(analysisData)
        commit(SET_CALIBRATION_STATUS, CalibrationStatus.DONE_SUCCESS)
        console.log('CALIBRATION DATA', calibrationData)
      } catch (e) {
        // TODO: error handling
        commit(SET_CALIBRATION_ERROR, e)
        commit(SET_CALIBRATION_STATUS, CalibrationStatus.DONE_FAILURE)
      }
    }
  }
}
