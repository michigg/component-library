import BaseList from './BaseList.vue'
import BaseListElement from '../BaseListElement/BaseListElement.vue'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'atoms/list/BaseList',
  component: BaseList,
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
  components: {
    BaseList,
    BaseListElement
  },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup () {
    return { args }
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '<BaseList v-bind="args"> ' +
    '<BaseListElement>Element 1</BaseListElement>' +
    '<BaseListElement>Element 2</BaseListElement>' +
    '<BaseListElement>Element 3</BaseListElement>' +
    '</BaseList>'
})

export const Default = Template.bind({})
