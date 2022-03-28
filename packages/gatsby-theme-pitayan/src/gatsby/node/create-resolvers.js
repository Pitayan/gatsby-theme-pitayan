module.exports = function createResolvers({ createResolvers }) {
  const resolvers = {
    Mdx: {
      // Create related posts
      relatedPosts: {
        type: ["Mdx"],
        resolve: async (source, _, context, __) => {
          let posts = await context.nodeModel.runQuery({
            type: "Mdx",
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
              type: "Mdx",
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
