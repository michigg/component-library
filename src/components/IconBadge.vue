<template>
  <Badge
    class="leading-4"
    data-test="badge"
  >
    <Icon :icon-key="iconKey"/>
  </Badge>
</template>

<script>
import Icon from '@/shared/components/Icon'
import Badge from '@/shared/components/Badge'

export default {
  name: 'IconBadge',
  components: {
    Badge,
    Icon
  },
  props: {
    iconKey: {
      type: String,
      required: true
    }
  }
}
</script>
