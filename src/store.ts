import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import { calibrationStore } from './modules/calibration/store'
import { sensorStore } from './modules/sensor/store'

// define your typings for the store state
export interface State {
}

// define injection key
export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore({
  strict: import.meta.env.NODE_ENV !== 'production',
  modules: {
    calibration: calibrationStore,
    sensor: sensorStore
  }
})

export function useStore () {
  return baseUseStore(key)
}
