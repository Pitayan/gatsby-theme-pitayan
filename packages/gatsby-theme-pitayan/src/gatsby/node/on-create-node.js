const path = require("path")
const readingTime = require("reading-time")

module.exports = function onCreateNode({ node, actions, getNode }) {
  const { createNodeField } = actions
  const fileNode = getNode(node.parent)

  if (node.internal.type == "Mdx" && fileNode.internal.type == "File") {
    const parsedFilePath = path.parse(fileNode.relativePath)

    let slug
    if (node.frontmatter && node.frontmatter.slug) {
      slug = `/${node.frontmatter.slug}`
    } else {
      if (parsedFilePath.name !== "index" && parsedFilePath.dir !== "") {
        slug = `/${parsedFilePath.dir}/${parsedFilePath.name}`
      } else if (parsedFilePath.dir === "") {
        slug = `/${parsedFilePath.name}`
      } else {
        slug = `/${parsedFilePath.dir}`
      }
    }

    createNodeField({
      name: `slug`,
      node,
      value: slug,
    })

    createNodeField({
      name: `timeToRead`,
      node,
      value: readingTime(node.body),
    })
  }
}
