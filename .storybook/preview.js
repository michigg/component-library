import './variables.css'

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  cssCustomProperties: {
    // list here all the props you would like to customize manually
    // this will deepmerge and override any setup that was automatically done
    // by the addon
    props: {
      // prop name
      '--font-size': {
        // description to be shown in the table
        description: 'This property is the only one coming from the `Text` component',
        // if you want to group items, use this props
        // this has a higher weight than the following `matchCategory`
        category: 'Button properties'
      },
    },
    // props listed here won't be visible in the panel to be customized
    hiddenProps: [],
    // to make your life easier when grouping props
    // you can use regex to match props name and add under a section in the table
    // the key is the name of the section
    matchCategory: {
      color: /(hue|color)/,
      typograph: /font/,
      border: /(border)/,
      space: /(space|padding|margin|line-height)/
    }
  }
}