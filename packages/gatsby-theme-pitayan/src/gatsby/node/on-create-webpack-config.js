const path = require("path")

const projectRoot = path.resolve(__dirname, "../../../")

module.exports = function onCreateWebpackConfig(
  { actions, plugins },
  { mailChimpEndpoint = '', mailChimpTimeout = 3500 }
) {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(projectRoot, "src"), "node_modules"],
      alias: {
        "@pitayan/gatsby-theme-pitayan": path.resolve(projectRoot),
      },
    },
    plugins: [
      // Define global variables
      plugins.define({
        __MAILCHIMP_ENDPOINT__: String(mailChimpEndpoint),
        __MAILCHIMP_TIMEOUT__: Number(mailChimpTimeout),
      }),
    ],
  })
}
