import Card from './Card.vue'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'atoms/Card',
  component: Card,
  argTypes: {
    default: {
      control: 'text',
      description: 'Slot content',
      defaultValue: 'Base Card Content'
    }
  }
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { Card },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup () {
    return { args }
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '<Card v-bind="args">{{ args.default }}</Card>'
})

export const Default = Template.bind({})
Default.args = {
  title: undefined
}
export const WithTitle = Template.bind({})
WithTitle.args = {
  title: 'Hello World.'
}
