const path = require('path')

module.exports = {
  //"core": { "builder": "@storybook/builder-vite" },
  "core": {
    "builder": "@storybook/builder-webpack5"
  },
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-a11y",
    "@bissolli/storybook-css-properties",
    "@storybook/addon-jest"
  ],
  "framework": "@storybook/vue3",
  webpackFinal: async config => {
    config.resolve.alias = {
      'vue$': 'vue/dist/vue.esm-bundler.js',
      '@': path.resolve(__dirname, '../src')
    }

    return config
  }
}
