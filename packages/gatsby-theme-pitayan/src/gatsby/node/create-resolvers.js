module.exports = function createResolvers({ createResolvers }) {
  const resolvers = {
    Mdx: {
      // Create related posts
      relatedPosts: {
        type: ["Mdx"],
        resolve: async (source, _, context, __) => {
          let posts = await context.nodeModel.findAll({
            type: "Mdx",
            query: {
              limit: 3,
              filter: {
                fileAbsolutePath: {
                  regex: "/content/posts/",
                },
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
                  fileAbsolutePath: {
                    regex: "/content/posts/",
                  },
                  id: {
                    ne: source.id,
                  },
                },
              },
            })
          }

          return posts
        },
      },
    },
  }

  createResolvers(resolvers)
}
