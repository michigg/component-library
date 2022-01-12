<template>
  <div class="shadow-xl max-w-lg flex flex-col gap-8 px-4 py-4">
    <Headline v-if="title" :title="title"/>
    <slot/>
  </div>
</template>

<script>
import Headline from '@/shared/components/Headline'

export default {
  name: 'Card',
  components: { Headline },
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>
