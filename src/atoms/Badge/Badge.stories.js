import Badge from './Badge.vue'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'atoms/badge/Badge',
  component: Badge,
  argTypes: {
    default: {
      control: 'text',
      description: 'Slot content',
      defaultValue: 'Badge'
    }
  }
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { Badge },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup () {
    return { args }
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '<Badge v-bind="args">{{ args.default }}</Badge>'
})

export const Primary = Template.bind({})
