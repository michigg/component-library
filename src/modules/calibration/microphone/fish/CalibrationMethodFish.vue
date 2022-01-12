<script lang="ts" setup>
import { computed } from 'vue'
import { useStore } from '../../../../store'
import Instructions from '../../Instructions.vue'
import CustomSection from '../../../../components/CustomSection.vue'
import ButtonCalibration from '../../../../components/animations/ButtonCalibration.vue'

const store = useStore()
const instructions = computed(() => store.getters['calibration/getCalibrationMethodInstructions'])
const calibrationStatus = computed(() => store.getters['calibration/getCalibrationStateDescription'])
const isBusy = computed(() => store.getters['calibration/isBusy'])
const isSuccess = computed(() => store.getters['calibration/isSuccess'])
const error = computed(() => store.getters['calibration/getCalibrationError'])

const startCalibration = () => store.dispatch('calibration/calibrate')

</script>

<template>
  <CustomSection>
    <h2>Fischkalibrierung</h2>
    <Instructions :instructions="instructions" />
    <div v-if="error">{{ error.message }}</div>
    <ButtonCalibration
        :busy="isBusy"
        :success="isSuccess"
        :info="calibrationStatus"
        @click="startCalibration"
    />
  </CustomSection>
</template>

<style scoped>

</style>
