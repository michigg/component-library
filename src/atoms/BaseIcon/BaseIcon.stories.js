import BaseIcon from './BaseIcon.vue'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'atoms/BaseIcon',
  component: BaseIcon
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { BaseIcon },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup () {
    return { args }
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '<BaseIcon v-bind="args"/>'
})

export const Default = Template.bind({})
Default.args = {
  iconKey: 'bi-check'
}
