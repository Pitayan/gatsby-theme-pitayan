const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

// exports.createPages = async ({ graphql, actions, reporter }) => { }

// exports.onCreateNode = ({ node, actions, getNode }) => { }

exports.onCreateWebpackConfig = args => {
  args.actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, "src"), "node_modules"],
      alias: {
        "@": path.resolve(__dirname, "src/"),
      },
    },
  })
}
