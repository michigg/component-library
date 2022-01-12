<template>
  <ListElement
    :class="['flex', 'justify-between', 'gap-4', success ? 'success' :'', fail? 'fail':'']"
    data-test="list-element"
  >
    <span class="tw-font-bold">{{ label }}</span>
    <span>
      <slot/>
      <Icon :icon-key="iconKey"/>
    </span>
  </ListElement>
</template>

<script>
import ListElement from '@/shared/components/ListElement'
import Icon from '@/shared/components/Icon'

export default {
  name: 'IconStateListElement',
  components: {
    Icon,
    ListElement
  },
  props: {
    iconKey: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    success: {
      type: Boolean,
      default: false
    },
    fail: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.success {
  @apply text-success
}

.fail {
  @apply text-fail
}
</style>
