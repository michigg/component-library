import ErrorCard from './ErrorCard.vue'
import { BaseError } from './baseError'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'atoms/cards/ErrorCard',
  component: ErrorCard,
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
  components: { ErrorCard },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup () {
    return { args }
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '<ErrorCard v-bind="args">{{ args.default }}</ErrorCard>'
})

export const Default = Template.bind({})
Default.args = {
  error: new BaseError('This is an error!', new Error('This is an error cause.'))
}

export const WithoutCause = Template.bind({})
WithoutCause.args = {
  error: new BaseError('This is an error!')
}
