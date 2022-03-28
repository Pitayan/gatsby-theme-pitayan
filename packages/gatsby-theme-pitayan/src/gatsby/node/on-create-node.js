const path = require("path")

module.exports = function onCreateNode({ node, actions, getNode }) {
  const { createNodeField } = actions
  const fileNode = getNode(node.parent)

  if (node.internal.type == "Mdx" && fileNode.internal.type == "File") {
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
      value,
    })
  }
}
