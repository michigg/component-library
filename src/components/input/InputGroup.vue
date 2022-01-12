<template>
  <div class="input-group">
    <input
        :id="id"
        v-model="localValue"
        v-bind="$attrs"
    >
    <label :for="id">{{ label }}</label>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

// eslint-disable-next-line no-undef
const props = withDefaults(
  // eslint-disable-next-line no-undef
  defineProps<{
      modelValue?: string | number,
      modelModifiers?: any,
      id: string,
      label: string,
    }>(), {
    modelModifiers: () => ({})
  })
// eslint-disable-next-line no-undef
const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number | undefined): void
}>()
const localValue = computed({
  get: () => props.modelValue,
  set: (value) => {
    if (props.modelModifiers.uppercase && typeof value === 'string') {
      value = value.toUpperCase()
    }
    emit('update:modelValue', value)
  }
})
</script>

<style scoped>
.input-group {
  display: flex;
  flex-flow: column;
  row-gap: .1rem;
}

input {
  font-size: 1.2rem;
  padding: .5rem .5rem;
  appearance: none;
  outline: none;
  width: 100%;
  border: none;
  border-radius: .5rem;
  border-bottom: solid 3px hsl(var(--hue) 30% 20%);
}

label {
  font-size: .75rem;
  padding-left: .5rem;
}

input:focus-visible,
input:focus {
  border-bottom: solid 3px var(--focus-color);
}

input:invalid {
  border-bottom: solid 3px var(--danger-color);
}
</style>
