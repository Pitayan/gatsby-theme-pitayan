const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

// TODO: implement hooks

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // Memo:
  // limit -> as an argument?
  return graphql(`
      query {
        allMdx(
          sort: { fields: [frontmatter___date, frontmatter___title], order: DESC }
          limit: 1000
        ) {
          nodes {
            fields{
              slug
            }
          }
        }
      }
    `).then(result => {
    // Handling Errors.
    if (result.errors) {
      return Promise.reject(result.errors)
    }

    // Create pages.
    // Memo:
    // path prefix -> as an argument?
    result.data.allMdx.nodes.forEach((node) => {
      createPage({
        path: node.fields.slug,
        component: path.resolve(`./src/templates/post/index.tsx`),
        context: {
          // We can use the values in this context in our page layout component.
          slug: node.fields.slug
        },
      })
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  const fileNode = getNode(node.parent)

  if (node.internal.type == 'Mdx' && fileNode.internal.type == 'File') {
    const parsedFilePath = path.parse(fileNode.relativePath)

    let value
    if (node.frontmatter && node.frontmatter.slug) {
      value = `/${node.frontmatter.slug}`
    } else {
      if (parsedFilePath.name !== "index" && parsedFilePath.dir !== "") {
        value = `/${parsedFilePath.dir}/${parsedFilePath.name}`
      } else if (parsedFilePath.dir === "") {
        value = `/${parsedFilePath.name}`
      } else {
        value = `/${parsedFilePath.dir}`
      }
    }

    createNodeField({
      name: `slug`,
      node,
      value
    })
  }
}

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
