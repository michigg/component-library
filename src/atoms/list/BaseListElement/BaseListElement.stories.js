import BaseListElement from './BaseListElement.vue'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'atoms/list/BaseListElement',
  component: BaseListElement,
  argTypes: {
    default: {
      control: 'text',
      description: 'Slot content',
      defaultValue: 'Example Content'
    }
  }
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { BaseListElement },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup () {
    return { args }
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '<BaseListElement v-bind="args">{{ args.default }}</BaseListElement>'
})

export const Default = Template.bind({})
