import InputGroup from './InputGroup.vue'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'atoms/inputs/InputGroup',
  component: InputGroup
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { InputGroup },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup () {
    return { args }
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '<InputGroup v-bind="args"/>'
})

export const Text = Template.bind({})
Text.args = {
  id: 'input-group-text',
  label: 'Text Input Label',
  type: 'text',
  modelValue: 'Example Text'
}

export const TextUppercase = Template.bind({})
TextUppercase.args = {
  id: 'input-group-text-uppercase',
  label: 'Uppercase Text Input Label',
  type: 'text',
  modelValue: 'EXAMPLE TEXT',
  modelModifiers: { uppercase: 'true' }
}

export const Number = Template.bind({})
Number.args = {
  id: 'input-group-number',
  label: 'Number Input Label',
  type: 'number',
  modelValue: 15
}

export const EMail = Template.bind({})
EMail.args = {
  id: 'input-group',
  label: 'EMail Input Label',
  type: 'email',
  modelValue: 'email@example.com'
}

export const Password = Template.bind({})
Password.args = {
  id: 'input-group',
  label: 'Password Input Label',
  type: 'password',
  modelValue: 'Example Password'
}

export const Disabled = Template.bind({})
Disabled.args = {
  id: 'input-group-text-disabled',
  label: 'Text Input Label',
  type: 'text',
  modelValue: 'Example Text',
  disabled: true
}

export const Required = Template.bind({})
Required.args = {
  id: 'input-group-text-required',
  label: 'Text Input Label',
  type: 'text',
  modelValue: 'Example Text',
  required: true
}
