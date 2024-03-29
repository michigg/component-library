<template>
  <div class="input-group">
    <select
        :id="id"
        v-model="localValue"
        v-bind="$attrs"
    >
      <option
          v-for="option in localOptions"
          :key="getTitle(option)"
          :value="getValue(option)"
      >
        {{ getTitle(option) }}
      </option>
    </select>
    <label :for="id">{{ label }}</label>
  </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps<{
  modelValue?: string | number | object;
  id: string;
  options: string[] | { text: string }[];
  label: string;
}>()

const localOptions = computed(() => {
  if (typeof props.options[0] === 'string') {
    return props.options
  } else {
    return props.options.map((option) => {
      if (typeof option === 'string') {
        return {
          title: option,
          value: option
        }
      }
      return {
        title: option.text,
        value: option
      }
    })
  }
})
// eslint-disable-next-line
const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number | object | undefined): void;
}>()
const localValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const getTitle = (option: string | { text: string } | { title: string, value: string } | { title: string, value: { text: string } }): string | undefined => {
  if (typeof option === 'string') {
    return option
  }
  if ('text' in option) {
    return option.text
  }
  if ('title' in option) {
    return option.title
  }
}

const getValue = (option: string | { text: string } | { title: string, value: string } | { title: string, value: { text: string } }): { text: string } | string | undefined => {
  if (typeof option === 'string') {
    return option
  }
  if ('text' in option) {
    return option.text
  }
  if ('value' in option) {
    return option.value
  }
}
</script>

<style scoped>
.input-group {
  display: flex;
  flex-flow: column;
  row-gap: 0.1rem;
}

select {
  padding: 0.5rem 0.5rem;
  outline: none;
  width: 100%;
  height: 41px;
  color: var(--color-text);
  background-color: var(--color-surface-1);
  border: none;
  border-radius: 0.5rem;
  border-bottom: solid 3px var(--color-primary);
}

@media (prefers-color-scheme: light) {
  select {
    color: black;
  }
}

label {
  font-size: 0.75rem;
  padding-left: 0.5rem;
}

select:focus-visible,
select:focus {
  border-bottom: solid 3px var(--color-focus);
}

select:invalid {
  border-bottom: solid 3px var(--color-danger);
}
</style>
