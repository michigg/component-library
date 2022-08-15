import BaseIconBadge from './BaseIconBadge.vue'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'atoms/badge/BaseIconBadge',
  component: BaseIconBadge
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { BaseIconBadge },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup () {
    return { args }
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '<BaseIconBadge v-bind="args"/>'
})

export const Default = Template.bind({})
Default.args = {
  iconKey: 'bi-check'
}
