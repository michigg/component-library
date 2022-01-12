import { Commit } from 'vuex'
import { Sensor } from './Sensor'
import { SensorKey } from './sensorKeys'
import { MicSensor } from './microphone/Sensor'

interface SensorState {
  sensors: Map<SensorKey, Sensor>
}

export const SET_SENSOR = 'SET_SENSOR'

export const sensorStore = {
  namespaced: true,
  state (): SensorState {
    return {
      sensors: new Map<SensorKey, Sensor>([
        [SensorKey.MIC, new MicSensor()]
      ])
    }
  },
  getters: {
    getSensor: (state: SensorState) => (sensorKey: SensorKey) => {
      const sensor = state.sensors.get(sensorKey)
      if (!sensor) {
        return undefined
      }
      return sensor.clone()
    }
  },
  mutations: {
    [SET_SENSOR] (state: SensorState, sensor: Sensor) {
      state.sensors.set(sensor.key, sensor)
    }
  },
  actions: {
    async checkAvailability ({
      state,
      commit
    }: { state: SensorState, commit: Commit }) {
      for (const sensor of state.sensors.values()) {
        const cloneSensor = sensor.clone()
        await cloneSensor.checkAvailability()
        commit(SET_SENSOR, cloneSensor)
      }
    },
    async updateSensor ({ commit }: { commit: Commit }, sensor: Sensor) {
      commit(SET_SENSOR, sensor)
    }
  }
}
