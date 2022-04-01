const path = require("path")

const projectRoot = path.resolve(__dirname, "../../../")

module.exports = async function createPages({ graphql, actions }) {
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
        component: path.resolve(projectRoot, `./src/templates/post/index.tsx`),
        context: {
          // We can use the values in this context in our page layout component.
          slug: node.fields.slug,
        },
      })
    })

    const postsPerPage = 10

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