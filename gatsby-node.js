const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

// TODO: implement hooks

// exports.createPages = async ({ graphql, actions, reporter }) => {
//   const { createPage } = actions

//   return graphql(`
//       {
//         allMdx(
//           sort: { fields: [frontmatter___date], order: DESC }
//           limit: 1000
//         ) {
//           edges {
//             node {
//               id
//               fields {
//                 slug
//               }
//               frontmatter {
//                 title
//                 date
//               }
//               body
//             }
//           }
//         }
//       }
//     `).then(result => {
//     // Handling Errors.
//     if (result.errors) {
//       return Promise.reject(result.errors)
//     }

//     // Create pages.
//     result.data.allMdx.edges.forEach(({ node }) => {
//       createPage({
//         path: node.fields.slug,
//         component: path.resolve(`./src/layouts/Default/index.tsx`),
//         context: {
//           // We can use the values in this context in our page layout component.
//           id: node.id
//         },
//       })
//     })
//   })
// }

// exports.onCreateNode = ({ node, actions, getNode }) => {
//   const { createNodeField } = actions

//   if (node.internal.type == 'Mdx') {
//     const value = createFilePath({ node, getNode })
//     createNodeField({
//       name: `slug`,
//       node,
//       value
//     })
//   }
// }

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
