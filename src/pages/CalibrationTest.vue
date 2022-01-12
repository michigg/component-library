<template>
  <LayoutSingleColumn title="Calibration Test">
    <Calibration :sensor-key="sensorKey"/>
  </LayoutSingleColumn>
</template>

<script>
import LayoutSingleColumn from '../components/LayoutSingleColumn.vue'
import Calibration from '../modules/calibration/Calibration.vue'
import { SensorKey } from '../modules/sensor/sensorKeys'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CalibrationTest.vue',
  components: { Calibration, LayoutSingleColumn },
  setup () {
    return {
      sensorKey: SensorKey.MIC
    }
  }
})
</script>

<style scoped>

</style>
