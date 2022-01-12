<template>
  <h1
    class="text-3xl"
    data-test="headline"
  >
    {{ title }}
  </h1>
</template>

<script>
export default {
  name: 'Headline',
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>
