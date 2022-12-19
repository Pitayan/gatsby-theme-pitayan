module.exports = function createSchemaCustomization({ actions }) {
  const { createTypes } = actions

  // Create author link
  const AuthorTypeDefs = `
    type MdxFrontmatter {
      author: [AuthorsYaml] @link(by: "name")
    }
  `

  // Create timeToRead
  // To keep timeToRead field
  const TimeToRead = `
    type Mdx implements Node {
      timeToRead: Float @proxy(from: "fields.timeToRead.minutes")
    }
  `

  createTypes([
    AuthorTypeDefs,
    TimeToRead,
  ])
}
