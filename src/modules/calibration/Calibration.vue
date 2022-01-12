<script lang="ts" setup>
import { computed, ref, watch, defineProps } from 'vue'
import { ICalibrationMethod } from './ICalibrationMethod'
import { SensorKey } from '../sensor/sensorKeys'
import { useStore } from '../../store'
import CustomSection from '../../components/CustomSection.vue'
import FormBase from '../../components/input/FormBase.vue'
import SelectGroup from '../../components/input/SelectGroup.vue'

const props = defineProps<{ sensorKey: SensorKey }>()

const store = useStore()
const sensor = computed(() => store.getters['sensor/getSensor'](props.sensorKey))

const calibrationMethods = computed(() => store.getters['calibration/getCalibrationMethodsByKey'](props.sensorKey))
const component = computed(() => store.getters['calibration/getCalibrationComponent'])
const selectedCalibrationMethod = ref<ICalibrationMethod>(calibrationMethods.value[0])

watch(selectedCalibrationMethod, async (selectedCalibrationMethod) => {
  await store.dispatch('calibration/init', {
    sensor: sensor.value, calibrationMethod: selectedCalibrationMethod
  })
}, { immediate: true })

</script>
<template>
  <CustomSection title="Bitte eine Kalibrierungsmethode auswählen.">
    <FormBase>
      <SelectGroup
          id="select-calibration-method"
          v-model="selectedCalibrationMethod"
          :options="calibrationMethods"
          label="Select Calibration Method"
      />
    </FormBase>
  </CustomSection>
  <component v-if="component" :is="component"></component>
</template>
