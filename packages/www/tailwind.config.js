const defaultTheme = require("tailwindcss/defaultTheme")
const tailwindConfigs = require("@pitayan/gatsby-theme-pitayan/tailwind.config")

tailwindConfigs.theme.fontFamily = {
  sans: defaultTheme.fontFamily.sans,
  serif: ["'Merriweather', Georgia, Serif", ...defaultTheme.fontFamily.serif],
  mono: `"Operator Mono", Consolas, Menlo, Monaco, source-code-pro, Courier New, monospace`,
}

module.exports = tailwindConfigs
