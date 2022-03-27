const path = require(`path`)

// TODO: Put these hooks definitions to "src/gastby/" folder

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  // FIXME: limit -> as an argument?
  return graphql(`
    query {
      posts: allMdx(
        sort: { fields: [frontmatter___date, frontmatter___title], order: DESC }
        limit: 2000
      ) {
        nodes {
          fields {
            slug
          }
        }
      }
      authors: allMdx(limit: 2000) {
        group(field: frontmatter___author___id) {
          fieldValue
          totalCount
        }
      }
      categories: allMdx(limit: 2000) {
        group(field: frontmatter___categories) {
          fieldValue
          totalCount
        }
      }
    }
  `).then(result => {
    // Handling Errors.
    if (result.errors) {
      return Promise.reject(result.errors)
    }

    // Create post page
    // FIXME: path prefix -> as an argument?
    result.data.posts.nodes.forEach(node => {
      createPage({
        path: node.fields.slug,
        component: path.resolve(`./src/templates/post/index.tsx`),
        context: {
          // We can use the values in this context in our page layout component.
          slug: node.fields.slug,
        },
      })
    })

    // TODO: turn into config argument
    const postsPerPage = 6

    // Create paginated post list page
    const totalPostPages = (result.data.posts.nodes.length / postsPerPage + 1) >> 0
    Array.from({ length: totalPostPages }).forEach((_, i) => {
      const ctx = {
        path: `/posts/${i + 1}`,
        component: path.resolve("./src/templates/posts/index.tsx"),
        context: {
          limit: postsPerPage,
          skip: i * postsPerPage,
          currentPage: i + 1
        }
      }
      createPage(ctx)

      // To have the post list page without the pagination number. This means --> /posts === /posts/1
      if (i == 0) {
        ctx.path = '/posts'
        createPage(ctx)
      }
    })

    // Create paginated category post list page
    result.data.categories.group.forEach(category => {
      Array.from({ length: category.totalCount }).forEach((_, i) => {
        const ctx = {
          path: `/categories/${category.fieldValue}/${i + 1}`,
          component: path.resolve(`./src/templates/categoryPosts/index.tsx`),
          context: {
            category: category.fieldValue,
            limit: postsPerPage,
            skip: i * postsPerPage,
            currentPage: i + 1
          }
        }
        createPage(ctx)

        if (i == 0) {
          ctx.path = `/categories/${category.fieldValue}`
          createPage(ctx)
        }
      })
    })

    // Create paginated author post list page
    result.data.authors.group.forEach(author => {
      Array.from({ length: author.totalCount }).forEach((_, i) => {
        const ctx = {
          path: `/authors/@${author.fieldValue}/${i + 1}`,
          component: path.resolve(`./src/templates/authorPosts/index.tsx`),
          context: {
            authorId: author.fieldValue,
            limit: postsPerPage,
            skip: i * postsPerPage,
            currentPage: i + 1
          }
        }
        createPage(ctx)

        if (i == 0) {
          ctx.path = `/authors/@${author.fieldValue}`
          createPage(ctx)
        }
      })
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
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

exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes } = actions

  // Create author link
  const AuthorTypeDefs = `
    type MdxFrontmatter {
      author: [AuthorsYaml] @link(by: "name")
    }
  `

  createTypes([AuthorTypeDefs])
}

exports.createResolvers = ({ createResolvers }) => {
  const resolvers = {
    Mdx: {
      // Create related posts
      relatedPosts: {
        type: ['Mdx'],
        resolve: async (source, _, context, __) => {
          let posts = await context.nodeModel.runQuery({
            type: 'Mdx',
            query: {
              // FIXME: runQuery ignores `limit` field in Gatsby V3. Uncommenting this will help resolve the FIXME below in V4
              // limit: 3,
              filter: {
                id: {
                  ne: source.id,
                },
                frontmatter: {
                  categories: {
                    in: source.frontmatter.categories,
                  },
                },
              },
            },
          })

          if (!posts || !posts.length) {
            // Get all articles if there's no related posts
            posts = await context.nodeModel.runQuery({
              type: 'Mdx',
              query: {
                filter: {
                  id: {
                    ne: source.id,
                  },
                },
              },
            })
          }

          // FIXME: temporarily force posts length to 3
          posts.length > 3 && (posts.length = 3)

          return posts
        },
      },
    },
  }

  createResolvers(resolvers)
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
