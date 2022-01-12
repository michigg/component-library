<script lang="ts" setup>
import { IInstruction } from './ICalibrationMethod'
import CustomSection from '../../components/CustomSection.vue'

// eslint-disable-next-line no-undef
const props = defineProps<{ instructions: Array<IInstruction> }>()
</script>

<template>
  <CustomSection
      v-for="instruction in props.instructions"
      :key="instruction.image"
  >
    <!--     TODO: include alt tag-->
    <img :src="instruction.image" alt="Instruction Step"/>
    <p>{{ instruction.description }}</p>
  </CustomSection>
</template>

<style scoped>

</style>
