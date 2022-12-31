const path = require("path")

const projectRoot = path.resolve(__dirname, "../../../")

module.exports = async function createPages(
  { graphql, actions },
  { postsPerPage = 10 }
) {
  const { createPage } = actions

  // FIXME: limit -> as an argument?
  return graphql(`
    query {
      site: allMdx(
        filter: {
          internal: {
            contentFilePath: { regex: "/content/site/" }
          }
        }
        limit: 2000
      ) {
        nodes {
          fields {
            slug
          }
          internal {
            contentFilePath
          }
        }
      }
      posts: allMdx(
        filter: {
          internal: {
            contentFilePath: { regex: "/content/posts/" }
          }
        }
        sort: [
          {
            frontmatter: {
              date: DESC
            }
          },
          {
            frontmatter: {
              title: DESC
            }
          }
        ]
        limit: 2000
      ) {
        nodes {
          frontmatter {
            title
          }
          fields {
            slug
          }
          internal {
            contentFilePath
          }
        }
      }
      authors: allMdx(limit: 2000) {
        group(field: {
          frontmatter: {
            author: {
              yamlId: SELECT
            }
          }
        }) {
          fieldValue
          totalCount
        }
      }
      categories: allMdx(limit: 2000) {
        group(field: {
          frontmatter: {
            categories: SELECT
          }
        }) {
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

    // Create site page
    result.data.site.nodes.forEach(node => {
      const component = path.resolve(projectRoot, `./src/templates/site/index.tsx`)
      createPage({
        path: node.fields.slug,
        component: `${component}?__contentFilePath=${node.internal.contentFilePath}`,
        context: {
          // We can use the values in this context in our page layout component.
          slug: node.fields.slug,
        },
      })
    })

    // Create post page
    // FIXME: path prefix -> as an argument?
    let previousPost = result.data.posts.nodes[result.data.posts.nodes.length - 1]
    let nextPost = result.data.posts.nodes[1]
    result.data.posts.nodes.forEach((node, key) => {
      const component = path.resolve(projectRoot, `./src/templates/post/index.tsx`)

      createPage({
        path: node.fields.slug,
        component: `${component}?__contentFilePath=${node.internal.contentFilePath}`,
        context: {
          slug: node.fields.slug,
          previous: {
            title: previousPost.frontmatter.title,
            slug: previousPost.fields.slug,
          },
          next: {
            title: nextPost.frontmatter.title,
            slug: nextPost.fields.slug,
          }
        },
      })

      previousPost = node

      nextPost = key + 2 >  result.data.posts.nodes.length - 1
        ? result.data.posts.nodes[0]
        : result.data.posts.nodes[key + 2]
    })

    // Create paginated post list page
    const totalPostPages =
      (result.data.posts.nodes.length / postsPerPage + 1) >> 0
    Array.from({ length: totalPostPages }).forEach((_, i) => {
      const ctx = {
        path: `/posts/${i + 1}`,
        component: path.resolve(
          projectRoot,
          `./src/templates/allPosts/index.tsx`
        ),
        context: {
          limit: postsPerPage,
          skip: i * postsPerPage,
          currentPage: i + 1,
        },
      }
      createPage(ctx)

      // To have the post list page without the pagination number. This means --> /posts === /posts/1
      if (i == 0) {
        ctx.path = "/posts"
        createPage(ctx)
      }
    })

    // Create paginated category post list page
    result.data.categories.group.forEach(category => {
      Array.from({ length: category.totalCount }).forEach((_, i) => {
        const ctx = {
          path: `/categories/${category.fieldValue}/${i + 1}`,
          component: path.resolve(
            projectRoot,
            `./src/templates/categoryPosts/index.tsx`
          ),
          context: {
            category: category.fieldValue,
            limit: postsPerPage,
            skip: i * postsPerPage,
            currentPage: i + 1,
          },
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
          component: path.resolve(
            projectRoot,
            `./src/templates/authorPosts/index.tsx`
          ),
          context: {
            authorId: author.fieldValue,
            limit: postsPerPage,
            skip: i * postsPerPage,
            currentPage: i + 1,
          },
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
