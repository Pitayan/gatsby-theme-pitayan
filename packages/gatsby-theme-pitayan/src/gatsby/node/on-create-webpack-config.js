const path = require("path")

const projectRoot = path.resolve(__dirname, "../../../")

module.exports = function onCreateWebpackConfig({ actions }) {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(projectRoot, "src"), "node_modules"],
      alias: {
        "@pitayan/gatsby-theme-pitayan": path.resolve(projectRoot)
      }
    },
  })
}
