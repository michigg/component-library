<template>
  <i
    :class="['bi', iconKey]"
    :aria-hidden="true"
    data-test="icon"
  ></i>
</template>

<script>
export default {
  name: 'Icon',
  props: {
    iconKey: {
      type: String,
      required: true
    }
  }
}
</script>
