import SelectGroup from './SelectGroup.vue'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'atoms/inputs/SelectGroup',
  component: SelectGroup,
  argTypes: {
    default: {
      control: 'text',
      description: 'Slot content',
      defaultValue: 'Loading Card Content'
    }
  }
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { SelectGroup },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup () {
    return { args }
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '<SelectGroup v-bind="args"/>'
})

export const Empty = Template.bind({})
Empty.args = {
  id: 'select-group-empty',
  options: [],
  label: 'Empty Select Group'
}

export const Filled = Template.bind({})
Filled.args = {
  id: 'select-group-filled',
  options: [
    { text: 'Option 1' },
    { text: 'Option 2' },
    { text: 'Option 3' },
    { text: 'Option 4' },
    { text: 'Option 5' }
  ],
  label: 'Filled Select Group',
  modelValue: { text: 'Option 1' }
}
