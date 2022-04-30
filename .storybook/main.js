module.exports = {
  //"core": { "builder": "@storybook/builder-vite" },
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-a11y",
    "@bissolli/storybook-css-properties",
    "@storybook/addon-jest"
  ],
  "framework": "@storybook/vue3"
}