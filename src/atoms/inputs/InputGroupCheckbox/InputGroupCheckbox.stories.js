import InputGroupCheckbox from './InputGroupCheckbox.vue'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'atoms/inputs/InputGroupCheckbox',
  component: InputGroupCheckbox
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { InputGroupCheckbox },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup () {
    return { args }
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '<InputGroupCheckbox v-bind="args"/>'
})

export const Checked = Template.bind({})
Checked.args = {
  id: 'checkbox',
  label: 'Please accept the AGBs',
  modelValue: true
}
export const Unchecked = Template.bind({})
Unchecked.args = {
  ...Checked.args,
  modelValue: false
}
