<template>
  <div class="input-group">
    <input
        :id="id"
        v-model="localValue"
        v-bind="$attrs"
        type="checkbox"
    >
    <label :for="id">{{ label }}</label>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps<{
  modelValue?: boolean,
  id: string,
  label: string,
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean | undefined): void
}>()
const localValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})
</script>

<style scoped>
.input-group {
  position: relative;
  flex-flow: column;
  row-gap: .1rem;
}

input {
  position: absolute;
  width: 1em;
  height: 1em;
  opacity: 0;
}

input[type="checkbox"] + label:before {
  content: "";
  width: 1rem;
  height: 1rem;
  border: 2px solid var(--primary-border-color);
  display: inline-block;
  border-radius: .25rem;
  margin-inline-end: 0.5em;
}

input[type="checkbox"]:checked + label:before {
  background: var(--primary-color);
}

label {
  display: flex;
  font-size: 1rem;
  line-height: 1.2;
}

input[type="checkbox"]:focus + label:before {
  border: solid 2px var(--focus-color);
}

input[type="checkbox"]:invalid + label:before {
  border: solid 2px var(--danger-color);
}
</style>
