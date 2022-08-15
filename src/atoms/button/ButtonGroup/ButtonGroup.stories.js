import ButtonGroup from './ButtonGroup.vue'
import BaseButton from '../BaseButton/BaseButton.vue'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'atoms/button/ButtonGroup',
  component: ButtonGroup,
  argTypes: {
    default: {
      control: 'text',
      description: 'Slot content',
      defaultValue: 'Button'
    }
  }
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { ButtonGroup, BaseButton },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup () {
    return { args }
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '<ButtonGroup v-bind="args">' +
    '<BaseButton>BaseButton 1</BaseButton>' +
    '<BaseButton>BaseButton 2</BaseButton>' +
    '<BaseButton>BaseButton 3</BaseButton>' +
    '</ButtonGroup>'
})

export const Primary = Template.bind({})
