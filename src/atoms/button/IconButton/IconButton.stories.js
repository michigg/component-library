import IconButton from './IconButton.vue'
import BaseIcon from '../../BaseIcon/BaseIcon.vue'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'atoms/button/IconButton',
  component: IconButton,
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
  components: { IconButton, BaseIcon },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup () {
    return { args }
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '<IconButton v-bind="args"><template #icon><BaseIcon icon-key="bi-arrow-right"/></template>{{ args.default }}</IconButton>'
})

export const Primary = Template.bind({})
