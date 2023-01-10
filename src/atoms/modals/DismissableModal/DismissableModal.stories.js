import DismissableModal from './DismissableModal.vue'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'atoms/modal/DismissableModal',
  component: DismissableModal,
  argTypes: {
    default: {
      control: 'text',
      description: 'Slot content',
      defaultValue: 'DismissableModal'
    }
  }
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { DismissableModal },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup () {
    return { args }
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `
  Bonbon dragée lollipop croissant sweet. Tootsie roll donut carrot cake cotton candy cake sesame snaps chupa chups pie marshmallow. 
  Marshmallow cake pie oat cake icing jujubes marzipan. Gummies jujubes sugar plum oat cake liquorice cupcake. 
  Tootsie roll danish wafer dragée shortbread chocolate bar croissant. Dessert chocolate cake wafer marzipan gummi bears cheesecake cake. 
  Brownie jelly beans jelly beans dragée lemon drops chocolate bonbon croissant liquorice. 
  Sesame snaps chocolate chocolate danish chocolate fruitcake halvah. Dragée pudding donut muffin sweet roll cookie apple pie. 
  Pastry fruitcake lemon drops pie toffee chupa chups sweet. Pastry cotton candy cake oat cake lollipop. 
  Danish danish jelly-o caramels donut sweet. 
  <DismissableModal v-bind="args">{{ args.default }}</DismissableModal>`
})

export const Primary = Template.bind({})
Primary.args = {
  openModalButtonLabel: 'Open Modal',
  default: `Lemon drops tiramisu apple pie candy donut macaroon. Caramels sweet cupcake icing marzipan liquorice oat cake biscuit cupcake. 
  Jelly beans sweet roll gummi bears ice cream candy bear claw cupcake muffin. 
  Soufflé icing topping gingerbread biscuit macaroon tootsie roll muffin ice cream. 
  Pie bear claw muffin oat cake donut caramels jelly. Muffin soufflé liquorice gummi bears pie caramels sesame snaps. 
  Carrot cake gingerbread soufflé gingerbread dragée cupcake jelly halvah.`
}
