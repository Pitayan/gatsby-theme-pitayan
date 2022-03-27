module.exports = function createSchemaCustomization({ actions }) {
  const { createTypes } = actions

  // Create author link
  const AuthorTypeDefs = `
    type MdxFrontmatter {
      author: [AuthorsYaml] @link(by: "name")
    }
  `

  createTypes([AuthorTypeDefs])
}
