<template>
  <li class="shadow mb-1 px-4 py-2">
    <slot/>
  </li>
</template>

<script>
/**
 * Use this component only inside a <code>BaseList.vue</code> component.
 */
export default {
  name: 'ListElement'
}
</script>
