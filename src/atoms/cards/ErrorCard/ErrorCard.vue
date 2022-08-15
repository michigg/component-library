<script lang="ts" setup>
import { computed, ref } from 'vue'
import BaseCard from '@/atoms/cards/BaseCard/BaseCard.vue'
import BaseButton from '@/atoms/button/BaseButton/BaseButton.vue'
import { BaseError } from '@/atoms/cards/ErrorCard/baseError'

const props = defineProps<{
  error: BaseError | Error | undefined;
}>()
const showMoreInfos = ref(false)
const causes = computed(() => {
  if (!props.error || !(props.error instanceof BaseError)) {
    return []
  }
  if (!props.error.cause) {
    return []
  }
  return [props.error.cause]
})
</script>
<template>
  <BaseCard
    v-if="error"
    :title="error.name"
    class="danger-box"
  >
    <p>{{ error.message }}</p>
    <BaseButton
      v-if="error instanceof BaseError"
      :active="showMoreInfos"
      class="info-button"
      @click="showMoreInfos = !showMoreInfos"
    >
      Weitere Informationen
    </BaseButton>
    <div v-if="showMoreInfos">
      <p
        v-for="childError in causes"
        :key="childError.name"
      >
        {{ childError.name }}: {{ childError.message }}
      </p>
    </div>
  </BaseCard>
</template>

<style scoped>
.danger-box {
  background-color: var(--color-danger);
}

.danger-box .info-button {
  background-color: var(--color-danger);
}
</style>
